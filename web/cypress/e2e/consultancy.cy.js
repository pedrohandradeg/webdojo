import { personal, company } from '../fixtures/consultancy.json'

describe('Formulário de consultoria', () => {

    beforeEach(() => {
        cy.login()
        cy.goTo('Formulários', 'Consultoria')
    })

    it('Deve solicitar consultoria individual', () => {
        cy.fillConsultancyForm(personal)

        cy.get('.modal', { timeout: 7000 })
            .find('.modal-content')
            .should('be.visible')
            .and('have.text', 'Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.')
    })

    it('Deve solicitar consultoria In Company', () => {
        cy.fillConsultancyForm(company)

        cy.get('.modal', { timeout: 7000 })
            .find('.modal-content')
            .should('be.visible')
            .and('have.text', 'Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.')
    })

    it('Deve verificar os campos obrigatórios', () => {
        cy.submitConsultancyForm()

        const messages = [
            'Campo obrigatório',
            'Campo obrigatório',
            'Você precisa aceitar os termos de uso'
        ]

        messages.forEach((message) => {
            cy.contains('p', message)
                .should('be.visible')
        })
    })
})