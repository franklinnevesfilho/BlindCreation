import { Fabric } from "../models/Fabric";

class FabricService {
    fabrics: Fabric[] = [
        {
            id: "0-002-16-00198",
            name: "Touareg White",
            thickness: 0.5,
            thicknessUnit: "mm",
            weight: 275,
            weightUnit: "gsm"
        },
        {
            id: "0-002-26-00198",
            name: "Carolina White",
            thickness: 0.56,
            thicknessUnit: "mm",
            weight: 196,
            weightUnit: "gsm"
        },
        {
            id: "0-002-A6-02110",
            name: "Sheerlux Adagio Ivory",
            thickness: 0.44,
            thicknessUnit: "mm",
            weight: 117,
            weightUnit: "gsm"
        },
        {
            id: "0-002-A3-01110",
            name: "Sheerlux Ayre White",
            thickness: 0.2,
            thicknessUnit: "mm",
            weight: 60,
            weightUnit: "gsm"
        },
        {
            id: "0-002-A5-01110",
            name: "Sheerlux Rhapsody White",
            thickness: 0.16,
            thicknessUnit: "mm",
            weight: 57,
            weightUnit: "gsm"
        },
        {
            id: "0-002-70-96072",
            name: "Nightfall Blackout White",
            thickness: 0.29,
            thicknessUnit: "mm",
            weight: 550,
            weightUnit: "gsm"
        }
    ]

    addFabric(fabric: Fabric): void {
        if(this.getFabric(fabric.id) === undefined){
            //check unit of measure
            if(fabric.weightUnit === "gsm"){
                this.fabrics.push(fabric);
            }else if (fabric.weightUnit === "oz/yd2") {
                fabric.weight = fabric.weight * 33.9057474;
                fabric.weightUnit = "gsm";
                this.fabrics.push(fabric);
            } else {
                console.error("Invalid unit of measure, Fabric Weight " + fabric.weightUnit);
            }

            switch(fabric.thicknessUnit){
                case "mm":
                    break;
                case "in":
                    fabric.thickness = fabric.thickness * 25.4;
                    break;
                default:
                    console.error("Invalid unit of measure, Fabric Thickness " + fabric.thicknessUnit);
            }
        }
    }

    convertToGSM(weight: number, weightUnit: string): number {
        if(weightUnit === "oz/yd2"){
            return weight * 33.9057474
        }else if (weightUnit === "gsm") {
            return weight
        } else {
            console.error("Invalid unit of measure, can only convert oz/yd2 to gsm");
            return 0;
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