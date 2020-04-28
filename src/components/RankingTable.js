import React from 'react'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
// import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Moment from 'react-moment';
import 'moment/locale/fr';

import countScore from "../fx/countScore";


const RankingTable = ({results, type, lastDate = null}) => {

  let keyType = type;
  if ( type=== true ) { keyType= 'multi'}
  if ( type=== false ) { keyType= 'addi'}

  let newScores = [];

  console.log('results[keyType]', results[keyType])
  
  // for (var keyType in results) {
    // if (results.hasOwnProperty(keyType)) {
      // In 'Multi' or 'Addi'
      // console.log('TYPE:', keyType)
      for (var keyLevel in results[keyType]) {
        if (results[keyType].hasOwnProperty(keyLevel)) {
          results[keyType][keyLevel].map(l=>{
            console.log(keyLevel, l)
            newScores.push({score: countScore(keyType, keyLevel, l.s), name: l.n, level: keyLevel, round: l.s, date: l.d})
          })
        }
        newScores.sort(function(a, b) {
          return b.score - a.score || new Date(b.date) - new Date(a.date);
        });
      }
    // }
  // }

  return (
    <Paper>
      <h4 style={{margin:0,padding: '.4rem', textAlign: 'center'}}>{keyType==='multi'?'Multiplications':'Additions'}</h4>
      <TableContainer>
        <Table aria-label="les scores" size="small">
          {/* <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Nom</TableCell>
              <TableCell>Score</TableCell>
              <TableCell>Date</TableCell>
              {/* <TableCell align="right">Date</TableCell> */}
            {/* </TableRow>
          </TableHead> */}
          <TableBody>
            {newScores.map((row,i)=>
              <TableRow key={`${row.date}---${i}`} style={{backgroundColor: (lastDate===row.date)? '#ffff98': 'white'}}>
                <TableCell style={{color: '#666', paddingRight: 0}}>
                  {i+1}
                </TableCell>
                <TableCell style={{paddingRight: 0,}}>
                  <strong>{row.name}</strong>
                </TableCell>
                <TableCell>
                  <strong>{row.score}</strong>
                </TableCell>
                <TableCell style={{whiteSpace: 'nowrap', paddingRight: 0,}}>
                  {row.round} <span style={{color: 'orangered'}}> x {row.level}</span>
                </TableCell>
                <TableCell>
                  <em><Moment fromNow ago locale="fr">{row.date}</Moment></em>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}

export default RankingTable
