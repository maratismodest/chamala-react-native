function getShuffled<T>(array: T[]): T[] {
  return array.sort(() => Math.random() - 0.5);
}

export default getShuffled;
