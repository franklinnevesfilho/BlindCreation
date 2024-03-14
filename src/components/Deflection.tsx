import './Questions.css'
import {useState} from "react";
import BottomRailService from "./service/BottomRailService.tsx";
import FabricService from "./service/FabricService.tsx";
import TubeService from "./service/TubeService.tsx";
import {LengthUnit} from "./models/LengthUnit.tsx";
import BarChart from "./BarChart.tsx";

function Deflection() {
    const lengthUnitsOfMeasure = ['mm', 'cm', 'm', 'in', 'ft', 'yd']

    const bottomRailService = new BottomRailService()
    const fabricService = new FabricService();
    const tubeService = new TubeService();

    const [ fabrics ] = useState(fabricService.getFabrics());
    const [ bottomRails ] = useState(bottomRailService.getBottomRails());
    const [ tubes ] = useState(tubeService.getTubes());

    const [unit, setUnit ] = useState<string>('none');
    const [ width, setWidth ] = useState<LengthUnit>({value: 0, unit: 'm'});
    const [ drop, setDrop ] = useState<LengthUnit>({value: 0, unit: 'm'});
    const [ fabricId, setFabricId ] = useState<string>('none');


    const answerForm = () => {
        return(
            <>
                <div className="question">
                    <h3>Width</h3>
                    <div className="input-group">
                        <input
                            value={width.value}
                            onChange={e => setWidth({value: parseFloat(e.target.value), unit: width.unit})}
                            type={"number"}
                        />
                        <select
                            value={width.unit}
                            onChange={e => setWidth({value: width.value, unit: e.target.value})}
                        >
                            {
                                lengthUnitsOfMeasure.map((unit) =>
                                    <option key={unit} value={unit}>{unit}</option>
                                )
                            }
                        </select>
                    </div>
                </div>
                <div className="question">
                    <h3>Drop</h3>
                    <div className="input-group">
                        <input
                            type="number"
                            value={drop.value}
                            onChange={e => setDrop({value: parseFloat(e.target.value), unit: drop.unit})}
                        />
                        <select
                            value={drop.unit}
                            onChange={e =>  setDrop({value: drop.value, unit: e.target.value})}
                        >
                            {
                                lengthUnitsOfMeasure.map((unit) =>
                                    <option key={unit} value={unit}>{unit}</option>
                                )
                            }
                        </select>
                    </div>
                </div>
                <div className="question">
                    <h3>Fabric</h3>
                    <div className="input-group">
                        <select
                            value={fabricId}
                            onChange={e => setFabricId(e.target.value)}
                        >
                            <option value="none">Select Fabric</option>
                            {
                                fabrics.map((fabric) =>
                                    <option key={fabric.id} value={fabric.id}>{fabric.name}</option>
                                )
                            }
                        </select>
                    </div>
                </div>
                <div className="question">
                    <h3>What unit would you like</h3>
                    <div className="input-group">
                        <select
                            value={unit}
                            onChange={e => setUnit(e.target.value)}
                        >
                            <option>none</option>
                            {
                                lengthUnitsOfMeasure.map((unit) =>
                                    <option key={unit} value={unit}>{unit}</option>
                                )
                            }
                        </select>
                    </div>

                </div>
            </>
        )

    }


    return (
        <>
            <h1>Deflection</h1>

            {/*ToDo: add tube, fabric, bottomrail buttons*/}
            {/*<div className="btn-group">*/}
            {/*    <button className={'btn'}>Add Tube</button>*/}
            {/*    <button className={'btn'}>Add Fabric</button>*/}
            {/*    <button className={'btn'}>Add Bottomrail</button>*/}
            {/*</div>*/}

            {answerForm()}
            <div className="chart-section">
                {
                    bottomRails.map((bottomRail) =>
                        <div className={'chart'} key={bottomRail.id}>
                            <h2>{bottomRail.name}</h2>
                                <BarChart
                                    width={width}
                                    drop={drop}
                                    fabric={fabricService.getFabric(fabricId)}
                                    bottomRail={bottomRail}
                                    tubes={tubes}
                                    unit={unit}
                                />
                        </div>
                    )
                }
            </div>

        </>
    )
}
export default Deflection;