import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

//Interface for the data
export interface StationData {
  altitud: number;
  codigo: string;
  fuente: string;
  icono: number;
  id: number;
  latitud: string;
  longitud: string;
  municipio: number;
  nivel_subsiguiente: number;
  territorial: number;
  tipo: number;
  activo: true;
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
            const querySnapshot = await getDocs(collection(db, "estaciones"));
            const stations: StationData[] = [];
            querySnapshot.forEach((doc) => {
            stations.push({ ...doc.data(), id: doc.id } as StationData);
            });
            setData(stations);
        } catch (err) {
            setError("Error fetching data");
        } finally {
            setLoading(false);
        }
        };
    
        fetchData();
    }, []);
    
    return { data, loading, error };
    }
