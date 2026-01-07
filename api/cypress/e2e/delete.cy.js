describe('DELETE /api/users/:id', () => {
    context('Remoção', () => {
        let userId

        const user = {
            name: 'Bruce Banner',
            email: 'hulk@marvel.com',
            password: 'pwd123'
        }

        before(() => {
            cy.task('deleteUser', user.email)

            cy.postUser(user).then(response => {
                userId = response.body.user.id
            })
        })

        it('Deve deletar um usuário existente', () => {
            cy.deleteUser(userId).then(response => {
                expect(response.status).to.eq(204)
            })
        })

        after(() => {
            cy.getUsers().then(response => {
                const hulk = response.body.find(user => user.id === userId)
                expect(hulk).to.be.undefined
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
            cy.deleteUser(userId).then(response => {
                expect(response.status).to.eq(404)
            })
        })
    })
})