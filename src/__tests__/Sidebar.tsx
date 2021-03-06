import React, { useState } from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'
import { toHaveStyle } from '@testing-library/jest-dom/matchers'
import Sidebar from '../components/Sidebar'

expect.extend({ toHaveStyle })

afterEach(cleanup)

const empty = jest.fn()

describe('Render navbar', () => {
  describe('with blur', () => {
    it('in team page', () => {
      const testNavId = 'navBar'
      const testToggleProfileId = 'toggleProfile'
      const SidebarWrapper = () => {
        const [blur, setBlur] = useState(false)

        return (
          <>
            <Sidebar
              togglePort={empty}
              toggleLogin={empty}
              toggleBox={empty}
              toggleProfile={jest.fn(() => setBlur(!blur))}
              blur={blur}
              testNavBar={testNavId}
              testToggleProfile={testToggleProfileId}
            />
          </>
        )
      }
      const { getByTestId, asFragment } = render(
        <SidebarWrapper />
      )

      expect(getByTestId(testNavId)).toHaveStyle('filter: blur(0px);')

      expect(asFragment()).toMatchSnapshot()
      
      fireEvent.click(getByTestId(testToggleProfileId))
      expect(asFragment()).toMatchSnapshot()
      expect(getByTestId(testNavId)).toHaveStyle('filter: blur(5px);')
    })

    it('in pc page', () => {
      const testNavId = 'navBar'
      const testToggleProfileId = 'toggleProfile'
      const testSwitchBoxId = 'switchBox'
      const SidebarWrapper = () => {
        const [blur, setBlur] = useState(false)

        return (
          <>
            <Sidebar
              togglePort={empty}
              toggleLogin={empty}
              toggleBox={empty}
              toggleProfile={jest.fn(() => setBlur(!blur))}
              blur={blur}
              testNavBar={testNavId}
              testToggleProfile={testToggleProfileId}
              testSwitchBox={testSwitchBoxId}
            />
          </>
        )
      }
      const { getByTestId, asFragment } = render(<SidebarWrapper />)

      fireEvent.click(getByTestId(testSwitchBoxId))
      expect(getByTestId(testNavId)).toHaveStyle('filter: blur(0px);')

      expect(asFragment()).toMatchSnapshot()

      fireEvent.click(getByTestId(testToggleProfileId))
      expect(asFragment()).toMatchSnapshot()
      expect(getByTestId(testNavId)).toHaveStyle('filter: blur(5px);')
    })
  })

  it('without blur', () => {
    const testNavId = 'navBar'
    const testSwitchBoxId = 'switchBox'
    const { getByTestId, asFragment } = render(
      <Sidebar
        toggleProfile={empty}
        togglePort={empty}
        toggleLogin={empty}
        toggleBox={empty}
        blur={false}
        testNavBar={testNavId}
        testSwitchBox={testSwitchBoxId}
      />
    )
    expect(asFragment()).toMatchSnapshot()
    expect(getByTestId(testNavId)).toHaveStyle('filter: blur(0px);')

    fireEvent.click(getByTestId(testSwitchBoxId))
    expect(asFragment()).toMatchSnapshot()
    expect(getByTestId(testNavId)).toHaveStyle('filter: blur(0px);')
  })
})
