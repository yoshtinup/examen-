export default [
  {
    // NOTE: Maestria
    maximoIntegrantes: 2, // NOTE: Es el total de integrantes internos y externos
    maximoExternoOpcional: 1, //NOTE: Es el maximo permitido de externos(incluyendo codirectores)
    codirector: {
      requerido: false, // NOTE: Si es falso es de 0 al maximoExterno
      maximoExterno: 1, // NOTE: Si no se permite ningun codirector colocar 0
    },
  },
  {
    // NOTE: Doctorado
    maximoIntegrantes: 3, // NOTE: Es el total de integrantes internos y externos
    maximoExternoOpcional: 1, //NOTE: Es el maximo permitido de externos(incluyendo codirectores)
    codirector: {
      requerido: false, // NOTE: Si es falso es de 0 al maximoExterno
      maximoExterno: 1, // NOTE: Si no se permite ningun codirector colocar 0
    },
  },
];
