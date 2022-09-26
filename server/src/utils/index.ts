const range = (start: any, end: any) => {
  let length = end - start + 1;
  return Array.from({ length }, (_, index) => index + start);
};

module.exports = range
