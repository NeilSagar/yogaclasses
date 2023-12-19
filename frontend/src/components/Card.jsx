import React from "react";

function Card(props){
    return (
        <div className="card-type-1">
            <div className="card-heading">{props.heading}</div>
            <div className="card-content">
                {props.value}<span>{props.units}</span>
            </div>
            <div className="footer">{props.additional}</div>
        </div>
    );
}

export default Card;