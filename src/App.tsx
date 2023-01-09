import "./App.css";
import { useDiceSet } from "./utils/GoDiceReact";
import { useEffect, useState } from "react";
import { setNumBetween, numBetween } from "@carljmcgee/lol-random";
import DieDisplay from "./components/DieDisplay";
import { LedColor } from "./utils/GoDiceApi";
import GenesysSet from "./components/GenesysSet";

function App() {
  const [dice, requestDie] = useDiceSet();
  const [diceBox, openDiceBox] = useState<typeof diceBoxen[number]>("standard");

  const diceBoxen = ["standard", "genesys"] as const;

  return (
    <div className="App flex justify-center items-center min-h-screen">
      <div className="flex flex-col">
        <select
          className="text-blue-400 py-3 px-5 bg-gray-800 border-transparent border-2 rounded-md hover:border-cyan-400 hover:text-blue-200 hover:bg-slate-600"
          onChange={(e) =>
            openDiceBox(e.target.value as typeof diceBoxen[number])
          }
        >
          {diceBoxen.map((box) => (
            <option key={box} value={box}>
              {box.toLocaleUpperCase()}
            </option>
          ))}
        </select>
        <button
          className="text-blue-400 my-3 px-5 py-3 border-2 border-transparent rounded-md bg-gray-800 hover:border-cyan-400 hover:text-blue-200 hover:bg-slate-600"
          onClick={() => {
            requestDie();
          }}
        >
          Request Dice
        </button>
        {diceBox === "genesys" ? (
          <GenesysSet dice={dice} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3">
            {dice.map((die, i) => (
              <DieDisplay key={die.id} die={die} index={i} />
            ))}
          </div>
        )}{" "}
      </div>
    </div>
  );
}

export default App;
