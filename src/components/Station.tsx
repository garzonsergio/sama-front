import React from "react";

interface StationProps {
  ubicacion: string;
  codigo: string;
}

export const Station: React.FC<StationProps> = ({ ubicacion, codigo }) => {
  return (
    <div className="station">
      <h4>{ubicacion}</h4>
      <p>{codigo}</p>
    </div>
  );
};
