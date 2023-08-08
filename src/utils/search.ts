export const searchStringAppears = (target: string | undefined, q: string) => {
  if (!target || !q) return 0;

  let stringAppears = 0;

  q.toLowerCase()
    .split(" ")
    .forEach((singleQ) => {
      stringAppears += target.split(singleQ).length - 1;
    });

  return stringAppears;
};
