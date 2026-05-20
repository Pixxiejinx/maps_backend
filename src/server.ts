import { Server } from "socket.io";
import { Server as Engine } from "@socket.io/bun-engine";
import { SERVER_CONFIG } from "./config/server_config";
import type { Usor, UsorPayload } from "./types";
import { usorService } from "./services/usor.services";

const userAdPayload = (cliens: Usor) => {
    return {
        id: cliens.id,
        nomen: cliens.nomen,
        color: cliens.color,
        lat: cliens.lat,
        lng: cliens.lng
    };
}

export const CreareServer = () =>{
    const io = new  Server();

    const engine = new Engine({
        path: SERVER_CONFIG.path,
        cors: {origin: true, credentials: true},
    });

    io.bind(engine);

    io.on("connection", (socket) => {
        console.log(`Cliente conectado (socket.id): ${socket.id}`);

        setTimeout(() => {
            const usores = usorService.obtinerOmnes().map(userAdPayload);
            socket.emit("GET_CLIENTS", usores);
        }, 100);

        socket.on("CLIENT_REGISTER", (payload: UsorPayload) => {
            const usor = usorService.addere(socket.id, payload);
            const usores = usorService.obtinerOmnes().map(userAdPayload);
            
            socket.emit("GET_CLIENTS", usores);

            socket.broadcast.emit("CLIENT-JOINED", userAdPayload(usor));
        });

        socket.on("CLIENT_MOVE", (payload: { lat: number; lng: number }) => {
            const ok = usorService.actualizarePositionem(
                socket.id,
                payload.lat,
                payload.lng
            );

            if(ok){
                socket.broadcast.emit("CLIENT_MOVED",{
                    id: socket.id,
                    lat: payload.lat,
                    lng: payload.lng
                }as const);
            }
        });

        socket.on("disconnect", () => {
            usorService.delere(socket.id);
            socket.broadcast.emit("CLIENT_LEFT", {id: socket.id} as const);
        });
    });

    io.on("disconnect", (socket) => {
            console.log(`Cliente desconectado: ${socket.id}`);
        });
    const { fetch: engineFetch, websocket } = engine.handler();

    const server = Bun.serve({
        port: SERVER_CONFIG.port,
        idleTimeout: SERVER_CONFIG.idleTimeout,
        websocket,

        fetch(req: Request, server: Parameters<typeof engineFetch>[1]){
            const url = new URL(req.url);

            if(url.pathname.startsWith(SERVER_CONFIG.path as string)){
                return engineFetch(req, server);
            }

            /*return new Response(
                `<html><body><h1>Hola Mundo</h1></body></html>`,
                {
                    headers: {"Content-Type": "text/html; charset = utf-8" }
                }
            );*/
          return new Response(Bun.file("./public/index.html"),{
            headers: {"Content-Type": "text/html; charset=utf-8"}
          });
        } 
    });
      return server;
}