import React, { useContext } from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext'
import TareaContext from '../../context/tareas/TareaContext';

const Proyecto = ({proyecto, containerRef}) => {
    const proyectosContext = useContext(proyectoContext);
    const { proyectoActual } = proyectosContext;

    const tareasContext = useContext(TareaContext);
    const { obtenerTareas } = tareasContext;

    // Funcion para agregar el proyecto actual
    const seleccionarProyecto = id =>{
        proyectoActual(id)
        obtenerTareas(id)        
    }

    return ( 
        <li ref={containerRef}>
            <button
                type="button"
                className="btn btn-blank"
                // onClick={() => seleccionarProyecto(proyecto.id) } Esto se usa con el array proyecto
                onClick={() => seleccionarProyecto(proyecto._id) }
            >{proyecto.nombre}</button>
        </li>
     );
}
 
export default Proyecto;