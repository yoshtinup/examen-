
import { useQuery } from "react-query"


// const addActividades = (actividades: DatosActividad) => {
//     localStorage.setItem('actividades', JSON.stringify(actividades))
// }



// export const getActividades = () => {
//     // let actividades = JSON.parse(localStorage.getItem('seminario'))
//     // console.log('tiene localStorage')
//     // console.log(actividades)

//     const apiActividadesSeminario = async () => {
//         const response = await fetch('https://actividadesseminario.free.beeceptor.com/actividadesseminario')
//         return response.json()
//     }
//     const { data, status } = useQuery('actividadesSem', apiActividadesSeminario)
//     // return data
// }


const actividadesService = () => {
    const getActividadesSeminario = async () => {
        let data
        const response = await fetch('http://localhost:3001/actividades', {
            headers: {
                'Content-Type': 'application-json',
                // 'Content': 'application-json'
            }
        })
        .then(response => response.json())
        .then(datos => data = datos);
        return data
    }
    
    const { data, status, isError, error } = useQuery('actividadesSeminarios', getActividadesSeminario)


    if(isError){
    console.log('Error: '+error)
    }
    if(status === 'loading'){
        console.log('cargando los datos')
    }

    if(status === 'error'){
        console.log('ocurrio un error  al cargar los datos')
    }
    if(status === 'success'){
        console.log("Se completo la carga de datos: ")
        console.log(data)
    }

}

export default actividadesService
