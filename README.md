# MY-LENS-TRADUCTOR #
This is a Lens traductor + Text Tranlator web project that permit you to extract text from image and make it translation in a lot of idioms in your preference 


// Responsabilidades
1. index.js: iniciar a escuta do servidor
2. app.js: conter os middlewares e usar chamar as rotas
3. routes.js: conter as rotas e apontar para o devido controller
4. controller.js: desampacotar os atributos na requisição, executar a lógica ou só chamar o dao necessário
5. dao.js: efectua a persistência do BD 

// DAO Method and it meaning
 findAll  --} listarTodos
 findById --} listarPorId
 create   --} inserir
 update   --} actualizar
 delete   --} apagar
   