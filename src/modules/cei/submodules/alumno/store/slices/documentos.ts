import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface DocumentProps {
  idType: number,
  document: FormData
}

interface Documents {
  documentos: DocumentProps[]
}

export const initialState = { documentos: [] } as Documents


const documentSlice = createSlice({
  name: 'documentos',
  initialState,
  reducers: {
    setDocumentReducer: (state: any, action: PayloadAction<DocumentProps>) => {
      const documentIndex: number = state.documentos.findIndex(
        (document: DocumentProps) => document.idType == action.payload.idType
      )
      if (documentIndex == -1){
        state.documentos.push(action.payload)
      } else {
        state.documentos[documentIndex].document = action.payload
      }
    }
  }
})


export const { setDocumentReducer } = documentSlice.actions

export const setDocument = (document: DocumentProps) => (dispatch: any) => {
  dispatch(setDocumentReducer(document))
}
export default documentSlice.reducer
