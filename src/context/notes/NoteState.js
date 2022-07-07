import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) =>{
    const s1 = {
        "name":"Maaz",
        "class" : "15"
    };
    const [state,setState] = useState(s1);

    const update = () =>{
        setTimeout(() => {
            setState({
                "name" : "Saad",
                "class":"11"
            })
        }, 2000);
    }
    return(
        <noteContext.Provider value={{state,update}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;