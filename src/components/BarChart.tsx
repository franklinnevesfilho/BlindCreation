"use client";
import "chart.js/auto";
import './Barchart.css';
import {BottomRail} from "./models/BottomRail.tsx";
import {Fabric} from "./models/Fabric.tsx";
import {Tube} from "./models/Tube.tsx";
import DeflectionService from "./service/DeflectionService.tsx";
import {LengthUnit} from "./models/LengthUnit.tsx";
import { Line } from "react-chartjs-2";

interface BarChartProps {
    width: LengthUnit;
    drop: LengthUnit;
    bottomRail: BottomRail;
    fabric?: Fabric;
    tubes: Tube[];
    unit: string;
}

function BarChart(props:BarChartProps) {
    const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    // prefersDarkMode will be true if the user prefers dark mode, false otherwise
    const deflectionService = new DeflectionService();

    const getGridColor = () => {
        return prefersDarkMode? 'rgba(255,255,255,0.3)': 'rgba(0,0,0,0.3)';
    }

    const getTextColor = () => {
        return prefersDarkMode? 'rgba(255,255,255,1)': 'rgba(0,0,0,1)';
    }

    const chartOptions = {
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: getGridColor() // You can replace this with a CSS variable

                },
                ticks: {
                    stepSize: 0.01,
                    color: getTextColor() // You can replace this with a CSS variable
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Tubes',
                    color: getTextColor() // You can replace this with a CSS variable

                },
                grid: {
                    color: getGridColor() // You can replace this with a CSS variable
                },
                ticks: {
                    color: getTextColor() // You can replace this with a CSS variable
                },
            },
        }
    };


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
                deflections.push(
                    deflectionService.getDeflection(width, tube, load, unit).value
                );
            })
        }else {
            tubes.forEach((tube) => {
                labels.push(tube.name);
                deflections.push(0);
            })
        }

        return {
            labels: labels,
            datasets: [
                {
                    label: `Deflection Limit ( ${deflectionService.getDeflectionLimit(unit)} ${unit})`,
                    data: deflections.map(() => deflectionService.getDeflectionLimit(unit)),
                    fill: false,
                    borderColor: 'rgba(255, 99, 132, 1)',
                },
                {
                    label: `Deflections ( ${unit} )`,
                    data: deflections,
                    fill: true,
                    backgroundColor: 'rgba(0, 99, 255, 0.5)',
                }]
        };

    }

    return (
        <div className={'chart-container'}>
            <Line
                data={getChartData(props.unit)}
                options={chartOptions}/>
        </div>
    );
}

export default BarChart;