const createKeyboard = ({multi,multiMax,addiMax}) => {
  let k=[];
  if (multi) {
    for (let n = 1; n <= (multiMax*10); n++) {
      k.push(n);
    }
  } else {
    for (let n = 1; n <= (addiMax); n++) {
      k.push(n);
    }
  }
  return k
}
export default createKeyboard;