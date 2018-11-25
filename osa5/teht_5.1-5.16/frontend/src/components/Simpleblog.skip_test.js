import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe.only('<SimpleBlog />', () => {
  it('renders title and author', () => {
    const blog = {
      title: 'Test Blog Title',
      author: 'Test Blog author',
      likes: 13
    }

    const blogComponent = shallow(<SimpleBlog blog={blog} />)
    const titleAndAuthorDiv = blogComponent.find('.titleAndAuthor')

    expect(titleAndAuthorDiv.text()).toContain(blog.title)
    expect(titleAndAuthorDiv.text()).toContain(blog.author)
  })

  it('clicking like twice results in two calls to click-handler', () => {
    const blog = {
        title: 'Test Blog Title',
        author: 'Test Blog author',
        likes: 13
      }    
    
    const mockHandler = jest.fn()

    const blogComponent = shallow(
      <SimpleBlog
        blog={blog}
        onClick={mockHandler}
      />
    )
  
    const button = blogComponent.find('button')
    button.simulate('click')
    button.simulate('click')
  
    expect(mockHandler.mock.calls.length).toBe(2)
  })
})