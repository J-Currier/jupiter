import React, { PureComponent } from 'react'
import './reflection.css'
// import reflectY from '../../images/'

function ListItem(props){
    return(
        <option>{props.content}</option>
    )
}

function Reflection(props) {

    const selector = () => {
        const array = [];
        for(let i = -9; i < 10; i++) {
        array.push(<option key ={i}>{i}</option>)
        }
        return array
    }

    return(

        <div className='tab'>
            <h1>Reflection</h1>
            <select id="reflectDrop">
                {selector()}
            </select>
        </div>
    )
    
}

export default Reflection