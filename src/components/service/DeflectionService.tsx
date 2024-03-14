import {Tube} from "../models/Tube.tsx";
import {Fabric} from "../models/Fabric.tsx";
import {BottomRail} from "../models/BottomRail.tsx";
import {LengthUnit} from "../models/LengthUnit.tsx";
import ConvertUnitService from "./ConvertUnitService.tsx";


class DeflectionService{

    private convertUnitService: ConvertUnitService;

    private deflectionLimit: LengthUnit = {value: 3.17, unit: "mm"};
    private gravity: number = 9.81;
    private elasticModulus: number = 68900;

    constructor() {
        this.convertUnitService = new ConvertUnitService();
    }

    getDeflection(width: LengthUnit, tube: Tube, load: number, unit: string): LengthUnit{

        const span = this.convertUnitService.convertUnit(width.value, width.unit, "mm");

        const outerDiameter = this.convertUnitService.convertUnit(tube.outerDiameter, tube.outerDiameterUnit, "mm");
        const innerDiameter = this.convertUnitService.convertUnit(tube.innerDiameter, tube.innerDiameterUnit, "mm");

        if(!(outerDiameter === undefined || innerDiameter === undefined || span === undefined)){

            const inertia = (Math.PI / 64) * (Math.pow(outerDiameter, 4) - Math.pow(innerDiameter, 4));
            const deflection = (5 * load * (Math.pow(span, 4))) / (384 * this.elasticModulus * inertia); // Deflection formula
            const newDeflection = this.convertUnitService.convertUnit(deflection, "mm", unit);
            return {value: newDeflection, unit: unit};
        }else{
            return {value: -1, unit: "mm"};
        }
    }

    getLoad(width: LengthUnit , drop: LengthUnit, fabric: Fabric, bottomRail: BottomRail){
        const widthMM = this.convertUnitService.convertUnit(width.value, width.unit, "mm")
        const dropMM = this.convertUnitService.convertUnit(drop.value, drop.unit, "mm")

        const bottomRailWeight =
            this.convertUnitService.convertUnit(bottomRail.weight, bottomRail.weightUnit, "g/mm");

        let fabricWeight =
            this.convertUnitService.convertUnit(fabric.weight, fabric.weightUnit, "gsm");

        if(fabricWeight && widthMM && dropMM && bottomRailWeight){

            fabricWeight = fabricWeight / 1000000; // convert to g/mm2
            fabricWeight = fabricWeight / widthMM; // convert to g/mm
            return ((fabricWeight * dropMM) + bottomRailWeight) * this.gravity;

        }else{
            return -1;
        }
    }

    getDeflectionLimit(unit: string): number{
        return this.convertUnitService.convertUnit(this.deflectionLimit.value, this.deflectionLimit.unit, unit);
    }

}

export default DeflectionService;