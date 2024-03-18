import {Tube} from "../models/Tube.tsx";
import {Fabric} from "../models/Fabric.tsx";
import {BottomRail} from "../models/BottomRail.tsx";
import {LengthUnit} from "../models/LengthUnit.tsx";
import ConvertUnitService from "./ConvertUnitService.tsx";


class ShadeCalculator {

    private convertUnitService: ConvertUnitService;

    private deflectionLimit: LengthUnit = {value: 3.17, unit: "mm"};
    private gravity: number = 9.81;
    private elasticModulus: number = 68900;

    private constructor() {
        this.convertUnitService = ConvertUnitService.getInstance();
    }

    public static getInstance(): ShadeCalculator {
        return new ShadeCalculator();
    }

    public GetRollDiameter(tube:Tube, fabric:Fabric, drop:LengthUnit, unit:string): LengthUnit {
        let result: LengthUnit = {
            value: -1,
            unit: unit
        }

        // check unit of measure are all equal
        if(tube.outerDiameter.unit === unit &&
            fabric.thickness.unit === unit &&
            drop.unit === unit){
            result = this.calculateRollUp(drop, fabric, tube.outerDiameter, unit);
        }else{
            //convert everything to unit specified
            const outerDiameter = this.convertUnitService.convertUnit(tube.outerDiameter.value, tube.outerDiameter.unit, unit);
            const thickness = this.convertUnitService.convertUnit(fabric.thickness.value, fabric.thickness.unit, unit);
            const dropValue = this.convertUnitService.convertUnit(drop.value, drop.unit, unit);

            if(!(outerDiameter === undefined || thickness === undefined || dropValue === undefined)) {
                result = this.calculateRollUp({value:dropValue, unit:unit}, fabric, {value: outerDiameter, unit: unit});
            }
        }

        return result;
    }

    private calculateRollUp(drop:LengthUnit, fabric:Fabric, tubeOuterDiameter: LengthUnit, unit:string): LengthUnit {
        const rollup = Math.sqrt((( drop.value * fabric.thickness.value) + (Math.pow(tubeOuterDiameter.value, 2)/4)) * 4)
        return {
            value: rollup,
            unit: unit
        };
    }

    public getDeflection(width: LengthUnit, tube: Tube, load: number, unit: string): LengthUnit{

        const span = this.convertUnitService.convertUnit(width.value, width.unit, "mm");

        const outerDiameter = this.convertUnitService.convertUnit(tube.outerDiameter.value, tube.outerDiameter.unit, "mm");
        const innerDiameter = this.convertUnitService.convertUnit(tube.innerDiameter.value, tube.innerDiameter.unit, "mm");

        if(!(outerDiameter === undefined || innerDiameter === undefined || span === undefined)){

            const inertia = (Math.PI / 64) * (Math.pow(outerDiameter, 4) - Math.pow(innerDiameter, 4));
            const deflection = (5 * load * (Math.pow(span, 4))) / (384 * this.elasticModulus * inertia); // Index formula
            const newDeflection = this.convertUnitService.convertUnit(deflection, "mm", unit);
            return {value: newDeflection, unit: unit};
        }else{
            return {value: -1, unit: "mm"};
        }
    }

    public getLoad(width: LengthUnit , drop: LengthUnit, fabric: Fabric, bottomRail: BottomRail){
        const widthMM = this.convertUnitService.convertUnit(width.value, width.unit, "mm")
        const dropMM = this.convertUnitService.convertUnit(drop.value, drop.unit, "mm")

        const bottomRailWeight =
            this.convertUnitService.convertUnit(bottomRail.weight.value, bottomRail.weight.unit, "g/mm");

        let fabricWeight =
            this.convertUnitService.convertUnit(fabric.weight.value, fabric.weight.unit, "gsm");

        if(fabricWeight && widthMM && dropMM && bottomRailWeight){

            fabricWeight = fabricWeight / 1000000; // convert to g/mm2
            fabricWeight = fabricWeight / widthMM; // convert to g/mm
            return ((fabricWeight * dropMM) + bottomRailWeight) * this.gravity;

        }else{
            return -1;
        }
    }

    public getDeflectionLimit(unit: string): number{
        return this.convertUnitService.convertUnit(this.deflectionLimit.value, this.deflectionLimit.unit, unit);
    }

}

export default ShadeCalculator;