import { MapPlus } from "@carljmcgee/set-map-plus";
import { Die, LedColor } from "go-dice-api";
import { Color } from "go-dice-api/src/die";
import { useState } from "react";
import {
  useBatteryLvl,
  useDieColor,
  useFaceValue,
  useRolling,
} from "../../utils/go-dice";

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

// TODO: replace maps with Color enum
const borderColorMap = MapPlus<Color, string>([
  ["BLUE", "border-blue-400"],
  ["GREEN", "border-green-400"],
  ["RED", "border-red-400"],
  ["OFF", "border-white"],
]);
const bgColorMap = MapPlus<Color, string>([
  ["BLUE", "bg-blue-300"],
  ["GREEN", "bg-green-200"],
  ["RED", "bg-red-200"],
  ["OFF", "bg-gray-200"],
]);

export default function DieDisplay({
  die,
  index: i,
  testDie,
}: IDieDisplayProps) {
  const [label, setLabel] = useState(`Die #${i}`);
  const [editing, setEditing] = useState(false);

  const dieColor = useDieColor(die);
  const batteryLvl = useBatteryLvl(die);
  const rolling = useRolling(die);
  const value = useFaceValue(die);

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
          {label}: {die.id}
        </h2>
      )}
      <h3>Battery currently at {batteryLvl}%</h3>
      <h3>Color: {dieColor}</h3>
      {rolling ? <h3>Rolling...</h3> : null}
      {!rolling && value ? <h3>You rolled a {value}</h3> : null}
    </div>
  );
}
