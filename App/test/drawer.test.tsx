import {it, expect} from 'vitest'
import {render, screen, fireEvent} from '@testing-library/react'

import Drawer from '../src/components/drawerButton'

it('starts closed', async () => {
  render(<Drawer />)
  const menu = await screen.findByLabelText('open menu')
  expect(menu).not.toBeNull()
})

it('opens when clicked', async () => {
  render(<Drawer />)
  const menu = await screen.findByLabelText('open menu')
  fireEvent.click(menu)
  const newmenu = await screen.findByLabelText('close menu')
  expect(newmenu).not.toBeNull()
})