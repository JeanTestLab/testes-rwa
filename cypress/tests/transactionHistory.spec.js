import LoginPage from '../e2e/loginPage'
import TransactionHistoryPage from '../e2e/transactionHistoryPage'

const loginPage = new LoginPage()
const historyPage = new TransactionHistoryPage()

const VALID_USER = {
  username: "Heath93",
  password: "s3cret",
}

const NEW_USER = {
  username: `newuser_${Date.now()}`,
  password: "Test@1234",
}

describe("Visualizar histórico de transações com sucesso", () => {
  beforeEach(() => {
    loginPage.accessLoginPage()
    loginPage.loginWithUser(VALID_USER.username, VALID_USER.password)
  })

  it("Deve exibir o histórico de transações corretamente", () => {
    historyPage.accessTransactionHistory()
    historyPage.checkTransactionsVisible()
  })

  it("Deve exibir transações na aba Mine", () => {
    historyPage.accessTransactionHistory()
    historyPage.accessMineTab()
    cy.get(historyPage.selectorsList().transactionList).should('be.visible')
  })
})

describe("Visualizar histórico sem transações anteriores", () => {
  before(() => {
    cy.visit('/signup')
    cy.get("[data-test='signup-first-name']").type("Novo")
    cy.get("[data-test='signup-last-name']").type("Usuario")
    cy.get("[data-test='signup-username']").type(NEW_USER.username)
    cy.get("[data-test='signup-password']").type(NEW_USER.password)
    cy.get("[data-test='signup-confirmPassword']").type(NEW_USER.password)
    cy.get("[data-test='signup-submit']").click()
  })

  beforeEach(() => {
    loginPage.accessLoginPage()
    loginPage.loginWithUser(NEW_USER.username, NEW_USER.password)
  })
})
it("Deve exibir mensagem quando não há transações", () => {
  cy.get('body').then(($body) => {
    if ($body.find("[data-test='user-onboarding-dialog']").length > 0) {
      cy.get("[data-test='user-onboarding-next']").click();
      cy.get("[data-test='bankaccount-bankName-input']").type('Banco Cypress');
      cy.get("[data-test='bankaccount-routingNumber-input']").type('123456789');
      cy.get("[data-test='bankaccount-accountNumber-input']").type('123456789');
      cy.get("[data-test='bankaccount-submit']").click(); 
      cy.get("[data-test='user-onboarding-dialog']").should('be.visible');
      cy.get("[data-test='user-onboarding-next']").click(); 
      cy.intercept('POST', '/bankAccounts').as('createBankAccount');
      cy.get("[data-test='bankaccount-bankName-input']").type('Banco Cypress');
      cy.get("[data-test='bankaccount-routingNumber-input']").type('123456789');
      cy.get("[data-test='bankaccount-accountNumber-input']").type('123456789');
      cy.get("[data-test='bankaccount-submit']").click();
      cy.wait('@createBankAccount').its('response.statusCode').should('eq', 200);
      cy.get("[data-test='user-onboarding-next']").click(); 
      cy.get("[data-test='user-onboarding-done']").click(); 
      cy.get("[data-test='main']", { timeout: 10000 }).should('be.visible');
      historyPage.accessMineTab();
      historyPage.checkEmptyTransactions();
    }
  })
})
