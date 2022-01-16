import React, { useState, useEffect } from 'react'
import userService from '../services/users'
import { useSelector } from 'react-redux'

const Users = () => {
  const [users, setUsers] = useState(null)

  // const blogs = useSelector(({ blogs }) => {
  //     // console.log('inside BlogList----------blogs--', blogs)
  //     return blogs
  //   })

  const user = useSelector(({ user }) => {
    // console.log('inside BlogList--------user----', user)
    return user
  })

  useEffect(() => {
    if (user) {
      userService
        .getAll()
        .then(users =>
          setUsers(users)
        )
      // console.log('--------all users', users)
    }
  }, [user])

  return (
    <div>
      <h3>USER LIST</h3>
      <table>
        <tbody>
          <tr>
            <th> </th>
            <th>blogs created</th>
          </tr>
          {
            users
              ? users.map(u =>
                <tr key={u.id}>
                  <td> {u.name} </td>
                  <td> {u.blogs.length} </td>
                </tr>)
              : null
          }
        </tbody>
      </table>
    </div>
  )
}

export default Users