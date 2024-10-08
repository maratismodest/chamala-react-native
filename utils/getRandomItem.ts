import getRandomInt from "./getRandomInt";

export default function getRandomItem<T>(list: T[]): T {
  return list[getRandomInt(0, list.length - 1)];
}
