import blogs from '../services/blogs'

const reducer = (store = [], action) => {
  if (action.type === 'CREATE_BLOG') {
    console.log(action.content)
    return store.concat(action.content)
  }

  if (action.type === 'INITIALIZE_BLOGS') {
    return store = action.content
  }
  if (action.type === 'LIKE') {
    return store.map(a => a._id === action.id ? action.content : a)
  }
  if (action.type === 'REMOVE') {
    const list = store.filter(a => a._id !==action.id)
    return list
  }
  return store
}

export const createBlog = (blogObj) => {
  return async (dispatch) => {
    const blog = await blogs.create(blogObj)
    dispatch({
      type: 'CREATE_BLOG',
      content: blog
    })
  }
}

export const removeBlog = (blog) => {
  console.log('remove blog id: ',blog._id)
  return async (dispatch) => {
    await blogs.remove(blog._id)
    dispatch({
      type: 'REMOVE',
      id: blog._id
    })
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    const content = await blogs.getAll()
    console.log('initialized blogs: ',content)
    dispatch({
      type: 'INITIALIZE_BLOGS',
      content
    })
  }
}

export const likeBlog = (blog) => {
  return async (dispatch, getState) => {
    const state = getState()
    const liked = state.blogs.find(a => a._id===blog._id)
    console.log('liked: ', liked)
    const newBlog = { ...liked, likes: liked.likes + 1 }
    console.log('newBlog: ',newBlog)
    await blogs.update(blog._id, newBlog)
    dispatch({
      type: 'LIKE',
      content: newBlog,
      id: blog._id
    })
  }
}

export default reducer