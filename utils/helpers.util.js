export const addClassNameTo = (elem, className) => {
  elem.classList.add(className);
};

export const removeClassNameFrom = (elem, className) => {
  elem.classList.remove(className);
};

export const removeElementIn = (elem, delay) => {
  setTimeout(() => elem.remove(), delay);
};

export const getRandomInteger = (max, { isNegative } = { isNegative: false }) => {
  const result = Math.floor(Math.random() * max);

  return isNegative ? result * -1 : result;
};
