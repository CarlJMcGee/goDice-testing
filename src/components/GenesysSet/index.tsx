import * as React from "react";
import { useEffect, useState } from "react";
import { Die } from "../../utils/GoDiceApi";
import { useDiceSet } from "../../utils/GoDiceReact";
import GenesysDie from "./GenesysDie";

export interface IGenesysSetProps {
  dice: Die[];
}

export default function GenesysSet({ dice }: IGenesysSetProps) {
  const [triumph, setTriumph] = useState(0);
  const [success, setSuccess] = useState(0);
  const [advantage, setAdvantage] = useState(0);
  const [despair, setDespair] = useState(0);
  const [failure, setFailure] = useState(0);
  const [threat, setThreat] = useState(0);
  const [rolled, setRolled] = useState(false);
  const [outcome, setOutcome] = useState<string>("");
  const [sideEffects, setSideEffects] = useState<string>("");
  const [crit, setCrit] = useState("");

  useEffect(() => {
    const succVsFail = success - failure;
    const advVsThreat = advantage - threat;
    const natCrit = triumph - despair;

    setOutcome(succVsFail > 0 ? "Success" : "Failure");
    setSideEffects(
      advVsThreat > 0 ? "Advantage!" : advVsThreat < 0 ? "Disadvantage!" : ""
    );
    setCrit(natCrit > 0 ? "Triumphant" : natCrit < 0 ? "Despairing" : "");
  }, [success, advantage, failure, threat]);

  function resetHandler() {
    setSuccess(0);
    setAdvantage(0);
    setFailure(0);
    setThreat(0);
    setTriumph(0);
    setDespair(0);
    setOutcome("");
    setSideEffects("");
    setCrit("");
    setRolled(false);
  }

  return (
    <div>
      {success || failure || advantage || threat ? (
        <button
          className="bg-gray-600 py-2 px-5 hover:bg-opacity-50"
          onClick={resetHandler}
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
            addSucc={setSuccess}
            addAdv={setAdvantage}
            addFail={setFailure}
            addThreat={setThreat}
            addTri={setTriumph}
            addDes={setDespair}
            setRolled={setRolled}
          />
        ))}
      </div>
    </div>
  );
}
