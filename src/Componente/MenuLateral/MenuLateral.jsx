import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './MenuLateral.css';

const MenuLateral = ({
    userSession,
    isLoadingChannel,
    onAddChannelClick,
    workspaceName = "Workspace" }) => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        console.log("Cerrando sesión...");
        localStorage.removeItem('token');
        localStorage.clear();
        navigate('/login');
    };
    return (
        <div className="contenedor-sidebar">

            <nav className="barra-global">
                <div className="item-global logo-ut">
                    {userSession?.username?.charAt(0).toUpperCase()}
                </div>

                <div className="item-global activo">
                    <span className="icon">🏠</span>
                    <p>Inicio</p>
                </div>

                <div className="item-global">
                    <span className="icon">💬</span>
                    <p>Mensajes</p>
                </div>

                <div className="item-global">
                    <span className="icon">🔔</span>
                    <p>Actividad</p>
                </div>

                <div className="item-global">
                    <span className="icon">📄</span>
                    <p>Archivos</p>
                </div>

                <div className="item-global">
                    <span className="icon">...</span>
                    <p>Más</p>
                </div>
                <div className="footer-global">
                    <div
                        className={`btn-add ${isLoadingChannel ? 'loading' : ''}`}
                        title="Añadir canal"
                        onClick={onAddChannelClick}
                    >
                        <span className="plus-symbol">{isLoadingChannel ? '...' : '+'}</span>
                    </div>

                    <div className="avatar-contenedor-relativo">
                        <div
                            className="avatar-usuario"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            style={{ cursor: 'pointer' }}
                        >
                            {userSession?.username?.charAt(0).toUpperCase() || 'C'}
                            <span className="status-online"></span>
                        </div>

                        {isMenuOpen && (
                            <div className="menu-usuario-dropdown">
                                <div className="menu-header">
                                    <div className="avatar-mini">
                                        {userSession?.username?.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="user-info">
                                        <strong>{userSession?.username || 'Usuario'}</strong>
                                        <p className="status-text">🟢 Disponible</p>
                                    </div>
                                </div>
                                <hr />
                                <div className="menu-item" onClick={() => setIsMenuOpen(false)}>
                                    Actualizar tu estado
                                </div>
                                <div className="menu-item">Perfil</div>
                                <div className="menu-item">Preferencias</div>
                                <hr />
                                <div className="menu-item logout" onClick={handleLogout}>
                                    Cerrar Sesión
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default MenuLateral