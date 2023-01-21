import { Form, useActionData, useLoaderData, useNavigate, redirect } from "react-router-dom"
import { obtenerCliente, actualizarCliente } from "../data/clientes"

import Formulario from "../components/Formulario"
import Error from "../components/Error"

export async function loader({ params }) { //Params es un valor automatico gracias a React Router Dom
    const cliente = await obtenerCliente(params.id)

    if (Object.values(cliente).length === 0) {
        throw new Response('', {
            status: 404,
            statusText: 'No hay resultados'
        })
    }

    return cliente
}

export async function action({ request, params }) {
    const formData = await request.formData()
    const datos = Object.fromEntries(formData)
    const email = formData.get('email')

    //Validacion
    const errores = []
    if (Object.values(datos).includes('')) {
        errores.push("Todos los campos son obligatorios")
    }

    //Expresion regular
    let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");

    if (!regex.test(email)) {
        errores.push("Email no es valido")
    }

    //Retornar datos y errores
    if (Object.keys(errores).length) {
        return errores
    }

    //Actualizar cliente
    await actualizarCliente(params.id, datos)

    return redirect('/')
}

const EditarCliente = () => {

    const navigate = useNavigate()
    const cliente = useLoaderData()
    const errores = useActionData()

    return (
        <>
            <h1 className="font-black text-4xl text-blue-900">Editar Cliente</h1>
            <p className="mt-3 ">A continuacion podras modificar los datos de un cliente</p>

            <div className='flex justify-end'>
                <button className='bg-blue-800 text-white px-3 py-1 uppercase font-bold' type='button' onClick={() => navigate(-1)}>
                    Volver
                </button>
            </div>

            <div className='bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20'>

                {errores?.length && errores.map((error, i) => (
                    <Error key={i}>{error}</Error>
                ))}

                {/* Importar para usar, method "post" busca un action */}
                <Form
                    noValidate
                    method='post'
                >
                    <Formulario cliente={cliente} />

                    <input type="submit" value="Guardar Cambios" className='mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg' />
                </Form>
            </div>
        </>
    )
}

export default EditarCliente