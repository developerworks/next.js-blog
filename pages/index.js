// export default () => (
//   <div>Welcome to next.js!</div>
// )
import React from 'react'

import DefaultLayout from '../layouts/DefaultLayout'
import Post from '../components/PostItem'
import posts from '../data/posts.json'

const IndexPage = ({ posts }) => (
  <DefaultLayout>
    <ul>
      {posts.map(p => (
        <Post key={p.title} post={p} />
      ))}
    </ul>
  </DefaultLayout>
)

IndexPage.getInitialProps = async ({ req }) => {
  // const res = await getPosts()
  // const json = await res.json()
  return { posts: posts }
}


export default IndexPage
