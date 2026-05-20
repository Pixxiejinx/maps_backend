import type { Usor } from "../types";

interface UsoresState{
    perId: Map<string, Usor>
}
export class UsoresStore{
    private state: UsoresState = {
        perId: new Map()
    };

    addere(socketId: string, usor: Usor){
        this.state.perId.set(socketId, usor);
    }

    actualizarePositionem(socketId: string, lat: number, lng: number): boolean{

        const usor = this.state.perId.get(socketId);
        if(!usor) return false;

        usor.lat = lat;
        usor.lng = lng;

        return true;

    }

    delere(socketId: string) : boolean{
         this.state.perId.delete(socketId);
         return true;
    }

    obtinere(socketId: string): Usor | undefined{
        return this.state.perId.get(socketId);
    }

    obtinerOmnes(): Usor[]{
        return Array.from(this.state.perId.values());
    }

    obtinereAlios(socketId: string): Usor[]{
        return this.obtinerOmnes().filter((usor) => usor.id !== socketId);
    }
}