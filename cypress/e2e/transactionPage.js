class TransactionPage {

    selectorsList() {
    const selectors = {
        newTransactionButton: "[data-test='nav-top-new-transaction']",
        searchField: "[data-test='user-list-search-input']",
        userItem: "[data-test*='user-list-item']",
        amountField: "[name='amount']",        
        descriptionField: "[data-test='transaction-create-description-input']",
        submitPaymentButton: "[data-test='transaction-create-submit-payment']",
        submitRequestButton: "[data-test='transaction-create-submit-request']",
        successMessage: "[data-test='alert-bar-success']",
        errorMessage: "[data-test='transaction-create-amount-validation-error']",
        returnToTransactionsButton: "[data-test='new-transaction-return-to-transactions']",
    }

    return selectors
}

    accessNewTransaction() {
        cy.get(this.selectorsList().newTransactionButton).click()
    }

    searchUser(username) {
        cy.get(this.selectorsList().searchField).type(username)
        cy.get(this.selectorsList().userItem).first().click()
    }

    fillTransactionForm(amount, description) {
        cy.get(this.selectorsList().amountField).type(amount)
        cy.get(this.selectorsList().descriptionField).type(description)
    }

    submitPayment() {
        cy.get(this.selectorsList().submitPaymentButton).click()
    }

    checkTransactionSuccess() {
        cy.get(this.selectorsList().successMessage).should('be.visible')
    }

    checkAmountError() {
        cy.get(this.selectorsList().errorMessage)
            .should('be.visible')
            .and('contain', 'Please enter a valid amount')
    }
}

export default TransactionPage