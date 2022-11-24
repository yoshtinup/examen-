const data = {
  estatus: {
    id: 1,
    texto: 'Pendiente de enviar información',
    esDirector: false,
    firmado: false,
  },
  datosCongreso: [
    {
      id: 0,
      key: 0,
      tipoParticipacion: 'Ponente',
      titulo: 'La felicidad',
      lugar: 'SCLC',
      fecha: '12/04/2022',
    },
  ],
  datosEstancias: [
    {
      id: 1,
      key: 1,
      ambito: 'Internacional',
      universidadCentro: 'ECOSur',
      areaDeAdscripcion: 'Infonomia',
      fechaInicio: '12/04/2022',
      fechaConclusion: '12/04/2022',
    },
  ],
  datosCursosExternos: [
    {
      id: 0,
      key: 0,
      otraInstitucion: 'ECOSUR',
      nombreCurso: 'La teoria de cuerdas',
      fechaConclusion: '12/04/2021',
      fechaInicio: '12/04/2021',
    },
  ],
  datosActividades: [],
  datosPublicaciones: [
    {
      id: 0,
      key: 0,
      titulo: 'El Café de México',
      publicacionEn: 'Ecology',
      tipoParticipacion: 'Autor',
      idTipoPublicacion: 1,
      tipoPublicacion: 'Arbitrada',
      tipoArbitrado: 'Sí',
    },
  ],
  catalogoPublicaciones: [
    {
      idCatalogo: 1,
      tipoPublicacion: 'Artículo',
    },
    {
      idCatalogo: 2,
      tipoPublicacion: 'Capítulo de libro',
    },
    {
      idCatalogo: 3,
      tipoPublicacion: 'Libro',
    },
  ],
  tieneCongresos: true,
  tieneEstancias: true,
  tieneCursos: true,
  tienePublicaciones: true,
};

export default data;
