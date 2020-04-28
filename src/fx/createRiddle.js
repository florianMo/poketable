import getRandomInt from './getRandomInt';

const createRiddle = ({multi,multiMax,addiMax}) => {
  let a,b,s;
  if (multi) {
    a = getRandomInt(1,multiMax);
    b = getRandomInt(1,10);
    s = a*b
  } else {
    s = getRandomInt(2,addiMax);
    a = getRandomInt(1,s-1);
    b = s-a;
  }
  return {a:a,b:b,s:s}
}
export default createRiddle;