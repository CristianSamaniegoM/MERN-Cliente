import React, { useContext, useEffect, useRef } from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext';
import AlertaContext from '../../context/alertas/alertaContext';
import Proyecto from './Proyecto';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const ListadoProyectos = () => {

    const proyectoRef = useRef(null);
    const proyectosContext = useContext(proyectoContext)
    const { mensaje, proyectos, obtenerProyectos } = proyectosContext

    const alertaContext = useContext(AlertaContext)
    const { alerta, mostrarAlerta } = alertaContext

    useEffect(() => {
        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria)
        }
        obtenerProyectos()
        // eslint-disable-next-line 
    }, [mensaje])
    
    if(proyectos.length === 0)  return <p>No hay proyectos, comienza creando el primero. Tu puedes!!!</p>;

    return ( 
        <ul className="listado-proyectos">

            { alerta ? ( 
            <div 
                className={`alerta ${alerta.categoria}`} 
            > { alerta.msg } </div>
            ) : null }

            <TransitionGroup>
                {proyectos.map(proyecto =>(
                    <CSSTransition
                        // key={proyecto.id} Esto es porque usabamos el id del array
                        key={proyecto._id} // Ahora se usa el id de MongoDB
                        timeout={200}
                        classNames="proyecto"
                        nodeRef={proyectoRef}
                    >
                        <Proyecto 
                            proyecto={proyecto}
                            containerRef = { proyectoRef }
                        />
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </ul>
     );
}
 
export default ListadoProyectos;