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
  addSucc: React.Dispatch<React.SetStateAction<number>>;
  addAdv: React.Dispatch<React.SetStateAction<number>>;
  addFail: React.Dispatch<React.SetStateAction<number>>;
  addThreat: React.Dispatch<React.SetStateAction<number>>;
}

export default function GenesysDie({
  die,
  index: i,
  addSucc,
  addAdv,
  addFail,
  addThreat,
}: IDieDisplayProps) {
  const [label, setLabel] = useState(`Die #${i + 1}`);
  const [editing, setEditing] = useState(false);
  const [dieType, setDieType] = useState<genDieTypes>("ability");
  const [genvalueRtn, setGenVal] = useState<string>("");

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
          addSucc((prev) => prev + 1);
          break;
        case "advantage":
          addAdv((prev) => prev + 1);
          break;
        case "triumph":
          addSucc((prev) => prev + 1);
          break;
        case "failure":
          addFail((prev) => prev + 1);
          break;
        case "threat":
          addThreat((prev) => prev + 1);
          break;
        case "despair":
          addFail((prev) => prev + 1);
          break;
        case "blank":
          break;
      }
    });
  }, [value]);

  const borderColorMap = MapPlus<string, string>([
    ["Black", "border-black"],
    ["Red", "border-red-400"],
    ["Green", "border-green-400"],
    ["Blue", "border-blue-400"],
    ["Yellow", "border-yellow-400"],
    ["Orange", "border-orange-400"],
  ]);
  const bgColorMap = MapPlus<string, string>([
    ["Black", "bg-gray-200"],
    ["Red", "bg-red-200"],
    ["Green", "bg-green-200"],
    ["Blue", "bg-blue-200"],
    ["Yellow", "bg-yellow-200"],
    ["Orange", "bg-orange-200"],
  ]);
  return (
    <div
      className={`border-4 text-black flex flex-col justify-start ${
        dieColor ? borderColorMap.get(dieColor) : "border-white"
      } ${
        dieColor ? bgColorMap.get(dieColor) : "bg-gray-200"
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
          <option value="ability">ability</option>
          <option value="proficiency">proficiency</option>
          <option value="boost">boost</option>
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
        {/* <h3>Color: {dieColor}</h3> */}
      </div>
      <div className="flex justify-center items-center h-full text-center">
        {rolling ? <h3 className="text-4xl">Rolling...</h3> : null}
        {!rolling && value ? (
          <h3 className="text-7xl text-black">{genvalueRtn}</h3>
        ) : null}
      </div>
    </div>
  );
}
