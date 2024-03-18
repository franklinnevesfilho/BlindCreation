import { Tube } from "../models/Tube";

class TubeService {
    private static instance: TubeService;

    tubes: Tube[] = [
        {
            id: "0-154-TU-32011",
            name: "32mm LGH",
            outerDiameter: {
                value:32,
                unit: "mm"
            },
            innerDiameter: {
                value:30,
                unit: "mm"
            },
        },
        {
            id: "0-154-TU-32111",
            name: "32mm STD",
            outerDiameter: {
                value:32.6,
                unit: "mm"
            },
            innerDiameter: {
                value: 30,
                unit: "mm"
            }
        },
        {
            id: "0-154-TU-38001",
            name: "38mm STD",
            outerDiameter: {
                value:38.43,
                unit: "mm"
            },
            innerDiameter: {
                value:35.89,
                unit: "mm"
            },
        },
        {
            id: "0-154-TU-38511",
            name: "38mm HD",
            outerDiameter: {
                value:40.3,
                unit: "mm"
            },
            innerDiameter: {
                value: 35.9,
                unit: "mm"
            },
        },
        {
            id: "0-154-TU-45211",
            name: "45mm",
            outerDiameter: {
                value:45,
                unit: "mm"
            },
            innerDiameter: {
                value:41.5,
                unit: "mm"
            },
        },
        {
            id  : "0-154-TU-50211",
            name: "50mm",
            outerDiameter: {
                value:51.25,
                unit: "mm"
            },
            innerDiameter: {
                value:47,
                unit: "mm"
            },
        },
        {
            id: "0-154-TU-63",
            name: "63mm",
            outerDiameter: {
                value:65.3,
                unit: "mm"
            },
            innerDiameter: {
                value:61.7,
                unit: "mm"
            },
        },
        {
            id: "0-154-TU-83",
            name: "83mm",
            outerDiameter: {
                value:83,
                unit: "mm"
            },
            innerDiameter: {
                value:77,
                unit: "mm"
            },
        }
    ]

    private constructor() {}

    public static getInstance(): TubeService {
        if (!TubeService.instance) {
            TubeService.instance = new TubeService();
        }
        return TubeService.instance;
    }



    addTube(tube: Tube): void {
        if(this.getTube(tube.id) === undefined){
            this.tubes.push(tube);
        }
    }

    editTube(tube: Tube): void {
        const index = this.tubes.findIndex(t => t.id === tube.id);
        if(index !== -1){
            this.tubes[index] = tube;
        }else{
            console.error("Tube not found");
        }
    }

    deleteTube(id: string): void {
        const index = this.tubes.findIndex(t => t.id === id);
        if(index !== -1){
            this.tubes.splice(index, 1);
        }else{
            console.error("Tube not found");
        }
    }

    getTubes(): Tube[] {
        return this.tubes;
    }

    getTube(text: string): Tube | undefined{
        return this.tubes.find(tube => tube.id === text || tube.name === text);
    }

}

export default TubeService;
