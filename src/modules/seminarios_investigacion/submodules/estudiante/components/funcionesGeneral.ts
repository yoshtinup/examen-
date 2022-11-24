import moment from 'moment'

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
    return f1 < f2
}