class SignupPage {

    selectorsList() {
        const selectors = {
            firstNameField: "[data-test='signup-first-name']",
            lastNameField: "[data-test='signup-last-name']",
            usernameField: "[data-test='signup-username']",
            passwordField: "[data-test='signup-password']",
            confirmPasswordField: "[data-test='signup-confirmPassword']",
            submitButton: "[data-test='signup-submit']",
            errorAlert: "[data-test='signup-error']",

            firstNameHelper: "#firstName-helper-text",
            lastNameHelper: "#lastName-helper-text",
            usernameHelper: "#username-helper-text",
            passwordHelper: "#password-helper-text",
            confirmPasswordHelper: "#confirmPassword-helper-text",
        }

        return selectors
    }

    accessSignupPage() {
        cy.visit('/signup')
    }

    fillSignupForm(firstName, lastName, username, password, confirmPassword) {
        cy.get(this.selectorsList().firstNameField).type(firstName)
        cy.get(this.selectorsList().lastNameField).type(lastName)
        cy.get(this.selectorsList().usernameField).type(username)
        cy.get(this.selectorsList().passwordField).type(password)
        cy.get(this.selectorsList().confirmPasswordField).type(confirmPassword)
    }

    submitForm() {
        cy.get(this.selectorsList().submitButton).click()
    }

    checkRedirectToSignin() {
        cy.location('pathname').should('equal', '/signin')
    }

    checkFieldRequired(fieldName) {
    const fields = this.selectorsList()
    const fieldMap = {
        firstName: { field: fields.firstNameField, helper: fields.firstNameHelper, message: 'First Name is required' },
        lastName: { field: fields.lastNameField, helper: fields.lastNameHelper, message: 'Last Name is required' },
        username: { field: fields.usernameField, helper: fields.usernameHelper, message: 'Username is required' },
    }

    const { field, helper, message } = fieldMap[fieldName]
    cy.get(field).find('input').focus().blur()
    cy.get(helper).should('be.visible').and('contain', message)
}

    checkPasswordMismatch() {
    cy.get(this.selectorsList().passwordField).find('input').type('Test@1234')
    cy.get(this.selectorsList().confirmPasswordField).find('input').type('SenhaDiferente').blur()
    cy.get(this.selectorsList().confirmPasswordHelper)
        .should('be.visible')
        .and('contain', 'Password does not match')
}

    checkAllFieldsRequired() {
    const fields = this.selectorsList()
    cy.get(fields.firstNameField).find('input').focus().blur()
    cy.get(fields.lastNameField).find('input').focus().blur()
    cy.get(fields.usernameField).find('input').focus().blur()
    cy.get(fields.passwordField).find('input').focus().blur()
    cy.get(fields.confirmPasswordField).find('input').focus().blur()

    cy.get(fields.firstNameHelper).should('be.visible')
    cy.get(fields.lastNameHelper).should('be.visible')
    cy.get(fields.usernameHelper).should('be.visible')
    cy.get(fields.passwordHelper).should('be.visible')
    cy.get(fields.submitButton).should('be.disabled')
}
}

export default SignupPage