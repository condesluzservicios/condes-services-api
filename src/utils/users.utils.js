export const getAleIdent = () => {
  let finalNumber = [];

  for (let number = 0; finalNumber.length < 4; number++) {
    const n = Math.floor(Math.random() * 10);
    finalNumber.push(n);
  }

  return Number(finalNumber.join(''));
};
