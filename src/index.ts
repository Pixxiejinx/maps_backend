import { CreareServer } from "./server";

const configServer = CreareServer();

console.log(`Servidor iniciado en el Puerto ${configServer.port}`)