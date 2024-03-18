import React, {useState} from 'react';
import TubeService from "../service/TubeService.tsx";
import './Form.css';
import {Tube} from "../models/Tube.tsx";

interface AddTubeProps {
    tubeService: TubeService;
    onClose: () => void;
}

function AddTube(AddTubeProps: AddTubeProps) {
    const onClose = AddTubeProps.onClose;
    const tubeService = AddTubeProps.tubeService;
    const tubes = tubeService.getTubes();

    const [newTube, setNewTube] = useState<Tube>({
        id: '',
        name: '',
        innerDiameter: {
          value: 0,
            unit: 'none'
        },
        outerDiameter:{
            value: 0,
            unit: 'none'
        },
    });


    const unitsOfMeasure = ['mm', 'cm', 'm', 'in', 'ft', 'yd'];

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Check if tube units is not none
        if(newTube.innerDiameter.unit === 'none' || newTube.outerDiameter.unit === 'none') {
            alert('Please select a unit for the tube');
            return;
        }

        // inner diameter must be smaller than outer
        if(newTube.innerDiameter.value >= newTube.outerDiameter.value){
            alert('Invalid Tube Diameters Inner diameter must be smaller than outer diameter');
            return;
        }

        const tubeExists = tubes.find((tube) => tube.id === newTube.id || tube.name === newTube.name);
        if(!tubeExists){
            tubeService.addTube(newTube);
            onClose();
            // alert('Tube added successfully');
        }else{
            alert('Tube with this ID or name already exists');
        }


    }

    return (
        <>
            <h3>Add Tube</h3>
            <form className={'form'} onSubmit={handleFormSubmit}>
                <div className="input-group border-top">
                    <label htmlFor="id">ID</label>
                    <input className={'input'} type="text" name="id" required onChange={(e)=>{
                        setNewTube({...newTube, id: e.target.value})
                    }}/>
                </div>
                <div className="input-group">
                    <label htmlFor="name">Name</label>
                    <input className={'input'} type="text" name="name" required onChange={(e)=>{
                        setNewTube({...newTube, name: e.target.value})
                    }}/>
                </div>
                <div className="input-group">
                    <label htmlFor="Inner Diameter">Inner Diameter</label>
                    <div className="input">
                        <input type="number" value={newTube.innerDiameter.value} onChange={(e)=>{
                            setNewTube({
                                ...newTube,
                                innerDiameter:{
                                    value: parseFloat(e.target.value),
                                    unit: newTube.innerDiameter.unit
                                }
                            })

                        }}/>
                        <select value={newTube.innerDiameter.unit} onChange={(e)=> setNewTube({
                            ...newTube,
                            innerDiameter:{
                                value: newTube.innerDiameter.value,
                                unit: e.target.value
                            }
                        })}>
                            <option value={'none'}>none</option>
                            {
                                unitsOfMeasure.map((unit) =>
                                    <option key={unit} value={unit}>{unit}</option>
                                )
                            }
                        </select>
                    </div>
                </div>
                <div className="input-group">
                    <label htmlFor="outerDiameter">OuterDiameter</label>
                    <div className="input">
                        <input value={newTube.outerDiameter.value} type="number" name="outerDiameter" required onChange={(e)=>{
                            setNewTube({
                                ...newTube,
                                outerDiameter:{
                                    value: parseFloat(e.target.value),
                                    unit: newTube.outerDiameter.unit
                                }
                            })
                        }}/>
                        <select value={newTube.outerDiameter.unit} name="outerDiameterUnit" id="outerDiameterUnit" onChange={(e)=>{
                            setNewTube({
                                ...newTube,
                                outerDiameter:{
                                    value: newTube.outerDiameter.value,
                                    unit: e.target.value
                                }
                            })

                        }}>
                            <option value={'none'}>none</option>
                            {
                                unitsOfMeasure.map((unit) =>
                                    <option key={unit} value={unit}>{unit}</option>
                                )
                            }
                        </select>
                    </div>
                </div>
                <button className={'smt-btn'} type="submit">Add</button>
            </form>
        </>
    );
}

export default AddTube;