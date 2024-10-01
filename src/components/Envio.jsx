import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, DistanceMatrixService,  DirectionsRenderer } from '@react-google-maps/api';
import Navbar from './Navbar'; // Para la barra de navegación

const MAP_API_KEY = 'AIzaSyD5aZIW9zu6yFo6mc5TvqHI4L3ZrxSayjI';  // Reemplaza con tu API Key
const ORIGEN_COORDS = { lat: -17.7947, lng: -63.1843 }; // Coordenadas del origen de la tienda

const SimulacionEnvio = () => {
  const [userCoords, setUserCoords] = useState(null); // Coordenadas del usuario
  const [distance, setDistance] = useState(null); // Distancia calculada
  const [cost, setCost] = useState(null); // Costo del envío
  const [directions, setDirections] = useState(null); // Almacenamos las direcciones calculadas

  // Calcular el costo de envío: 5 Bs por km
  useEffect(() => {
    if (distance) {
      const cost = distance / 1000 * 5; // Convertir a kilómetros y multiplicar por 5 Bs
      setCost(cost.toFixed(2)); // Limitar a 2 decimales
    }
  }, [distance]);

  // Manejar la selección de ubicación del usuario
  const handleMapClick = (event) => {
    const { latLng } = event;
    const coords = {
      lat: latLng.lat(),
      lng: latLng.lng(),
    };
    setUserCoords(coords);

    // Al seleccionar la ubicación del usuario, solicitamos la ruta
    calculateRoute(coords);
  };

  // Calcular la ruta entre la tienda y la ubicación del usuario
  const calculateRoute = (destination) => {
    const directionsService = new window.google.maps.DirectionsService();
    
    directionsService.route(
      {
        origin: ORIGEN_COORDS, // Ubicación de la tienda
        destination: destination, // Ubicación seleccionada por el usuario
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result); // Guardamos las direcciones para renderizarlas
        } else {
          console.error(`Error al calcular la ruta: ${status}`);
        }
      }
    );
  };

  // Manejar la respuesta de Google Distance Matrix API
  const handleDistanceMatrixResponse = (response) => {
    if (response.rows[0].elements[0].status === 'OK') {
      setDistance(response.rows[0].elements[0].distance.value); // Distancia en metros
    } else {
      console.error('Error al calcular la distancia:', response.rows[0].elements[0].status);
    }
  };

  return (
    <div>
      <Navbar /> {/* Agregamos la Navbar */}
      <div className="container mx-auto py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Simulación de Envío</h2>

        <div className="map-container" style={{ height: '400px', width: '100%' }}>
          <LoadScript googleMapsApiKey={MAP_API_KEY}>
            <GoogleMap
              center={ORIGEN_COORDS}  // Usamos las coordenadas ajustadas
              zoom={14}
              mapContainerStyle={{ width: '100%', height: '400px' }}
              onClick={handleMapClick}
            >
              {/* Marcador del origen */}
              <Marker position={ORIGEN_COORDS} label="Tienda" />
              {/* Marcador del usuario */}
              {userCoords && <Marker position={userCoords} label="Tu ubicación" />}

              {/* Calcular distancia si la ubicación del usuario está seleccionada */}
              {userCoords && (
                <DistanceMatrixService
                  options={{
                    origins: [ORIGEN_COORDS],
                    destinations: [userCoords],
                    travelMode: 'DRIVING',
                  }}
                  callback={handleDistanceMatrixResponse}
                />
              )}

              {/* Mostrar la ruta si está calculada */}
              {directions && <DirectionsRenderer directions={directions} />}
            </GoogleMap>
          </LoadScript>
        </div>

        {/* Mostrar la distancia y el costo del envío */}
        <div className="text-center mt-8">
          {distance && (
            <>
              <p className="text-xl">Distancia: {(distance / 1000).toFixed(2)} km</p>
              <p className="text-xl font-semibold">Costo de Envío: {cost} Bs</p>
            </>
          )}

          {!userCoords && <p className="text-gray-500">Haz clic en el mapa para seleccionar tu ubicación.</p>}
        </div>
      </div>
    </div>
  );
};

export default SimulacionEnvio;
