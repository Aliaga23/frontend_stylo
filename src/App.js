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
import ProductDetail from './components/ProductDetail';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Pago from './components/Pago'; // Importamos el nuevo componente
import HistorialPedidos from './components/HistorialPedidos';
import SimulacionEnvio from './components/Envio';
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
          <Route path="/inventario" element={<Inventario />} />
          <Route path="/carrito" element={<CarritoCompras />} />
          <Route path="/pedido" element={<Pedidos />} />
          <Route path="/sucursales" element={<Sucursales />} />
          
          {/* Ruta para el listado de productos */}
          <Route path="/productos" element={<ProductList />} />

          {/* Ruta dinámica para el detalle de un producto */}
          <Route path="/productos/:id" element={<ProductDetail />} />

          {/* Ruta para el carrito de compras */}
          <Route path="/mi-carrito" element={<Cart />} />
          <Route path="/pago" element={<Pago />} /> {/* Nueva ruta de pago */}
          <Route path="/historial" element={<HistorialPedidos />} /> {/* Nueva ruta de pago */}
          <Route path="/envio" element={<SimulacionEnvio />} /> {/* Nueva ruta de pago */}

        </Routes>
      </div>
    </Router>
  );
}

export default App;
