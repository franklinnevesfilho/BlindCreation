class ConvertUnitService {

    private static instance: ConvertUnitService;

    private constructor() {}

    public static getInstance(): ConvertUnitService {
        if (!ConvertUnitService.instance) {
            ConvertUnitService.instance = new ConvertUnitService();
        }
        return ConvertUnitService.instance;
    }

    public getPossibleUnits(): string[] {
        return ["mm", "cm", "in", "ft", "m", "yd"];
    }

    public convertUnit(value: number, from: string, to: string): number {
        switch (to) {
            case "mm":
                return this.convertToMM(value, from);
            case "cm":
                return this.convertToCM(value, from);
            case "in":
                return this.convertToIn(value, from);
            case "ft":
                return this.convertToFT(value, from);
            case "m":
                return this.convertToM(value, from);
            case "yd":
                return this.convertToYD(value, from);
            case "g/mm":
                return this.convertToGPerMM(value, from);
            case "gsm":
                return this.convertToGSM(value, from);
            default:
                console.error("Invalid unit of measure, " + to);
                return 0;
        }
    }

    private convertToM(value: number, unit: string): number {
        switch(unit){
            case "mm":
                return value * 0.001;
            case "cm":
                return value * 0.01;
            case "in":
                return value * 0.0254;
            case "ft":
                return value * 0.3048;
            case "m":
                return value;
            case "yd":
                return value * 0.9144;
            default:
                console.error("Invalid unit of measure, " + unit);
                return 0;
        }
    }

    private convertToYD(value: number, unit: string): number {
        switch(unit){
            case "mm":
                return value * 0.00109361;
            case "cm":
                return value * 0.0109361;
            case "in":
                return value * 0.0277778;
            case "ft":
                return value * 0.333333;
            case "m":
                return value * 1.09361;
            case "yd":
                return value;
            default:
                console.error("Invalid unit of measure, " + unit);
                return 0;
        }
    }

    private convertToFT(value: number, unit: string): number {
        switch(unit){
            case "mm":
                return value * 0.00328084;
            case "cm":
                return value * 0.0328084;
            case "in":
                return value / 12;
            case "ft":
                return value;
            case "m":
                return value * (1250/381);
            case "yd":
                return value * 3;
            default:
                console.error("Invalid unit of measure, " + unit);
                return 0;
        }
    }
    private convertToCM(value: number, unit: string): number {
        switch(unit){
            case "mm":
                return value / 10;
            case "cm":
                return value;
            case "in":
                return value * 2.54;
            case "ft":
                return value * 30.48;
            case "m":
                return value * 100;
            case "yd":
                return value * 91.44;
            default:
                console.error("Invalid unit of measure, " + unit);
                return 0;
        }
    }
    private convertToMM(value: number, unit: string): number {
        switch(unit){
            case "mm":
                return value;
            case "cm":
                return value * 10;
            case "in":
                return value * 25.4;
            case "ft":
                return value * 304.8;
            case "m":
                return value * 1000;
            case "yd":
                return value * 914.4;
            default:
                console.error("Invalid unit of measure, " + unit);
                return 0;
        }
    }

    private convertToIn(value: number, unit: string): number {
        switch(unit){
            case "mm":
                return value * 0.0393701;
            case "cm":
                return value / 2.54;
            case "yd":
                return value / 36;
            case "ft":
                return value / 12;
            case "in":
                return value;
            default:
                console.error("Invalid unit of measure, " + unit);
                return 0;
        }
    }

    private convertToGPerMM(weight: number, weightUnit: string): number {
        switch (weightUnit) {
            case "lb/ft":
                return weight * 0.000478802588996763;
            case "oz/yd":
                return weight * 0.03100339;
            case "kg/m":
                return weight;
            case "g/m":
                return weight/1000;
            case "g/cm":
                return weight/10;
            case "g/mm":
                return weight;
            default:
                console.error("Invalid unit of measure" + weightUnit);
                return 0;
        }
    }

    private convertToGSM(weight: number, weightUnit: string): number {
        switch(weightUnit){
            case "oz/yd2":
                return weight * 33.9057474
            case "lb/ft2":
                return weight * 4882.427
            case "gsm":
                return weight
            default:
                console.error("Invalid unit of measure, can only convert oz/yd2 to gsm");
                return 0;
        }
    }

}
export default ConvertUnitService;
