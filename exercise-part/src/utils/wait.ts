export const wait = (milliseconds = 0) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};
