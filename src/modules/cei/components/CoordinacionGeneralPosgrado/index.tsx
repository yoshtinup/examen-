const DashboardCoordinacionGeneralPosgrado = () => {
  return (
    <>
      <h3>Instrucciones:</h3>
      <ul>
        <li>
          Seleccione el alumno o alumna que desea agregar al listado y de clic
          en el botón "Agregar"
        </li>
        <li>
          Si desea eliminar a un alumno o alumna del listado de clic en el botón
          rojo con forma de "Bote de basura"
        </li>
      </ul>
      <iframe
        style={{ minWidth: '100%', height: '88vh', border: '0px' }}
        src="https://dev-aplicaciones.utic.ecosur.mx/app/posgrado-cei/alumnos-activos-para-evaluacio-63bef82ced6fa67792e69021?embed=true"
      ></iframe>
    </>
  );
};

export default DashboardCoordinacionGeneralPosgrado;
