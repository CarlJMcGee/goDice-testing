import { MapPlus } from "@carljmcgee/set-map-plus";
import { useEffect, useState } from "react";
import type {
  genDieFaces,
  genDieTypes,
  negDieFaces,
  negDieTypes,
  posDieFaces,
  posDieTypes,
} from "../types/genesysDice";

export const proficiencyDie = MapPlus<number, genDieFaces[]>([
  [1, ["blank"]],
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
  [12, ["triumph"]],
]);

export const abilityDie = MapPlus<number, genDieFaces[]>([
  [1, ["blank"]],
  [2, ["advantage", "success"]],
  [3, ["advantage"]],
  [4, ["advantage", "advantage"]],
  [5, ["success"]],
  [6, ["success", "success"]],
  [7, ["advantage"]],
  [8, ["success"]],
]);

const boostDie = MapPlus<number, genDieFaces[]>([
  [1, ["blank"]],
  [2, ["success"]],
  [3, ["advantage", "advantage"]],
  [4, ["advantage", "success"]],
  [5, ["advantage"]],
  [6, ["blank"]],
]);

export const challengeDie = MapPlus<number, genDieFaces[]>([
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

export const difficultyDie = MapPlus<number, genDieFaces[]>([
  [1, ["failure"]],
  [2, ["threat"]],
  [3, ["failure", "threat"]],
  [4, ["threat"]],
  [5, ["blank"]],
  [6, ["threat", "threat"]],
  [7, ["threat"]],
  [8, ["failure", "failure"]],
]);

export const setbackDie = MapPlus<number, genDieFaces[]>([
  [1, ["blank"]],
  [2, ["failure"]],
  [3, ["threat"]],
  [4, ["threat"]],
  [5, ["failure"]],
  [6, ["blank"]],
]);

export function proficiencyDieValue(value: string): genDieFaces[] {
  const roll = proficiencyDie.get(Number.parseInt(value));
  if (!roll) return ["blank"];
  return roll;
}

export function abilityDieValue(value: string): genDieFaces[] {
  const roll = abilityDie.get(Number.parseInt(value));
  if (!roll) return ["blank"];
  return roll;
}

export function boostDieValue(value: string): genDieFaces[] {
  const roll = boostDie.get(Number.parseInt(value));
  if (!roll) return ["blank"];
  return roll;
}

export function challengeDieValue(value: string): genDieFaces[] {
  const roll = challengeDie.get(Number.parseInt(value));
  if (!roll) return ["blank"];
  return roll;
}
export function difficultyDieValue(value: string): genDieFaces[] {
  const roll = difficultyDie.get(Number.parseInt(value));
  if (!roll) return ["blank"];
  return roll;
}
export function setbackDieValue(value: string): genDieFaces[] {
  const roll = setbackDie.get(Number.parseInt(value));
  if (!roll) return ["blank"];
  return roll;
}

export const GenValueMap = MapPlus<
  genDieTypes,
  (value: string) => genDieFaces[]
>([
  ["proficiency", proficiencyDieValue],
  ["ability", abilityDieValue],
  ["boost", boostDieValue],
  ["challenge", challengeDieValue],
  ["difficulty", difficultyDieValue],
  ["setback", setbackDieValue],
]);
