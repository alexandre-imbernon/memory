import React, {useState} from 'react';

function Score(props){

    const [ score , setScore ] = useState(0)

    function click(){
    
        setScore (score + 1)
}

return (

    <p onClick={click}>Mon score est de {score}</p>
)
}
export default Score;