import { Fabric } from "../models/Fabric";

class FabricService {
    private static instance: FabricService;

    private fabrics: Fabric[] = [
        {
            id: "0-002-16-00198",
            name: "Touareg White",
            thickness: {
                value: 0.5,
                unit: "mm"
            },
            weight: {
                value: 275,
                unit: "gsm"
            },
        },
        {
            id: "0-002-26-00198",
            name: "Carolina White",
            thickness: {
                value: 0.56,
                unit: "mm"
            },
            weight: {
                value: 196,
                unit: "gsm"
            },
        },
        {
            id: "0-002-A6-02110",
            name: "Sheerlux Adagio Ivory",
            thickness: {
                value: 0.44,
                unit: "mm"
            },
            weight: {
                value: 117,
                unit: "gsm"
            },
        },
        {
            id: "0-002-A3-01110",
            name: "Sheerlux Ayre White",
            thickness: {
                value: 0.2,
                unit: "mm"
            },
            weight: {
                value: 60,
                unit: "gsm"
            },
        },
        {
            id: "0-002-A5-01110",
            name: "Sheerlux Rhapsody White",
            thickness: {
                value: 0.16,
                unit: "mm"
            },
            weight: {
                value: 57,
                unit: "gsm"
            },
        },
        {
            id: "0-002-70-96072",
            name: "Nightfall Blackout White",
            thickness: {
                value: 0.29,
                unit: "mm"
            },
            weight: {
                value: 550,
                unit: "gsm"
            },
        }
    ]

    private constructor() {}

    static getInstance(): FabricService {
        if(!FabricService.instance){
            FabricService.instance = new FabricService();
        }
        return FabricService.instance;
    }

    addFabric(fabric: Fabric): void {
        if(this.getFabric(fabric.id) === undefined){
            //check unit of measure
            if(fabric.weight.unit === "gsm"){
                this.fabrics.push(fabric);
            }else if (fabric.weight.unit === "oz/yd2") {
                fabric.weight.value = fabric.weight.value * 33.9057474;
                fabric.weight.unit = "gsm";
                this.fabrics.push(fabric);
            } else {
                console.error("Invalid unit of measure, Fabric Weight " + fabric.weight.unit);
            }

            switch(fabric.thickness.unit){
                case "mm":
                    break;
                case "in":
                    fabric.thickness.value = fabric.thickness.value * 25.4;
                    break;
                default:
                    console.error("Invalid unit of measure, Fabric Thickness " + fabric.thickness.unit);
            }
        }
    }

    getFabrics(): Fabric[] {
        return this.fabrics;
    }

    getFabric(text: string): Fabric | undefined{
        return this.fabrics.find(fabric => fabric.id === text || fabric.name === text);
    }

}

export default FabricService;