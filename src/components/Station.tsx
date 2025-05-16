

export const Station: React.FC<StationProps> = ({ubicacion, codigo}) => {
  return (
    <div className="station">
          <h1>{ubicacion}</h1>
          <p>{codigo }</p>
    </div>
  );
};
