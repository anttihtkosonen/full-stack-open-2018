import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'

describe('<Blog />', () => {

    const blog = {
      title: 'Test title',
      author: 'Test Author',
      likes: 12,
      url: 'www.test.fi',
      user: {
        name:'Test user'
      }
    }
  
    beforeEach(() => {
      const dummyButton = () => {}
      const showDeleteButton = true

      let togglableComponent = shallow(
        <Blog 
        blog={blog} 
        handleLikeClick={dummyButton} 
        deleteBlog={dummyButton} 
        showDeleteButton={showDeleteButton} 
        />
        )
  
    })
  
    it('blog is rendered', () => {
      const shownDiv = togglableComponent.find('.blog-shown')
      expect(shownDiv.text()).toContain(`${blog.title} ${blog.author}`)
      const hiddenDiv = togglableComponent.find('.blog-hidden')
      expect(hiddenDiv.text()).toContain(`${blog.url}`)
      expect(hiddenDiv.text()).toContain(`${blog.likes}`)
      expect(hiddenDiv.text()).toContain(`added by ${blog.user.name}`)
  
    })
  
    it('before click, only title is shown', () => {
      const hiddenDiv = togglableComponent.find('.blog-hidden')
      expect(hiddenDiv.getElement().props.style).toEqual({ display: 'none' })
    })

    it('after click everything is shown', () => {
      const shownDiv = togglableComponent.find('.blog-shown')
      shownDiv.simulate('click')
      const hiddenDiv = togglableComponent.find('.blog-hidden')
      expect(hiddenDiv.getElement().props.style).toEqual({ display: '' })
    })
  
  })