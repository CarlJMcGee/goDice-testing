import { MapPlus } from "@carljmcgee/set-map-plus";
import { useEffect, useState } from "react";
import type { negDieFaces, posDieFaces } from "../types/genesysDice";

export const proficiencyDie = MapPlus<number, posDieFaces[]>([
  [1, ["triumph"]],
  [2, ["success"]],
  [3, ["advantage", "advantage"]],
  [4, ["advantage", "success"]],
  [5, ["advantage"]],
  [6, ["success", "success"]],
  [7, ["success"]],
  [8, ["success", "success"]],
  [9, ["advantage", "success"]],
  [10, ["advantage", "success"]],
  [11, ["advantage", "advantage"]],
  [12, ["blank"]],
]);

export const abilityDie = MapPlus<number, posDieFaces[]>([
  [1, ["success"]],
  [2, ["advantage", "success"]],
  [3, ["advantage"]],
  [4, ["advantage", "advantage"]],
  [5, ["success"]],
  [6, ["success", "success"]],
  [7, ["advantage"]],
  [8, ["blank"]],
]);

export const boostDie = MapPlus<number, posDieFaces[]>([
  [1, ["success"]],
  [2, ["advantage", "advantage"]],
  [3, ["advantage", "success"]],
  [4, ["advantage"]],
  [5, ["blank"]],
  [6, ["blank"]],
]);

export const challengeDie = MapPlus<number, negDieFaces[]>([
  [1, ["despair"]],
  [2, ["failure"]],
  [3, ["threat", "threat"]],
  [4, ["threat", "failure"]],
  [5, ["failure", "failure"]],
  [6, ["threat"]],
  [7, ["failure"]],
  [8, ["threat"]],
  [9, ["failure", "failure"]],
  [10, ["threat", "failure"]],
  [11, ["threat", "threat"]],
  [12, ["blank"]],
]);

export const difficultyDie = MapPlus<number, negDieFaces[]>([
  [1, ["failure"]],
  [2, ["threat"]],
  [3, ["failure", "threat"]],
  [4, ["threat"]],
  [5, ["blank"]],
  [6, ["threat", "threat"]],
  [7, ["threat"]],
  [8, ["failure", "failure"]],
]);

export const setbackDie = MapPlus<number, negDieFaces[]>([
  [1, ["failure"]],
  [2, ["threat"]],
  [3, ["threat"]],
  [4, ["failure"]],
  [5, ["blank"]],
  [6, ["blank"]],
]);

export function useProficiencyDie(value: number | undefined): posDieFaces[] {
  const [faceValue, setValue] = useState<posDieFaces[]>(["blank"]);

  if (!value) return faceValue;

  useEffect(() => {
    const roll = proficiencyDie.get(value);
    if (roll) {
      setValue(roll);
    }
  }, [value]);

  return faceValue;
}
export function useAbilityDie(value: number | undefined): posDieFaces[] {
  const [faceValue, setValue] = useState<posDieFaces[]>(["blank"]);

  if (!value) return faceValue;

  useEffect(() => {
    const roll = abilityDie.get(value);
    if (roll) {
      setValue(roll);
    }
  }, [value]);

  return faceValue;
}
export function useBoostDie(value: number | undefined): posDieFaces[] {
  const [faceValue, setValue] = useState<posDieFaces[]>(["blank"]);

  if (!value) return faceValue;

  useEffect(() => {
    const roll = boostDie.get(value);
    if (roll) {
      setValue(roll);
    }
  }, [value]);

  return faceValue;
}

export function useChallengeDie(value: number | undefined): negDieFaces[] {
  const [faceValue, setValue] = useState<negDieFaces[]>(["blank"]);

  if (!value) return faceValue;

  useEffect(() => {
    const roll = challengeDie.get(value);
    if (roll) {
      setValue(roll);
    }
  }, [value]);

  return faceValue;
}
export function useDifficultyDie(value: number | undefined): negDieFaces[] {
  const [faceValue, setValue] = useState<negDieFaces[]>(["blank"]);

  if (!value) return faceValue;

  useEffect(() => {
    const roll = difficultyDie.get(value);
    if (roll) {
      setValue(roll);
    }
  }, [value]);

  return faceValue;
}
export function useSetbackDie(value: number | undefined): negDieFaces[] {
  const [faceValue, setValue] = useState<negDieFaces[]>(["blank"]);

  if (!value) return faceValue;

  useEffect(() => {
    const roll = setbackDie.get(value);
    if (roll) {
      setValue(roll);
    }
  }, [value]);

  return faceValue;
}
