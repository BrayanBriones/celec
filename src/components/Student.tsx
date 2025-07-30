import Typography from '@mui/material/Typography';

//PENDIENTE: Agregue los props apellidos, nombres y paralelo
interface Info {
    apellidos: string
    nombres: string
    paralelo: number
}

export default function Student( { apellidos, nombres, paralelo }: Info ) {
    return (
        <>
            <Typography component="p" variant="h4">
                {apellidos}, {nombres}
            </Typography>
            <Typography component="h2" variant="h6"
                color="primary" gutterBottom>
                Paralelo # {paralelo}
            </Typography>
        </>
    )
}
