import { asyncTimeOut } from "@carljmcgee/timey-wimey";
import { diceSet, Die, LedColor } from "go-dice-api";
import { Color } from "../types/die";
import { useEffect, useState } from "react";

export function useDiceSet(): [Die[], () => void] {
  const [connectedDice, setDice] = useState<Die[]>([]);
  const requestDie = diceSet.requestDie;

  useEffect(() => {
    const onConnect = (die: Die) => {
      // add die to map
      setDice((dice) => [...dice, die]);

      // flash blue led
      die.pulseLed(2, 50, 50, LedColor.BLUE);
    };
    diceSet.on("connected", onConnect);

    return () => diceSet.off("connected", onConnect);
  }, []);

  return [connectedDice, requestDie];
}

export async function useDieColor(die: Die): Promise<Color | undefined> {
  const [color, setColor] = useState<Color>();

  const paint = await die.getColor();
  setColor(paint);

  return color;
}

export function useLED(die: Die, color: keyof typeof LedColor): void {
  useEffect(() => {
    die.setLed(LedColor[color]);
  }, [die]);
}

export function useLEDPulse(
  die: Die,
  pulseCount: number,
  onTime: number,
  offTime: number,
  RGB: [R: number, G: number, B: number]
): void {
  useEffect(() => {
    die.pulseLed(pulseCount, onTime, offTime, RGB);
  }, [die]);
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

export function useDieValue(die: Die) {
  const [value, setValue] = useState<number | undefined>();

  useEffect(() => {
    die.on("value", (value: number) => {
      if (value === 0) {
        die.instance.dieType === 3 ? setValue(100) : setValue(10);
        return;
      }

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
