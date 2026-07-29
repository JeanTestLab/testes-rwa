// //class TransactionHistoryPage {

//     selectorsList() {
//         const selectors = {
//             transactionList: "[data-test='transaction-list']",
//             transactionItem: "[data-test*='transaction-item']",
//             emptyList: "[data-test='empty-list-header']",
//             mineTab: "[data-test='nav-mine-tab']",
//             everyoneTab: "[data-test='nav-public-tab']",
//             friendsTab: "[data-test='nav-friends-tab']",
//         }

//         return selectors
//     }

//     accessTransactionHistory() {
//         cy.visit('/')
//     }

//     checkTransactionsVisible() {
//         cy.get(this.selectorsList().transactionList).should('be.visible')
//         cy.get(this.selectorsList().transactionItem).should('have.length.greaterThan', 0)
//     }

//    accessMineTab() {
//   cy.get("[data-test='main']", { timeout: 10000 }).should('be.visible');
//   cy.contains('button, a', /mine/i).click();
//     }

//     checkEmptyTransactions() {
//         cy.get(this.selectorsList().emptyList)
//             .should('be.visible')
//             .and('contain', 'No Transactions')
//     }
// }

// //export default TransactionHistoryPage
class TransactionHistoryPage {

    selectorsList() {
        const selectors = {
            transactionList: "[data-test='transaction-list']",
            transactionItem: "[data-test*='transaction-item']",
            emptyList: "[data-test='empty-list-header']",
            
            // Seletores oficiais do RWA para as abas
            mineTab: "[data-test='nav-personal-tab']",     // "MINE" usa o valor 'personal'
            everyoneTab: "[data-test='nav-public-tab']",   // "EVERYONE"
            friendsTab: "[data-test='nav-contacts-tab']",  // "FRIENDS" usa 'contacts'
        }

        return selectors
    }

    accessTransactionHistory() {
        cy.visit('/')
    }

    checkTransactionsVisible() {
        cy.get(this.selectorsList().transactionList).should('be.visible')
        cy.get(this.selectorsList().transactionItem).should('have.length.greaterThan', 0)
    }

    accessMineTab() {
        // Garante que a página carregou e clica usando o seletor mapeado no selectorsList
        cy.get("[data-test='main']", { timeout: 10000 }).should('be.visible')
        cy.get(this.selectorsList().mineTab).click()
    }

    checkEmptyTransactions() {
        cy.get(this.selectorsList().emptyList)
            .should('be.visible')
            .and('contain', 'No Transactions')
    }
}

export default TransactionHistoryPage