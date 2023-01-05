import { MapPlus } from "@carljmcgee/set-map-plus";
import { Die, LedColor } from "go-dice-api";
import { useState } from "react";
import {
  useBatteryLvl,
  useDieColor,
  useFaceValue,
  useRolling,
} from "../../utils/go-dice";

export interface IDieDisplayProps {
  testDie: {
    id: string;
    color: keyof typeof LedColor;
    battery: number;
    rolling: boolean;
    value: number;
  };
  index: number;
}

export default function DieDisplay({ testDie, index: i }: IDieDisplayProps) {
  const [label, setLabel] = useState(`Die #${i}`);
  const [editing, setEditing] = useState(false);

  const dieColor = testDie?.color;
  const batteryLvl = testDie?.battery;
  const rolling = testDie?.rolling;
  const value = testDie?.value;

  const borderColorMap = MapPlus<keyof typeof LedColor, string>([
    ["BLUE", "border-blue-400"],
    ["GREEN", "border-green-400"],
    ["RED", "border-red-400"],
    ["OFF", "border-white"],
  ]);
  const bgColorMap = MapPlus<keyof typeof LedColor, string>([
    ["BLUE", "bg-blue-300"],
    ["GREEN", "bg-green-200"],
    ["RED", "bg-red-200"],
    ["OFF", "bg-gray-200"],
  ]);

  return (
    <div
      className={`border-4 ${borderColorMap.get(dieColor)} ${bgColorMap.get(
        dieColor
      )}  m-3 p-3 text-black`}
    >
      {editing ? (
        <input
          type={"text"}
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          onSubmit={(e) => {
            e.preventDefault();
            setEditing(false);
          }}
        />
      ) : (
        <h2 onClick={() => setEditing(true)}>
          {label}: {testDie.id}
        </h2>
      )}
      <h3>Battery currently at {batteryLvl}%</h3>
      <h3>Color: {dieColor}</h3>
      {rolling ? <h3>Rolling...</h3> : null}
      {!rolling && value ? <h3>You rolled a {value}</h3> : null}
    </div>
  );
}
