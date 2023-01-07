import { useEffect, useState } from "react";
import { MapPlus } from "@carljmcgee/set-map-plus";
import { Die, LedColor } from "../../utils/GoDiceApi";
import {
  useDieValue,
  useRolling,
  useDieColor,
  useBatteryLevel,
} from "../../utils/GoDiceReact";
import type { DieTypes } from "../../utils/GoDiceApi/src/die";

export interface IDieDisplayProps {
  die: Die;
  testDie?: {
    id: string;
    color: keyof typeof LedColor;
    battery: number;
    rolling: boolean;
    value: number;
  };
  index: number;
}

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

export default function DieDisplay({ die, index: i }: IDieDisplayProps) {
  const [label, setLabel] = useState(`Die #${i + 1}`);
  const [editing, setEditing] = useState(false);
  const [dieType, setDieType] = useState<DieTypes>("D6");

  const batteryLvl = useBatteryLevel(die);
  const dieColor = useDieColor(die);
  const rolling = useRolling(die);
  const value = useDieValue(die);

  useEffect(() => {
    die.setDieType(dieType);
  }, [dieType]);

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
          onChange={(e) => setDieType(e.target.value as DieTypes)}
        >
          <option value="D6" defaultChecked>
            D6
          </option>
          <option value="D4">D4</option>
          <option value="D8">D8</option>
          <option value="D10">D10</option>
          <option value="D12">D12</option>
          <option value="D10X">D10X</option>
          <option value="D20">D20</option>
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
          <h3 className="text-7xl text-black">{value}</h3>
        ) : null}
      </div>
    </div>
  );
}
