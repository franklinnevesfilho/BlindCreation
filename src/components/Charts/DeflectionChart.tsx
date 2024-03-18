"use client";
import "chart.js/auto";
import {BottomRail} from "../models/BottomRail.tsx";
import {Fabric} from "../models/Fabric.tsx";
import {Tube} from "../models/Tube.tsx";
import ShadeCalculator from "../service/ShadeCalculator.tsx";
import {LengthUnit} from "../models/LengthUnit.tsx";
import LineChart from "../../utils/LineChart.tsx";

interface BarChartProps {
    width: LengthUnit;
    drop: LengthUnit;
    bottomRail: BottomRail;
    fabric?: Fabric;
    tubes: Tube[];
    unit: string;
}

function DeflectionChart(props:BarChartProps) {
    const deflectionService = new ShadeCalculator();

    const organizeBigToSmall = (labels:string[], deflections:number[]) => {
        const tubes = labels.map((label, index) => {
            return {
                label: label,
                deflection: deflections[index]
            }
        });

        tubes.sort((a, b) => {
            return b.deflection - a.deflection;
        });

        return {
            labels: tubes.map((tube) => tube.label),
            deflections: tubes.map((tube) => tube.deflection)
        }

    }

    const getChartData = (unit:string) => {

        const fabric = props.fabric;
        const tubes = props.tubes;
        const bottomRail = props.bottomRail;
        const width = props.width;
        const drop = props.drop;

        const labels: string[] = [];
        const deflections: number[] = [];

        if (fabric !== undefined) {
            tubes.forEach((tube) => {
                labels.push(tube.name);

                const load: number = deflectionService.getLoad(width, drop, fabric, bottomRail);
                const deflection = deflectionService.getDeflection(width, tube, load, unit).value;

                deflections.push(deflection);

            })

        }else {
            tubes.forEach((tube) => {
                labels.push(tube.name);
                deflections.push(0);
            })
        }
        const organizedData = organizeBigToSmall(labels, deflections);


        return {
            labels: organizedData.labels,
            datasets: [
                {
                    label: `Deflection Limit ( ${deflectionService.getDeflectionLimit(unit)} ${unit})`,
                    data: deflections.map(() => deflectionService.getDeflectionLimit(unit)),
                    fill: false,
                    borderColor: 'rgba(255, 99, 132, 1)',
                },
                {
                    label: `Deflections ( ${unit} )`,
                    data: organizedData.deflections,
                    fill: true,
                    backgroundColor: 'rgba(0, 99, 255, 0.5)',
                }]
        };

    }

    return (
        <>
           <LineChart
               data={getChartData(props.unit)} title={'Index Chart'} xLabel={'Tubes'} yLabel={props.unit}/>
        </>
    );
}

export default DeflectionChart;