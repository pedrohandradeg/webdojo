Cypress.Commands.add('fillConsultancyForm', (data) => {
    cy.get('input[placeholder="Digite seu nome completo"]').type(data.name)
    cy.get('input[placeholder="Digite seu email"]').type(data.email)
    cy.get('input[placeholder="(00) 00000-0000"]').type(data.phone)

    cy.contains('label', 'Tipo de Consultoria')
        .parent()
        .find('select')
        .select(data.consultancyType)

    if (data.personType === 'cpf') {
        cy.contains('label', "Pessoa Física")
            .find('input')
            .click()

        cy.contains('label', "Pessoa Jurídica")
            .find('input')
            .should('be.not.checked')

        cy.contains('label', 'CPF')
            .parent()
            .find('input')
            .type(data.document)
    }
    else if (data.personType === 'cnpj') {
        cy.contains('label', "Pessoa Jurídica")
            .find('input')
            .click()

        cy.contains('label', "Pessoa Física")
            .find('input')
            .should('be.not.checked')

        cy.contains('label', 'CNPJ')
            .parent()
            .find('input')
            .type(data.document)
    }

    data.discoveryChannels.forEach((channel) => {
        cy.contains('label', channel)
            .find('input')
            .check()
            .should('be.checked')
    })

    cy.get('input[type="file"]')
        .selectFile(data.file, { force: true })

    cy.get('textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]')
        .type(data.description)

    data.techs.forEach((tech) => {
        cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]')
            .type(tech)
            .type('{enter}')

        cy.contains('label', 'Tecnologias')
            .parent()
            .contains('span', tech)
            .should('be.visible')
    })

    if (data.terms) {
        cy.contains('label', 'termos de uso')
            .find('input')
            .check()
    }

    cy.submitConsultancyForm()
})

Cypress.Commands.add('submitConsultancyForm', () => {
    cy.contains('button', 'Enviar formulário').click()
})