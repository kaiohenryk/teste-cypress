# 🧪 Projeto de Automação de Testes com Cypress

Automação de testes **WEB** e **API REST** utilizando Cypress, seguindo
**Page Object Model (POM)**, boas práticas de organização e comandos
customizados para uma estrutura escalável e de fácil manutenção.

---

## 📌 Tecnologias

- **Cypress**
- **JavaScript (ES6)**
- **Node.js**
- **Page Object Model**
- **Prettier / ESLint**
- **Custom Commands**

---

## 📂 Estrutura do Projeto

    cypress/
    ├── e2e/
    │   ├── api/
    │   │   └── product/
    │   └── web/
    │
    ├── fixtures/
    │   ├── product.json
    │   └── user.json
    │
    ├── page/
    │   ├── BasePage.js
    │   ├── LoginPage.js
    │   └── UserRegistrationPage.js
    │
    └── support/
        ├── commands.js
        └── e2e.js

---

## 🧱 Arquivos principais

### **Page Objects**

- **BasePage.js** --- métodos genéricos.
- **LoginPage.js** --- interações da tela de login.
- **UserRegistrationPage.js** --- ações da página de cadastro.

### **Fixtures**

Massas de dados organizadas por contexto (API e WEB).

### **Custom Commands**

Localizados em `support/commands.js`, como: - `cy.createUserAPI()` -
`cy.deleteUserAPI()` - `cy.updateProductAPI()`

---

## ⚙️ Configurações importantes

### `cypress.env.json`

```json
{
  "apiUrl": "https://serverest.dev"
}
```

---

## ▶️ Como executar

### Instalar dependências

```bash
npm install
```

### Abrir o Cypress

```bash
npx cypress open
```

### Rodar em modo headless

```bash
npx cypress run
```
