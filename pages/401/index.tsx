import React from 'react';
import Cookies from 'js-cookie';
import Roles from '@definitions/Roles';
import { jwtVerify } from 'jose';
import { useRouter } from 'next/router';
function Unauthorized() {
  const router = useRouter();
  const [actualRol, setActualRol] = React.useState<string>(null);
  const [actualRoles, setActualRoles] = React.useState<string[]>(null);

  React.useEffect(() => {
    checkRol();
  }, []);

  const checkRol = async () => {
    const listRoles = Object.entries(Roles);
    const selectedRolToken = Cookies.get('selectedRol');
    const userRolesToken = Cookies.get('userRoles');
    const roles = [];

    setActualRoles(roles);
    try {
      const decodeselectedRolToken = await jwtVerify(
        selectedRolToken,
        new TextEncoder().encode(process.env.JWT_SECRET)
      );
      const decodeUserRoles = await jwtVerify(
        userRolesToken,
        new TextEncoder().encode(process.env.JWT_SECRET)
      );
      const selectedRol = decodeselectedRolToken.payload.selectedRol as number;
      const userRoles = decodeUserRoles.payload.userRoles as Array<number>;
      const roles: any = userRoles.map((value: Roles) => {
        return Roles[value];
      });

      listRoles.forEach(dataRoles => {
        if (selectedRol === dataRoles[1]) {
          setActualRol(dataRoles[0]);
        }
        userRoles?.forEach((dataRol: number) => {
          if (dataRol === dataRoles[1] && !roles.includes(dataRoles[0])) {
            roles.push(dataRoles[0]);
          }
        });
      });
      setActualRoles(roles);
      throw {
        message: 'No autorizado',
        code: 3,
        data: { selectedRol: selectedRol, roles: roles },
      };
    } catch (error) {
      setTimeout(() => {
        Cookies.remove('selectedRol');
        Cookies.remove('userRoles');
        Cookies.remove('user');
        Cookies.remove('ecosurToken');
        //router.push('/login');
      }, 1000);
      //console.log('REMOVED');
    }
  };

  return (
    <section id="unauthorized">
      <div>NO AUTORIZADO...</div>
      <div>
        Rol seleccionado:
        <span style={{ margin: '0px 0px 0px 10px' }}>{actualRol}</span>
      </div>
      <div>
        Tu rol:
        {actualRoles?.map((data: any, idx: number) => {
          return (
            <span key={idx} style={{ margin: '0px 0px 0px 10px' }}>
              [{data}]
            </span>
          );
        })}
      </div>
    </section>
  );
}

export default Unauthorized;
