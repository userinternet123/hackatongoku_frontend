import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/luchadorList.css';

export function LuchadorList(props) {
    const navigate = useNavigate();
    return (
        <div className='luchador-container'>
            {props.fighters.map((fighter) => (
                <div className='luchador-card' key={fighter.id}>
                    <div className='luchador-img-container'>
                        <div onClick={() => navigate(`/luchador/${fighter.id}`)}>
                        <img className='luchador-img' src={fighter.imagen} alt={fighter.luchador} />
                        </div>
                    </div>
                        <h2 className='luchador-name'>{fighter.userName}</h2>
                    <div className='luchador-info'>
                        <p className='luchador-detail'><strong> KI: </strong>{fighter.ki}</p>
                        <p className='luchador-detail'><strong> Esferas: </strong> {fighter.esferas}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
