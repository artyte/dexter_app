import React, { useState, useCallback } from 'react'
import { useAsync } from 'react-async-hook'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import cache from 'localforage'
import { Application, SidebarArea, DashboardArea } from '../styles/App'
import Profile from './Profile'
import Team from './Team'
import PC from './PC'
import Port from './Port'
import Login from './Login'
import Sidebar from './Sidebar'
import UserContext from '../context/User'

/**
 * Welcome to Dexter. This is a team builder app for aspiring Pokemon esports players. This file creates
 * the initial abstract structure of the entire single page web app.
 */
const App = () => {
  const [blur, setBlur] = useState(false)
  const [expiry, setExpiry] = useState(0)
  const [token, setToken] = useState('')
  const [user, setUser] = useState('')
  const [popup, setPopup] = useState({
    profile: false,
    port: false,
    login: false,
  })

  const cacheSet = useAsync(async () => {
    const asyncExpiry = ((await cache.getItem('expiry')) ?? 0) as number
    const asyncToken = ((await cache.getItem('token')) ?? '') as string
    const asyncUser = ((await cache.getItem('user')) ?? '') as string
    setExpiry(asyncExpiry)
    setToken(asyncToken)
    setUser(asyncUser)

    return true
  }, [])

  // remove any local login cache if token does not exist or if token has expired
  if ((!token || Date.now() / 1000 >= expiry) && cacheSet.result) {
    cache.setItem('token', '')
    cache.setItem('expiry', 0)
    cache.setItem('user', '')
  }

  /**
   * Toggles the popup for the user profile's page.
   */
  const toggleProfile = useCallback(() => {
    setPopup({
      ...popup,
      profile: !popup.profile,
      port: false,
      login: false,
    })
    setBlur(!popup.profile)
  }, [popup])

  /**
   * Toggles between team page and teams (otherwise known as PC) page.
   */
  // const toggleBox = useCallback(() => {
  //   setPopup({
  //     ...popup,
  //     team: !popup.team,
  //     pc: !popup.pc,
  //   })
  // }, [])

  /**
   * Toggles the popup for the import/export page.
   */
  const togglePort = useCallback(() => {
    setPopup({
      ...popup,
      profile: false,
      port: !popup.port,
      login: false,
    })
    setBlur(!popup.port)
  }, [popup])

  /**
   * Toggles the popup for the login page.
   */
  const toggleLogin = useCallback(async () => {
    if (token && !blur && !popup.login) {
      setPopup({
        ...popup,
        profile: false,
        port: false,
        login: false,
      })
      setBlur(false)
      cache.setItem('token', '')
      cache.setItem('expiry', 0)
      cache.setItem('user', '')
      window.location.reload()
    } else if (!token && blur && popup.login) {
      setPopup({
        ...popup,
        profile: false,
        port: false,
        login: false,
      })
      setBlur(false)
    } else if (!token && !blur && !popup.login) {
      setPopup({
        ...popup,
        profile: false,
        port: false,
        login: true,
      })
      setBlur(true)
    }
  }, [blur, popup, token])

  /**
   * Sets the user's details after login or logout. This helps the web app to understand what login state the app is in now and what kind of information to show.
   *
   * @param token: Token of login
   * @param expiry: Expiry of token
   * @param user: Username
   */
  const setUserCache = useCallback(
    (cacheToken: string, cacheExpiry: number, cacheUser: string) => {
      setToken(cacheToken)
      setExpiry(cacheExpiry)
      setUser(cacheUser)
      cache.setItem('token', cacheToken)
      cache.setItem('expiry', cacheExpiry)
      cache.setItem('user', cacheUser)
      window.location.reload()
    },
    []
  )

  /** Returns the side bar. */
  const makeSidebar = () => (
    <Sidebar
      toggleProfile={toggleProfile}
      togglePort={togglePort}
      toggleLogin={toggleLogin}
      blur={blur}
    />
  )

  /** Returns the dashboard contents. */
  const makeDashboard = () => (
    <>
      <Switch>
        <Route path={['/', '/team']} exact>
          <Team blur={blur} />
        </Route>
        <Route path='/pc'>
          <PC blur={blur} />
        </Route>
      </Switch>
      <Profile toggleProfile={toggleProfile} popup={popup.profile} />
      <Port togglePort={togglePort} popup={popup.port} />
      <Login
        toggleLogin={toggleLogin}
        popup={popup.login}
        setUserCache={setUserCache}
      />
    </>
  )

  const sharedAppValues = {
    token,
    user,
    expiry,
  }
  return (
    <UserContext.Provider value={sharedAppValues}>
      <Application>
        <Router>
          <SidebarArea>{makeSidebar()}</SidebarArea>
          <DashboardArea>{makeDashboard()}</DashboardArea>
        </Router>
      </Application>
    </UserContext.Provider>
  )
}

export default App
