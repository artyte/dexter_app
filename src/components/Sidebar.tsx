import React, { memo, useContext, useState, useCallback } from 'react'
import profile from '../assets/user.svg'
import pc from '../assets/pc.svg'
import team from '../assets/team.svg'
import port from '../assets/port.svg'
import login from '../assets/login.svg'
import logout from '../assets/logout.svg'
import UserContext from '../context/User'
import { Nav, Button, TopIcons, BottomIcons } from '../styles/Sidebar'

/**
 * @param blur: The state of whether to blur this page so that window popups can happen.
 * @param toggleBox: Toggles between team page and teams (otherwise known as PC) page.
 * @param toggleProfile: Toggles the popup for the user profile's page.
 * @param togglePort: Toggles the popup for the import/export page.
 * @param toggleLogin: Toggles the popup for the login page.
 * @param testNavBar: Test id for testing navbar
 * @param testSwitchBox: Test id for testing team/pc button
 */
type props = {
  blur: boolean
  toggleBox: () => void
  toggleProfile: () => void
  togglePort: () => void
  toggleLogin: () => void
  testNavBar?: string
  testSwitchBox?: string
  testToggleProfile?: string
  testTogglePort?: string
  testToggleLogin?: string
}
/**
 * This is the sidebar of the web app, containing links to popups and toggling between 2 pages.
 *
 * @type props: Refer to type props
 */
const Sidebar = ({
  blur,
  toggleBox,
  toggleProfile,
  togglePort,
  toggleLogin,
  testNavBar,
  testSwitchBox,
  testToggleProfile,
  testTogglePort,
  testToggleLogin,
}: props) => {
  const { token } = useContext(UserContext)

  const [boxAlt, setBoxAlt] = useState('team')
  const [boxSrc, setBoxSrc] = useState(team)

  /** Returns the clickable profile icon. */
  const makeProfile = () => (
    <TopIcons>
      <Button onClick={toggleProfile} data-testid={testToggleProfile ?? ''}>
        <img src={profile} alt='profile' />
      </Button>
    </TopIcons>
  )

  /** Toggles between the icon of team or teams (otherwise known as pc) page. */
  const changeTeam = useCallback(() => {
    if (boxAlt === 'team') {
      setBoxAlt('pc')
      setBoxSrc(pc)
    } else if (boxAlt === 'pc') {
      setBoxAlt('team')
      setBoxSrc(team)
    }
    toggleBox()
  }, [boxAlt, toggleBox])

  /** Returns the clickable team/pc icon. */
  const makeBox = () => (
    <TopIcons>
      <Button onClick={changeTeam} data-testid={testSwitchBox ?? ''}>
        <img src={boxSrc} alt={boxAlt} />
      </Button>
    </TopIcons>
  )

  /** Returns the clickable import/export icon. */
  const makePort = () => (
    <TopIcons>
      <Button onClick={togglePort} data-testid={testTogglePort ?? ''}>
        <img src={port} alt='port' />
      </Button>
    </TopIcons>
  )

  /** Returns the clickable login or logout icon. */
  const makeAccess = () => (
    <BottomIcons>
      <Button onClick={toggleLogin} data-testid={testToggleLogin ?? ''}>
        <img src={token ? logout : login} alt={token ? 'logout' : 'login'} />
      </Button>
    </BottomIcons>
  )

  return (
    <Nav blur={blur} data-testid={testNavBar ?? ''}>
      {makeProfile()}
      {makeBox()}
      {makePort()}
      {makeAccess()}
    </Nav>
  )
}

export default memo(Sidebar)
