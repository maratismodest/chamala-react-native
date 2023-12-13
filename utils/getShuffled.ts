export const getShuffled = <T>(arr: Array<T>): Array<T> =>
  arr
    .map(value => ({value, sort: Math.random()}))
    .sort((a, b) => a.sort - b.sort)
    .map(({value}) => value);
