describe('Gerenciamento de Perfis no Github', () => {

    beforeEach(() => {
        cy.login()
        cy.goTo('Tabela', 'Perfis do GitHub')
    })

    it('Deve adicionar um usuário com sucesso', () => {
        
        cy.get('#name').type('Pedro Andrade')
        cy.get('#username').type('pedrohandradeg')
        cy.get('#profile').type('QA')

        cy.contains('button', 'Adicionar Perfil').click()

        cy.contains('table tbody tr', 'pedrohandradeg')
            .should('be.visible')
            .contains('Pedro Andrade')
            .should('be.visible')
        
        cy.contains('table tbody tr', 'pedrohandradeg')
            .should('be.visible')
            .contains('QA')
            .should('be.visible')
    });

    it('Deve poder remover um perfil do Github', () => {
        
        const profile = {
            name: 'Teste',
            username: 'fulanoqa',
            profile: 'QA'
        }

        cy.get('#name').type(profile.name)
        cy.get('#username').type(profile.username)
        cy.get('#profile').type(profile.profile)

        cy.contains('button', 'Adicionar Perfil').click()

        cy.contains('table tbody tr', profile.username)
            .should('be.visible')
            .find('button[title="Remover perfil"]').click()

        cy.contains('table tbody tr', profile.username)
            .should('not.exist')
    });

    it('Deve validar os campos obrigatórios', () => {

        cy.contains('button', 'Adicionar Perfil').click()

        const messages = [
            'Nome é obrigatório',
            'Username é obrigatório',
            'Perfil é obrigatório'
        ]

        messages.forEach((message) => {
            cy.contains('p', message)
                .should('be.visible')
        })
    });

    it.only('Deve validar o link do github', () => {
        
        cy.get('#name').type('Pedro Andrade')
        cy.get('#username').type('pedrohandradeg')
        cy.get('#profile').type('QA')

        cy.contains('button', 'Adicionar Perfil').click()

        cy.contains('table tbody tr', 'pedrohandradeg')
            .should('be.visible')
            .find('a')
            .should('have.attr', 'href', 'https://github.com/pedrohandradeg')
            

    });
})