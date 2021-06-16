import { useState } from "react";
import { useHistory } from "react-router-dom";
import "../styles/NewColor.css"

const NewColor = ({setColors}) => {
    const history = useHistory();
    const INITIAL_STATE = {name: "", value: ""}
    const [formData, setFormData] = useState(INITIAL_STATE);
    const handleChange = e => {
        const {name, value} = e.target;
        setFormData(data => {
            return {...data, [name]: value}
        });
    }
    const submitColor = e => {
        e.preventDefault();
        setColors(colors => ({...colors, [formData.name]: formData.value}));
        history.push('/colors');
    }

    return (
      <div>
          <div>
              <h1>Add new color!</h1>
          </div>
          <form onSubmit={submitColor} data-testid="new-color-form">
              <label htmlFor="name">Enter color's name</label>
                <input 
                    id="name" 
                    name="name" 
                    placeholder="Color Name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    data-testid="name-input"
                />
              <label htmlFor="value">Enter color's value</label>
                <input 
                    id="value" 
                    name="value" 
                    type="color"
                    onChange={handleChange} 
                    data-testid="value-input"/>
              <button>Add color!</button>
          </form>
      </div>  
    );
}

export default NewColor;