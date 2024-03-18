import {System} from "../models/System.tsx";

class SystemService {
    private static instance: SystemService;

    private systems: System[] = [
        {
            name: "Axio",
            maxRollDiameter: {
                value: 150,
                unit: "mm"
            }
        },
        {
            name: "3\" Fascia",
            maxRollDiameter: {
                value: 60,
                unit: "mm"
            }
        },
        {
            name: "4\" Fascia",
            maxRollDiameter: {
                value: 87,
                unit: "mm"
            }
        }
    ]

    private constructor() {}

    public static getInstance(): SystemService {
        if (!SystemService.instance) {
            SystemService.instance = new SystemService();
        }
        return SystemService.instance;
    }

    public getSystems(): System[] {
        return this.systems;
    }

    public getSystem(name: string): System | undefined {
        return this.systems.find(system => system.name === name);
    }

    public addSystem(system: System): void {
        if(this.getSystem(system.name) === undefined){
            this.systems.push(system);
        }
    }

    public editSystem(system: System): void {
        const index = this.systems.findIndex(s => s.name === system.name);
        if(index !== -1){
            this.systems[index] = system;
        }else{
            console.error("System not found");
        }
    }

    public deleteSystem(name: string): void {
        const index = this.systems.findIndex(s => s.name === name);
        if(index !== -1){
            this.systems.splice(index, 1);
        }else{
            console.error("System not found");
        }
    }


}

export default SystemService;