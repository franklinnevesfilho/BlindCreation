import { BottomRail } from '../models/BottomRail';

class BottomRailService {
    private static instance: BottomRailService;

    private bottomRails: BottomRail[] = [
        {
            id: "0-151-AL-ESW19",
            name: "Rollux-AL. Bottomrail Euro Slim White 19'",
            weight:{
                value: 0.2822,
                unit: "lb/ft"
            }
        },
        {
            id: "0-151-AL-ALW16",
            name: "Rollux-AL. Bottomrail SLIM White 16'",
            weight:{
                value: 0.2001,
                unit: "lb/ft"
            }
        },
        {
            id: "0-140-05-ALBWH",
            name: "XL Aluminum Bottom Rail White 19'",
            weight:{
                value: 0.7586,
                unit: "lb/ft"
            }
        },
        {
            id: "0-160-CA-00A19",
            name: "Roman-1\" Hembar Satin Anodized 19'",
            weight:{
                value: 0.1464,
                unit: "lb/ft"
            }
        }
    ]

    addBottomRail(bottomRail: BottomRail): void {
        if(this.getBottomRail(bottomRail.id) === undefined){
            //check unit of measure
            if(bottomRail.weight.unit === "lb/ft"){
                this.bottomRails.push(bottomRail);
            }else if (bottomRail.weight.unit === "kg/m") {
                bottomRail.weight.value = bottomRail.weight.value * 0.67196897;
                bottomRail.weight.unit = "lb/ft";
                this.bottomRails.push(bottomRail);
            } else {
                console.error("Invalid unit of measure");
            }
        }
    }

    private constructor() {}

    public static getInstance(): BottomRailService {
        if (!BottomRailService.instance) {
            BottomRailService.instance = new BottomRailService();
        }
        return BottomRailService.instance;
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