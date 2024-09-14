const { select, input, checkbox } = require('@inquirer/prompts')

const fs = require("fs").promises

let mensagem = " Seja Bem vindo ao App de metas";

let metas

const carregarMetas = async () => {
    try {
        const dados = await fs.readFile("metas.json", "utf-8")
        metas = JSON.parse(dados)
    }
    catch (erro) {
        metas = []
    }
}

const salvarMetas = async () => {
    await fs.writeFile("metas.json", JSON.stringify(metas, null, 2))
}

const cadastrarMeta = async () => {
    const meta = await input({ message: "Digite uma meta:" })

    if (meta.length == 0) {
        mensagem = "A meta não pode está vazia."
        return
    }

    metas.push(
        { value: meta, checked: false }
    )

    mensagem = "Meta cadastrada com Sucesso! :)"
}

const listarMetas = async () => {
    if(metas.length == 0){
        mensagem = "Não existe metas"
        return
    }

    const respostas = await checkbox({
        message: "Use as setas para mudar a meta, o Epaço para marcar ou desmarcar e o Enter para finalizar a meta",
        choices: [...metas],
        instructions: false,
    })

    metas.forEach((m) => {
        m.checked = false
    })

    if (respostas.length == 0) {
        mensagem = "Nenhuma meta foi selecionada"
        return
    }

    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })

        meta.checked = true
    })

    mensagem = "Meta(s) marcadas concluida(s)"

}

const metasRealizadas = async () => {
    if(metas.length == 0){
        mensagem = "Não existe metas"
        return
    }

    const realizadas = metas.filter((meta) => {
        return meta.checked
    })

    console.log(realizadas)

    if (realizadas.length == 0) {
        mensagem = "Nenhuma Meta foi realizada: :("
        return
    }

    else {
        await select({
            message: "Metas Realizadas: " + realizadas.length,
            choices: [...realizadas]
        })
    }
}

const metasAbertas = async () => {
    if(metas.length == 0){
        mensagem = "Não existe metas"
        return
    }

    const abertas = metas.filter((meta) => {
        return meta.checked != true
    })

    if (abertas.length == 0) {
        mensagem = "Não há metas abertas: :)"
        return
    }

    await select({
        message: "Metas Abertas: " + abertas.length,
        choices: [...abertas]
    })
}

const deletarMetas = async () => {
    if(metas.length == 0){
        mensagem = "Não existe metas"
        return
    }
    
    const metasDesmarcadas = metas.map((meta) => {
        return { value: meta.value, checked: false }
    })

    const itensADeletar = await checkbox({
        message: "Selecione um item para deletar",
        choices: [...metas],
        instructions: false,
    })

    if (itensADeletar.length == 0) {
        mensagem = "Nenhum intem a deletar! :)"
        return
    }

    itensADeletar.forEach((item) => {
        metas = metas.filter((meta) => {
            return meta.value != item
        })
    })

    mensagem = "Meta(s) Deletada(s) com sucesso! :)"
}

const mostrarMensagem = () => {
    console.clear();

    if (mensagem != " ") {
        console.log(mensagem)
        console.log(" ")
        mensagem
    }
}

const start = async () => {
    await carregarMetas()

    while (true) {
        mostrarMensagem()
        await salvarMetas()

        const opcao = await select({
            message: "Menu >",
            choices: [
                {
                    name: "Cadastrar meta",
                    value: "cadastrar"
                },
                {
                    name: "Listar metas",
                    value: "listar"
                },
                {
                    name: "Metas Realizadas",
                    value: "realizadas"
                },
                {
                    name: "Metas Abertas",
                    value: "abertas"
                },
                {
                    name: "Deletar Metas",
                    value: "remover"
                },
                {
                    name: "Sair",
                    value: "sair"
                }
            ]
        })

        switch (opcao) {
            case "cadastrar":
                await cadastrarMeta()
                break
            case "listar":
                await listarMetas()
                break
            case "realizadas":
                await metasRealizadas()
                break
            case "abertas":
                await metasAbertas()
                break
            case "remover":
                await deletarMetas()
                break
            case "sair":
                console.log("Até a proxima")
                return
        }
    }
}

start()