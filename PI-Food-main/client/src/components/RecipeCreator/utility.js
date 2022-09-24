export const urlValidator = (url) => {
  try {
    return Boolean(new URL(url));
  } catch (err) {
    return false;
  }
};
