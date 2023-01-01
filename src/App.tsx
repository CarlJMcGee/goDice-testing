import "./App.css";
import { useDiceSet, useDieColor, useDieValue } from "go-dice-react";
import { useEffect, useState } from "react";

function App() {
  const [dice, requestDie] = useDiceSet();
  const [addedDice, setAddedDice] = useState(false);
  const [addedDiceFail, setAddedDiceFail] = useState(false);
  useEffect(() => {
    console.log(dice);
  }, [dice]);

  useEffect(() => {
    if (addedDice) {
      dice.length === 0 ? setAddedDiceFail(true) : null;
      return;
    }

    setAddedDiceFail(false);
  });

  return (
    <div className="App">
      <div>
        <button
          onClick={() => {
            setAddedDice(true);
            requestDie();
          }}
        >
          Request Dice
        </button>
        {dice.map((die) => (
          <>
            <h1>Die Id: {die.id}</h1>
            <h2>Value: {useDieValue(die)}</h2>
            <h3>Color: {useDieColor(die)}</h3>
          </>
        ))}
      </div>
      {addedDiceFail ? <h3>Failed to connect to Dice</h3> : null}
    </div>
  );
}

export default App;
