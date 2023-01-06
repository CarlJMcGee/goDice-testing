import { MapPlus } from "@carljmcgee/set-map-plus";
import { Die, LedColor } from "go-dice-api";
import { Color } from "go-dice-api/src/die";
import { useState } from "react";
import {
  useBatteryLvl,
  useDieColor,
  useFaceValue,
  useRolling,
} from "../../utils/go-dice-hooks";

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

const borderColorMap = MapPlus<Color, string>([
  [Color[0], "border-black"],
  [Color[1], "border-red-400"],
  [Color[2], "border-green-400"],
  [Color[3], "border-blue-400"],
  [Color[4], "border-yellow-400"],
  [Color[5], "border-orange-400"],
]);
const bgColorMap = MapPlus<Color, string>([
  [Color[0], "bg-gray-200"],
  [Color[1], "bg-red-200"],
  [Color[2], "bg-green-200"],
  [Color[3], "bg-blue-200"],
  [Color[4], "bg-yellow-200"],
  [Color[5], "bg-orange-200"],
]);

export default function DieDisplay({ die, index: i }: IDieDisplayProps) {
  const [label, setLabel] = useState(`Die #${i}`);
  const [editing, setEditing] = useState(false);

  const dieColor = useDieColor(die);
  const batteryLvl = useBatteryLvl(die);
  const rolling = useRolling(die);
  const value = useFaceValue(die);

  return (
    <div
      className={`border-4 ${
        dieColor ? borderColorMap.get(dieColor) : "border-white"
      } ${
        dieColor ? bgColorMap.get(dieColor) : "bg-gray-200"
      }  m-3 p-3 text-black`}
    >
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
        <h2 onClick={() => setEditing(true)}>
          {label}: {die.id}
        </h2>
      )}
      <h3>
        Battery currently at{" "}
        <span
          className={`${
            batteryLvl && batteryLvl > 10
              ? "text-black"
              : "text-red-500 animate-pulse"
          }`}
        >
          {batteryLvl}%
        </span>
      </h3>
      <h3>Color: {dieColor}</h3>
      {rolling ? <h3>Rolling...</h3> : null}
      {!rolling && value ? <h3>You rolled a {value}</h3> : null}
    </div>
  );
}
