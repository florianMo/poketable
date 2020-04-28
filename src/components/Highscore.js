import React from "react";
// import { makeStyles } from '@material-ui/core/styles';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const Highscore = ({ config, ranking, lastRound }) => {
  const { multi, multiMax, addiMax } = config;
  const lastDate = lastRound.date;

  let key1 = multi ? "multi" : "addi";
  let key2 = multi ? multiMax : addiMax;
  let scores = ranking[key1][key2];

  return (
    <div>
      <h4>Scores {multi ? `x${multiMax}` : `+${addiMax}`}</h4>

      <TableContainer component={Paper}>
        <Table aria-label="les scores" size="small">
          <TableHead>
            <TableRow>
              <TableCell>Score</TableCell>
              <TableCell>Nom</TableCell>
              {/* <TableCell align="right">Date</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {scores.map((row) => (
              <TableRow key={row.d}>
                <TableCell
                  component="th"
                  scope="row"
                  style={{
                    backgroundColor: lastDate === row.d ? "yellow" : "white",
                  }}
                >
                  <strong>{row.s}</strong>
                </TableCell>
                <TableCell
                  style={{
                    backgroundColor: lastDate === row.d ? "yellow" : "white",
                  }}
                >
                  {row.n}
                </TableCell>
                {/* <TableCell align="right">
                  {row.d}
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Highscore;
