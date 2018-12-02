import blogs from '../services/blogs'

const reducer = (store = [], action) => {
  if (action.type === 'CREATE') {
    console.log(action.content)
    return store.concat(action.content)
  }

  if (action.type === 'INITIALIZE') {
    return store = action.content
  }
  if (action.type === 'LIKE') {
    return store.map(a => a._id === action.id ? action.content : a)
  }
  if (action.type === 'REMOVE') {
    const list = store.filter(a => a.id !==action.id)
    return list
  }
  return store
}

export const createBlog = (blogObj) => {
  return async (dispatch) => {
    const blog = await blogs.create(blogObj)
    dispatch({
      type: 'CREATE',
      blog: blog
    })
  }
}

export const removeBlog = (blog) => {
  return async (dispatch) => {
    await blogs.remove(blog.id)
    dispatch({
      type: 'REMOVE',
      id: blog.id
    })
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    const content = await blogs.getAll()
    console.log('initialized blogs: ',content)
    dispatch({
      type: 'INITIALIZE',
      content
    })
  }
}

export const likeBlog = (blog) => {
  return async (dispatch, getState) => {
    const state = getState()
    //console.log('state: ', state)
    const liked = state.blogs.find(a => a._id===blog._id)
    console.log('liked: ', liked)
    const newList = { ...liked, likes: liked.likes + 1 }
    await blogs.update(blog.id, newList)
    dispatch({
      type: 'LIKE',
      content: newList,
      id: blog.id
    })
  }
}

export default reducer