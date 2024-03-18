import React, {useEffect, useState} from 'react';
import SystemService from "./service/SystemService.tsx";
import {Fabric} from "./models/Fabric.tsx";
import {LengthUnit} from "./models/LengthUnit.tsx";
import ShadeCalculator from "./service/ShadeCalculator.tsx";
import TubeService from "./service/TubeService.tsx";
import {System} from "./models/System.tsx";
import {Tube} from "./models/Tube.tsx";
import {BottomRail} from "./models/BottomRail.tsx";

interface AvailableCombinationProps {
    fabric: Fabric ,
    width: LengthUnit;
    drop: LengthUnit;
    bottomRail?: BottomRail;
    unit: string;

}

function AvailableCombinations(props: AvailableCombinationProps) {
    const {fabric, width, drop, bottomRail,unit} = props;

    const shadeCalculator = ShadeCalculator.getInstance();
    const tubeService = TubeService.getInstance();
    const systemService = SystemService.getInstance()

    const [availableCombos, setAvailableCombos] = useState<{system:System, tubes:Tube[]}[]>([]);

    const tubes = tubeService.getTubes();
    const systems = systemService.getSystems()

    const getAvailableCombos = () =>{
        const deflections: {tube:Tube, deflection:number}[] = [];
        tubes.map((tube) => {
            const load = shadeCalculator.getLoad(width, drop, fabric, bottomRail);
            const deflection = shadeCalculator.getDeflection(width, tube, load, unit).value;
            deflections.push({
                tube: tube,
                deflection: deflection
            });
        })

        const combos = systems.map((system: System) => {
            const maxRollUp = system.maxRollDiameter;

            const availableTubes = deflections.filter((deflection) => {
                const rollUp = shadeCalculator.GetRollDiameter(deflection.tube, fabric, drop, unit);
                return rollUp.value <= maxRollUp.value && deflection.deflection <= shadeCalculator.getDeflectionLimit(unit);

            })

            return {
                system: system,
                tubes: availableTubes
            }
        })

        //filter systems with no tubes
        .filter((combo) => combo.tubes.length !== 0);

        setAvailableCombos(combos);
    }

    useEffect(() => {
        getAvailableCombos();
    }, [fabric, width, drop, bottomRail, unit])

    return (
        <div className={'available-combos'}>
            {
                availableCombos.length > 0 &&

                    availableCombos.map((combo) => {
                        return (
                            <div key={combo.system.name} className={'combo'}>
                                <h3>System: {combo.system.name}</h3>
                                <div className={'tubes'}>
                                    <h5>Available Tubes:</h5>
                                    {combo.tubes.length !== 0 ?
                                        <select name={`tubes${combo.system.name}`} id={`tubes${combo.system.name}`}>
                                            {
                                                combo.tubes.map((tube) => {
                                                    return (
                                                        <option key={tube.tube.id}
                                                                value={tube.tube.id}>{tube.tube.name}</option>

                                                    )
                                                })
                                            }
                                        </select>
                                        :
                                        <p>No Tubes Available</p>
                                    }
                                </div>
                            </div>
                        )
                    })
            }
        </div>
    );
}

export default AvailableCombinations;