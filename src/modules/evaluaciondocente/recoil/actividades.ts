import { atom } from 'recoil';
import { DocentesState } from '@modules/evaluaciondocente/types/evaluacionState'

export const docenteState = atom({
    key: 'docenteState',
    default: {
        
    } as DocentesState
})