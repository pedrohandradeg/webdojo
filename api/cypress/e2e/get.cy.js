describe('GET /api/users', () => {

    const mutantes = [
        {
            name: 'Storm',
            email: 'storm@xmen.com',
            password: 'pwd123'
        },
        {
            name: 'Jean Grey',
            email: 'phoenix@xmen.com',
            password: 'pwd123'
        },
        {
            name: 'Beast',
            email: 'beast@xmen.com',
            password: 'pwd123'
        },
        {
            name: 'Nightcrawler',
            email: 'nightcrawler@xmen.com',
            password: 'pwd123'
        },
        {
            name: 'Rogue',
            email: 'rogue@xmen.com',
            password: 'pwd123'
        }
    ];

    before(() => {
        mutantes.forEach((mutante) => {
            cy.postUser(mutante)
        })
    })

    it('Deve retornar uma lista de usuários', () => {

        cy.getUsers().then(response => {
            expect(response.status).to.eq(200)

            mutantes.forEach((mutante) => {
                const found = response.body.find((user) => user.email === mutante.email)
                expect(found.name).to.eq(mutante.name)
            })
        })
    })
})