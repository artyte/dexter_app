import React, { useState } from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'
import Login from '../components/Login'

const Global: any = global
Global.fetch = jest.fn(() => {
  Promise.resolve({
    json: () =>
      Promise.resolve({
        token: 'abc',
        expiration: '123',
      }),
  })
})

beforeEach(() => {
  jest.clearAllMocks()
})
afterEach(cleanup)

// this is just a little hack to silence a warning that we'll get until we
// upgrade to 16.9: https://github.com/facebook/react/pull/14853
const originalError = console.error
beforeAll(() => {
  console.error = (...args: string[]) => {
    if (/Warning.*not wrapped in act/.test(args[0])) {
      return
    }
    originalError.call(console, ...args)
  }
})
afterAll(() => {
  console.error = originalError
})

const empty = jest.fn()

describe('Login', () => {
  it('failure tests', async () => {
    const testId = 'id'
    const testPassword = 'password'
    const testLogin = 'login'
    const testUserError = 'userError'
    const testPassError = 'passError'
    const testResponse = 'response'
    const { getByTestId, asFragment, queryByTestId } = render(
      <Login
        setUserCache={empty}
        popup
        toggleLogin={empty}
        renderProduction={false}
        testId={testId}
        testPassword={testPassword}
        testLogin={testLogin}
        testUserError={testUserError}
        testPassError={testPassError}
        testResponse={testResponse}
      />
    )
    expect(asFragment()).toMatchSnapshot()
    expect(Global.fetch).toHaveBeenCalledTimes(0)
    expect(queryByTestId(testUserError)).toBeNull()
    expect(queryByTestId(testPassError)).toBeNull()
    expect(queryByTestId(testResponse)).toBeNull()

    // both id and password are empty
    fireEvent.click(getByTestId(testLogin))
    expect(asFragment()).toMatchSnapshot()
    expect(fetch).toHaveBeenCalledTimes(0)
    expect(queryByTestId(testUserError)).toHaveTextContent('E-mail is empty!')
    expect(queryByTestId(testPassError)).toHaveTextContent('Invalid Password!')
    expect(queryByTestId(testResponse)).toBeNull()

    // id is not an email address
    await userEvent.type(getByTestId(testId), 'something')
    expect(asFragment()).toMatchSnapshot()
    expect(fetch).toHaveBeenCalledTimes(0)
    expect(queryByTestId(testUserError)).toHaveTextContent('E-mail is empty!')
    expect(queryByTestId(testPassError)).toHaveTextContent('Invalid Password!')
    expect(queryByTestId(testResponse)).toBeNull()

    fireEvent.click(getByTestId(testLogin))
    expect(asFragment()).toMatchSnapshot()
    expect(fetch).toHaveBeenCalledTimes(0)
    expect(queryByTestId(testUserError)).toHaveTextContent(
      'Invalid E-mail Address!'
    )
    expect(queryByTestId(testPassError)).toHaveTextContent('Invalid Password!')
    expect(queryByTestId(testResponse)).toBeNull()

    const failureMessage = 'Connection failed'
    Global.fetch.mockImplementationOnce(() => {
      const [, setResponse] = useState('')
      Promise.reject(setResponse(failureMessage))
    })

    await userEvent.type(getByTestId(testId), 'something@sad.com')
    expect(asFragment()).toMatchSnapshot()
    expect(fetch).toHaveBeenCalledTimes(0)
    expect(queryByTestId(testUserError)).toHaveTextContent(
      'Invalid E-mail Address!'
    )
    expect(queryByTestId(testPassError)).toHaveTextContent('Invalid Password!')
    expect(queryByTestId(testResponse)).toBeNull()

    await userEvent.type(getByTestId(testPassword), 'something')
    expect(asFragment()).toMatchSnapshot()
    expect(fetch).toHaveBeenCalledTimes(0)
    expect(queryByTestId(testUserError)).toHaveTextContent(
      'Invalid E-mail Address!'
    )
    expect(queryByTestId(testPassError)).toHaveTextContent('Invalid Password!')
    expect(queryByTestId(testResponse)).toBeNull()

    fireEvent.click(getByTestId(testLogin))
    expect(asFragment()).toMatchSnapshot()
    expect(fetch).toHaveBeenCalledTimes(1)
    expect(queryByTestId(testUserError)).toBeNull()
    expect(queryByTestId(testPassError)).toBeNull()
    expect(queryByTestId(testResponse)).toHaveTextContent(failureMessage)
  })

  it('success test', async () => {
    const testId = 'id'
    const testPassword = 'password'
    const testLogin = 'login'
    const testUserError = 'userError'
    const testPassError = 'passError'
    const testResponse = 'response'
    const { getByTestId, asFragment, queryByTestId } = render(
      <Login
        setUserCache={empty}
        popup
        toggleLogin={empty}
        renderProduction={false}
        testId={testId}
        testPassword={testPassword}
        testLogin={testLogin}
        testUserError={testUserError}
        testPassError={testPassError}
        testResponse={testResponse}
      />
    )
    expect(asFragment()).toMatchSnapshot()
    expect(Global.fetch).toHaveBeenCalledTimes(0)
    expect(queryByTestId(testUserError)).toBeNull()
    expect(queryByTestId(testPassError)).toBeNull()
    expect(queryByTestId(testResponse)).toBeNull()

    await userEvent.type(getByTestId(testId), 'something@asd.com')
    expect(asFragment()).toMatchSnapshot()
    expect(fetch).toHaveBeenCalledTimes(0)
    expect(queryByTestId(testUserError)).toBeNull()
    expect(queryByTestId(testPassError)).toBeNull()
    expect(queryByTestId(testResponse)).toBeNull()

    await userEvent.type(getByTestId(testPassword), 'something')
    expect(asFragment()).toMatchSnapshot()
    expect(fetch).toHaveBeenCalledTimes(0)
    expect(queryByTestId(testUserError)).toBeNull()
    expect(queryByTestId(testPassError)).toBeNull()
    expect(queryByTestId(testResponse)).toBeNull()

    fireEvent.click(getByTestId(testLogin))
    expect(asFragment()).toMatchSnapshot()
    expect(fetch).toHaveBeenCalledTimes(1)
    expect(queryByTestId(testUserError)).toBeNull()
    expect(queryByTestId(testPassError)).toBeNull()
    expect(queryByTestId(testResponse)).toBeNull()
  })
})

