import LoginPage from '../e2e/loginPage'
import TransactionPage from '../e2e/transactionPage'

const loginPage = new LoginPage()
const transactionPage = new TransactionPage()
const VALID_USER = {
    username: "Heath93",
    password: "s3cret",
}

describe("Enviar dinheiro com saldo suficiente", () => {
    before(() => {
        cy.task('db:seed')
    })

    beforeEach(() => {
        loginPage.accessLoginPage()
        loginPage.loginWithUser(VALID_USER.username, VALID_USER.password)
    })

    it("Deve enviar dinheiro com sucesso", () => {
        transactionPage.accessNewTransaction()
        transactionPage.searchUser("Arvilla_Hegmann")
        transactionPage.fillTransactionForm("10", "Pagamento de teste")
        transactionPage.submitPayment()
        transactionPage.checkTransactionSuccess()
    })
})

describe("Enviar dinheiro com valor inválido", () => {
    beforeEach(() => {
        loginPage.accessLoginPage()
        loginPage.loginWithUser(VALID_USER.username, VALID_USER.password)
        cy.get('body').then(($body) => {
            if ($body.find("[data-test='user-onboarding-dialog']").length > 0) {
                cy.get("[data-test='user-onboarding-next']").click()
                cy.get("[data-test='user-onboarding-next']").click()
                cy.get("[data-test='user-onboarding-done']").click()
            }
        })
    })

    it("Deve exibir erro ao tentar enviar sem preencher o valor", () => {
    transactionPage.accessNewTransaction()
    transactionPage.searchUser("Arvilla_Hegmann")
    cy.get("[data-test='transaction-create-description-input']").type("Teste sem valor")
    // Verifica que o botão está desabilitado sem preencher o valor
    cy.get("[data-test='transaction-create-submit-payment']").should('be.disabled')
})
})