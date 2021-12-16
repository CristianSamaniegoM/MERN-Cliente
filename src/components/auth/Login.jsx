import React, { useState, useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AlertaContext from '../../context/alertas/alertaContext'
import AuthContext from '../../context/autenticacion/authContext'

const Login = (props) => {

    //Obtengo el Navigate para redireccionar
    let history = useNavigate();

    // Extraer los valores del context
    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;

    const authContext = useContext(AuthContext);
    const { autenticado, mensaje, iniciarSesion } = authContext;

    // En el caso de que el password o usuario no exista
    useEffect(() => {
        
        // Evaluar
        if(autenticado){
            // props.history.push('/proyectos');
            history('/proyectos');
        }

        //Si existe un mensaje
        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }
        // eslint-disable-next-line 
    }, [mensaje, autenticado, history])
    
    const [usuario, guardarUsuario] = useState({
        email: '',
        password: ''
    })

    const { email, password } = usuario

    const onChange = e =>{

        guardarUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        })

    }

    const onSubmit = e =>{
        e.preventDefault()
        console.log("Procesando")

        // Validar que no haya campos vacios
        if(email.trim() === '' || password.trim() === ''){
            mostrarAlerta('Todos los campos deben estar completos','alerta-error');
        }

        //Pasarlo al action
        iniciarSesion({ email, password });

    }

    return ( 
        <div className="form-usuario">
            { alerta ? ( <div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div> ) : null }
            <div className="contenedor-form sombra-dark">
                <h1>Iniciar Sesión</h1>

                <form
                    onSubmit={onSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="email">Correo</label>
                        <input 
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Tu Correo"
                            onChange={onChange}
                            value={email}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="password">Contraseña</label>
                        <input 
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Tu Contraseña"
                            onChange={onChange}
                            value={password}
                        />
                    </div>
                    <div className="campo-form">
                        <input 
                            type="submit" 
                            className="btn btn-primario btn-block"
                            value="Iniciar Sesión" 
                        />
                    </div>
                </form>

                <Link 
                    to={'/nueva-cuenta'}
                    className="enlace-cuenta"
                >Obtener Cuenta</Link>
            </div>
        </div>
     );
}
 
export default Login;