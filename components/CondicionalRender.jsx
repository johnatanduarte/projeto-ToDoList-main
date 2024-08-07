import React from "react";

const CondicionalRender = () => {
    const x = true;
    const name = "Johnatan";

    return (
        <div>
            <h3>Isso será exibido?</h3>
            {x && <p>Se x for true sim!</p>}
            <h3>Render ternário</h3>
            {name == "João" ? (
                <div>
                    <p>O nome é João</p>
                </div>
            ) : (
                <div>
                    <p>Nome não encontrado!</p>
                </div>
            )}
        </div>
    );
};

export default CondicionalRender;