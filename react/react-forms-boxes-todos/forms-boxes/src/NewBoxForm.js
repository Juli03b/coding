import { useState } from "react";
import "./NewBoxForm.css"

const NewBoxForm = ({submitBox}) => {
    const INITIAL_STATE = {color: "", height: "", width: ""};
    const [formData, setFormData] = useState(INITIAL_STATE);
    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setFormData( formData => ({
            ...formData,
            [name]: value
        }));
    }
    const handleSubmit = (evt) => {
        evt.preventDefault();
        submitBox(formData);
        setFormData(INITIAL_STATE);
    }
    
    return (
        <form onSubmit={handleSubmit} data-testid="form">
            <label htmlFor="color">Color</label>
                <input id="color" value={formData.color} onChange={handleChange} name="color" data-testid="color" placeholder="Color"/>
            <label htmlFor="height">Height</label>
                <input id="height" value={formData.height} onChange={handleChange} name="height" data-testid="height" placeholder="80" />
            <label htmlFor="width">Width</label>
                <input id="width" value={formData.width} onChange={handleChange} name="width" data-testid="width" placeholder="20" />
            <button>Create!</button>
        </form>
    );
}

export default NewBoxForm;