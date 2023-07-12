import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

export const LeafletMap = () => {
  return (
    <MapContainer center={[26.193, 91.773]} zoom={13}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[26.193, 91.773]}>
        <Popup>
          Flood prone area <br /> Evacuation in process.
        </Popup>
      </Marker>
      <Marker position={[26.183, 91.783]}>
        <Popup>Safer area</Popup>
      </Marker>
    </MapContainer>
  );
};
