import { BottomRail } from '../models/BottomRail';

class BottomRailService {
    bottomRails: BottomRail[] = [
        {
            id: "0-151-AL-ESW19",
            name: "Rollux-AL. Bottomrail Euro Slim White 19'",
            weight: 0.2822,
            weightUnit: "lb/ft"
        },
        {
            id: "0-151-AL-ALW16",
            name: "Rollux-AL. Bottomrail SLIM White 16'",
            weight: 0.2001,
            weightUnit: "lb/ft"
        },
        {
            id: "0-140-05-ALBWH",
            name: "XL Aluminum Bottom Rail White 19'",
            weight: 0.7586,
            weightUnit: "lb/ft"
        },
        {
            id: "0-160-CA-00A19",
            name: "Roman-1\" Hembar Satin Anodized 19'",
            weight: 0.1464,
            weightUnit: "lb/ft"
        }
    ]

    convertToGPerMM(weight: number, weightUnit: string): number {
        switch (weightUnit) {
            case "lb/ft":
                return weight * 0.000478802588996763;
            case "kg/m":
                return weight;case "g/m":
            default:
                console.error("Invalid unit of measure, Bottom Rail Weight " + weightUnit);
                return 0;
        }
    }

    addBottomRail(bottomRail: BottomRail): void {
        if(this.getBottomRail(bottomRail.id) === undefined){
            //check unit of measure
            if(bottomRail.weightUnit === "lb/ft"){
                this.bottomRails.push(bottomRail);
            }else if (bottomRail.weightUnit === "kg/m") {
                bottomRail.weight = bottomRail.weight * 0.67196897;
                bottomRail.weightUnit = "lb/ft";
                this.bottomRails.push(bottomRail);
            } else {
                console.error("Invalid unit of measure");
            }
        }
    }

    editBottomRail(bottomRail: BottomRail): void {
        const index = this.bottomRails.findIndex(b => b.id === bottomRail.id);
        if(index !== -1){
            this.bottomRails[index] = bottomRail;
        }else{
            console.error("Bottom Rail not found");
        }
    }

    deleteBottomRail(id: string): void {
        const index = this.bottomRails.findIndex(b => b.id === id);
        if(index !== -1){
            this.bottomRails.splice(index, 1);
        }else{
            console.error("Bottom Rail not found");
        }
    }

    getBottomRails(): BottomRail[] {
        return this.bottomRails;
    }

    getBottomRail(text: string): BottomRail | undefined{
        return this.bottomRails.find(bottomRail => bottomRail.id === text || bottomRail.name === text);
    }
}

export default BottomRailService;