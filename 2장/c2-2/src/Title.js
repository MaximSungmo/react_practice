import React from 'react';

function Title({title}) {
    console.log(title);
    return <p>{title}</p>;
}

export default React.memo(Title);