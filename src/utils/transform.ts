// map对象转成value数组
export function mapValueToArr<T>(map: Map<string, T>): T[] {
  const arr: T[] = [];
  map.forEach((item) => {
    arr.push(item);
  });
  return arr;
}
// map对象转成key数组
export function mapKeyToArr<T>(map: Map<string, T>): string[] {
  return Array.from(map.keys());
}
