import React from 'react';
import { useNavigate } from 'react-router-dom'
import './BarraBuscador.css';

const BarraBuscador = ({ workspaceName }) => {
    const navigate = useNavigate()
    return (
        <div className="buscador-container">
            <div className="buscador-nav">
                <span
                    className="icon-btn"
                    onClick={() => navigate('/home')}
                    style={{ cursor: 'pointer' }}
                >
                    ←
                </span>
                <span className="icon-btn">→</span>
                <span className="icon-btn">🕒</span>
            </div>

            <div className="buscador-input-wrapper">
                <div className="buscador-input">
                    <span>🔍</span>
                    <span>Buscar en {workspaceName}</span>
                </div>
            </div>

            <div className="buscador-help">
                <img className="icon-btn" src="/ai_slack.png" alt="icon_AI_Slack" />
            </div>
        </div>
    );
};

export default BarraBuscador;