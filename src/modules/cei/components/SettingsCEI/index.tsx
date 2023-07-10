const SettingsCEI = () => {
  return (
    <>
      <h3>Herramientas de administración Coordinador(a) del CEI</h3>
      <iframe
        style={{ minWidth: '100%', height: '88vh', border: '0px' }}
        src={
          process.env.APPSMITH_URL +
          process.env.APP_PRESIDENTE_CEI +
          '?embed=true'
        }
      ></iframe>
    </>
  );
};

export default SettingsCEI;
