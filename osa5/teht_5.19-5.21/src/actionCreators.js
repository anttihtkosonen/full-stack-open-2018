export default {
    
    voting (id) {
        return {
            type: 'VOTE',
            data: { id }
        }
    },

    addingAnecdote (anecdote) {
        return {
            type: 'NEW_ANECDOTE',
            content: anecdote
          }
    }
}