import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AlertaContext from '../../context/alertas/alertaContext'
import AuthContext from '../../context/autenticacion/authContext'

const NuevaCuenta = (props) => {

    //Obtengo el Navigate para redireccionar
    let history = useNavigate();

    // Extraer los valores del context
    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;

    const authContext = useContext(AuthContext);
    const { autenticado, mensaje, registrarUsuario } = authContext;

    // En el caso que el usuario se haya autenticado, registrado o exista duplicidad de registro

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

    //State para iniciar sesión
    const [usuario, guardarUsuario] = useState({
        nombre: '',
        email: '',
        password: '',
        confirmar : ''
    })

    const { nombre, email, password, confirmar } = usuario

    const onChange = e =>{

        guardarUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        })

    }

    const onSubmit = e =>{
        e.preventDefault()

        // Validar que no haya campos vacios
        if (nombre.trim() === '' || email.trim() === '' 
        || password.trim() === '' || confirmar.trim() === '' ) {
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
            return;
        }
        // Password minimo de 6 caracteres
        if(password.length < 6){
            mostrarAlerta('El password debe ser al menos 6 caracteres','alerta-error');
            return;
        }
        
        // Los 2 passwords son iguales
        if(password !== confirmar){
            mostrarAlerta('Las claves deben ser iguales','alerta-error'); 
            return;
        }

        //Pasar al action
        // console.log("Procesando")
        registrarUsuario({
            nombre,
            email,
            password
        });
    }

    return ( 
        <div className="form-usuario">
            { alerta ? ( <div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div> ) : null }
            <div className="contenedor-form sombra-dark">
                <h1>Obtener Cuenta</h1>

                <form
                    onSubmit={onSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="nombre">Nombre</label>
                        <input 
                            type="text"
                            id="nombre"
                            name="nombre"
                            placeholder="Tu Nombre"
                            onChange={onChange}
                            value={nombre}
                        />
                    </div>
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
                        <label htmlFor="confirmar">Confirmar Contraseña</label>
                        <input 
                            type="password"
                            id="confirmar"
                            name="confirmar"
                            placeholder="Confirmat tu Contraseña"
                            onChange={onChange}
                            value={confirmar}
                        />
                    </div>
                    <div className="campo-form">
                        <input 
                            type="submit" 
                            className="btn btn-primario btn-block"
                            value="Registrar Usuario" 
                        />
                    </div>
                </form>

                <Link 
                        to={'/'}
                        className="enlace-cuenta"
                    >Iniciar Sesion</Link>
            </div>
        </div>
    );
}
 
export default NuevaCuenta;