describe('Kanban Board', () => {
    it('Deve mover uma tarefa ', () => {
        cy.login()
        cy.goTo('Kanban', 'Kanban Board')

        const dataTransfer = new DataTransfer()

        cy.contains('div[draggable="true"]', 'Documentar API')
            .trigger('dragstart', { dataTransfer })

        cy.get('.column-done')
            .trigger('drop', { dataTransfer })
            .find('h3')
            .should('have.text', 'Done (4)')
        
        
    });
})