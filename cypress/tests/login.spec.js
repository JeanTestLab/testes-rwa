import LoginPage from '../e2e/loginPage'
import DashboardPage from '../e2e/dashboardPage'

const loginPage = new LoginPage()
const dashboardPage = new DashboardPage()

const VALID_USER = {
    username: "Heath93",
    password: "s3cret",
}

describe("Login com sucesso", () => {
    beforeEach(() => {
        loginPage.accessLoginPage()
    })

    it("Deve fazer login com um usuário válido", () => {
        loginPage.loginWithUser(VALID_USER.username, VALID_USER.password)
        dashboardPage.checkDashboardPage()
    })
})

describe("Tentar fazer login com credenciais inválidas", () => {
    beforeEach(() => {
        loginPage.accessLoginPage()
    })

    it("Deve exibir erro ao fazer login com credenciais incorretas", () => {
        loginPage.loginWithUser("usuario_invalido", "senhaqualquer")
        loginPage.checkAccessInvalid()
    })

    it("Deve exibir erro com senha incorreta para usuário válido", () => {
        loginPage.loginWithUser(VALID_USER.username, "senha_errada")
        loginPage.checkAccessInvalid()
    })

})