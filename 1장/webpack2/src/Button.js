import React from 'react';
import ReactDOM from 'react-dom';

function Button(props) {    
    const [label, setLabel] = React.useState(props.label);    
    return React.createElement(
        'button',
        null,
        label,
    )
}

export default Button;