export const SERVER_CONFIG = {
    port: Number(process.env.PORT) || 3200,
    idleTimeout: 30,
    path: "/socket.io/",
} as const;