import React from 'react'
import { Overlay } from '../styles/Common'
import { Popup } from '../styles/Profile'

type props = {
  popup: boolean
  toggleProfile: () => void
}
/**
 * The profile page of the user is returned here.
 *
 * @type props: Refer to type props
 */
const Profile = ({ popup, toggleProfile }: props) => {
  if (popup) {
    return (
      <>
        <Overlay onClick={toggleProfile} />
        <Popup>
          <h1>Profile</h1>
        </Popup>
      </>
    )
  }
  return null
}

export default Profile
