import React, { useContext, useEffect, useState } from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext'
import TareaContext from '../../context/tareas/TareaContext';

const FormTarea = () => {

    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext;

    const tareasContext = useContext(TareaContext);
    const { errorTarea, agregarTarea, validarTarea, obtenerTareas, tareaseleccionada, 
        actualizarTarea, limpiarTarea } = tareasContext;

    useEffect(() => {
        if ( tareaseleccionada !== null ) {
            guardarTarea(tareaseleccionada)
        }else{
            guardarTarea({
                nombre: ''
            })
        }
        // eslint-disable-next-line 
    }, [])


    const [tarea, guardarTarea] = useState({
        nombre: ''
    })

    const { nombre } = tarea

    if(!proyecto) return null ;

    const [proyectoActual] = proyecto;

    const handleChange = e =>{
        guardarTarea({
            ...tarea,
            [e.target.name] : e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault()

        if(nombre.trim()===''){
            validarTarea();
            return;
        }

        if(tareaseleccionada === null){
            // tarea.proyectoId = proyectoActual.id; Esto se usa con el array de proyecto
            tarea.proyecto = proyectoActual._id;
            tarea.estado = false
            agregarTarea(tarea);
        }else{
            actualizarTarea(tarea)
            limpiarTarea()
        }



        
        obtenerTareas(proyectoActual._id);

        guardarTarea({
            nombre: ''
        })

    }

    return ( 
        <div className="formulario">
            <form
                onSubmit={onSubmit}
            >
                <div className="contenedor-input">
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Nombre Tarea..."
                        name="nombre"
                        onChange={handleChange}
                        value={nombre}
                    />
                </div>

                <div className="contenedor-input">
                    <input
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value={tareaseleccionada ? 'Editar Tarea' : 'Guardar Tarea'}
                    />
                </div>
            </form>

            { errorTarea ? <p className="mensaje error">El nombre de la tarea es obligatorio</p> : null }
        </div>
     );
}
 
export default FormTarea;