import { useEffect, useState } from "react";
import { Die } from "../../utils/GoDiceApi";
import GenesysDie from "./GenesysDie";
import { useGenesysResult } from "go-dice-genesys-hooks";

export interface IGenesysSetProps {
  dice: Die[];
}

export default function GenesysSet({ dice }: IGenesysSetProps) {
  const {
    setRolled,
    rolled,
    outcome,
    sideEffects,
    crit,
    inputResult,
    resetResults,
  } = useGenesysResult();

  return (
    <div>
      {rolled ? (
        <button
          className="bg-gray-600 py-2 px-5 hover:bg-opacity-50"
          onClick={resetResults}
        >
          Reset
        </button>
      ) : null}
      {rolled ? (
        <h3 className="text-center text-3xl">
          {crit !== "" ? <span>{crit} </span> : null}
          {outcome}
          {sideEffects !== "" ? <span> with {sideEffects}</span> : null}
        </h3>
      ) : null}
      <div className="grid grid-cols-1 md:grid-cols-3">
        {dice.map((die, i) => (
          <GenesysDie
            key={die.id}
            die={die}
            index={i}
            inputResult={inputResult}
            setRolled={setRolled}
          />
        ))}
      </div>
    </div>
  );
}
