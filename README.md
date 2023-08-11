# MY-LENS-TRADUCTOR #
This is a Lens traductor + Text Tranlator web project that permit you to extract text from image and make it translation in a lot of idioms in your preference 


// Responsabilidades
1. index.js: iniciar a escuta do servidor
2. app.js: conter os middlewares e usar chamar as rotas
3. routes.js: conter as rotas e apontar para o devido controller
4. controller.js: desampacotar os atributos na requisição, executar a lógica ou só chamar o dao necessário
5. dao.js: efectua a persistência do BD 

## Methods para controllers 
1- index - lista os dados da tabela
2- show - mostra um item especifico
4- store - salva o novo item na tabela
6- update - salva a actualização do dado
7- destroy - remove o dado

5- edit- retorna a view p/ edição do dado
3- create retorna a view p/ criar um item 

// DAO Method and it meaning
 findAll  --} listarTodos
 findById --} listarPorId
 create   --} inserir
 update   --} actualizar
 delete   --} apagar


## REQUISITOS FUNCIONAIS
1- Mais de três idiomas disponiveis                            --> OK
2- Traduzir tudo para idioma default do user                   --> OK
3- Contador de tradução por user 
4- Historico de testes traduzidos com imagem guardada
5- Adiciona Idioma Pela Aplicação
6- Responsividade

git push --set-upstream origin develop