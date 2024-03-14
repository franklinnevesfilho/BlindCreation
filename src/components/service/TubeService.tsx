import { Tube } from "../models/Tube";

class TubeService {
    tubes: Tube[] = [
        {
            id: "0-154-TU-32011",
            name: "32mm LGH",
            outerDiameter: 32,
            outerDiameterUnit: "mm",
            innerDiameter: 30,
            innerDiameterUnit: "mm"
        },
        {
            id: "0-154-TU-32111",
            name: "32mm STD",
            outerDiameter: 32.6,
            outerDiameterUnit: "mm",
            innerDiameter: 30,
            innerDiameterUnit: "mm"
        },
        {
            id: "0-154-TU-38001",
            name: "38mm STD",
            outerDiameter: 38.43,
            outerDiameterUnit: "mm",
            innerDiameter: 35.89,
            innerDiameterUnit: "mm"
        },
        {
            id: "0-154-TU-38511",
            name: "38mm HD",
            outerDiameter: 40.3,
            outerDiameterUnit: "mm",
            innerDiameter: 35.9,
            innerDiameterUnit: "mm"
        },
        {
            id: "0-154-TU-45211",
            name: "45mm",
            outerDiameter: 45,
            outerDiameterUnit: "mm",
            innerDiameter: 41.5,
            innerDiameterUnit: "mm"
        },
        {
            id  : "0-154-TU-50211",
            name: "50mm",
            outerDiameter: 51.25,
            outerDiameterUnit: "mm",
            innerDiameter: 47,
            innerDiameterUnit: "mm"
        },
        {
            id: "0-154-TU-63",
            name: "63mm",
            outerDiameter: 65.3,
            outerDiameterUnit: "mm",
            innerDiameter: 61.7,
            innerDiameterUnit: "mm"
        },
        {
            id: "0-154-TU-83",
            name: "83mm",
            outerDiameter: 83,
            outerDiameterUnit: "mm",
            innerDiameter: 77,
            innerDiameterUnit: "mm"
        }
    ]


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
