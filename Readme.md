# MultiStep Form - Armando Assini

O presente projeto consiste no desenvolvimento de um formulário Multistep.

Todo o processo foi desenvolvido utilizando _ReactJS_.

## Começando

Para rodar o projeto é necessario clonar o repositório para seu computador e fazer as instalações mencionadas a seguir para rodá-lo em browser. Todos os browsers são suportados, porém é possível que ocorram leves diferenças de visualização dependendo do software e da versão do software utilizados.

### Instalação

Para realizar as instalações necessárias, siga o seguinte passo a passo:

Primeiramente clone o repositório para sua máquina, utilize o método de clone que preferir:

    https://git.raroacademy.com.br/armando.assini/atividade-avaliativa-8

Em seguida abra o repositório e utilize o seguinte comando para instalar as dependências do projeto:

    npm install

A partir destas instalações o projeto já estará funcional. Rodando o comando seguinte, um servidor irá abrir onde a aplicação estará rodando:

    npm run dev

No terminal será mostrado um link de onde pode ser visualizada a aplicação:

![http://localhost:5173](../public/LinkLocal.png)

Clicando no link ou copiando a url para um navegador já será possível visualizar o trabalho.

## Visão Geral do Projeto

Para a realização do projeto foi fornecido um repositório inicial com alguns estilos e a partir dele foi desenvolvido o projeto completo.

## Construção do Projeto

### Objetivo

Como mencionado o projeto foi todo realizado utilizando _ReactJS_.

O objetivo principal da prática foi habituar os alunos com a utilização de formulários multistep, assim como validação de campos e utilização de requisições de API, além da utilização de todas as funcionalidades do *React*. 

### Desenvolvimento

Após clonar o repositório fornecido pelo professor, foi realizada uma varredura dos códigos e das telas para compreender o funcionamento do programa, para que em seguida fosse possível iniciar o desenvolvimento.

Foi desenvolvido todo o formulário em um único arquivo, separando cada step utilizando um switch case e um estado para os steps. Foi utilizado também um contexto para armazenar todas as informações do formulário, visando ao final do projeto separar os steps em arquivos diferentes, porém devido ao tamanho do projeto, o tempo reduzido para realizá-lo e ainda considerando o tempo utilizado para o desenvolvimento do projeto final, concluí que não haveria tempo hábil para realizar todas as tarefas revertendo o trabalho já iniciado. 

Portanto, ao final o trabalho se manteve em um único arquivo utilizando um contexto, sei que não é a prática correta, porém foi necessário para finalizar a atividade com as requisições necessárias.


### Dificuldades Encontradas

A maior complicação encontrada foi em relação ao tempo. Foi um trabalho muito grande e trabalhoso em meio às preocupações do trabalho final, foram muitas variações de entradas, levando a muitas validações e ainda houveram complicações com o trânsito das informações entre passos. Ao final, grande parte do tempo foi utilizado para ajustar os problemas obtidos com as validações, principalmente validação dos valores das experiências dentro de objetos.

Outro problema encontrado foi a adequação de alguns valores ao formato da API, pois as informações na maioria são obtidas em string e algumas delas são enviadas em array de strings, como estive trabalhando com estados durante todo o tempo, tive dificuldades para lidar com estados de arrays.

## Conclusão

Ao final do projeto foi possível implementar todas as funções solicitadas pelo professor. Foram utilizadas as tecnologias estudadas durante as semanas e o site está funcional.

Infelizmente alguns problemas foram encontrados, mas novamente, devido ao tempo, não foi possível implementar melhoras.

## Possíveis Melhoras

- Melhorar a estilização geral;
- Separar os Steps em arquivos separados;
- Talvez eliminar a utilização do contexto;
- Melhorar a interface das experiências;

## Autor

- **Armando Assini** - *arm.assini@gmail.com*

**Contribuições** - Professores, Monitores e Colegas de classe Turma React2 - Raro Academy.
