import { atom } from 'recoil';
import { DatosActividades } from '@modules/evaluaciondocente/types/evaluacionState'

export const docenteState = atom({
    key: 'docenteState',
    default: {
        
    } as DatosActividades
})