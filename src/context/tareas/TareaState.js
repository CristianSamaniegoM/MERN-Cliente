import React, { useReducer } from 'react';
import TareaContext from './TareaContext';
import TareaReducer from './TareaReducer';
import clienteAxios from '../../config/axios';
// import { v4 as uuidv4 } from 'uuid';

import { 
    TAREAS_PROYECTO,
    AGREGAR_TAREA,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    // ESTADO_TAREA,
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA,
    LIMPIAR_TAREA
} from '../../types'; 

const TareaState = props =>{

    const initialState = {
        // tareasProyecto: [
        //     {id : 1, nombre : 'Elegir plataforma1', estado: true, proyectoId:1 },
        //     {id : 2, nombre : 'Elegir colores2', estado: false, proyectoId:2 },
        //     {id : 3, nombre : 'Elegir plataformas de pago3', estado: false, proyectoId:3 },
        //     {id : 4, nombre : 'Elegir hosting4', estado: true, proyectoId:4 },
        //     {id : 5, nombre : 'Elegir plataforma5', estado: true, proyectoId:2 },
        //     {id : 6, nombre : 'Elegir colores6', estado: false, proyectoId:3 },
        //     {id : 7, nombre : 'Elegir plataformas de pago7', estado: false, proyectoId:4 },
        //     {id : 8, nombre : 'Elegir hosting8', estado: true, proyectoId:1 },
        //     {id : 9, nombre : 'Elegir plataforma9', estado: true, proyectoId:3 },
        //     {id : 10, nombre : 'Elegir colores10', estado: false, proyectoId:4 },
        //     {id : 11, nombre : 'Elegir plataformas de pago11', estado: false, proyectoId:1 },
        //     {id : 12, nombre : 'Elegir hosting12', estado: true, proyectoId:2 },
        //     {id : 13, nombre : 'Elegir plataforma13', estado: true, proyectoId:4 },
        //     {id : 14, nombre : 'Elegir colores14', estado: false, proyectoId:3 },
        //     {id : 15, nombre : 'Elegir plataformas de pago15', estado: false, proyectoId:2 },
        //     {id : 16, nombre : 'Elegir hosting16', estado: true, proyectoId:1 }
        // ],
        tareaspry: [],
        errorTarea: false,
        tareaseleccionada: null
    }

    // Crear el dispatch y el state
    const [state, dispatch] = useReducer(TareaReducer, initialState)

    const obtenerTareas = async proyecto =>{
        
        // console.log(proyecto);

        try {
            const resultado = await clienteAxios.get('/api/tareas', { params: { proyecto } } )
            // console.log(resultado)
            dispatch({
                type: TAREAS_PROYECTO,
                // Solo se usa con el array
                // payload: proyectoId
                payload: resultado.data.tareas
            })
        } catch (error) {
            console.log(error)
        }

    }

    const agregarTarea = async tarea =>{

        //Añadir id de tarea en Array Tarea
        // tarea.id = uuidv4();

        try {
            const resultado = await clienteAxios.post('/api/tareas', tarea);
            // console.log(resultado.data)
            dispatch({
                type: AGREGAR_TAREA,
                // payload: tarea
                payload: resultado.data.tarea
            })
        } catch (error) {
            console.log(error)
        }

    }

    const validarTarea = () =>{
        dispatch({
            type: VALIDAR_TAREA
        })
    }

    const eliminarTarea = async (id, proyecto) =>{
        try {
            await clienteAxios.delete(`/api/tareas/${id}`, {params: { proyecto }})
            dispatch({
                type: ELIMINAR_TAREA,
                payload: id
            })
        } catch (error) {
            console.log(error)
        }
    }

    // const cambiarEstadoTarea = (tarea) =>{
    //     dispatch({
    //         type: ESTADO_TAREA,
    //         payload: tarea
    //     })
    // }

    const guardarTareaActual = tarea =>{
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        })
    }

    const actualizarTarea = async tarea =>{
        // console.log(tarea)
        
        try {
            const resultado = await clienteAxios.put(`/api/tareas/${ tarea._id }`, tarea)
            dispatch({
                type: ACTUALIZAR_TAREA,
                payload: resultado.data.tarea
            })
            // console.log(resultado)
        } catch (error) {
            console.log(error)
        }
    }

    const limpiarTarea = () =>{
        dispatch({
            type: LIMPIAR_TAREA
        })
    }

    return (
        <TareaContext.Provider
            value={{
                // tareasProyecto: state.tareasProyecto,
                tareaspry: state.tareaspry,
                errorTarea: state.errorTarea,
                tareaseleccionada: state.tareaseleccionada,
                obtenerTareas,
                agregarTarea,
                validarTarea,
                eliminarTarea,
                // cambiarEstadoTarea,
                guardarTareaActual,
                actualizarTarea,
                limpiarTarea
            }}
        >
            {props.children}
        </TareaContext.Provider>
    )

}

export default TareaState;