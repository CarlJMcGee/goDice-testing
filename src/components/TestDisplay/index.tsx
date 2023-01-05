import { numBetween } from "@carljmcgee/lol-random";
import { MapPlus } from "@carljmcgee/set-map-plus";
import { asyncTimeOut } from "@carljmcgee/timey-wimey";
import { Die, LedColor } from "go-dice-api";
import { useEffect, useState } from "react";

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

export default function TestDisplay({ testDie, index: i }: IDieDisplayProps) {
  const [label, setLabel] = useState(`Die #${i + 1}`);
  const [editing, setEditing] = useState(false);

  const dieColor = testDie?.color;
  const [batteryLvl, setBattery] = useState(testDie?.battery);
  const [rolling, setRolling] = useState(false);
  const [value, setValue] = useState<number | undefined>(testDie?.value);

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

  async function roll() {
    setRolling(true);
    await asyncTimeOut(() => {
      setRolling(false);
      setValue(numBetween(1, 6));
    }, 2000);
  }

  return (
    <div
      className={`border-4 ${borderColorMap.get(dieColor)} ${bgColorMap.get(
        dieColor
      )}  m-3 p-3 w-52 h-52 text-black flex flex-col justify-between`}
    >
      <div>
        {editing ? (
          <input
            type={"text"}
            autoFocus
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
            {label} | id:{testDie.id}
          </h2>
        )}
        <h3>
          Battery currently at{" "}
          <span
            className={`${
              batteryLvl > 10 ? "text-black" : "text-red-500 animate-pulse"
            }`}
          >
            {batteryLvl}%
          </span>
        </h3>
        <h3>Color: {dieColor}</h3>
        {rolling ? <h3>Rolling...</h3> : null}
        {!rolling && value ? <h3>You rolled a {value}</h3> : null}
      </div>
      <button
        className={`border-2 py-2 ${borderColorMap.get(dieColor)}`}
        onClick={roll}
      >
        Roll!
      </button>
    </div>
  );
}