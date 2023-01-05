import "./App.css";
import { useDiceSet } from "./utils/go-dice";
import { useEffect, useState } from "react";
import { setNumBetween, numBetween } from "@carljmcgee/lol-random";
import DieDisplay from "./components/DieDisplay";
import { LedColor } from "go-dice-api";
import TestDisplay from "./components/TestDisplay";

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
  const [addedDice, setAddedDice] = useState(false);
  const [addedDiceFail, setAddedDiceFail] = useState(false);
  useEffect(() => {
    console.log(dice);
    console.log(testDice);
  }, [dice, testDice]);

  useEffect(() => {
    if (addedDice) {
      dice.length === 0 ? setAddedDiceFail(true) : null;
      return;
    }

    setAddedDiceFail(false);
  });

  function createDiceHandler() {
    console.log(`Start`);

    const seeds = setNumBetween(5, 1, 5);
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

    setDice(dice);
    console.log(`End`);
  }

  return (
    <div className="App flex justify-center items-center min-h-screen">
      <div className="flex flex-col">
        <button
          className="text-blue-400 my-3 px-5 py-3 rounded-md bg-gray-800 hover:border-2 hover:border-cyan-400 hover:text-blue-200 hover:bg-slate-600"
          onClick={() => {
            setAddedDice(true);
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
        {testDice.map((die, i) => (
          <TestDisplay testDie={die} index={i} />
        ))}
        {dice.map((die, i) => (
          <DieDisplay die={die} index={i} />
        ))}
        {addedDiceFail ? (
          <h3 className="text-red-500">Failed to connect to Dice</h3>
        ) : null}
      </div>
    </div>
  );
}

export default App;
