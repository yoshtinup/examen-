import moment from 'moment'
import Cookies from 'js-cookie';
import { jwtVerify } from 'jose';

export const formCompleto = formValues => {
    const objKeys = Object.keys(formValues)
    let valoresVacios = false
    objKeys.forEach(key => {
        if (formValues[key].length === 0) {
            valoresVacios = true
            return
        }
    })
    return !valoresVacios
}

export const rangoFechasValido = (fecha1, fecha2) => {
    const f1 = moment(fecha1, 'DD/MM/yyyy').format('YYYY-MM-DD')
    const f2 = moment(fecha2, 'DD/MM/yyyy').format('YYYY-MM-DD')
    return fecha1<fecha2 //< f2
}

export const getIdClavePrograma = async () => {
    const cookieUser = Cookies.get('user');
    const decodeUserToken = await jwtVerify(
        cookieUser,
        new TextEncoder().encode(process.env.JWT_SECRET)
    );
    const dataCookieUser: any = decodeUserToken.payload.user
    const idActividadRol = dataCookieUser.estudiante.clavePrograma
    return idActividadRol
}

export const DateFormat = (fecha:string) => {
    const dateResponse = new Date(Date.parse(fecha));
    return dateResponse.toLocaleDateString('en-CA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    })
  };