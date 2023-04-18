import { useRecoilValue } from 'recoil';
import { userStateAtom } from '@modules/auth/recoil';
import { EcosurAuth } from '@modules/auth/definitions';

/*
const user: EcosurAuth = useRecoilValue(userStateAtom);
const programa = user.estudiante.clavePrograma; //Number(user.IdPrograma);
*/
const programa = 1;
//FIXME IOG
import Swal from 'sweetalert2';

export const texto = {
  encabezado: 'Evaluación de seminarios de investigación',
  instrucciones: {
    encabezado: 'Instrucciones',
    descripcion: `En esta sección dará inicio el proceso del acta de seminario de investigación. Por lo anterior te sugerimos que previamente se haya realizado la reunión con tu Consejo tutelar correspondiente para presentar los avances de tu investigación del ${
      programa === 1 ? `cuatrimestre` : `semestre`
    } en curso. A continuación se presentan cuatro pestañas (congresos, estancias, cursos fuera de Ecosur y publicaciones) en la que podrás capturar tus actividades realizadas durante el ${
      programa === 1 ? `cuatrimestre` : `semestre`
    } actual (en caso de no haber realizado alguna puede saltarse a la siguiente pestaña):`,
    pasos: `
            <ol>
                <li>Da clic en cada una de las pestañas y captura la información solicitada, en caso de no haber realizado ninguna actividad selecciona la opción de <b>No participé o realicé una actividad</b> de acuerdo con la pestaña.</li>
                <li>Da Clic en el botón <b style="color:#3F51B5">GUARDAR</b> para que se guarde la información registrada.</li>
                <li>Dar click en la siguiente pestaña y así sucesivamente hasta finalizar con la captura de actividades.</li>
                <li>Revisa la información, si todo está correcto, da clic en <b style="color:#3F51B5">FIRMAR</b>. Se enviará una notificación a tu director(a) de tesis para solicitar que realice la evaluación, captura de comentarios y calificación correspondiente.</li>
            </ol>
        `,
    nota: `<b>IMPORTANTE</b>: Para la pestaña de actividades es indispensable anotar las actividades que se realizarán durante el próximo semestre. Asegúrate de registrar todas las actividades previamente acordadas con el Consejo tutelar, no podrás realizar cambios posteriores.`,
  },
  datosEstudiante: {
    estudiante: {
      encabezado: '',
      estudiante: 'Estudiante:',
      programa: 'Programa:',
      tituloTesis: 'Título de tesis:',
    },
    consejoTutelar: {
      encabezado: 'Consejo tutelar',
    },
    datosSeminario: {
      encabezado: 'Seminario:',
    },
  },
  tabs: {
    encabezado: 'Actividades realizadas en el cuatrimestre/semestre',
    tabCongresos: {
      titulo: 'Congresos',
      encabezado: '',
      columnasTabla: props => {
        let columnas = [
          {
            title: 'Título',
            dataIndex: 'titulo',
            key: 'titulo',
          },
          {
            title: 'Lugar',
            dataIndex: 'lugar',
            key: 'lugar',
          },
          {
            title: 'Fecha de realización',
            dataIndex: 'fecha',
            key: 'fecha',
          },
          {
            title: 'Tipo de participación',
            dataIndex: 'tipoParticipacion',
            key: 'tipoParticipacion',
          },
        ];
        if (props.estatus.id === 1) {
          const opciones = {
            title: 'Opciones',
            dataIndex: 'opciones',
            key: 'opciones',
            render: (text, congreso) =>
              props.datosCongreso.length > 0
                ? Swal.fire({
                    title: '¿Eliminar?',
                    text: '¿Esta seguro de eliminar el congreso?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Sí, eliminarlo',
                    cancelButtonText: 'Cancelar',
                  }).then(result => {
                    if (result.isConfirmed) {
                      () => props.removerCongreso(congreso);
                      Swal.fire(
                        'Eliminado',
                        'El Congreso ha sido eliminado',
                        'success'
                      );
                    }
                  })
                : null,
          };
          columnas.push(opciones);
        }
        return columnas;
      },
      form: {
        titulo: {
          label: 'Título de la ponencia',
          placeholder: 'Ingrese título de la ponencia...',
        },
        lugar: {
          label: 'Lugar',
          placeholder: 'Ingrese lugar...',
        },
        fecha: {
          label: 'Fecha de realización',
          placeholder: 'Ingrese fecha de realización...',
        },
        tipoParticipacion: {
          label: 'Tipo de participación',
          placeholder: 'Seleccione',
        },
        botonAgregar: {
          text: 'Agregar',
        },
      },
    },
    tabEstancias: {
      titulo: 'Estancias',
      encabezado: '',
      columnasTabla: props => {
        let columnas = [
          {
            title: 'Nombre de universidad o centro',
            dataIndex: 'universidadCentro',
            key: 'universidadCentro',
          },
          {
            title: 'Área de adscripción',
            dataIndex: 'areaDeAdscripcion',
            key: 'areaDeAdscripcion',
          },
          {
            title: 'Fecha de inicio',
            dataIndex: 'fechaInicio',
            key: 'fechaInicio',
          },
          {
            title: 'Fecha de finalización',
            dataIndex: 'fechaConclusion',
            key: 'fechaConclusion',
          },
          {
            title: 'Ámbito',
            dataIndex: 'ambito',
            key: 'ambito',
          },
        ];

        if (props.estatus.id === 1) {
          const opciones = {
            title: 'Opciones',
            dataIndex: 'opciones',
            key: 'opciones',
            render: (text, estancia) =>
              props.datosEstancias.length > 0
                ? Swal.fire({
                    title: '¿Eliminar?',
                    text: '¿Esta seguro de eliminar la estancia?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Sí, eliminarla',
                    cancelButtonText: 'Cancelar',
                  }).then(result => {
                    if (result.isConfirmed) {
                      () => props.removerEstancia(estancia);
                      Swal.fire(
                        'Eliminada',
                        'La estancia ha sido eliminada',
                        'success'
                      );
                    }
                  })
                : null,
          };
          columnas.push(opciones);
        }
        return columnas;
      },
      form: {
        universidadCentro: {
          label: 'Nombre de la universidad o centro de investigación',
          placeholder:
            'Ingrese nombre de universidad o centro de investigación...',
        },
        areaDeAdscripcion: {
          label: 'Área de adscripción',
          placeholder: 'Ingrese área de adscripción...',
        },
        fechaInicio: {
          label: 'Fecha de inicio',
          placeholder: 'Ingrese fecha de inicio...',
        },
        fechaConclusion: {
          label: 'Fecha de finalización',
          placeholder: 'Ingrese fecha de finalización...',
          error: 'La fecha de finalización debe ser mayor a la fecha de inicio',
        },
        ambito: {
          label: 'Ámbito',
          placeholder: 'Seleccione',
        },
        botonAgregar: {
          text: 'Agregar',
        },
      },
    },
    tabCursos: {
      titulo: 'Cursos fuera de Ecosur',
      encabezado: '',
      columnasTabla: props => {
        let columnas = [
          {
            title: 'Nombre de universidad o centro',
            dataIndex: 'otraInstitucion',
            key: 'otraInstitucion',
          },
          {
            title: 'Nombre del curso',
            dataIndex: 'nombreCurso',
            key: 'nombreCurso',
          },
          {
            title: 'Fecha de inicio',
            dataIndex: 'fechaInicio',
            key: 'fechaInicio',
          },
          {
            title: 'Fecha de finalización',
            dataIndex: 'fechaConclusion',
            key: 'fechaConclusion',
          },
        ];

        if (props.estatus.id === 1) {
          let opciones = {
            title: 'Opciones',
            dataIndex: 'opciones',
            key: 'opciones',
            render: (text, curso) =>
              props.datosCursosExternos.length > 0
                ? Swal.fire({
                    title: '¿Eliminar?',
                    text: '¿Esta seguro de eliminar el curso?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Sí, eliminarla',
                    cancelButtonText: 'Cancelar',
                  }).then(result => {
                    if (result.isConfirmed) {
                      () => props.removerCurso(curso);
                      Swal.fire(
                        'Eliminado',
                        'El curso ha sido eliminado',
                        'success'
                      );
                    }
                  })
                : null,
          };
          columnas.push(opciones);
        }
        return columnas;
      },
      form: {
        otraInstitucion: {
          label: 'Nombre de la universidad o centro de investigación',
          placeholder:
            'Ingrese nombre de universidad o centro de investigación...',
        },
        nombreCurso: {
          label: 'Nombre del curso',
          placeholder: 'Ingrese nombre del curso...',
        },
        fechaInicio: {
          label: 'Fecha de inicio',
          placeholder: 'Ingrese fecha de inicio...',
        },
        fechaConclusion: {
          label: 'Fecha de finalización',
          placeholder: 'Ingrese fecha de finalización...',
          error: 'La fecha de finalización debe ser mayor a la fecha de inicio',
        },
        botonAgregar: {
          text: 'Agregar',
        },
      },
    },
    tabPublicaciones: {
      titulo: 'Publicaciones',
      encabezado: '',
      columnasTabla: props => {
        let columnas = [
          {
            title: 'Título',
            dataIndex: 'titulo',
            key: 'titulo',
          },
          {
            title: 'Revista',
            dataIndex: 'publicacionEn',
            key: 'publicacionEn',
          },
          {
            title: 'Tipo de participación',
            dataIndex: 'tipoParticipacion',
            key: 'tipoParticipacion',
          },
          {
            title: 'Tipo de publicación',
            dataIndex: 'tipoPublicacion',
            key: 'tipoPublicacion',
          },
          {
            title: 'Tipo arbitrado',
            dataIndex: 'tipoArbitrado',
            key: 'tipoArbitrado',
          },
        ];

        if (props.estatus.id === 1) {
          const opciones = {
            title: 'Opciones',
            dataIndex: 'opciones',
            key: 'opciones',
            render: (text, publicacion) =>
              props.datosPublicaciones.length > 0
                ? Swal.fire({
                    title: '¿Eliminar?',
                    text: '¿Esta seguro de eliminar el curso?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Sí, eliminarla',
                    cancelButtonText: 'Cancelar',
                  }).then(result => {
                    if (result.isConfirmed) {
                      () => props.removerPublicacion(publicacion);
                      Swal.fire(
                        'Eliminada',
                        'La publicación ha sido eliminada',
                        'success'
                      );
                    }
                  })
                : null,
          };
          columnas.push(opciones);
        }
        return columnas;
      },
      form: {
        titulo: {
          label: 'Título',
          placeholder: 'Ingrese título de la publicación...',
        },
        publicacionEn: {
          label: 'Nombre de la revista',
          placeholder: 'Ingrese nombre de la revista...',
        },
        tipoParticipacion: {
          label: 'Tipo de participación',
          placeholder: 'Seleccione',
        },
        idTipoPublicacion: {
          label: 'Tipo de publicación',
          placeholder: 'Seleccione',
        },
        tipoArbitrado: {
          label: 'Tipo arbitrado',
          placeholder: 'Seleccione',
        },
        botonAgregar: {
          text: 'Agregar',
        },
      },
    },
    tabActividades: {
      titulo: 'Actividades',
      encabezado: '',
      tabla: {
        columnasTabla: props => {
          let columnas = [
            'Actividad',
            'Mes 1',
            'Mes 2',
            'Mes 3',
            'Mes 4',
            'Mes 5',
            'Mes 6',
          ];

          if (props.estatus.id === 1) {
            columnas.push('Opciones');
          }
          return columnas;
        },
        botonEliminar: {
          text: 'Eliminar',
        },
      },
      form: {
        actividad: {
          label: 'Actividad',
          placeholder: 'Ingrese actividad...',
        },
        meses: {
          label: 'Meses en que realizará la actividad',
          placeholder: '',
          itemMeses: [
            {
              text: 'Mes 1',
              value: 1,
            },
            {
              text: 'Mes 2',
              value: 2,
            },
            {
              text: 'Mes 3',
              value: 3,
            },
            {
              text: 'Mes 4',
              value: 4,
            },
            {
              text: 'Mes 5',
              value: 5,
            },
            {
              text: 'Mes 6',
              value: 6,
            },
          ],
        },
        botonAgregar: {
          text: 'Agregar',
        },
      },
    },
  },
};

export const notificaciones = {
  fechaConclusionIncorrecta: () => {
    Swal.fire({
      icon: 'warning',
      title: 'Configuración de fecha incorrecta',
      text: 'La fecha de finalización debe ser mayor a la fecha de inicio.',
    });
  },
  registrarActividades: () => {
    Swal.fire({
      icon: 'warning',
      title: 'Registre sus actividades',
      text: 'Para poder enviar a revisión agregue al menos una actividad por mes.',
    });
  },
  datosGuardados: () => {
    Swal.fire({
      icon: 'success',
      title: 'Correcto',
      text: '¡Datos guardados correctamente!',
    });
  },
  activarSinActividades: {
    /*ComponentMessage => {
    /*notification['warning']({
      message: <ComponentMessage />,
      duration: 6,
      style: { backgroundColor: '#FBFBEF' },
    });
    */
  },
};
