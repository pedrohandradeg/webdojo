# 📘 Documentação de Testes Automatizados – Webdojo (Cypress)

Esta documentação descreve a estrutura, configuração e execução dos testes automatizados da aplicação **Webdojo**, utilizando **Cypress** para testes end-to-end (E2E).

---

## 🧪 Tecnologias Utilizadas

- Cypress – Framework de testes end-to-end  
- JavaScript – Linguagem de desenvolvimento dos testes  
- Node.js / NPM – Gerenciamento de dependências e execução de scripts  
- Serve – Servidor estático para subir a aplicação Webdojo  

---

## 📂 Estrutura do Projeto

```text
cypress/
├── e2e/
│   └── (arquivos de testes E2E)
├── fixtures/
│   ├── cep.json
│   ├── consultancy.json
│   └── document.pdf
├── support/
│   ├── actions/
│   │   └── consultancy.actions.js
│   ├── commands.js
│   └── e2e.js
```

### 📁 Descrição dos Diretórios

#### cypress/e2e
Contém os arquivos de testes end-to-end, responsáveis por validar os fluxos principais da aplicação Webdojo.

#### cypress/fixtures
Armazena dados estáticos utilizados durante a execução dos testes.

- cep.json – Dados de endereço/CEP  
- consultancy.json – Massa de dados para formulários  
- document.pdf – Arquivo utilizado em testes de upload  

#### cypress/support
Centraliza configurações, comandos customizados e abstrações reutilizáveis.

- actions/consultancy.actions.js – Ações reutilizáveis de fluxos de consultoria  
- commands.js – Custom Commands do Cypress  
- e2e.js – Configurações globais carregadas antes dos testes  

---

## ▶️ Execução da Aplicação Webdojo

A aplicação Webdojo está no **mesmo repositório** do projeto de testes.

Antes de executar os testes, é obrigatório subir a aplicação:

```bash
npm run dev
```

Script configurado:

```json
"dev": "serve -s dist -p 3000"
```

Aplicação disponível em:

```
http://localhost:3000
```

---

## ▶️ Execução dos Testes Automatizados

Com a aplicação em execução:

```bash
npm test
```

Ou:

```bash
npx cypress run
```

Script configurado:

```json
"test": "npx cypress run"
```

---

## 🧠 Boas Práticas

- Uso de actions para reduzir duplicação de código  
- Separação de massa de dados via fixtures  
- Custom Commands para melhor legibilidade  
- Estrutura escalável e de fácil manutenção  

---

## 📌 Observações

- A aplicação deve estar rodando antes dos testes  
- Verifique se a porta 3000 está disponível  
- Configure variáveis de ambiente se necessário  

---

## 📄 Manutenção

- Novos testes → cypress/e2e  
- Novos dados → cypress/fixtures  
- Ações reutilizáveis → cypress/support/actions  

---

✅ Documentação pronta para uso e evolução contínua.
