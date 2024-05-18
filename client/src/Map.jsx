import React, { useCallback, useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import axios from 'axios';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

function Map() {
  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(null);
  const predefinedLocation = { lat: 40.7128, lng: -74.0060 }; // Replace with your actual latitude and longitude

  useEffect(() => {
    const fetchCustomers = async () => {
      const response = await axios.get('http://localhost:3001/api/customers');
      const customersWithDistance = await Promise.all(
        response.data.map(async (customer) => {
          const distance = await calculateDistance(predefinedLocation, customer.location);
          return { ...customer, distance };
        })
      );
      setMarkers(customersWithDistance);
    };
    fetchCustomers();
  }, [predefinedLocation]);

  const calculateDistance = async (origin, destination) => {
    const apiKey = 'YOUR_ACTUAL_GOOGLE_MAPS_API_KEY'; // Replace with your actual Google Maps API key
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origin.lat},${origin.lng}&destinations=${destination.lat},${destination.lng}&key=${apiKey}`;
    const response = await axios.get(url);
    const distance = response.data.rows[0].elements[0].distance.text;
    return distance;
  };

  const onMapClick = useCallback((event) => {
    const newMarker = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
      time: new Date(),
    };
    setMarkers((current) => [...current, newMarker]);
  }, []);

  return (
    <LoadScript googleMapsApiKey="AIzaSyB27bN_9kPipglZaZDvwQ6o7xsgS13tBLo"> {/* Replace with your actual Google Maps API key */}
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onClick={onMapClick}
      >n card
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => setSelected(marker)}
          >
            {selected === marker && (
              <InfoWindow>
                <div>
                  <h3>{marker.name}</h3>
                  <p>{marker.address}</p>
                  <p>{marker.contact}</p>
                  <p>Distance: {marker.distance}</p>
                </div>
              </InfoWindow>
            )}
          </Marker>
        ))}
      </GoogleMap>
    </LoadScript>
  );
}

export default Map;
