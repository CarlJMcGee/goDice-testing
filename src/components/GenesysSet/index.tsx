import * as React from "react";
import { useEffect, useState } from "react";
import { Die } from "../../utils/GoDiceApi";
import { useDiceSet } from "../../utils/GoDiceReact";
import GenesysDie from "./GenesysDie";

export interface IGenesysSetProps {
  dice: Die[];
}

export default function GenesysSet({ dice }: IGenesysSetProps) {
  const [success, setSuccess] = useState(0);
  const [advantage, setAdvantage] = useState(0);
  const [failure, setFailure] = useState(0);
  const [threat, setThreat] = useState(0);
  const [outcome, setOutcome] = useState<string>("");
  const [sideEffects, setSideEffects] = useState<string>("");

  useEffect(() => {
    const succVsFail = success - failure;
    const advVsThreat = advantage - threat;
    console.log(succVsFail, advVsThreat);

    setOutcome(succVsFail > 0 ? "Success!" : "Failure!");
    setSideEffects(advVsThreat > 0 ? "Advantage!" : "Threatened!");
  }, [success, advantage, failure, threat]);

  return (
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
        />
      ))}
    </div>
  );
}
