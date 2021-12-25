import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'

const blog = {
  title: 'Component testing is done with react-testing-library',
  author: 'Full Stack Open',
  url: 'https://fullstackopen.com/en/part5/testing_react_apps#exercises-5-13-5-16',
  likes: 15,
  user: '61c38d6859486ff1d2366b56'
}

test('renders content', () => {

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
  expect(component.container).toHaveTextContent(
    'Full Stack Open'
  )
  expect(component.container).not.toHaveTextContent(
    'https://fullstackopen.com/en/part5/testing_react_apps#exercises-5-13-5-16'
  )
  expect(component.container).not.toHaveTextContent(
    'likes 15'
  )
})

test('clicking the button shows more details of the blog', () => {

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} showMoreDetails={mockHandler} />
  )

  const divBeforeClicked = component.container.querySelector('.blog')
  expect(divBeforeClicked).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
  expect(divBeforeClicked).toHaveTextContent(
    'Full Stack Open'
  )
  expect(divBeforeClicked).not.toHaveTextContent(
    'https://fullstackopen.com/en/part5/testing_react_apps#exercises-5-13-5-16'
  )
  expect(divBeforeClicked).not.toHaveTextContent(
    'likes: 15'
  )
  //   component.debug()
  //   const mybutton = component.container.querySelector('button')
  const mybutton = component.getByText('view')

  //   const button = component.getByText('view')
  fireEvent.click(mybutton)
  //   component.debug()

  const divAfterClicked = component.container.querySelector('.blog')
  expect(divAfterClicked).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
  expect(divAfterClicked).toHaveTextContent(
    'Full Stack Open'
  )
  expect(divAfterClicked).toHaveTextContent(
    'https://fullstackopen.com/en/part5/testing_react_apps#exercises-5-13-5-16'
  )
  expect(divAfterClicked).toHaveTextContent(
    'likes: 15'
  )
})