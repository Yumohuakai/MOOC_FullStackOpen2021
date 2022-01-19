import React from 'react'
import { Link } from 'react-router-dom'

const UserList = ({ users }) => {
  return (
    <div>
      <h2>USER LIST</h2>
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
                  <td> <Link className='linkStyle' to={`/users/${u.id}`}>{u.name}</Link> </td>
                  <td> {u.blogs.length} </td>
                </tr>)
              : null
          }
        </tbody>
      </table>
    </div>
  )
}

export default UserList