import { useEffect, useState } from "react";
import { Die } from "../../utils/GoDiceApi";
import GenesysDie from "./GenesysDie";

export interface IGenesysSetProps {
  dice: Die[];
}

export default function GenesysSet({ dice }: IGenesysSetProps) {
  const [triumph, setTriumph] = useState(0);
  const [success, setSuccess] = useState(0);
  const [advantage, setAdvantage] = useState(0);
  const [rolled, setRolled] = useState(false);
  const [outcome, setOutcome] = useState<string>("");
  const [sideEffects, setSideEffects] = useState<string>("");
  const [crit, setCrit] = useState("");

  useEffect(() => {
    setOutcome(success > 0 ? "Success" : "Failure");
    setSideEffects(
      advantage > 0 ? "Advantage!" : advantage < 0 ? "Disadvantage!" : ""
    );
    setCrit(triumph > 0 ? "Triumphant" : triumph < 0 ? "Despairing" : "");
  }, [success, advantage, triumph]);

  function resetHandler() {
    setSuccess(0);
    setAdvantage(0);
    setTriumph(0);
    setOutcome("");
    setSideEffects("");
    setCrit("");
    setRolled(false);
  }

  return (
    <div>
      {success || advantage ? (
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
            setSucc={setSuccess}
            setAdv={setAdvantage}
            setTri={setTriumph}
            setRolled={setRolled}
          />
        ))}
      </div>
    </div>
  );
}
