import getRandomInt from "./getRandomInt";

export const getRandomItems = <T>(items: T[], count: number = 2): T[] => {
  const indexes: number[] = [];
  while (indexes.length < count) {
    const randomIndex = getRandomInt(0, items.length - 1);
    if (!indexes.includes(randomIndex)) {
      indexes.push(randomIndex);
    }
  }

  return indexes.map((index) => items[index]);
};
