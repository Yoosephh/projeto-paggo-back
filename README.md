<h1 align="center">Paggo.app</h1>
<h3>Uma API capaz de extrair textos de imagens, com autenticação e persistência.</h3>

### Deploy URL (API): 

## Instalação

1. Clone o repositório:

    ```bash
    git clone https://github.com/Yoosephh/projeto-paggo-back
    cd paggo-back
    ```

2. Instale as dependências:

    ```bash   
    npm install
    ```

Antes de executar a aplicação, você pode precisar configurar algumas variáveis de ambiente. Crie um arquivo `.env` na raiz do projeto e adicione seus respectivos valores para as variáveis:

```bash
DATABASE_URL=data_base_url
```

3. Configure o ORM (Prisma):

    ```sh
    npx prisma generate
    npx prisma migrate dev
    ```

## Execução
<p>Após a instalação das depedências e configuração das variáveis de ambiente, execute a aplicação através do comando:</p>


```bash
# start the application
$ npm run start

# development
$ npm run start:dev

```

## Camadas da aplicação

* **Controllers**: Responsáveis por lidar com a lógica de requisições e respostas HTTP.
* **Services**: Lógica de negócio que não pertence diretamente aos controllers ou models, promovendo uma separação clara entre a lógica de apresentação e de domínio.
* **Repositories**:  Camada responsável por acessar o banco de dados, realizando as operações de CRUD (Create, Read, Update e Delete);
* **Database e Prisma**: Contém lógica relacionada ao banco de dados, como conexões e operações.
* **Helpers**: Funções auxiliares e utilitárias que podem ser reutilizadas em todo o projeto.
* **Schemas**: Representam os dados e estruturas usadas no banco de dados.

## Entidades

A aplicação possui as seguintes entidades:

### Users
Representa um usuário:

```Javascript
{ 
  id: 1,
  email: 'joaozinho@gmail.com',
  token: 'TokenGeradoPorOAuth',
}
```

### Texts
Representa um texto, registrado após autenticação e leitura da imagem pela biblioteca Tesseract:

```javascript
{
  id: 1,
text: 'Texto gerado pelo Tesseract',
fileName: 'Nome do arquivo recebido',
jobId: 9382 //gerado pelo Tesseract.js, id que referencia a análise da biblioteca
userId: 1 //Referência ao id do usuário que gerou o texto
}
```

## Rotas e métodos
### Users
* **POST** '/auth/signin': Inicia uma nova sessão de usuário.

* **Input**:
```javascript
{
  email:"joaozinho@joao.com",
  token: "TokenGeradoPorOAuth"
}
```
* **Output**: </br>
###### Em caso de sucesso: </br>
Status `201(Created)`
```javascript
{
  success: true,
  message: "User authentication succeded."
}
```
##### Em caso de erro: </br>
```javascript
{
  message: "Mensagem descrevendo o erro",
  error : "Unauthorized", //exemplo
  statusCode: 401 //exemplo
}
```

### Texts
* **/POST** '/upload/file': Transcreve e armazena o texto gerado a partir da imagem enviada pelo usuário

* **Headers**:
```javascript
{
  Authorization: Bearer "TokenGeradoPorOAuth",
  "Content-Type": "multipart/form-data",
}
```
* **Input**:
```javascript
{
  file: Representa a imagem enviada pelo formulário de upload
}
```
* **Output**:
###### Em caso de sucesso: </br>
Status `201(Created)`
```javascript
{
  text: "Texto extraído pelo Tesseract.js"
}
```


##### Em caso de erro: </br>
```javascript
{
  message: "Mensagem descrevendo o erro",
  error : "Unauthorized", //exemplo
  statusCode: 401 //exemplo
}
```

## Tecnologias e versões

* **NestJS(v10.0.0) + Express(v4.17.17)**:  Para a criação e gestão do servidor RESTful, oferecendo funcionalidades como injeção de dependências, configurações de banco de dados e mais;


* **Prisma (ORM)(v5.17.0)**:  Framework para acesso ao banco de dados, responsável por mapear as classes do modelo de domínio para as tabelas do banco de dados. ;


* **PostgreSQL**:  Banco de dados relacional para armazenamento (persistência) e manipulação dos dados;


* **TypeScript (v5.1.3)**: Framework que promove a tipagem dos dados, garantindo maior integridade para a aplicação.

* **Multer(v1.4.11)**: Middleware para Node.js, usado para lidar com uploads de arquivos em aplicativos web. É particularmente útil para o processamento de dados de formulários multipart/form-data, que é a codificação usada para enviar arquivos através de um formulário HTML;


* **bcrypt(v5.0.2)**: Biblioteca para hash e verificação de senhas. Utiliza o algoritmo de criptografia Blowfish para gerar hashes de senhas seguras, tornando difícil a quebra das senhas armazenadas no banco de dados. 


* **Tesseract.js(v5.1.0)**: Biblioteca de OCR (Reconhecimento Óptico de Caracteres) para JavaScript. Permite a extração de texto a partir de imagens diretamente no navegador ou no servidor. 
