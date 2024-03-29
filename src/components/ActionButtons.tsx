import {Dispatch, SetStateAction} from 'react';
import AddTube from "./forms/AddTube.tsx";
import TubeService from "./service/TubeService.tsx";

interface ActionButtonsProps {
    setDisplayModal: Dispatch<SetStateAction<{ display: boolean; content: JSX.Element; }>>;
    tubeService: TubeService;
    closeModal: () => void;

}

function ActionButtons({setDisplayModal, tubeService, closeModal}: ActionButtonsProps) {
    return (
        <div className="btn-group">
            <button className={'btn'} onClick={() => setDisplayModal(
                {
                    display: true,
                    content: <AddTube tubeService={tubeService} onClose={closeModal}/>
                })}
            >Add Tube
            </button>
            {/*<button className={'btn'} onClick={() => setDisplayModal(*/}
            {/*    {*/}
            {/*        display: true,*/}
            {/*        content: <></>*/}
            {/*    })}*/}
            {/*>Add Fabric*/}
            {/*</button>*/}
            {/*<button className={'btn'} onClick={() => setDisplayModal(*/}
            {/*    {*/}
            {/*        display: true,*/}
            {/*        content: <></>*/}
            {/*    })}*/}
            {/*>Add Bottomrail*/}
            {/*</button>*/}
        </div>
    );
}

export default ActionButtons;