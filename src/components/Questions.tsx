import ConvertUnitService from "./service/ConvertUnitService.tsx";
import FabricService from "./service/FabricService.tsx";
import BottomRailService from "./service/BottomRailService.tsx";
import { useState } from "react";
import {LengthUnit} from "./models/LengthUnit.tsx";

interface QuestionsProps {
    setValues: (width, drop, fabricId, bottomRailId, unit) => void;
    width: LengthUnit;
    drop: LengthUnit;
    fabricId: string;
    bottomRailId: string;
    unit: string;
}

function Questions(props: QuestionsProps) {
    const fabricService = FabricService.getInstance();
    const bottomRailService = BottomRailService.getInstance();
    const fabrics = fabricService.getFabrics();

    const bottomRails = bottomRailService.getBottomRails();

    const {setValues, width, drop, fabricId, bottomRailId, unit} = props;
    const [currDrop, setCurrDrop] = useState<LengthUnit>(drop)
    const [currWidth, setCurrWidth] = useState<LengthUnit>(width)
    const [currUnit, setCurrUnit] = useState<string>(unit)


    const allUOM = ConvertUnitService.getInstance().getPossibleUnits();

    const setWidth = (newWidth:LengthUnit) => {
        setCurrWidth(newWidth)
        setValues(newWidth, drop, fabricId, bottomRailId, unit)
    }
    const setDrop = (newDrop:LengthUnit) => {
        setCurrDrop(newDrop)
        setValues(width, newDrop, fabricId, bottomRailId, unit)
    }
    const setUnit = (newUnit) => {
        setCurrUnit(newUnit)
        setValues(width, drop, fabricId, bottomRailId, newUnit)
    }

    const setFabricId = (newFabricId) => {
        setValues(width, drop, newFabricId, bottomRailId, unit)
    }

    const setBottomRailId = (newBottomRailId) => {
        setValues(width, drop, fabricId, newBottomRailId, unit)
    }


    const orderedFabrics = fabrics.sort((a, b) => {
        return a.name.localeCompare(b.name);
    })


    return (
        <div >
            <h2>Questions</h2>
            <div className={'question'}>
                <h3>Width</h3>
                <div className="input-group">
                    <input
                        value={currWidth.value}
                        onChange={e => setWidth({value: parseFloat(e.target.value), unit: width.unit})}
                        type={"number"}
                    />
                    <select
                        value={currWidth.unit}
                        onChange={e => setWidth({value: width.value, unit: e.target.value})}
                    >
                        {
                            allUOM.map((unit) =>
                                <option key={unit} value={unit}>{unit}</option>
                            )
                        }
                    </select>
                </div>
            </div>
            <div className={'question'}>
                <h3>Drop</h3>
                <div className="input-group">
                    <input
                        type="number"
                        value={currDrop.value}
                        onChange={e => {
                            setDrop({value: parseFloat(e.target.value), unit: drop.unit})
                        }}
                    />
                    <select
                        value={currDrop.unit}
                        onChange={e => setDrop({value: drop.value, unit: e.target.value})}
                    >
                        {
                            allUOM.map((unit) =>
                                <option key={unit} value={unit}>{unit}</option>
                            )
                        }
                    </select>
                </div>
            </div>
            <div className={'question'}>
                <h3>Fabric</h3>
                <div className="input-group">
                    <select
                        value={fabricService.getFabric(fabricId)?.id}
                        onChange={e => {
                            setFabricId(e.target.value)
                        }}
                    >
                        <option value="none">Select Fabric</option>
                        {
                            orderedFabrics.map((fabric) =>
                                <option key={fabric.id} value={fabric.id}>{fabric.name}</option>
                            )
                        }
                    </select>
                </div>
            </div>
            <div className={'question'}>
                <h3>Bottom Rail</h3>
                <div className="input-group">
                    <select
                        value={bottomRailService.getBottomRail(bottomRailId)?.id}
                        onChange={e => {
                            setBottomRailId(e.target.value)
                        }}
                    >
                        <option value="none">Select Bottom Rail</option>
                        {
                            bottomRails.map((bottomRail) =>
                                <option key={bottomRail.id} value={bottomRail.id}>{bottomRail.name}</option>
                            )
                        }
                    </select>
                </div>
            </div>
            <div className={'question'}>
                <h3>What unit would you like</h3>
                <div className="input-group">
                    <select
                        value={currUnit}
                        onChange={e => {
                            setUnit(e.target.value)
                        }}
                    >
                        <option>none</option>
                        {
                            allUOM.map((unit) =>
                                <option key={unit} value={unit}>{unit}</option>
                            )
                        }
                    </select>
                </div>

            </div>
        </div >
    );
}

export default Questions;