export const sum = (a, b) => a + b;
export const percentage = (a, b) => (a / b) * 100;
export const average = (numbers) =>
  numbers.reduce((a, b) => a + b, 0) / numbers.length;
