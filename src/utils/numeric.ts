export function decimalToHex(d: number, padding: number = 8) {
  var hex = Number(d).toString(16);

  while (hex.length < padding) {
    hex = "0" + hex;
  }

  return hex.toUpperCase();
}