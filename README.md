# TO-DO App

Um simples aplicativo de lista de tarefas feito em React <3

## Introdução

Este projeto foi realizado como um teste técnico para a seleção de vaga front-end na empresa [Guava](https://guava.software/).
Todo o processo de desenvolvimento demorou certa de sete dias, com início oficial no dia 06/07/2021 e finalização no dia 13/07/2021.

A aplicação consiste em uma lista de tarefas, sendo necessária a implementação de uma interface front-end e de um serviço back-end associado.
Mais informações sobre os requisitos do projeto podem ser encontradas [neste link](https://www.notion.so/Sele-o-Front-End-2021-3Q-d4db012e1a74459eadf2345d6106e660).

## Funcionalidades

A lista das principais features da aplicação está descrita abaixo:

* Tela com lista de tarefas, onde o usuário pode adicionar, editar, apagar, reordenar e mudar o status de uma ou mais tarefas;
* Autenticação por navegador, que permite que um usuário tenha sua própria lista de tarefas associada ao seu browser;
* Responsividade e layout flexivo;
* Configurações de PWA, com possibilidade de instalação em smartphones tal qual um aplicativo nativo.

## Ambiente de desenvolvimento

As ferramentas utilizadas para o desenvolvimento da aplicação são listadas abaixo:

* [VSCode](https://code.visualstudio.com/) como IDE;
* [ESLint](https://eslint.org/) como linter de código;
* [Prettier](https://prettier.io/) para uma melhor identação de código.

## Setup

Para o front-end, foi escolhida a biblioteca [React](https://pt-br.reactjs.org/) como base principal, sendo utilizados também outros frameworks para o desenvolvimento das soluções, os quais são listados abaixo:

* [Redux](https://redux.js.org/) para gerenciamento de estados da aplicação segundo a arquitetura Flux;
* [Sass](https://sass-lang.com/) para um melhor uso das folhas de estilo;
* [React Beatiful DnD](https://github.com/atlassian/react-beautiful-dnd) para a funcionalidade de Drag and Drop;
* [React Alert Confirm](https://www.npmjs.com/package/react-alert-confirm) para a funcionalidade de alerta;
* [React Loading](https://www.npmjs.com/package/react-loadingm) para a funcionalidade de carregamento de página;
* [Workbox](https://developers.google.com/web/tools/workbox) para geração adequada dos service workers para a funcionalidade de PWA.

Alguns pacotes auxiliares também foram utilizados para conexão do Redux com o Firebase. Mais informações sobre os pacotes podem ser encontradas no arquivo `package.json`.

Para o back-end, foi escolhido o framework [Firebase](https://firebase.google.com/), utilizando especialmente o Firestore para armazenamento e atualização em tempo real dos dados. Para solicitar acesso ao console do projeto, favor, entrar em contato comigo através do e-mail: "joaovitoroliveira132@gmail.com".

## Rodando o projeto localmente

Antes de tudo, tenha certeza que o [Node](https://nodejs.org/en/) e o [NPM](https://www.npmjs.com/) estejam instalados em sua máquina.

Para rodar o projeto em seu ambiente de desenvolvimento, primeiro, clone este repositório na branch `main`.

Em seguida, já no diretório baixado, rode o comando `npm install` para a instalação dos pacotes. 

Por fim, rode o comando `npm start` para iniciar o projeto localmente em seu navegador principal.

Caso deseje buildar a aplicação, rode o comando `npm run build`.

## Roteiro de desenvolvimento

Foi seguido, para fins de organização de versão do Git, o fluxo de trabalho do GitFlow. Para mais informações sobre o mesmo, acesse [este link](https://www.atlassian.com/br/git/tutorials/comparing-workflows/gitflow-workflow).

A princípio, foi criado o container do projeto no Firebase. Em seguida, foi realizada a configuração do Firestore e do Firebase Authentication para permitir o acesso de usuários. 

A estrutura do banco de dados foi definida da seguinte forma: uma coleção chamada "tasks" que conteria diversos documentos, cada um associado a um usuário, e que abrangeria dois atributos, "pending" e "completed", que seriam duas listas representando cada um dos status das tasks.
A imagem abaixo mostra melhor isso:

<img src="https://drive.google.com/uc?export=view&id=1bV0gebP5RdrbdYIsB1yZRwkNGKZBINXk">

No front-end, foi criada a conexão com a biblioteca do Firebase e com as listas de tarefas em si. Então, começou-se de fato o processo de desenvolvimento.

A estrutura atual do projeto não foi a primeira a ser utilizada, mas como é a que está agora de fato, é preferível sua apresentação e os motivos da utilização da mesma.

<img src="https://drive.google.com/uc?export=view&id=1JypqfrF7t7--p0htI853Mp8xNDug9xVf">

* `assets`: Contém todos os assets da aplicação, como imagens e ícones;
* `components`: Contém os três componentes principais da aplicação (ToDoList, TasksSet e TaskItem);
* `facades`: Contém os arquivos JS de configuração de facades de conexão dos componentes com os serviços da API. Para mais informações sobre este Padrão de Projeto, acesse [este link](https://refactoring.guru/pt-br/design-patterns/facade);
* `firestore`: Contém as funções de conexão com a API do Firebase;
* `reducers`: Engloba os Reducers da aplicação;
* `store`: Contém o arquivo de configuração da Store da aplicação ;
* `utils`: Contém arquivos JS auxiliares para a aplicação.

O fluxo de negócio é bem simples: um componente que deseja realizar uma ação chama a função associada no facade, que chama uma outra função que se conecta com a API através da biblioteca do firebase, realizando a ação solicitada.

Seguindo o roteiro das features designadas, a primeira versão do projeto apresentava apenas tais funcionalidades, exceto a autenticação por browser.

A segunda versão contava com a funcionaliade extra de Drag and Drop para a ordenação customizada das tarefas, bem como a autenticação por browser.

A terceira versão contava com uma tela de carregamento inicial.

Por último, a última e mais recente versão conta com a funcionalidade extra de PWA da aplicação.

## Deploy

A aplicação está rodando em produção neste link: [to-do-app-guava.herokuapp.com](to-do-app-guava.herokuapp.com).
O container Heroku está configurado para build e deploy automático a cada novo commit na branch `main`.

Caso acesse este link, tenha em vista que, por ser um container gratuito, o primeiro carregamento pode demorar um pouco, pois o Heroku "adormece" um container que passou certo tempo sem ser utilizado. Tal demora não tem conexão direta com o desempenho do aplicativo.

## Desempenho no Google Lighthouse

Para teste de desempenho da aplicação, foi utilizada a extensão [Google Lighthouse](https://developers.google.com/web/tools/lighthouse?hl=pt-br) no DevTools do Google Chrome.
Os primeiros resultados foram bem ruins, mas através de uma refatoração e melhoria de código e compressão de build, as métricas melhoraram bastante.

Segue abaixo o resultado para Desktop:

<img src="https://drive.google.com/uc?export=view&id=1_zlA6RFC21fqJC9zsBSkFCLC0B8ENavo">

Segue abaixo o resultado para Mobile:

<img src="https://drive.google.com/uc?export=view&id=1PVpM3kkgujXpl8ANTN4RtzMAkul7p6uc">

## PWA

Como citado anteriormente, o aplicativo está com a funcionalidade de PWA operante. Para testá-la, acesse [este link](to-do-app-guava.herokuapp.com) através de um dispositivo móvel e adicione a aplicação em sua tela inicial.

O service worker configurado guarda em cache os arquivos JS e imagens necessários para o funcionamento do aplicativo. Caso o dispositivo móvel perca conexão com a internet, ainda assim a página principal será mostrada com o loading rodando normalmente. Obviamente, nada será mostrado além disso, exceto uma mensagem de "Está demorando mais do que o normal..." após vinte segundos sem nenhuma resposta do back-end.

## Testes de responsividade, em dispositivos mobile e em browsers antigos

Para testes de responsividade, foi utilizado o DevTools do Google Chrome. A responsividade fica excelente até nas menores resoluções de tela registradas (IPhone 5/SE), independente de ser em modo retrato ou paisagem.

Os testes em dispositivos mobile foram um sucesso, com a responsividade funcionando da mesma forma que no DevTools. 
Contudo, um pequeno "bug" foi encontrado em dispositivos Motorola e Xiaomi. Ao estar editando ou adicionando uma nova tarefa, é necessário apertar duas vezes na tecla Enter para que as modificações ou a adição seja realizada, pois o primeiro Enter sempre é reconhecido como quebra de linha. Os testes só detectaram tal "bug" nos dispositivos destas marcas. Através de algumas pesquisas, foi percebido que de fato esta é uma situação específica dos teclados virtuais destas marcas, e não um erro de implementação do código. Para o teste de fogo, foi realizado um teste bem simples. Abriu-se o [Google Keep](www.keep.google.com) em um destes dispositivos, pois esta aplicação também apresenta a funcionalidade de "event.preventDefault()" para adicionar uma nova nota ao clicar em Enter, e percebeu-se que o mesmo "bug" ocorre.

Para testes em browsers antigos (de até três anos atrás), foi utilizada a ferramenta online [CrossBrowserTesting](https://app.crossbrowsertesting.com/), como mostrado abaixo:

<img src="https://drive.google.com/uc?export=view&id=13oXECP5C7IKAm6QTo7q8VBbORCJsgeMb">

Alguns ajustes foram realizados após tais testes, especialmente nas folhas de estilo, mas nada muito grande. No geral, as funcionalidades permaneceram as mesmas, independente do navegador. A única excessão foi ao IE11 (lançado em 2013), que não apresentou a página. Através de algumas pesquisas foi percebido que, de fato, tal navegador tem certos problemas com aplicações React.

## Considerações gerais do desenvolvedor

Este foi um projeto que, embora aparente ser bastante simples, foi bastante desafiador para mim, pois eu estava de certa forma acostumado com a minha "zona de conforto" no Angular. Porém, por desafiador não entenda-se "frustrante", pois a sensação que tenho ao terminar este projeto é de que, embora um pouco novato no React, consegui evoluir bastante bem em uma semana, entregando uma aplicação funcional.

De certa forma, o uso do Redux e do Firebase não foram escolhas sem nenhum crivo, pois já utilizara o NgRx (o Redux do Angular) em meus projetos e já estava acostumado com o ambiente Firebase. Diria que a integração com o React, através de suas peculiaridades como os Hooks, foi o maior desafio neste âmbito.

O "bug" do Enter citado acima foi uma dor de cabeça por algum tempo, até que tive a ideia de comparar com uma aplicação do Google (até porque, se em uma aplicação do Google também está assim, então com certeza os teclados destes dispositivos especificados funcionam realmente de maneira diferente, não é mesmo? kkkkk). 

Por fim, gostaria de admitir minha leicidade em melhores estruturas de projeto para React, especialmente por estar começando a usar mais tal framework apenas recentemente. Estou completamente aberto a sugestões e comentários sobre o código :D, pois tenho absoluta certeza que muitas coisas poderiam ter sido feitas de maneira melhor (kkkk).

Contudo, me sinto realizado com tal projeto, e estou bastante estimulado a estudar e aprender cada vez mais sobre React. Espero que gostem da aplicaçãp e a usem bastante! (Sou um pouco ruim com listas, mas quem sabe eu também não comece a usar? hahah)
