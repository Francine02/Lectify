export const timeView = (timer: number) => {
  const minutes = Math.floor(timer / 60);
  const seconds = String(timer % 60).padStart(2, '0');

  return minutes + ':' + seconds;
};
