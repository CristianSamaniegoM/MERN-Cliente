import React, { Fragment, useContext, useRef } from 'react'
import Tarea from './Tarea';
import proyectoContext from '../../context/proyectos/proyectoContext'
import TareaContext from '../../context/tareas/TareaContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group'; 

const ListadoTareas = () => {

    const tareaRef = useRef(null);

    const proyectosContext = useContext(proyectoContext);
    const { proyecto, eliminarProyecto } = proyectosContext;

    const tareasContext = useContext(TareaContext);
    const { tareaspry } = tareasContext;

    if(!proyecto) return (<h2>Selecciona Proyecto</h2>);

    const [proyectoActual] = proyecto;

    // const tareas = []


    const onClickEliminar = () =>{
        // eliminarProyecto(proyectoActual.id) Esto se usa con el array
        eliminarProyecto(proyectoActual._id) //Se usa con mongo el _id
    }

    return ( 
        <Fragment>
            <h2>Proyecto: {proyectoActual.nombre}</h2>
            <ul className="listado-tareas" >
                { tareaspry.length === 0
                    ? (<li className="tarea">No hay tareas</li>)
                    :
                    <TransitionGroup>
                        {tareaspry.map(tarea => (
                            <CSSTransition
                                key={tarea._id}
                                timeout={200}
                                classNames="tarea"
                                nodeRef={ tareaRef }
                            >
                                <Tarea 
                                    tarea={tarea}
                                    containerRef= { tareaRef }
                                />
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                    
                }

            </ul>
                <button
                    type="button"
                    className="btn btn-eliminar"
                    onClick={onClickEliminar}
                >Eliminar Proyecto &times;</button>
        </Fragment>
     );
}
 
export default ListadoTareas;