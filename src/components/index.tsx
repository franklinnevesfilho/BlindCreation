import './Main.css'
import {useState} from "react";
import BottomRailService from "./service/BottomRailService.tsx";
import FabricService from "./service/FabricService.tsx";
import TubeService from "./service/TubeService.tsx";
import {LengthUnit} from "./models/LengthUnit.tsx";
import DeflectionChart from "./Charts/DeflectionChart.tsx";
import Modal from "../utils/Modal.tsx";
import Questions from "./Questions.tsx";
import ActionButtons from "./ActionButtons.tsx";
import AvailableCombinations from "./AvailableCombinations.tsx";

const bottomRailService = BottomRailService.getInstance()
const fabricService = FabricService.getInstance()
const tubeService = TubeService.getInstance()

interface displayModal {
    display: boolean;
    content: JSX.Element;
}

function Index() {
    const [ allTubes ] = useState(tubeService.getTubes());

    const [unit, setUnit ] = useState<string>('none');
    const [ width, setWidth ] = useState<LengthUnit>({value: 0, unit: 'm'});
    const [ drop, setDrop ] = useState<LengthUnit>({value: 0, unit: 'm'});
    const [ fabricId, setFabricId ] = useState<string>('none');
    const [bottomRailId, setBottomRailId] = useState<string>('none');

    const [displayModal, setDisplayModal] = useState<displayModal>({display: false, content: <></>});

    const closeModal = () => {
        setDisplayModal({display:false, content:<></>});
    }


    const hasValidAnswers = () => {
        return width.value > 0 && drop.value > 0 && fabricId !== 'none' && bottomRailId !== 'none' && unit !== 'none';
    }


    return (
        <div className={'index'}>
            <ActionButtons
                setDisplayModal={setDisplayModal}
                tubeService={tubeService}
                closeModal={closeModal}/>

            <Questions
                width={width} drop={drop}
                bottomRailId={bottomRailId}
                fabricId={fabricId} unit={unit}

                setValues={(width,drop,fabricId, bottomRailId,uom)=>{
                setWidth(width);
                setDrop(drop);
                setFabricId(fabricId);
                setBottomRailId(bottomRailId);
                setUnit(uom);
            }}/>
            {
                hasValidAnswers()&&
                    <>
                        <h2>Deflection Chart</h2>
                        <div className="chart-section">
                            <div className={'chart'}>
                                <DeflectionChart
                                    width={width}
                                    drop={drop}
                                    fabric={fabricService.getFabric(fabricId)}
                                    bottomRail={bottomRailService.getBottomRail(bottomRailId)}
                                    tubes={allTubes}
                                    unit={unit}/>
                            </div>
                        </div>
                        <h2>Available Combinations</h2>
                        <AvailableCombinations
                            fabric={fabricService.getFabric(fabricId)}
                            width={width}
                            drop={drop}
                            bottomRail={bottomRailService.getBottomRail(bottomRailId)}
                            unit={unit}/>
                    </>
            }

            {
                displayModal.display &&
                <Modal closeModal={closeModal}>
                    {displayModal.content}
                </Modal>
            }
        </div>
    )
}

export default Index;