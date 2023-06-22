import { useState, useEffect, Fragment, FC } from 'react';
import { styled } from '@mui/material/styles';
import {
  Controller,
  UseFormSetValue,
  Control,
  useWatch,
} from 'react-hook-form';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import { setDocument } from '@moduleCEIAlumnos/store/slices/documentos';
import {
  FormStructureProps,
  DocumentProps,
} from '../../../../submodules/alumno/__generated__/globalTypes';

const Input = styled('input')({
  display: 'none',
});

interface InputFileProps {
  label: string;
  id: number;
  type: number;
  control: Control<FormStructureProps>;
  setValue: UseFormSetValue<FormStructureProps>;
}

/**
 * Componente que controla el envio de documentos
 * @todo Logica no implementada
 * @param
 * @returns
 */
const generic = 'Seleccione un archivo';
const FormInputFile: FC<InputFileProps> = ({
  label,
  id,
  type,
  control,
  setValue,
}) => {
  const [fileName, setFileName] = useState<string>(generic);
  const [fileLoad, setFileLoad] = useState<File>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== null && event.target?.files?.length > 0) {
      const files = Array.from(event.target.files);
      const [file] = files;
      setFileName(file.name);
      setFileLoad(file);
    }
  };

  const documents: DocumentProps[] = useWatch({
    control,
    name: 'documents',
  });

  const documentData: Array<File | undefined> = useWatch({
    control,
    name: 'documentData',
  });

  function setNewDocumentList() {
    const documentIndex: number = documents.findIndex(
      (document: DocumentProps) => document.idType == type
    );
    if (documentIndex == -1) {
      documents.push({ idType: type, document: fileName });
    } else {
      documents[documentIndex].document = fileName;
      documentData.splice(documentIndex, 1);
    }
    setValue('documents', documents);
    setValue('documentData', [...documentData, fileLoad]);
  }

  useEffect(() => {
    if (fileName != generic) {
      setNewDocumentList();
    }
  }, [fileLoad]);

  return (
    <Fragment key={`form-file-upload-${id}`}>
      <FormLabel component="legend">{label}</FormLabel>
      <Controller
        name="documents"
        control={control}
        render={({}) => (
          <label htmlFor={`contained-button-file-${id}`}>
            <Input
              accept="application/pdf"
              id={`contained-button-file-${id}`}
              multiple
              type="file"
              onChange={handleChange}
            />
            <Button variant="contained" component="span">
              {fileName}
            </Button>
          </label>
        )}
      />
    </Fragment>
  );
};

export default FormInputFile;
