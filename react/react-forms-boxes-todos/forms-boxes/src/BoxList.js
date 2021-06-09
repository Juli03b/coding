import {useState} from "react";
import NewBoxForm from "./NewBoxForm";
import { v4 as uuid } from "uuid";
import Box from "./Box";

const BoxList = () => {
    const [boxes, setBoxes] = useState([]);
    const submitBox = ({...formData}) => {
        setBoxes( boxes => (
            [
                ...boxes,
                formData
            ]
        ));
    }
    const deleteBox = (i) => {
        setBoxes( boxes => {
            boxes.splice(i, 1);
            return [...boxes]
        });
    }
    return (
        <>
            <NewBoxForm submitBox={submitBox} />
            {boxes.map( (box, i) => (
                <Box 
                    id={uuid()} 
                    color={box.color} 
                    height={box.height} 
                    width={box.width} 
                    deleteBox={() => deleteBox(i)}
                    dataTestId={`box${i}`}
                />))}
        </>
    )
}

export default BoxList;