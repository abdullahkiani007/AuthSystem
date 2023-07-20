const generateRandom = () => {
  let num = "";
  for (let x = 0; x < 4; x++) {
    num += Math.floor(Math.random() * 9 + 1);
  }

  return num;
};

export default generateRandom;
