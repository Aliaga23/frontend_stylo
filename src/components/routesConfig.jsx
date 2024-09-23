const routesConfig = {
    usuarios: {
      items: [
        {
          sector: 'Usuarios',
          routes: [
            { path: '/usuario', label: 'Gestionar Usuarios', permiso: 'ver_usuarios' },
          ],
        },
      ],
    },
    productos: {
      items: [
        {
          sector: 'Productos',
          routes: [
            { path: '/producto', label: 'Lista de Productos', permiso: 'ver_productos' },
          ],
        },
      ],
    },
    inventario: {
      items: [
        {
          sector: 'Inventario',
          routes: [
            { path: '/inventario', label: 'Control de Inventario', permiso: 'ver_inventario' },
          ],
        },
      ],
    },
    
    roles: {
      items: [
        {
          sector: 'Roles',
          routes: [
            { path: '/roles', label: 'Gestión de Roles', permiso: 'ver_roles' },
          ],
        },
      ],
    },
    controlCalidad: {
      items: [
        {
          sector: 'Carrito',
          routes: [
            { path: '/carrito', label: 'Control de Calidad', permiso: 'ver_control_calidad' },
          ],
        },
      ],
    },
    trazabilidad: {
      items: [
        {
          sector: 'Sucursales',
          routes: [
            { path: '/sucursales', label: 'Trazabilidad de Productos', permiso: 'ver_trazabilidad' },
          ],
        },
      ],
    },
    lotes: {
      items: [
        {
          sector: 'Pedidos',
          routes: [
            { path: '/pedido', label: 'Gestión de Lotes', permiso: 'ver_lotes' },
          ],
        },
      ],
    },
    categorias: {
      items: [
        {
          sector: 'Categorías',
          routes: [
            { path: '/categoria', label: 'Gestión de Categorías', permiso: 'ver_categorias' },
          ],
        },
      ],
    },
    permisos: {
      items: [
        {
          sector: 'Permisos',
          routes: [
            { path: '/rolpermiso', label: 'Gestión de Permisos', permiso: 'ver_permisos' },
          ],
        },
      ],
    },
  };
  
  export default routesConfig;
  