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
        src={
          process.env.APPSMITH_URL +
          process.env.APP_POSGRADO_CEI +
          '?embed=true'
        }
      ></iframe>
    </>
  );
};

export default DashboardCoordinacionGeneralPosgrado;
