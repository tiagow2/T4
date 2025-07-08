# Projeto T4 (PL4) - Aplicação React

Este repositório contém o código-fonte do frontend para a atividade PL4. É uma aplicação de interface de usuário desenvolvida com React para consumir uma API de um servidor backend.

## 📋 Pré-requisitos Essenciais

Antes de instalar e executar este projeto, é fundamental garantir que seu ambiente atenda aos seguintes requisitos:

### 1. Backend Java Ativo

⚠️ **Importante:** Esta é uma aplicação frontend que consome uma API. Antes de iniciar este projeto, certifique-se de que o **servidor backend em Java esteja em execução**. Sem ele, a aplicação não funcionará corretamente.

Siga os passos abaixo para iniciar o backend:

**a) Verifique sua Versão do Java**
* O backend requer uma Máquina Virtual Java (JVM) na versão **17 ou superior**. Para verificar a sua versão, abra um terminal e execute:
    ```bash
    java -version
    ```
* Caso não tenha o Java 17 ou uma versão superior, você pode baixar o **OpenJDK 17** [aqui](https://jdk.java.net/17/).

**b) Execute o Servidor Backend**
1. No projeto do backend, navegue até a pasta chamada `executável`.
2. Dentro dessa pasta, você encontrará o arquivo `pl.jar`.
3. Abra um terminal **nessa mesma pasta** (`executável`).
4. Execute o seguinte comando para iniciar o servidor:
    ```bash
    java -jar pl.jar
    ```
✅ Após executar o comando, o servidor backend estará ativo com um banco de dados em memória. **Mantenha este terminal aberto** durante todo o tempo em que estiver usando a aplicação frontend.

### 2. Node.js na Versão Correta (para o Frontend)
* Este projeto frontend foi desenvolvido e testado com a versão **v16.x** do Node.js, conforme especificado pela dependência `@types/node@^16.18.126`.
* Para verificar sua versão, execute no terminal:
    ```bash
    node -v
    ```
* Se não estiver usando a v16, recomendamos fortemente o uso do **nvm (Node Version Manager)**:
    ```bash
    nvm install 16
    nvm use 16
    ```

## 🚀 Guia de Instalação e Execução do Frontend

Com os pré-requisitos atendidos (especialmente o backend rodando), siga os passos abaixo:

1.  **Clone o Repositório**
    ```bash
    git clone [https://github.com/tiagow2/T4.git](https://github.com/tiagow2/T4.git)
    ```

2.  **Acesse a Pasta do Projeto**
    ```bash
    cd T4
    ```

3.  **Instale as Dependências**
    ```bash
    npm install
    ```

4.  **Execute a Aplicação**
    * Inicie o servidor de desenvolvimento do frontend:
        ```bash
        npm start
        ```
    * A aplicação será aberta no seu navegador no endereço **http://localhost:3000**.

## 🛠️ Scripts Disponíveis

* `npm run build`: Cria uma versão otimizada para produção.
* `npm test`: Roda os testes em modo interativo.
* `npm run eject`: **(Avançado)** Ejeta a configuração do Create React App.
