# app-de-metas-nwl17
 Controla Metas via Terminal

## Aplicação de Gerenciamento de Metas
## Descrição:

Esta aplicação Node.js, construída com o framework Inquirer.js, é um gerenciador de metas simples e intuitivo. Ela permite que você:

**Cadastre novas metas:** Adicione metas a serem alcançadas.
**Liste metas:** Visualize todas as metas cadastradas.
**Marque metas como concluídas:** Indique quais metas já foram alcançadas.
**Visualize metas realizadas e abertas:** Obtenha um resumo do seu progresso.
**Delete metas:** Remova metas que não são mais relevantes.
Os dados das metas são persistidos em um arquivo JSON para que você possa acessá-los a qualquer momento.

## Como funciona?
Inicialização: Ao iniciar a aplicação, ela carrega as metas existentes do arquivo metas.json.
Menu interativo: Um menu é apresentado ao usuário, oferecendo as opções de cadastrar, listar, marcar como concluídas, visualizar e deletar metas.
Interação com o usuário: O usuário interage com a aplicação através do terminal, escolhendo as opções desejadas e fornecendo as informações necessárias.
Persistência de dados: As alterações realizadas nas metas são salvas automaticamente no arquivo metas.json.

## Tecnologias utilizadas:

- Node.js: Plataforma de execução JavaScript fora do navegador.

- Inquirer.js: Framework para criar interfaces de linha de comando interativas.

- fs: Módulo do Node.js para interagir com o sistema de arquivos.


**Como usar:**

## Pré-requisitos:

- Node.js e npm (ou yarn) instalados.

- Clonagem do repositório:
