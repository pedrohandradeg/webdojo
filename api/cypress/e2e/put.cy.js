describe('PUT /api/users/:id', () => {

    context('Atualização', () => {
        let userId

        const originalUser = {
            name: 'Peter Parker',
            email: 'parker@email.com',
            password: 'pwd123'
        }

        const updatedUser = {
            name: 'Spiderman',
            email: 'spider@marvel.com',
            password: 'pwd123'
        }

        before(() => {

            cy.task('deleteUser', originalUser.email)
            cy.task('deleteUser', updatedUser.email)

            cy.postUser(originalUser).then(response => {
                userId = response.body.user.id
            })
        })

        it('Deve atualizar um usuário existente', () => {
            cy.putUser(userId, updatedUser).then(response => {
                expect(response.status).to.eq(204)
            })
        })

        after(() => {
            cy.getUsers().then(response => {
                const spider = response.body.find(user => user.id === userId)
                expect(spider).to.exist
            })
        })
    })

    context('Campos Obrigatórios', () => {
        it('O campo name deve ser obrigatório', () => {

            const user = {
                email: 'teste@email.com',
                password: 'pwd123'
            }

            cy.putUser(1, user).then((response) => {
                expect(response.status).to.eq(400)

                expect(response.body.error).to.eq('The "name" field is required')
            })
        })

        it('O campo email deve ser obrigatório', () => {

            const user = {
                name: 'Teste',
                password: 'pwd123'
            }

            cy.putUser(1, user).then((response) => {
                expect(response.status).to.eq(400)

                expect(response.body.error).to.eq('The "email" field is required')
            })
        })

        it('O campo password deve ser obrigatório', () => {

            const user = {
                name: 'Teste',
                email: 'teste@email.com'
            }

            cy.putUser(1, user).then((response) => {
                expect(response.status).to.eq(400)

                expect(response.body.error).to.eq('The "password" field is required')
            })
        })
    })

    context('Quando o usuário não existe', () => {
        let userId

        const user = {
            name: 'Tony Stark',
            email: 'stark@marvel.com',
            password: 'pwd123'
        }

        before(() => {
            cy.task('deleteUser', user.email)

            cy.postUser(user).then(response => {
                userId = response.body.user.id
            })

            cy.task('deleteUser', user.email)
        })

        it('Não deve deletar um usuário inexistente', () => {
            cy.putUser(userId, user).then(response => {
                expect(response.status).to.eq(404)
            })
        })
    })
})