
import { Station } from "./components/Station";
import { useFirestoreData } from "./hooks/useFirestoreData";
import "./App.css";

const stations = [
  { ubicacion: "medellin", codigo: "1" },
  { ubicacion: "bogota", codigo: "2" },
];

function App() {
  const { data, loading, error } = useFirestoreData();
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <>
      {data.map((station) => (
        <Station
          key={station.codigo}
          ubicacion={station.ubicacion}
          codigo={station.codigo}
        />
      ))}
    </>
  );
}

export default App;
