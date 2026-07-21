class DashboardPage {

    selectorsList() {
        const selectors = {
            transactionList: "[data-test='transaction-list']",
        }

        return selectors
    }

    checkDashboardPage() {
        cy.location('pathname').should('equal', '/')
        cy.get(this.selectorsList().transactionList).should('be.visible')
    }
}

export default DashboardPage