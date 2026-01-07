describe('POST /api/users/register', () => {

  it('Deve cadastrar um novo usuário', () => {

    const user = {
      name: 'Wolverine',
      email: 'wolverine@xmen.com',
      password: 'pwd123'
    }

    cy.task('deleteUser', user.email)

    cy.postUser(user).then((response) => {
      expect(response.status).to.eq(201)

      expect(response.body.message).to.eq('User successfully registered!')
      expect(response.body.user.name).to.eq(user.name)
    })
  })

  it('O campo name deve ser obrigatório', () => {

    const user = {
      email: 'teste@email.com',
      password: 'pwd123'
    }

    cy.postUser(user).then((response) => {
      expect(response.status).to.eq(400)

      expect(response.body.error).to.eq('The "name" field is required')
    })
  })

  it('O campo email deve ser obrigatório', () => {

    const user = {
      name: 'Teste',
      password: 'pwd123'
    }

    cy.postUser(user).then((response) => {
      expect(response.status).to.eq(400)

      expect(response.body.error).to.eq('The "email" field is required')
    })
  })

  it('O campo password deve ser obrigatório', () => {

    const user = {
      name: 'Teste',
      email: 'teste@email.com'
    }

    cy.postUser(user).then((response) => {
      expect(response.status).to.eq(400)

      expect(response.body.error).to.eq('The "password" field is required')
    })
  })

  it('Não deve cadastrar usuário com email já existente', () => {

    const user = {
      name: 'Cyclops',
      email: 'scott@xmen',
      password: 'pwd123'
    }

    cy.task('deleteUser', user.email)

    cy.postUser(user).then((response) => {
      expect(response.status).to.eq(201)
    })

    cy.postUser(user).then((response) => {
      expect(response.status).to.eq(400)
      expect(response.body.error).to.eq('A user with this email already exists.')
    })
  })

  it('Não deve passar quando o JSON está mal formatado', () => {

    const user = `{
      name: 'Teste',
      email: 'teste@email.com'
      password: 'pwd123'
    }`

    cy.postUser(user).then((response) => {
      expect(response.status).to.eq(400)

      expect(response.body.error).to.eq('Invalid JSON format.')
    })
  })
})