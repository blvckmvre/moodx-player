export default function hhmmss(timeInS: number) {
  let h =  Math.floor(timeInS / 3600);
  timeInS -= h * 3600;
  let m = Math.floor(timeInS / 60);
  timeInS -= m * 60;
  let s = Math.floor(timeInS);
  return (
    `${("" + h).padStart(2, "0")}:${("" + m).padStart(2, "0")}:${("" + s).padStart(2, "0")}`
  );
}