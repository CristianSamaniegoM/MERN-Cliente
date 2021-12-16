import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/auth/Login'; 
import NuevaCuenta from './components/auth/NuevaCuenta'; 
import Proyectos from './components/proyectos/Proyectos';

import ProyectoState from './context/proyectos/ProyectoState';
import TareaState from './context/tareas/TareaState';
import AlertaState from './context/alertas/alertaState';
import AuthState from './context/autenticacion/authState';
import tokenAuth from './config/token';
import RutaPrivada  from './components/rutas/RutaPrivada';

// Revisamos si tenemos un token
const token = localStorage.getItem('token');
if(token){
  tokenAuth(token);
}

function App() {

  // console.log(process.env.REACT_APP_BACKEND_URL)

  return (
    <ProyectoState>
      <TareaState>
        <AlertaState>
          <AuthState>
            <Router>
              {/* Aqui se va ver en todas las páginas */}
              <Routes>
                {/* Dentro del switch se muestra el detalle de cada pagina */}

                <Route exact path="/" element={<Login />} />
                <Route exact path="/nueva-cuenta" element={<NuevaCuenta />} />
                <Route exact path="/proyectos" element={
                  <RutaPrivada>
                    <Proyectos />
                  </RutaPrivada>
                } />

              </Routes>
            </Router>
          </AuthState>
        </AlertaState>
      </TareaState>
    </ProyectoState>
  );
}

export default App;
