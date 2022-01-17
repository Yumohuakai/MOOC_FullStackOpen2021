import React from 'react'

const User = ({ singleUser }) => {
  console.log('what is singleUser----User----', singleUser)
  return (
    <div>
      <h2>
        {singleUser
          ?  singleUser.name
          : null}
      </h2>
      <h3>added blog(s)</h3>
      <ul>
        {singleUser
          ?  singleUser.blogs.map(b =>
            <li key={b._id}>
              {b.title}
            </li>
          )
          : null}
      </ul>
    </div>
  )
}
export default User