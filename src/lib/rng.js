// eslint-disable-next-line import/prefer-default-export
export function pick(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function repeated(n, generator) {
  let result = '';
  for (let i = 0; i < n; i += 1) {
    result += generator();
  }
  return result;
}

export function numeric(n) {
  return repeated(n, () => Math.floor(Math.random() * 10));
}

const CHAR_CODE_A = 'A'.charCodeAt(0);

export function alpha(n) {
  return repeated(n, () =>
    String.fromCharCode(CHAR_CODE_A + Math.floor(Math.random() * 26)),
  );
}

export function alphaNumeric(n) {
  return repeated(n, () => {
    const roll = Math.floor(Math.random() * (10 + 26));
    if (roll < 10) {
      return roll;
    }
    return String.fromCharCode(CHAR_CODE_A + roll - 10);
  });
}
