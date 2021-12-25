import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogDetails from './BlogDetails'


const blog = {
  title: 'Component testing is done with react-testing-library',
  author: 'Full Stack Open',
  url: 'https://fullstackopen.com/en/part5/testing_react_apps#exercises-5-13-5-16',
  likes: 15,
  user: '61c38d6859486ff1d2366b56'
}

test('clicking the like-button twice calls event handler also twice', () => {

  const mockHandler = jest.fn()

  const component = render(
    <BlogDetails blog={blog} addLikePoints={mockHandler} />
  )

  const likeButton = component.getByText('like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})