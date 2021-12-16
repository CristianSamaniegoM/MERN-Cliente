import { 
    FORMULARIO_PROYECTO, 
    OBTENER_PROYECTO, 
    AGREGAR_PROYECTO,
    PROYECTO_ERROR,
    VALIDAR_FORMULARIO,
    PROYECTO_ACTUAL,
    ELIMINAR_PROYECTO
 } from "../../types"

export default (state, action) =>{
    switch (action.type) {
        case FORMULARIO_PROYECTO:
            return{
                ...state,
                formulario: true
            }
        case OBTENER_PROYECTO:
            // console.log(action.payload)
            return{
                ...state,
                proyectos: action.payload
            }
        case AGREGAR_PROYECTO:
            return{
                ...state,
                proyectos: [...state.proyectos, action.payload],
                formulario: false,
                errorformulario: false                
            }
        case VALIDAR_FORMULARIO:
            return{
                ...state,
                errorformulario: true
            }
        case PROYECTO_ACTUAL:
            return {
                ...state,
                // Se usa con el array proyecto
                // proyecto: state.proyectos.filter(proyecto => proyecto.id === action.payload)
                proyecto: state.proyectos.filter(proyecto => proyecto._id === action.payload)
            }
        case ELIMINAR_PROYECTO:
            return{
                ...state,
                // El codigo de abajo solo se usa con el array
                // proyectos: state.proyectos.filter(proyecto => proyecto.id !== action.payload),
                proyectos: state.proyectos.filter(proyecto => proyecto._id !== action.payload),
                proyecto: null
            }
        case PROYECTO_ERROR:
            return{
                ...state,
                mensaje: action.payload
            }
        default:
            return state
    }
}