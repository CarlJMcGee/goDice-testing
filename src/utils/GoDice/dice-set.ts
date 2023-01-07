import { Die } from "./die";
import type { Color } from "go-dice-api/src/die";
import IGoDice from "./goDice";

if (!window.GoDice) {
  throw Error(
    "GoDice API not found.\n" +
      "Please grab a copy of it from the official repo:\n" +
      "\tOfficial GoDice API: https://github.com/ParticulaCode/GoDiceJavaScriptAPI\n" +
      "and add it to the window object:\n" +
      "\t`window.GoDice = GoDice`"
  );
}

const EventEmitter = require("./event-emitter");

const GoDice = window.GoDice;

class DiceSet extends EventEmitter {
  dice: Record<string, Die> = {};

  requestDie() {
    new GoDice().requestDevice();
  }
}

export const diceSet = new DiceSet();

GoDice.prototype.onDiceConnected = (dieId: string, diceInstance: IGoDice) => {
  if (diceSet.dice[dieId]) {
    const die = diceSet.dice[dieId];
    die.instance = diceInstance;
    diceSet.emit("reconnected", die);
  } else {
    const die = new Die(dieId, diceInstance);
    diceSet.dice[dieId] = die;
    diceSet.emit("connected", die);
  }
};

GoDice.prototype.onRollStart = (dieId: string) => {
  diceSet.dice[dieId].emit("rollStart");
};

GoDice.prototype.onBatteryLevel = (dieId: string, batteryLevel: number) => {
  diceSet.dice[dieId].emit("batteryLevel", batteryLevel);
};

GoDice.prototype.onDiceColor = (dieId: string, color: Color) => {
  diceSet.dice[dieId].emit("color", color);
};

GoDice.prototype.onStable = (dieId: string, value: string) => {
  diceSet.dice[dieId].emit("stable", value);
};

GoDice.prototype.onFakeStable = (dieId: string, value: string) => {
  diceSet.dice[dieId].emit("fakeStable", value);
};

GoDice.prototype.onMoveStable = (dieId: string, value: string) => {
  diceSet.dice[dieId].emit("moveStable", value);
};
