import EventEmitter from "./event-emitter";
import { LedColor } from "./led-color";

export enum Color {
  0 = "Black",
  1 = "Red",
  2 = "Green",
  3 = "Blue",
  4 = "Yellow",
  5 = "Orange",
}

type DieInstance = {
  getBatteryLevel(): void;
  getDiceColor(): void;
  setLed(led1: LedColor, led2: LedColor): void;
  setDieType(dieType: DieTypes): void;
};

type DieTypes = "D6" | "D20" | "D10" | "D10X" | "D4" | "D8" | "D12";

export default class Die extends EventEmitter {
  static Color: Color;

  readonly id;

  new(id: string, instance: DieInstance);

  instance: {
    dieType: number;
  };

  on(event: "rollStart", handler: () => void): void;
  on(event: "stable", handler: (value: string) => void): void;
  on(event: "value", handler: (value: string) => void): void;
  on(
    event: "tiltStable",
    handler: (
      payload: [value: string, xyzAccRaw: [X: number, Y: number, Z: number]]
    ) => void
  ): void;
  on(
    event: "fakeStable",
    handler: (
      payload: [value: string, xyzAccRaw: [X: number, Y: number, Z: number]]
    ) => void
  ): void;
  on(
    event: "moveStable",
    handler: (
      payload: [value: string, xyzAccRaw: [X: number, Y: number, Z: number]]
    ) => void
  ): void;
  on(event: "batteryLevel", handler: (level: number) => void): void;
  on(event: "color", handler: (colourId: number) => void): void;
  on(event: "disconnected", handler: () => void): void;

  getBatteryLevel(): Promise<number>;

  getColor(): Promise<Color>;

  setLed(color: LedColor): void;
  setLed(color1: LedColor, color2: LedColor): void;

  pulseLed(
    pulseCount: number,
    onTime: number,
    offTime: number,
    RGB: [R: number, G: number, B: number]
  ): void;

  setDieType(dieType: DieTypes): void;
}
