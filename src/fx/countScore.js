const countScore = (type, level, round) => {

  {console.log('APRES',
    type,
    level,
    round 
  )}

  let keyType = type;
  if ( type=== true ) { keyType= 'multi'}
  if ( type=== false ) { keyType= 'addi'}

  let score = 0;

  if (keyType='multi') { 
    score = round * level
  }
  else { 
    score = round * level
  }

  {console.log('FIN',
    keyType,
    score
  )}
  return score;
};
export default countScore;