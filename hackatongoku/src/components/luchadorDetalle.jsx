import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getLuchadorDetalle } from '../services/api';

export function LuchadorDetalle (props) {
  const { luchador } = useParams();
  const [fighter, setFighter] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      const data = await getLuchadorDetalle(luchador, token);
      setFighter(data);
    };

    fetchData();
  }, [luchador]);

  if (!fighter) return <div>Loading...</div>;

  return (
    <div>
      <h1>{fighter.userName}</h1>
      <img src={fighter.imagen} alt={fighter.userName} />
      <p>KI: {fighter.ki}</p>
      <p>Esferas: {fighter.esferas}</p>
      {Object.keys(fighter.categoria).map((categoryName, index) => (
        <div key={index}>
          <h2>{categoryName}</h2>
          {fighter.categoria[categoryName].requerimientos.map((req, idx) => (
            <div key={idx}>
              <h3>{req.descripcion}</h3>
              {req.notas.map((nota, i) => (
                <div key={i}>
                  <p>Nota: {nota.nota}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
