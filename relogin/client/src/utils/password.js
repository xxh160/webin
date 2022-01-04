export function checkStrength(val) {
  let lv = 0;
  if (val.match(/[a-z]/g)) ++lv;
  if (val.match(/\d/g)) ++lv;
  if (val.match(/(.[^a-z0-9])/g)) ++lv;
  // length >= 6
  if (val.length < 6) lv = 1;
  return lv;
}