describe('Create account', () => {
  it('failure tests', async () => {
    const testId = 'id'
    const testPassword = 'password'
    const testCreate = 'create'
    const testUserError = 'userError'
    const testPassError = 'passError'
    const testResponse = 'response'
    const { getByTestId, asFragment, queryByTestId } = render(
      <Login
        setUserCache={empty}
        popup
        toggleLogin={empty}
        renderProduction={false}
        testId={testId}
        testPassword={testPassword}
        testCreate={testCreate}
        testUserError={testUserError}
        testPassError={testPassError}
        testResponse={testResponse}
      />
    )
    expect(asFragment()).toMatchSnapshot()
    expect(Global.fetch).toHaveBeenCalledTimes(0)
    expect(queryByTestId(testUserError)).toBeNull()
    expect(queryByTestId(testPassError)).toBeNull()
    expect(queryByTestId(testResponse)).toBeNull()

    // both id and password are empty
    fireEvent.click(getByTestId(testCreate))
    expect(asFragment()).toMatchSnapshot()
    expect(fetch).toHaveBeenCalledTimes(0)
    expect(queryByTestId(testUserError)).toHaveTextContent('E-mail is empty!')
    expect(queryByTestId(testPassError)).toHaveTextContent(
      'Please enter a password with 6 or more characters!'
    )
    expect(queryByTestId(testResponse)).toBeNull()

    // id is not an email address
    await userEvent.type(getByTestId(testId), 'something')
    expect(asFragment()).toMatchSnapshot()
    expect(fetch).toHaveBeenCalledTimes(0)
    expect(queryByTestId(testUserError)).toHaveTextContent('E-mail is empty!')
    expect(queryByTestId(testPassError)).toHaveTextContent(
      'Please enter a password with 6 or more characters!'
    )
    expect(queryByTestId(testResponse)).toBeNull()

    fireEvent.click(getByTestId(testCreate))
    expect(asFragment()).toMatchSnapshot()
    expect(fetch).toHaveBeenCalledTimes(0)
    expect(queryByTestId(testUserError)).toHaveTextContent(
      'Invalid E-mail Address!'
    )
    expect(queryByTestId(testPassError)).toHaveTextContent(
      'Please enter a password with 6 or more characters!'
    )
    expect(queryByTestId(testResponse)).toBeNull()

    const failureMessage = 'Connection failed'
    Global.fetch.mockImplementationOnce(() => {
      const [, setResponse] = useState('')
      Promise.reject(setResponse(failureMessage))
    })

    await userEvent.type(getByTestId(testId), 'something@sad.com')
    expect(asFragment()).toMatchSnapshot()
    expect(fetch).toHaveBeenCalledTimes(0)
    expect(queryByTestId(testUserError)).toHaveTextContent(
      'Invalid E-mail Address!'
    )
    expect(queryByTestId(testPassError)).toHaveTextContent(
      'Please enter a password with 6 or more characters!'
    )
    expect(queryByTestId(testResponse)).toBeNull()

    await userEvent.type(getByTestId(testPassword), 'something')
    expect(asFragment()).toMatchSnapshot()
    expect(fetch).toHaveBeenCalledTimes(0)
    expect(queryByTestId(testUserError)).toHaveTextContent(
      'Invalid E-mail Address!'
    )
    expect(queryByTestId(testPassError)).toHaveTextContent(
      'Please enter a password with 6 or more characters!'
    )
    expect(queryByTestId(testResponse)).toBeNull()

    fireEvent.click(getByTestId(testCreate))
    expect(asFragment()).toMatchSnapshot()
    expect(fetch).toHaveBeenCalledTimes(1)
    expect(queryByTestId(testUserError)).toBeNull()
    expect(queryByTestId(testPassError)).toBeNull()
    expect(queryByTestId(testResponse)).toHaveTextContent(failureMessage)
  })

  it('success test', async () => {
    const testId = 'id'
    const testPassword = 'password'
    const testCreate = 'create'
    const testUserError = 'userError'
    const testPassError = 'passError'
    const testResponse = 'response'
    const { getByTestId, asFragment, queryByTestId } = render(
      <Login
        setUserCache={empty}
        popup
        toggleLogin={empty}
        renderProduction={false}
        testId={testId}
        testPassword={testPassword}
        testCreate={testCreate}
        testUserError={testUserError}
        testPassError={testPassError}
        testResponse={testResponse}
      />
    )
    expect(asFragment()).toMatchSnapshot()
    expect(Global.fetch).toHaveBeenCalledTimes(0)
    expect(queryByTestId(testUserError)).toBeNull()
    expect(queryByTestId(testPassError)).toBeNull()
    expect(queryByTestId(testResponse)).toBeNull()

    await userEvent.type(getByTestId(testId), 'something@asd.com')
    expect(asFragment()).toMatchSnapshot()
    expect(fetch).toHaveBeenCalledTimes(0)
    expect(queryByTestId(testUserError)).toBeNull()
    expect(queryByTestId(testPassError)).toBeNull()
    expect(queryByTestId(testResponse)).toBeNull()

    await userEvent.type(getByTestId(testPassword), 'something')
    expect(asFragment()).toMatchSnapshot()
    expect(fetch).toHaveBeenCalledTimes(0)
    expect(queryByTestId(testUserError)).toBeNull()
    expect(queryByTestId(testPassError)).toBeNull()
    expect(queryByTestId(testResponse)).toBeNull()

    fireEvent.click(getByTestId(testCreate))
    expect(asFragment()).toMatchSnapshot()
    expect(fetch).toHaveBeenCalledTimes(1)
    expect(queryByTestId(testUserError)).toBeNull()
    expect(queryByTestId(testPassError)).toBeNull()
    expect(queryByTestId(testResponse)).toBeNull()
  })
})