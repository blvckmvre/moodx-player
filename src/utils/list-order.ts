export function shuffle (array: any[]) {
  for(let i = array.length - 1; i>0; i--) {
    let toSwap = Math.floor(Math.random() * (i + 1));
    [array[i], array[toSwap]] = [array[toSwap], array[i]];
  }
  return array;
}

export function orderById<T> (array: {id: number}[]) {
  return array.sort((a, b) => a.id - b.id) as unknown as T[]
}