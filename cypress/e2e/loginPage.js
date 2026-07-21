class LoginPage {

    selectorsList() {
        const selectors = {
            usernameField: "[data-test='signin-username']",
            passwordField: "[data-test='signin-password']",
            loginButton: "[data-test='signin-submit']",
            errorAlert: "[data-test='signin-error']",
            passwordHelperText: "#password-helper-text",
        }

        return selectors
    }

    accessLoginPage() {
        cy.visit('/signin')
    }

    loginWithUser(username, password) {
        cy.get(this.selectorsList().usernameField).type(username)
        cy.get(this.selectorsList().passwordField).type(password)
        cy.get(this.selectorsList().loginButton).click()
        cy.location('pathname').should('not.equal', '/signin')
    }

    checkAccessInvalid() {
        cy.get(this.selectorsList().errorAlert)
            .should('be.visible')
            .and('contain', 'Username or password is invalid')
    }

    checkPasswordValidation() {
    cy.get(this.selectorsList().passwordField).find('input').focus().blur()
    cy.get(this.selectorsList().passwordHelperText)
        .should('be.visible')
        .and('contain', 'Password must contain at least 4 characters')
}
}

export default LoginPage