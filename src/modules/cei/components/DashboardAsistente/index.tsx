const DashboardAsistentes = () => {
  return (
    <>
      <iframe
        style={{ minWidth: '100%', height: '88vh', border: '0px' }}
        src={
          process.env.APP_POSGRADO_CEI +
          process.env.APP_SERVICIOS_ESCOLARES_CEI +
          '?embed=true'
        }
      ></iframe>
    </>
  );
};

export default DashboardAsistentes;
