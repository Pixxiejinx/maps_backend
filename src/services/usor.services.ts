import { UsoresStore } from "../store/usores.store";
import type { Usor, UsorPayload } from "../types";

class UsorService{
  private readonly usoresStore = new UsoresStore();

  addere(socketId: string, payload: UsorPayload): Usor{

    const usor: Usor = {
        id: socketId,
        nomen: payload.nomen,
        color: payload.color,
        lat: payload.lat,
        lng: payload.lng
    }

    this.usoresStore.addere(socketId, usor);

    return usor;
  }

  actualizarePositionem(socketId: string, lat: number, lng: number): boolean{
    return this.usoresStore.actualizarePositionem(socketId, lat, lng);
  }
  
  delere(socketId: string): boolean{
   return this.usoresStore.delere(socketId);
  }

  obtinere(socketId: string): Usor | undefined{
    return this.usoresStore.obtinere(socketId);
  }
  
  obtinerOmnes(): Usor[]{
    return this.usoresStore.obtinerOmnes();
  }

  obtinereAlios(socketId: string): Usor[]{
    return this.usoresStore.obtinereAlios(socketId);
  }
}
export const usorService = new UsorService();