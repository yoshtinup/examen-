import { selector } from 'recoil';
import DataService from '@moduleCEIAlumnos/services/data';

export const interfaceRule = selector({
  key: 'interfacerule',
  get: async () => {
    const response = await DataService.getInterfaceRules();
    return response.data;
  },
});
