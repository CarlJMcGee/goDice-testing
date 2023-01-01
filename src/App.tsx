import "./App.css";
import { useDiceSet, useDieColor, useDieValue } from "go-dice-react";
import { useEffect } from "react";

function App() {
  const [dice, requestDie] = useDiceSet();
  useEffect(() => {
    console.log(dice);
  }, [dice]);

  return (
    <div className="App">
      <div>
        <button onClick={() => requestDie()}>Request Dice</button>
        {dice.map((die) => (
          <>
            <h1>Die Id: {die.id}</h1>
            <h2>Value: {useDieValue(die)}</h2>
            <h3>Color: {useDieColor(die)}</h3>
          </>
        ))}
      </div>
    </div>
  );
}

export default App;
