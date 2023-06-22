import { atom, selector } from 'recoil'
import { Actividades } from '@modules/seminarios_investigacion/submodules/estudiante/types'
import axios from 'axios'

export const actividadesState = atom({
    key: 'actividadesState',
    default: {  
        estatus: {},
        datosCongreso:[], 
        datosEstancias:[],
        datosCursosExternos:[], 
        datosPublicaciones:[], 
        datosActividades:[],
        datosSeminario: {}
    } as Actividades
    
})

// export const actividadesState = selector({
//     key: 'actividadesState',
//     get: () => {
//         axios.get('http://localhost:3001/actividades')
//         .then((response) => {
//           return response.data
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//     },
//   });

// const industriesLoader = selector({
//     key: 'actividadesState',
//     get: async () => {
//         let data:Actividades
//         axios.get('http://localhost:3001/actividades')
//         .then((response) => {
//             data = response.data
//         })
//         .catch((error) => {
//             console.log(error);
//         });
//         return data
//     },
// })

// export const actividadesState = atom({
//     key: 'actividadesState',
//     default: selector({
//       key: 'actividadesStateLouder',
//       get: async () => {
//         await axios.get('http://localhost:3001/actividades')
//         .then((response) => {
//           return response.data
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//         // return await apiClient.fetchIndustries()
//       },
//     }),
//   })