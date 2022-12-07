import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
  GridCellParams,
} from '@mui/x-data-grid';
import Link from '@mui/material/Link';
import { DocumentoItemProps } from '@moduleCEIAlumnos/__generated__/globalTypes';

/**
 * Abre los links de un documento
 * @param url
 */
const openInNewTab = (url: string) => {
  const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
  if (newWindow) newWindow.opener = null;
};

// Definicon de la tabla de documentos
const columns: GridColDef[] = [
  {
    field: 'openLink',
    headerName: 'Documentos',
    width: 200,
    sortable: false,
    renderCell: (params: GridCellParams) => {
      return (
        <>
          <Link
            component="button"
            variant="body2"
            onClick={() => {
              openInNewTab(`${params.row.url}`);
            }}
          >
            {params.row.name}
          </Link>
        </>
      );
    },
  },
  {
    field: 'propuesta',
    headerName: 'Propuesta',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 100,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.historico ? 'Histórica' : 'Actual'}`,
  },
];

type ArrayDocuments = {
  documents: Array<DocumentoItemProps>;
};

/**
 * Genera una tabla con todos los documentos de una propuesta(historicos
 * y actuales)
 * @param
 * @returns
 */
export default function TableDocuments({ documents }: ArrayDocuments) {
  return (
    <div style={{ width: '100%' }}>
      <DataGrid
        rows={documents}
        columns={columns}
        autoHeight={true}
        hideFooter={true}
      />
    </div>
  );
}
