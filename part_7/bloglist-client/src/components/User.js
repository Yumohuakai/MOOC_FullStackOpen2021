import React from 'react'
import {
  Link,
} from 'react-router-dom'
import { GreenDiv, UserBlogList } from './StyledComponents'

const User = ({ singleUser }) => {
  // console.log('what is singleUser----User----', singleUser)
  return (
    <GreenDiv>
      <h2>
        {singleUser
          ?  singleUser.name
          : null}
      </h2>
      <h3>added blog(s)</h3>
      <ul>
        {singleUser
          ?  singleUser.blogs.map(b =>
            <UserBlogList key={b._id}>
              <Link to={`/blogs/${b._id}`} className='link' > {b.title} </Link>
            </UserBlogList>
          )
          : null}
      </ul>
    </GreenDiv>
  )
}
export default User