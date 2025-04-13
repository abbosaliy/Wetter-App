export function formattemperature(temp) {
  return Math.floor(temp);
}

export function sunnHour(time) {

  const isAm = time.includes("AM");
  const hourTime = time.split(" ")[0];

  if (isAm) {
    return hourTime;
  }

  const [hour, minutes] = hourTime.split(":");
  const newHour = Number(hour) + 12;

  return newHour + ":" + minutes;
}
