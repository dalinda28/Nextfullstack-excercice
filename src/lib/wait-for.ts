export const waitFor = (ms: number) => {
  return new Promise((r) => setTimeout(r, ms));
};
