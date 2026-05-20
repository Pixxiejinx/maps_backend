// types.ts o types/index.ts

export interface Usor {
    id: string;       // El socketId que actúa como identificador único
    nomen: string;    // Nombre del usuario
    color: string;    // Código de color (por ejemplo, en hexadecimal para Mapbox)
    lat: number;      // Latitud (coordenada numérica)
    lng: number;      // Longitud (coordenada numérica)
}

export interface UsorPayload {
    nomen: string;    // Al crear o actualizar, el cliente envía el nombre
    color: string;    // El color elegido
    lat: number;      // Latitud inicial o nueva
    lng: number;      // Longitud inicial o nueva
}