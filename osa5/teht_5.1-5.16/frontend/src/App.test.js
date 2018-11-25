import React from 'react'
import { shallow, mount } from 'enzyme'
import App from './App'

jest.mock('./services/blogs')
jest.mock('./services/login')

describe('Before user is logged in', () => {
  let app
  beforeEach(() => {
    app = mount(<App />)
  })

  it('Login form is rendered', () => {
    const loginForm = app.find(loginForm)
    expect(loginForm).toHaveLength(1)
    expect(app.html()).toContain(loginForm.html())
  })

  it('The logged in page is not rendered', () => {
    app.update()
    const loggedInPage = app.find(loggedInPage)
    expect(loggedInPage).toHaveLength(0)
  })
})

describe('After user is logged in', () => {
let app
  beforeEach(() => {
    const user = {
      name: 'Test User',
      username: 'TestUser',
      token: '007'
    }
    localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
    app = mount(<App />)
  })

  it('Login form is not rendered', () => {
    app.update()
    const loginForm = app.find(loginForm)
    expect(loginForm).toHaveLength(0)
  })

  it('The logged in page is rendered', () => {
    app.update()
    const loggedInPage = app.find(loggedInPage)
    expect(loggedInPage).toHaveLength(1)
  })
})

