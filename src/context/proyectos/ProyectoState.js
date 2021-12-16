import React, { useReducer } from 'react';
// import { v4 as uuidv4 } from 'uuid';
import proyectoContext from './proyectoContext';
import proyectoReducer from './proyectoReducer';
import { 
    FORMULARIO_PROYECTO,
    OBTENER_PROYECTO,
    AGREGAR_PROYECTO,
    PROYECTO_ERROR,
    VALIDAR_FORMULARIO,
    PROYECTO_ACTUAL,
    ELIMINAR_PROYECTO
} from '../../types';
import clienteAxios from '../../config/axios';

const ProyectoState = props => {

    //Valores de memoria, para probar sin API
    // const proyectos = [
    //     { id: 1, nombre :  'Tienda virtual'},
    //     { id: 2, nombre : 'Intranet'},
    //     { id: 3, nombre : 'Diseño de Sitio web'},
    //     { id: 4, nombre : 'MERN'}
    // ]


    const initialState = {

        proyectos : [],
        formulario : false,
        errorformulario: false,
        proyecto: null,
        mensaje: null
    }

    //Dispatch para ejecutar las acciones
    const [ state, dispatch ] = useReducer(proyectoReducer, initialState)

    //Serie de funciones para el CRUD
    const mostrarFormulario = () =>{
        dispatch({
            type: FORMULARIO_PROYECTO
        })
    }

    //Obtener los proyectos
    const obtenerProyectos = async () => {
        //Obtenia los datos desde el array proyectos de prueba
        // dispatch({
        //     type: OBTENER_PROYECTO,
        //     payload: proyectos
        // })
        
        try {
            const resultado = await clienteAxios.get('/api/proyectos');

            dispatch({
                type: OBTENER_PROYECTO,
                payload: resultado.data.proyectos
            })
        } catch (error) {
            // console.log(error)

            const alerta = {
                msg: 'Hubo un error al obtener proyectos',
                categoria: 'alerta-error'
            }

            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }
    }

    const agregarProyecto = async proyecto =>{
        
        //Agregar proyecto de forma local sin el API
        // proyecto.id = uuidv4();

        // dispatch({
        //     type: AGREGAR_PROYECTO, 
        //     payload: proyecto
        // })
        
        //Agregar proyecto desde la API
        try {
            const resultado = await clienteAxios.post('/api/proyectos', proyecto);
            // console.log(resultado)
            
            dispatch({
                type: AGREGAR_PROYECTO, 
                payload: resultado.data
            })

        } catch (error) {
            // console.log(error)

            const alerta = {
                msg: 'Hubo un error al agregar',
                categoria: 'alerta-error'
            }

            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }

    }

    const mostrarError = () =>{
        dispatch({
            type: VALIDAR_FORMULARIO
        })
    }

    const proyectoActual = (proyectoId) =>{
        dispatch({
            type: PROYECTO_ACTUAL,
            payload: proyectoId
        })
    }

    const eliminarProyecto = async (proyectoId) =>{
        // Solo se usa con el array proyecto
        // dispatch({
        //     type: ELIMINAR_PROYECTO,
        //     payload: proyectoId
        // })
        
        try {
            await clienteAxios.delete(`/api/proyectos/${ proyectoId }`);
            dispatch({
                type: ELIMINAR_PROYECTO,
                payload: proyectoId
            })
        } catch (error) {
            // console.log(error)

            const alerta = {
                msg: 'Hubo un error al eliminar',
                categoria: 'alerta-error'
            }

            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }

    }

    return(
        <proyectoContext.Provider
            value={{
                formulario: state.formulario,
                proyectos: state.proyectos,
                proyecto: state.proyecto,
                errorformulario: state.errorformulario,
                mensaje: state.mensaje,
                mostrarFormulario,
                obtenerProyectos,
                agregarProyecto,
                mostrarError,
                proyectoActual,
                eliminarProyecto
            }}
        >
            {props.children}
        </proyectoContext.Provider>
    )

}

export default ProyectoState;