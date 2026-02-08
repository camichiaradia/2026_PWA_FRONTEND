import { useState } from "react"

const useForm = (
    {
        initial_form_fields,
        onSubmit,
        validate // Nueva prop para funcion de validacion
    }
) => {
    const [form_state, setFormState] = useState(initial_form_fields)
    const [errors, setErrors] = useState({}) // Estado para guardar errores de validacion

    //Nos permite trackear el valor de un campo
    const onChangeFieldValue = (event) => {
        const { name, value } = event.target

        setFormState(
            (prevFormState) => {
                return { ...prevFormState, [name]: value }
            }
        )
        //Si hay funcion de validacion, validamos el campo
        if (validate) {
            const validationErrors = validate({ ...form_state, [name]: value })
            setErrors(validationErrors)
        }
    }

    //Nos permite prevenir la recarga del evento submit y activar la funcion de envio
    const onSubmitForm = (event) => {
        event.preventDefault()
        //Validar antes de enviar
        if (validate) {
            const validationErrors = validate(form_state)
            if (Object.keys(validationErrors).length > 0) {
                setErrors(validationErrors)
                return //No enviamos si hay errores
            }
        }
        onSubmit(form_state)
    }

    return {
        form_state,
        onChangeFieldValue,
        onSubmitForm,
        errors // Retornamos los errores
    }
}

export default useForm