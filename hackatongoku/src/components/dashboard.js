import React, { useEffect, useState } from 'react';
import { getLuchador } from '../services/api';
import { LuchadorList } from './luchadorList';

export function Dashboard() {
    const [fighters, setFighters] = useState([]);
    console.log('entró a dashboard');
    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            const data = await getLuchador(token);
            console.log('Data');
            console.log(data);
            setFighters(data.luchadores);
        };
        fetchData();
    },[]);
  return (
    <div>
      <h1>Luchadores Del torneo  </h1>
      <LuchadorList fighters={ fighters} />
    </div>
  );
}