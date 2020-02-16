export const getRandomString = () =>
  Math.random()
    .toString(36)
    .substring(7);
