import { Station } from "./components/Station";
import { useFirestoreData } from "./hooks/useFirestoreData";
import "./App.css";

// Datos de respaldo por si Firestore falla
const fallbackStations = [
  { ubicacion: "medellin", codigo: "1" },
  { ubicacion: "bogota", codigo: "2" },
];

function App() {
  const { data, loading, error } = useFirestoreData();

  // Muestra un indicador de carga mientras se obtienen los datos
  if (loading) {
    return <div className="loading">Cargando estaciones...</div>;
  }

  // Muestra un mensaje de error si la conexión falla
  if (error) {
    console.error("Error en la conexión de Firestore:", error);
    return (
      <div className="error-container">
        <h2>Error de conexión</h2>
        <p>{error}</p>
        <p>Usando datos de respaldo:</p>
        {fallbackStations.map((station) => (
          <Station
            key={station.codigo}
            ubicacion={station.ubicacion}
            codigo={station.codigo}
          />
        ))}
      </div>
    );
  }

  // Si no hay datos disponibles, muestra un mensaje
  if (data.length === 0) {
    return <div>No hay estaciones disponibles</div>;
  }

  // Renderiza las estaciones desde Firestore
  return (
    <div className="stations-container">
      {data.map((station) => (
        <Station
          key={station.codigo}
          ubicacion={station.ubicacion}
          codigo={station.codigo}
        />
      ))}
    </div>
  );
}

export default App;
