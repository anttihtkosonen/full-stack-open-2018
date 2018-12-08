import React from 'react'
import App from './App'
import { mount } from 'enzyme'
import SingleBlog from './components/SingleBlog'

describe('<App />', () => {
  let app

  describe('when user is not logged', () => {
    beforeEach(() => {
      app = mount(<App />)
    })

    it('when user is not logged, only the login form us shown', () => {
      const form = app.find('form')
      expect(form.length).toBe(1)
      const blogs = app.find(SingleBlog)
      expect(blogs.length).toBe(0)
    })
  })

  describe('when user is logged', () => {
    beforeEach(() => {
      localStorage.setItem('loggedBlogAppUser', JSON.stringify({ username: 'tester', token: '123' }))
      app = mount(<App />)
    })

    it('all notes are rendered', () => {
      app.update()

      const blogs = app.find(SingleBlog)
      expect(blogs.length).toBe(2)
    })
  })
})