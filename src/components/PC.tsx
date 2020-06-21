import React from 'react'

/**
 * @param popup: The state of whether to enable viewing this page.
 * @param blur: The state of whether to blur this page so that window popups can happen.
 */
type props = {
  popup: boolean
  blur: boolean
}
/**
 * The teams page is produced and returned here. Unlike the team page, which is just an overview dashboard, the teams page contains all the teams owned by the user. This can only be toggled to from the team page if the user is logged in.
 *
 * @type props: Refer to the type props
 */
const PC = ({ popup, blur }: props) => {
  return (
    <div
      style={{
        display: popup ? 'block' : 'none',
        filter: blur ? 'blur(5px)' : 'blur(0px)',
      }}
    >
      <h1>PC</h1>
    </div>
  )
}

export default PC
