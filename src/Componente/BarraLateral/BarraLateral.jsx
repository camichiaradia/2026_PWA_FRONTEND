import React from 'react';
import './BarraLateral.css';

const BarraLateral = ({ workspaceName, channels, channel_id, onChannelSelect }) => {

    const miembros = [
        { _id: '1', nombre: 'Gisela Chiaradia' },
        { _id: '2', nombre: 'Patricio Passiotti' },
        { _id: '3', nombre: 'Agustina Mancini' }
    ];

    return (
        <aside className="sidebar-slack">
            <header className="sidebar-header-slack">
                <div className="workspace-info-slack">
                    <h2>{workspaceName}</h2>
                    <span>▼</span>
                </div>
            </header>

            <div className="banner-trial-slack">
                <div className="banner-content-slack">
                    <span>⌛ 17 días restantes de prueba</span>
                    <span className="arrow-slack"> ›</span>
                </div>
            </div>

            <nav className="sidebar-menu-slack">
                <div className="menu-item-slack">🎧 Juntas</div>
                <div className="menu-item-slack">👥 Directorios</div>

                <div className="section-title-slack">▼ Favoritos</div>
                <p className="hint-slack">Arrastra y suelta contenido...</p>

                <div className="section-title-slack">▼ Canales</div>
                <div className="channels-list-slack">
                    {channels && channels.map(channel => (
                        <div
                            key={channel._id}
                            onClick={() => onChannelSelect(channel)}
                            className={`sidebar-channel-item ${channel._id === channel_id ? 'active' : ''}`}
                        >
                            # {channel.nombre}
                        </div>
                    ))}
                </div>

                <div className="section-title-slack">▼ Mensajes directos</div>
                <div className="menu-item-slack">
                    <div className="avatar-placeholder-slack">PP</div>
                    Patricio Passiotti
                </div>
                <div className="menu-item-slack">
                    <div className="avatar-placeholder-slack">GC</div>
                    Gisela Chiaradia
                </div>
                <div className="menu-item-slack">
                    <div className="avatar-placeholder-slack">AM</div>
                    Agustina Mancini
                </div>
            </nav>

        </aside>
    );
};

export default BarraLateral;