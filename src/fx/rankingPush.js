const rankingPush = (arr, config, score, date, name) => {
  let key1 = config.multi ? 'multi': 'addi';
  let key2 = config.multi ? config.multiMax: config.addiMax;
  let newArr = arr[key1][key2];
  newArr.push({n: name, s: score, d: `${date}`});
  newArr.sort(function(a, b) {
    return b.s - a.s || new Date(b.d) - new Date(a.d);
  });
  arr[key1][key2] = newArr;
  return arr;
}
export default rankingPush;