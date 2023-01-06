import "./App.css";
import { useDiceSet } from "./utils/go-dice-hooks";
import { useEffect, useState } from "react";
import { setNumBetween, numBetween } from "@carljmcgee/lol-random";
import DieDisplay from "./components/DieDisplay";
import { LedColor } from "go-dice-api";
import TestDisplay from "./components/TestDisplay";
import GenesysDie from "./components/GenesysDisplay";
import { DieFaces, posDieFaces } from "./types/genesysDice";

function App() {
  const [dice, requestDie] = useDiceSet();
  const [testDice, setDice] = useState<
    {
      id: string;
      color: keyof typeof LedColor;
      battery: number;
      rolling: boolean;
      value: number;
    }[]
  >([]);
  const [posValues, setPosValues] = useState<posDieFaces[]>([]);
  const [negValues, setNegValues] = useState<posDieFaces[]>([]);
  useEffect(() => {
    console.log(dice);
    // console.log(posValues);
    // console.log(negValues);
  }, [dice, testDice, posValues]);

  function createDiceHandler() {
    const seeds = setNumBetween(3, 1, 100);
    let dice: {
      id: string;
      color: keyof typeof LedColor;
      battery: number;
      rolling: boolean;
      value: number;
    }[] = [];

    const colors = ["BLUE", "RED", "GREEN", "OFF"] as const;

    seeds.forEach((seed) => {
      dice.push({
        id: `${seed}`,
        color: colors[numBetween(0, 3)],
        battery: numBetween(0, 100),
        rolling: numBetween(1, 1000) % 2 === 0,
        value: numBetween(1, 6),
      });
    });

    setDice([...testDice, ...dice]);
  }

  return (
    <div className="App flex justify-center items-center min-h-screen">
      <div className="flex flex-col">
        <button
          className="text-blue-400 my-3 px-5 py-3 rounded-md bg-gray-800 hover:border-2 hover:border-cyan-400 hover:text-blue-200 hover:bg-slate-600"
          onClick={() => {
            requestDie();
          }}
        >
          Request Dice
        </button>
        <button
          className="text-blue-400 my-3 px-5 py-3 rounded-md bg-gray-800 hover:border-2 hover:border-cyan-400 hover:text-blue-200 hover:bg-slate-600"
          onClick={createDiceHandler}
        >
          Add Test Die
        </button>
        <div className="grid grid-cols-1 md:grid-cols-3">
          {testDice.map((die, i) => (
            <GenesysDie
              key={`${die.id}-testing`}
              testDie={die}
              index={i}
              addToPos={setPosValues}
            />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3">
          {dice.map((die, i) => (
            <DieDisplay key={die.id} die={die} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
