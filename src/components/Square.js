import React from "react";
import "../App.css";

//Main function definition, pass in value, and ()
function Square({value, chooseSquare})
{
    //Return function, returns X or O
    return(
        //onClick, invoke the chooseSquare()
        <div className={"square"} onClick={chooseSquare} >
            {value}

        </div>
    )
}

//Export function
export default Square;

