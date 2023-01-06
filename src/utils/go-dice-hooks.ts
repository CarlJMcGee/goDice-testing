import { asyncTimeOut } from "@carljmcgee/timey-wimey";
import { diceSet, Die, LedColor } from "go-dice-api";
import { Color } from "go-dice-api/src/die";
import { useEffect, useState } from "react";

export function useDiceSet(): [Die[], () => void] {
  const [connectedDice, setDice] = useState<Die[]>([]);
  const requestDie = diceSet.requestDie;

  useEffect(() => {
    const onConnect = async (die: Die) => {
      // add die to map
      setDice((dice) => [...dice, die]);

      // flash blue led
      die.setLed([0, 0, 255]);
      const blink = setTimeout(() => {
        die.setLed(LedColor.OFF);
      }, 1000);
    };
    diceSet.on("connected", onConnect);

    return () => diceSet.off("connected", onConnect);
  }, []);

  return [connectedDice, requestDie];
}

export function useDieColor(die: Die): Color {
  const [color, setColor] = useState<Color>(Color[0]);

  useEffect(() => {
    die.getColor().then((paint) => setColor(paint));
  }, []);

  return color;
}

export function useLED(die: Die, color: keyof typeof LedColor): void {
  useEffect(() => {
    die.setLed(LedColor[color]);
  });
}

export async function useLEDPulse(
  die: Die,
  color: keyof typeof LedColor,
  intervalSec: number,
  times: number
): Promise<void> {
  const interval = intervalSec * 1000;
  for (let i = 1; i <= times; i++) {
    die.setLed(LedColor[color]);
    await asyncTimeOut(() => {
      die.setLed(LedColor.OFF);
    }, interval);
  }
}

export function useRolling(die: Die): boolean {
  const [rolling, setRolling] = useState(false);

  useEffect(() => {
    const onRolling = () => setRolling(true);
    const onStable = () => setRolling(false);

    die.on("value", onStable);
    die.on("rollStart", onRolling);

    return () => {
      die.off("value", onStable);
      die.off("rollStart", onRolling);
    };
  }, [die]);

  return rolling;
}

export function useFaceValue(die: Die) {
  const [value, setValue] = useState<number | undefined>();

  useEffect(() => {
    die.on("value", (value: number) => {
      setValue(value);
    });
  }, [die]);

  return value;
}

export function useBatteryLvl(die: Die): number | undefined {
  const [lvl, setLvl] = useState<number | undefined>();

  useEffect(() => {
    const getBattLvl = (lvl: number) => setLvl(lvl);

    die.on("batteryLevel", getBattLvl);

    return () => {
      die.off("batteryLevel", getBattLvl);
    };
  }, [die]);

  return lvl;
}
