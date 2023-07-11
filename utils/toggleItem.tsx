/**
 * remove or adds item to array if they exist or not.
 * @param arr
 * @param item
 * @returns
 */
export default function toggleItem(arr: number[], item: number) {
  const tempArr = [...arr];
  if (tempArr.includes(item)) {
    tempArr.splice(tempArr.indexOf(item), 1);
  } else {
    tempArr.push(item);
  }
  return tempArr;
}
