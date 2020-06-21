import React from 'react'
import { Overlay } from '../styles/Common'
import { Popup } from '../styles/Port'

/**
 * @param popup: The state of whether to enable viewing this page.
 * @param togglePort: Toggles the popup for the import/export page.
 */
type props = {
  popup: boolean
  togglePort: () => void
}
/**
 * This is the import or export page. This web app uses pokemonshowdown as a target export string, and
 * uses the same format for importing. Submitting this import would generate a new team for the account.
 * The import function is removed when the user is not logged in.
 *
 * @type props: Refer to the type props
 */
const Port = ({ popup, togglePort }: props) => {
  if (popup) {
    return (
      <>
        <Overlay onClick={togglePort} />
        <Popup>
          <h1>Port</h1>
        </Popup>
      </>
    )
  }
  return null
}

export default Port
