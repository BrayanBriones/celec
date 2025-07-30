import './App.css'

import Grid from '@mui/material/Grid2' 
import HydrologyTable from './components/HydrologyTable'
import Student from './components/Student'

// PENDIENTE: Cree la interfaz
import { useState, useEffect } from 'react'
import DataHour from './interface/DataHour'

function App() {

  let url = "https://raw.githubusercontent.com/aavendan/datos/refs/heads/main/CELEC/hidrologia_17122024.json"
  
  // PENDIENTE: Variable de estado y la función de modificación. 
    const [data, setData] = useState<DataHour[]>([])

  // PENDIENTE: 
  // Realizar una petición asíncrona a la URL. La respuesta es un JSON. 
    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await fetch(url)
          const json = await res.json()
          setData(json)
        } catch (err) {
          console.error(err)
        }
      }
      fetchData()
    }, [])
  // Al recibir la respuesta, actualice la variable de estado.

  return (
    <Grid container spacing={5}>

        {/* Student */}
        <Grid size={{ xs: 12 }}>

          {/* PENDIENTE: Envíe sus datos (apellidos, nombres y paralelo) como props del componente */}
          <Student apellidos="Briones Oleas" nombres="Brayan Steven" paralelo={1}></Student>

        </Grid>
        
        {/* HydrologyTable */}
        <Grid size={{ xs: 12 }}>

          {/* PENDIENTE: Envíe la variable de estado como prop */}
          <HydrologyTable data={data}></HydrologyTable>
        
        </Grid>
        
       
    </Grid>
  )
}

export default App
