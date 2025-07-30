import { useEffect, useState } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import DataHour from '../interface/DataHour';

export default function HydrologyTable( { data } : { data: DataHour[] } ) {

  let [rows, setRows] = useState(Array<DataHour>)

  let getRows = () => {
    if (rows.length) {
      return (
        rows.map((row, idx) => (
          <TableRow
            key={idx}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {row.Fecha}
            </TableCell>
            <TableCell align="center">{row.Mazar}</TableCell>
            
            {/* PENDIENTE: Valores a renderizar en cada celda  */}
            <TableCell align='center'>{row.Molino}</TableCell>
            <TableCell align='center'>{row.Sopladora}</TableCell>
            
          </TableRow>
        ))
      )
    } else {
      return <TableRow><TableCell>No data</TableCell></TableRow>
    }
      
  }

  useEffect( ()=> {
    setRows(data)
  }, [data])
  

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Fecha</TableCell>
            <TableCell align='center'>Mazar</TableCell>
            
            {/* PENDIENTE: Cabeceras de las columnas  */}
            <TableCell align="center">Molino</TableCell>
            <TableCell align="center">Sopladora</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {getRows()}
        </TableBody>
      </Table>
    </TableContainer>
  );
}