import React from 'react'
import { Link } from 'react-router-dom'
import {
  UserListTd,
  HeadTwo,
  HeadTwoTh,
  UserTable,
  HomeBodyDiv
} from './StyledComponents'

const UserList = ({ users }) => {
  return (
    <HomeBodyDiv>
      <HeadTwo>USER LIST</HeadTwo>
      <UserTable>
        <tbody>
          <tr>
            <HeadTwoTh>USER NAME </HeadTwoTh>
            <HeadTwoTh>BLOGS CREATED</HeadTwoTh>
          </tr>
          {
            users
              ? users.map(u =>
                <tr key={u.id}>
                  <UserListTd>
                    <Link to={`/users/${u.id}`} className='link' >{u.name}</Link>
                  </UserListTd>
                  <UserListTd>
                    {u.blogs.length}
                  </UserListTd>
                </tr>)
              : null
          }
        </tbody>
      </UserTable>
    </HomeBodyDiv>
  )
}

export default UserList