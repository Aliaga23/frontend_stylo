import './App.css';
import LandingPage from './components/LandingPage';
import Categorias from './components/CategoriasForm';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Productos from './components/ProductosForm';
import Roles from './components/RolesForm';
import RolPermiso from './components/RolPermiso';
import Usuarios from './components/UsuariosForm';
import Inventario from './components/Inventario';
import CarritoCompras from './components/CarritoCompras';
import Pedidos from './components/Pedidos';
import Sucursales from './components/Sucursales';
import SignUpForm from './components/SignUp';
import SignInForm from './components/SignIn';
function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<SignInForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/usuario" element={<Usuarios />} />
          <Route path="/categoria" element={<Categorias />} />
          <Route path="/producto" element={<Productos />} />
          <Route path="/roles" element={<Roles />} />
          <Route path="/rolpermiso" element={<RolPermiso />} />
          <Route path="/inventario" element={<Inventario/>} />
          <Route path="/carrito" element={<CarritoCompras/>} />
          <Route path="/pedido" element={<Pedidos/>} />
          <Route path="/sucursales" element={<Sucursales/>} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
