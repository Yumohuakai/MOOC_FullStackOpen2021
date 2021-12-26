import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', () => {

  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog} />
  )

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(title, {
    target: { value: 'Component testing is done with react-testing-library' }
  })
  fireEvent.change(author, {
    target: { value: 'Full Stack Open' }
  })
  fireEvent.change(url, {
    target: { value: 'https://fullstackopen.com/en/part5/testing_react_apps#exercises-5-13-5-16' }
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  //   console.log('hell-----------', createBlog.mock.calls)
  expect(createBlog.mock.calls[0][0].title).toBe('Component testing is done with react-testing-library')
  expect(createBlog.mock.calls[0][0].author).toBe('Full Stack Open')
  expect(createBlog.mock.calls[0][0].url).toBe('https://fullstackopen.com/en/part5/testing_react_apps#exercises-5-13-5-16')
})