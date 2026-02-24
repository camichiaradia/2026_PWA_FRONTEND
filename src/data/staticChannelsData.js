export const staticChannelsData = {
    "canal general": [
        {
            id: 1,
            fk_ws_member_id: {
                fk_id_user: { _id: "static_gisela", username: "Gisela" }
            },
            mensaje: "Hola Bienvenidos a todos!!",
            created_at: "9:30 a.m."
        },
        {
            id: 2,
            fk_ws_member_id: "Yo",
            mensaje: "Hola, Buenos días",
            created_at: "09:35 a.m."
        },
        {
            id: 3,
            fk_ws_member_id: {
                fk_id_user: { _id: "static_gisela", username: "Gisela" }
            },
            mensaje: "A traves de este espacio vamos a poder sacarnos las dudas y consultar.",
            created_at: "10:00 a.m.",
        },
        {
            id: 4,
            fk_ws_member_id: "Yo",
            mensaje: "Genial, muchas gracias!",
            created_at: "10:10 a.m.",
        }
    ],

    "trabajo": [
        {
            id: 1,
            fk_ws_member_id: {
                fk_id_user: { _id: "static_patricio", username: "Patricio" }
            },
            mensaje: "Cami, ¿Tenés el proyecto finalizado?",
            created_at: "11:30 a.m.",
        },
        {
            id: 2,
            fk_ws_member_id: "Yo",
            mensaje: "No aún. Para las 13hs lo finalizo!",
            created_at: "11:40 a.m.",
        },
        {
            id: 3,
            fk_ws_member_id: {
                fk_id_user: { _id: "static_patricio", username: "Patricio" }
            },
            mensaje: "Genial!! Asi armamos la reunión.",
            created_at: "12:00 a.m. ",
        },
        {
            id: 4,
            fk_ws_member_id: "Yo",
            mensaje: "Que bien, la reunión fue un éxito!",
            created_at: "15:15 p.m",
        }
        ,
        {
            id: 5,
            fk_ws_member_id: {
                fk_id_user: { _id: "static_patricio", username: "Patricio" }
            },
            mensaje: "La verdad que sí, te felicito!",
            created_at: "15:45 p.m.",
        }

    ]
}

export function getAllContacts() {
    return staticChannelsData;
}