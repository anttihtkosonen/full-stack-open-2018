const dummy = (blogs) => {
    return(1)
}

const totalLikes = (blogs) => {
    return(blogs.reduce((total, current)=>total+current.likes,0))
}

const favoriteBlog = (blogs) => {
    const likesArray = blogs.map(blog => blog.likes)
    let max = likesArray[0]
    let index = 0
    for (let i =1; i<likesArray.length; i++){
        if(likesArray[i] > max){
            index = i
            max = likesArray[i]
        }
    }
//    console.log(likesArray, index)
    return (blogs[index])
}

const mostBlogs = (blogs) => {
    let authors = [
        {
            author: blogs[0].author,
            blogs: 1
        }
    ]
    let max = 1
    let maxIndex = 0
    for (let i= 1; i<blogs.length; i++) {
        const index = authors.map(a => a.author).indexOf(blogs[i].author)
        if(index === -1){
            authors.push({
                author: blogs[i].author,
                blogs : 1
            })
        }
        else {
            authors[index].blogs += 1
            if(authors[index].blogs > max){
                max =authors[index].blogs
                maxIndex = index
            }
        }
//        console.log('round:', i, max, maxIndex, index, authors)
    }
    return (authors[maxIndex])
}

const mostLikes = (blogs) => {
    let authors = [
        {
            author: blogs[0].author,
            likes: blogs[0].likes
        }
    ]
    let max = 1
    let maxIndex = 0
    for (let i= 1; i<blogs.length; i++) {
        const index = authors.map(a => a.author).indexOf(blogs[i].author)
        if(index === -1){
            authors.push({
                author: blogs[i].author,
                likes : blogs[i].likes
            })
        }
        else {
            authors[index].likes += blogs[i].likes
            if(authors[index].likes > max){
                max =authors[index].likes
                maxIndex = index
            }
        }
//        console.log('round:', i, max, maxIndex, index, authors)
    }
    return (authors[maxIndex])
}

  module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
  }