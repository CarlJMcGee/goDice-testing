import { numBetween } from "@carljmcgee/lol-random";
import { MapPlus } from "@carljmcgee/set-map-plus";
import { asyncTimeOut } from "@carljmcgee/timey-wimey";
import { Die, LedColor } from "../../../utils/GoDiceApi";
import { useEffect, useState } from "react";
import { genDieFaces, genDieTypes } from "../../../types/genesysDice";
import { GenValueMap } from "../../../utils/genesysDice";
import {
  useBatteryLevel,
  useDieColor,
  useDieValue,
  useRolling,
} from "../../../utils/GoDiceReact";
import { DieTypes } from "../../../utils/GoDiceApi/src/die";

export interface IDieDisplayProps {
  die: Die;
  index: number;
  setSucc: React.Dispatch<React.SetStateAction<number>>;
  setAdv: React.Dispatch<React.SetStateAction<number>>;
  setTri: React.Dispatch<React.SetStateAction<number>>;
  setRolled: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function GenesysDie({
  die,
  index: i,
  setSucc,
  setAdv,
  setTri,
  setRolled,
}: IDieDisplayProps) {
  const [label, setLabel] = useState(`Die #${i + 1}`);
  const [editing, setEditing] = useState(false);
  const [dieType, setDieType] = useState<genDieTypes>("boost");
  const [genValueRtn, setGenVal] = useState<string>("");

  const dieColor = useDieColor(die);
  const batteryLvl = useBatteryLevel(die);
  const rolling = useRolling(die);
  const value = useDieValue(die);

  const genToDFace: Record<genDieTypes, DieTypes> = {
    ability: "D8",
    proficiency: "D12",
    boost: "D6",
    difficulty: "D8",
    challenge: "D12",
    setback: "D6",
  };

  useEffect(() => {
    die.setDieType(genToDFace[dieType]);
  }, [dieType]);

  useEffect(() => {
    const getGenValue = GenValueMap.get(dieType);
    if (!getGenValue) return;
    const genValue = getGenValue(value);
    setGenVal(genValue.join(" + "));

    genValue.forEach((faceValue) => {
      switch (faceValue) {
        case "success":
          setSucc((prev) => prev + 1);
          break;
        case "advantage":
          setAdv((prev) => prev + 1);
          break;
        case "triumph":
          setSucc((prev) => prev + 1);
          setTri((prev) => prev + 1);
          break;
        case "failure":
          setSucc((prev) => prev - 1);
          break;
        case "threat":
          setAdv((prev) => prev - 1);
          break;
        case "despair":
          setSucc((prev) => prev - 1);
          setTri((prev) => prev - 1);
          break;
        case "blank":
          break;
      }
    });
    setRolled(true);
  }, [value]);

  const borderColorMap = MapPlus<string, string>([
    ["boost", "border-sky-600"],
    ["ability", "border-green-600"],
    ["proficiency", "border-yellow-600"],
    ["challenge", "border-red-600"],
    ["difficulty", "border-indigo-600"],
    ["setback", "border-black"],
  ]);
  const bgColorMap = MapPlus<string, string>([
    ["boost", "bg-sky-400"],
    ["ability", "bg-green-400"],
    ["proficiency", "bg-yellow-400"],
    ["challenge", "bg-red-400"],
    ["difficulty", "bg-indigo-400"],
    ["setback", "bg-gray-700"],
  ]);

  return (
    <div
      className={`border-4 text- flex flex-col justify-start ${
        dieColor ? borderColorMap.get(dieType) : "border-white"
      } ${
        dieColor ? bgColorMap.get(dieType) : "bg-gray-200"
      }  m-3 p-3 w-52 h-52`}
    >
      <div className="text-center">
        {editing ? (
          <input
            type={"text"}
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setEditing(false);
              }
            }}
            onBlur={(e) => {
              setEditing(false);
            }}
            className={`bg-transparent w-5/6`}
          />
        ) : (
          <h2 onClick={() => setEditing(true)}>{label}</h2>
        )}
        <select
          name="dieType"
          id="dieType"
          className={`bg-transparent border-2 bg-black bg-opacity-20 ${
            dieColor && borderColorMap.get(dieColor)
          } hover:bg-black hover:bg-opacity-30`}
          onChange={(e) => setDieType(e.target.value as genDieTypes)}
        >
          <option value="boost">boost</option>
          <option value="ability">ability</option>
          <option value="proficiency">proficiency</option>
          <option value="challenge">challenge</option>
          <option value="difficulty">difficulty</option>
          <option value="setback">setback</option>
        </select>
        <h3>
          Battery currently at{" "}
          <span
            className={`font-semibold ${
              batteryLvl && batteryLvl > 10
                ? "text-black"
                : "text-red-500 animate-pulse"
            }`}
          >
            {batteryLvl}%
          </span>
        </h3>
      </div>
      <div className="flex justify-center items-center h-full text-center">
        {rolling ? <h3 className="text-4xl">Rolling...</h3> : null}
        {!rolling && value ? (
          <h3 className="text-2xl text-white">{genValueRtn}</h3>
        ) : null}
      </div>
    </div>
  );
}
