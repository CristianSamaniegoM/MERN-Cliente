import { 
    AGREGAR_TAREA,
    TAREAS_PROYECTO, 
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    // ESTADO_TAREA,
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA,
    LIMPIAR_TAREA
} from '../../types'; 

export default (state, action) =>{
    switch (action.type) {
        case TAREAS_PROYECTO:
            return {
                ...state,
                // Solo se usa con los array
                // tareaspry: state.tareaspry.filter(tarea => tarea.proyectoId === action.payload)
                tareaspry: action.payload
            }
        case AGREGAR_TAREA:
            return {
                ...state,
                tareaspry: [action.payload,...state.tareaspry],
                errorTarea: false
            }
        case VALIDAR_TAREA:
            return {
                ...state,
                errorTarea: true
            }
        case ELIMINAR_TAREA:
            return {
                ...state,
                tareaspry: state.tareaspry.filter(tarea => tarea._id !== action.payload)
            }
        // Como son iguales se unen el case de actualizar y estado
        case ACTUALIZAR_TAREA:
        // case ESTADO_TAREA:
            return {
                ...state,
                tareaspry: state.tareaspry.map(tarea => tarea._id === action.payload._id ? action.payload : tarea )
            }
        case TAREA_ACTUAL:
            return{
                ...state,
                tareaseleccionada: action.payload
            }
        case LIMPIAR_TAREA:
            return{
                ...state,
                tareaseleccionada: null
            }
        default:
            return state;
    }
}