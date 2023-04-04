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
    console.log("fecha1",f1)
    console.log("fecha2",f2)
    return f1 < f2
}

export const getIdClavePrograma = async () => {
    const cookieUser = Cookies.get('user');

    console.log('cookie_user',cookieUser)
    const decodeUserToken = await jwtVerify(
        cookieUser,
        new TextEncoder().encode(process.env.JWT_SECRET)
    );
    const dataCookieUser = decodeUserToken.payload.user
    const idActividadRol = dataCookieUser.estudiante.clavePrograma  
    return idActividadRol
}