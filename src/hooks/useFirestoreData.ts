import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import type { DocumentData } from "firebase/firestore";
import { db } from "../firebaseConfig";

//Interface for the data
export interface StationData {
  altitud: number;
  codigo: string;
  fuente: string;
  icono: number;
  id: string; // Changed from number to string because Firestore IDs are strings
  latitud: string;
  longitud: string;
  municipio: number;
  nivel_subsiguiente: number;
  territorial: number;
  tipo: number;
  activo: boolean; // Changed from true to boolean
  tipo_nombre: string;
  ubicacion: string;
  umbral: number;
  url: string;
  foto: string;
}

export const useFirestoreData = () => {
  const [data, setData] = useState<StationData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching Firestore data...");
        const estacionesRef = collection(db, "estaciones");
        const querySnapshot = await getDocs(estacionesRef);

        if (querySnapshot.empty) {
          console.log("No documents found in 'estaciones' collection");
          setData([]);
          return;
        }

        const stations: StationData[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data() as DocumentData;
          console.log("Document data:", data);
          stations.push({
            ...data,
            id: doc.id,
          } as StationData);
        });

        setData(stations);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(
          `Error fetching data: ${
            err instanceof Error ? err.message : String(err)
          }`
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};
