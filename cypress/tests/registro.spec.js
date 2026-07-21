import SignupPage from '../e2e/signupPage'

const signupPage = new SignupPage()

describe("Registro de novo usuário com sucesso", () => {
    beforeEach(() => {
        signupPage.accessSignupPage()
    })

    it("Deve registrar um novo usuário com informações válidas", () => {
        const username = `joaosilva_${Date.now()}`
        signupPage.fillSignupForm("João", "Silva", username, "Test@1234", "Test@1234")
        signupPage.submitForm()
        signupPage.checkRedirectToSignin()
    })
})

describe("Tentar registrar com informações incompletas", () => {
    beforeEach(() => {
        signupPage.accessSignupPage()
    })

    it("Deve exibir erro ao deixar First Name vazio", () => {
        signupPage.checkFieldRequired('firstName')
    })

    it("Deve exibir erro ao deixar Last Name vazio", () => {
        signupPage.checkFieldRequired('lastName')
    })

    it("Deve exibir erro ao deixar Username vazio", () => {
        signupPage.checkFieldRequired('username')
    })

    it("Deve exibir erro quando as senhas não coincidem", () => {
        signupPage.checkPasswordMismatch()
    })

    it("Deve exibir erros em todos os campos ao submeter vazio", () => {
        signupPage.checkAllFieldsRequired()
    })
})