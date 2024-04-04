const Events = () => {

    const handleMyEvents = () =>{
        console.log("ativou")
    };

    const renderSomething = (x) => {
        if(x){
            return <h1>Renderizado</h1>
        }else{
            return <h1>Posso renderizar</h1>
        }
    }

    return(
        <div>
            <div>
                {/*comentario*/ }
                <button onClick={handleMyEvents}>Clique aqui!</button>
            </div>
            <div>
                <button onClick={() => console.log("clicou")}>clique aqui tambem</button>
            </div>
            {renderSomething(true)}
            {renderSomething(false)}
        </div>
    );
};

export default Events;