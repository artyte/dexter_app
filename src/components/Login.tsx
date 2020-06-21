import React, {
  memo,
  useState,
  useRef,
  useEffect,
  // eslint-disable-next-line no-unused-vars
  FormEvent,
  // eslint-disable-next-line no-unused-vars
  MouseEvent,
  useCallback,
} from 'react'
// import { useAsync } from 'react-async-hook'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import close from '../assets/close.svg'
import facebook from '../assets/facebook.svg'
import { Overlay } from '../styles/Common'
import {
  Popup,
  LinkArea,
  SocialArea,
  CloseArea,
  FormArea,
  CloseButton,
  CloseIcon,
  SocialHeader,
  FacebookButton,
  FacebookIcon,
  FormHeader,
  Form,
  Field,
  FieldError,
  LoginButton,
  CreateButton,
} from '../styles/Login'
// import FacebookLogin from 'react-facebook-login'
// import GoogleLogin from 'react-google-login'
// import google from './assets/google.svg'

/** Checks whether username is an email */
const usernameChecker = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
)

/**
 * @param setUserCache: Sets the user's details after login or logout. This helps the web app to understand what login state the app is in now and what kind of information to show.
 * @param toggleLogin: Toggles the popup for the login page.
 */
type props = {
  setUserCache: (token: string, expiry: number, user: string) => void
  popup: boolean
  toggleLogin: () => void
  renderProduction?: boolean
  testId?: string
  testPassword?: string
  testClose?: string
  testOverlay?: string
  testLogin?: string
  testCreate?: string
  testUserError?: string
  testPassError?: string
  testResponse?: string
}
/**
 * Creates the login page. This page is a popup.
 *
 * @type props Refer to type props
 */
const Login = ({
  setUserCache,
  popup,
  toggleLogin,
  renderProduction,
  testId,
  testPassword,
  testClose,
  testOverlay,
  testLogin,
  testCreate,
  testUserError,
  testPassError,
  testResponse,
}: props) => {
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [userError, setUserError] = useState('')
  const [passError, setPassError] = useState('')
  const [submit, setSubmit] = useState('')
  const [response, setResponse] = useState('')
  const username = useRef<HTMLInputElement>(null)
  const password = useRef<HTMLInputElement>(null)

  /**
   * @param accessToken: Contains the token from logging in to Facebook.
   * @param data_access_expiration_time: How long does it take for accessToken to expire.
   * @param email: The email of the facebook login.
   */
  type response = {
    accessToken: string
    // eslint-disable-next-line camelcase
    data_access_expiration_time: string
    email: string
  }
  /**
   * This sets the necessary variables from FaceBook's login API.
   *
   * @param response: Contains FaceBook login API's necessary variables.
   */
  const responseFacebook = (loginResponse: response) => {
    const token = loginResponse.accessToken
    const expiry = loginResponse.data_access_expiration_time
    const facebookUser = loginResponse.email
    setUserCache(token, Number(expiry) ?? 0, facebookUser)
  }

  /**
   * @param onClick: Refer to react-facebook-login api for its onClick function.
   */
  type renderProps = {
    onClick: ((event: MouseEvent) => void) | undefined
  }
  /** Makes the signing in or creating account with a social api grid area */
  const makeSocial = () => {
    const base = <SocialHeader>Continue With</SocialHeader>
    const mustRenderProduction = renderProduction ?? true
    if (mustRenderProduction) {
      return (
        <>
          {base}
          <FacebookLogin
            appId='172414087525411'
            fields='name,email,picture'
            callback={responseFacebook}
            render={(renderProps: renderProps) => (
              <FacebookButton onClick={renderProps.onClick}>
                <FacebookIcon src={facebook} alt='facebook' />
              </FacebookButton>
            )}
          />
        </>
      )
    }
    return base
  }

  useEffect(() => {
    const login = async (body: Object) => {
      try {
        const res = await fetch('https://localhost:3000/graphql', {
          method: 'POST',
          body: JSON.stringify(body),
          headers: {
            'Content-Type': 'application/json',
          },
        })

        const data = await res.json()

        const errmsg = data?.errors?.[0]?.message ?? ''
        setResponse(errmsg)

        const { token, expiration } = data?.data[submit] ?? ''
        setUserCache(token, Number(expiration) ?? 0, user)
      } catch (error) {
        setResponse('Connection failed')
      }
    }

    if (user && pass && submit) {
      let body = {}
      if (submit === 'signup') {
        body = {
          query: `
          mutation {
            ${submit}(user: {
              username: "${user}",
              password: "${pass}",
              }) {
                token
                expiration
              }
          }
        `,
        }
      } else if (submit === 'login') {
        body = {
          query: `
          query {
            ${submit}(username: "${user}", password: "${pass}") {
              token
              expiration
            }
          }
        `,
        }
      }
      login(body)
    }
  }, [user, pass, submit, setUserCache])

  /**
   * This tells the application what type of submission is going to be done and sets the user and password into its appropriate React states.
   *
   * @param direction: The submission type, only accepts values login or signup.
   */
  const directSubmission = (direction: string) => {
    setSubmit(direction)

    const userString = username.current?.value ?? ''
    if (userString.length === 0) {
      setUserError('E-mail is empty!')
    } else if (!usernameChecker.test(userString)) {
      setUserError('Invalid E-mail Address!')
    } else {
      setUserError('')
    }
    setUser(userString)

    const passString = password.current?.value ?? ''
    if (passString.length < 6) {
      if (direction === 'signup') {
        setPassError('Please enter a password with 6 or more characters!')
      } else {
        setPassError('Invalid Password!')
      }
    } else {
      setPassError('')
    }
    setPass(passString)
  }

  /** Makes the signing in or creating account with field inputs grid area */
  const makeForm = () => (
    <>
      <FormHeader>OR</FormHeader>
      <Form onSubmit={(event: FormEvent) => event.preventDefault()}>
        <Field
          type='text'
          placeholder='e-mail'
          ref={username}
          data-testid={testId ?? ''}
        />
        {userError ? (
          <FieldError data-testid={testUserError ?? ''}>{userError}</FieldError>
        ) : null}
        <Field
          type='password'
          placeholder='password'
          ref={password}
          data-testid={testPassword ?? ''}
        />
        {passError ? (
          <FieldError data-testid={testPassError ?? ''}>{passError}</FieldError>
        ) : null}
        {response ? (
          <FieldError data-testid={testResponse ?? ''}>{response}</FieldError>
        ) : null}
        <LoginButton
          type='submit'
          data-testid={testLogin ?? ''}
          onClick={() => directSubmission('login')}
        >
          Login
        </LoginButton>
        <CreateButton
          type='submit'
          data-testid={testCreate ?? ''}
          onClick={() => directSubmission('signup')}
        >
          Create
        </CreateButton>
      </Form>
    </>
  )

  /**
   * Toggle off the login page.
   */
  const reset = useCallback(() => {
    toggleLogin()
    setSubmit('')
  }, [toggleLogin])

  /** Makes the close button grid area */
  const makeClose = () => (
    <CloseButton>
      <CloseIcon
        src={close}
        alt='close'
        onClick={reset}
        data-testid={testClose ?? ''}
      />
    </CloseButton>
  )

  if (popup) {
    return (
      <div>
        <Overlay onClick={reset} data-testid={testOverlay ?? ''} />
        <Popup>
          <LinkArea>
            <SocialArea>{makeSocial()}</SocialArea>
            <CloseArea>{makeClose()}</CloseArea>
          </LinkArea>
          <FormArea>{makeForm()}</FormArea>
        </Popup>
      </div>
    )
  }
  return null
}

export default memo(Login)
