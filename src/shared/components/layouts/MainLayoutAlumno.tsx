import React from 'react';
import Head from 'next/head';

const MainLayout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Sistema de información de Posgrado</title>
        <meta name="description" content="Sistema de Posgrado ECOSUR" />
      </Head>
      <h1>Hola como estas</h1>
      <div>{children}</div>
    </>
  );
};

export default MainLayout;
