const TemplateExpressions = () => {
    const name = "Johnatan"
    const data = {
        idade: 36,
        profissao: "programador"
    }

    return(
     <div>
        <h1>Olá {name}, tudo bem?</h1>
        <p>Voce atua como: {data.profissao}</p>
     </div>
    )
}

export default TemplateExpressions