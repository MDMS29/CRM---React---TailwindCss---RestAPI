import { useLoaderData } from "react-router-dom"

import Cliente from "../components/Cliente";
import { obtenerClientes } from "../data/clientes.js";


export function loader() {
    const clientes = obtenerClientes()
    console.log(clientes)

    return clientes
}

const Index = () => {

    const clientes = useLoaderData()//Recuperar los datos del loader

    return (
        <>
            <h1 className="font-black text-4xl text-blue-900">Clientes</h1>
            <p className="mt-3 ">Administra tus clientes</p>

            {clientes.length ? (
                <table className="w-full bg-white shadow mt-5 table-auto">
                    <thead className="bg-blue-800 text-white ">
                        <tr>
                            <th className="p-2">Cliente</th>
                            <th className="p-2">Contacto</th>
                            <th className="p-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientes.map(cliente => (
                            <Cliente cliente={cliente} key={cliente.id} />
                        ))}

                    </tbody>
                </table>
            ) : (
                <p className=''>No hay Clientes aun</p>
            )}
        </>
    )
}

export default Index