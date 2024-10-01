import React, { useEffect, useState, useCallback } from 'react';
import {
  Container, createTheme, ThemeProvider, Button, TextField, Box
} from '@mui/material';
import MUIDataTable from 'mui-datatables';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import moment from 'moment';
import axios from '../api'; // Se asume que axios está configurado correctamente

const ReporteUsuariosInfoCompleta = () => {
  const [registros, setRegistros] = useState([]);
  const [filteredRegistros, setFilteredRegistros] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    const fetchRegistros = async () => {
      try {
        const response = await axios.get('/usuarios/info-completa');
        setRegistros(response.data);
        setFilteredRegistros(response.data);
      } catch (error) {
        console.error('Error al obtener la información completa de los usuarios:', error);
      }
    };

    fetchRegistros();
  }, []);

  const filterRecords = useCallback(() => {
    if (startDate && endDate) {
      const filtered = registros.filter((record) => {
        const recordDate = new Date(record.FechaRegistroUsuario); // Cambia esto si el campo es diferente
        return recordDate >= new Date(startDate) && recordDate <= new Date(endDate);
      });
      setFilteredRegistros(filtered);
    } else {
      setFilteredRegistros(registros);
    }
  }, [startDate, endDate, registros]);

  useEffect(() => {
    filterRecords();
  }, [filterRecords]);

  const handleResetFilter = () => {
    setStartDate('');
    setEndDate('');
  };

  const columns = [
    { name: 'UsuarioID', label: 'ID Usuario' },
    { name: 'NombreUsuario', label: 'Nombre Usuario' },
    { name: 'EmailUsuario', label: 'Email Usuario' },
    { 
      name: 'FechaRegistroUsuario', 
      label: 'Fecha Registro Usuario',
      options: {
        customBodyRender: (value) => moment(value).format('YYYY-MM-DD')
      }
    },
    { name: 'RolUsuario', label: 'Rol Usuario' },
    { name: 'NombreSucursal', label: 'Nombre Sucursal' },
    { name: 'DireccionSucursal', label: 'Dirección Sucursal' },
    { name: 'NombreProducto', label: 'Nombre Producto' },
    { name: 'DescripcionProducto', label: 'Descripción Producto' },
    { name: 'TipoPrenda', label: 'Tipo Prenda' },
    { name: 'ColorProducto', label: 'Color Producto' },
    { name: 'PrecioProducto', label: 'Precio Producto' },
    { name: 'StockProducto', label: 'Stock Producto' },
    { name: 'MedidasProducto', label: 'Medidas Producto' },
    { name: 'CategoriaProducto', label: 'Categoría Producto' },
    { name: 'ImagenProducto', label: 'Imagen Producto' },
    { name: 'CantidadCarrito', label: 'Cantidad en Carrito' },
    { name: 'PrecioUnitarioCarrito', label: 'Precio Unitario Carrito' },
    { name: 'TotalCarrito', label: 'Total Carrito' },
    { name: 'TotalPedido', label: 'Total Pedido' },
    { name: 'EstadoPedido', label: 'Estado Pedido' },
    { 
      name: 'FechaPedido', 
      label: 'Fecha Pedido',
      options: {
        customBodyRender: (value) => moment(value).format('YYYY-MM-DD')
      }
    },
    { name: 'CantidadProductoPedido', label: 'Cantidad Producto Pedido' },
    { name: 'PrecioUnitarioPedido', label: 'Precio Unitario Pedido' },
    { name: 'MetodoPago', label: 'Método de Pago' },
    { name: 'MontoPago', label: 'Monto Pago' },
    { 
      name: 'FechaPago', 
      label: 'Fecha Pago',
      options: {
        customBodyRender: (value) => moment(value).format('YYYY-MM-DD')
      }
    },
    { 
      name: 'FechaReserva', 
      label: 'Fecha Reserva',
      options: {
        customBodyRender: (value) => moment(value).format('YYYY-MM-DD')
      }
    },
    { 
      name: 'FechaLimiteReserva', 
      label: 'Fecha Límite Reserva',
      options: {
        customBodyRender: (value) => moment(value).format('YYYY-MM-DD')
      }
    },
    { name: 'EstadoReserva', label: 'Estado Reserva' },
    { 
      name: 'FechaVestidorVirtual', 
      label: 'Fecha Vestidor Virtual',
      options: {
        customBodyRender: (value) => moment(value).format('YYYY-MM-DD')
      }
    },
    { name: 'ProductoVestidorVirtual', label: 'Producto Vestidor Virtual' },
    { name: 'TipoReporte', label: 'Tipo Reporte' },
    { name: 'DescripcionReporte', label: 'Descripción Reporte' },
    { 
      name: 'FechaGeneracionReporte', 
      label: 'Fecha Generación Reporte',
      options: {
        customBodyRender: (value) => moment(value).format('YYYY-MM-DD')
      }
    }
  ];

  const options = {
    filterType: 'checkbox',
    responsive: 'standard',
    rowsPerPage: 40,
    rowsPerPageOptions: [40, 80, 120],
    selectableRows: 'none',
    textLabels: {
      body: {
        noMatch: "No se encontraron registros coincidentes",
        toolTip: "Ordenar",
        columnHeaderTooltip: column => `Ordenar por ${column.label}`
      },
      pagination: {
        next: "Siguiente Página",
        previous: "Página Anterior",
        rowsPerPage: "Filas por página:",
        displayRows: "de",
      },
      toolbar: {
        search: "Buscar",
        downloadCsv: "Descargar CSV",
        print: "Imprimir",
        viewColumns: "Ver Columnas",
        filterTable: "Filtrar Tabla",
      },
      filter: {
        all: "Todo",
        title: "FILTROS",
        reset: "REINICIAR",
      },
      viewColumns: {
        title: "Mostrar Columnas",
        titleAria: "Mostrar/Ocultar Columnas",
      },
      selectedRows: {
        text: "fila(s) seleccionada(s)",
        delete: "Eliminar",
        deleteAria: "Eliminar Filas Seleccionadas",
      },
    },
  };

  const getMuiTheme = () => createTheme({
    components: {
      MuiTableCell: {
        styleOverrides: {
          root: {
            border: '1px solid rgba(224, 224, 224, 1)',
            textAlign: 'center',
            padding: '6px',
            fontSize: '12px',
          }
        }
      },
      MuiTableRow: {
        styleOverrides: {
          root: {
            '&:nth-of-type(odd)': {
              backgroundColor: '#f9f9f9',
            },
          }
        }
      },
      MuiTableHead: {
        styleOverrides: {
          root: {
            '& .MuiTableCell-root': {
              fontSize: '14px',
              fontWeight: 'bold',
            }
          }
        }
      }
    }
  });

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredRegistros);

    // Add filters to the first row
    ws['!autofilter'] = { ref: 'A1:AG1' }; // Ajustar la referencia según el número total de columnas

    // Adjust column widths
    const wscols = Array(columns.length).fill({ wch: 15 });
    ws['!cols'] = wscols;

    // Add styles
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "UsuariosInfoCompleta");

    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: EXCEL_TYPE });
    saveAs(data, `UsuariosInfoCompleta_${new Date().toLocaleDateString()}.xlsx`);
  };

  const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

  return (
    <Container style={{ maxWidth: '1500px' }}>
      <h3 className="mt-3">Reporte de Información Completa de Usuarios</h3>
      <ThemeProvider theme={getMuiTheme()}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <TextField
            label="Fecha de inicio"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            sx={{ marginRight: 2 }}
          />
          <TextField
            label="Fecha de fin"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            sx={{ marginRight: 2 }}
          />
          <Button
            variant="contained"
            onClick={handleResetFilter}
            style={{ marginBottom: '16px' }}
          >
            Restablecer Filtro
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={exportToExcel}
            style={{ marginBottom: '16px' }}
          >
            Exportar a Excel
          </Button>
        </Box>
        <MUIDataTable
          title={"Información Completa de Usuarios"}
          data={filteredRegistros}
          columns={columns}
          options={options}
        />
      </ThemeProvider>
    </Container>
  );
};

export default ReporteUsuariosInfoCompleta;
