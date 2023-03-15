import React from 'react';
import Image from 'next/image';

export const Logo: React.FC<React.PropsWithChildren<unknown>> = () => {
  return <Image src="/icons/ecosur.svg" alt="ECOSUR" width="96" height="58" />;
};
