import {it, expect, vi} from 'vitest'
import {render, screen, fireEvent} from '@testing-library/react'
import {routerSpy} from '../vitest.setup'

import Drawer from '../src/components/drawerButton'
import DrawerListItem from '../src/components/drawerListItem'

const opendrawer = async () => {
  render(<Drawer />)
  const menu = await screen.findByLabelText('open menu')
  fireEvent.click(menu)
}

it('opens when menu clicked', async () => {
  await opendrawer()
  const newmenu = await screen.findByLabelText('close menu')
  expect(newmenu).not.toBeNull()
})

it('closes when menu clicked again', async () => {
  await opendrawer()
  const close = await screen.findByLabelText('close menu')
  fireEvent.click(close)
  const newmenu = await screen.findByLabelText('open menu')
  expect(newmenu).not.toBeNull()
})

it('closes when click away from drawer', async () => {
  await opendrawer()
  fireEvent.keyDown(document.activeElement ?? document, {key: 'Escape'})
  const newmenu = await screen.findByLabelText('open menu')
  expect(newmenu).not.toBeNull()
})

it('goes to right page when clicked', async () => {
  await opendrawer()
  const tickets = await screen.findByText('Browse Tickets')
  fireEvent.click(tickets)
  await vi.waitFor(() => {
    expect(routerSpy).toHaveBeenCalledWith(`/tickets`)
  })
})

it('renders list item fine with unexpected title', async () => {
  render(<DrawerListItem title='Unexpected Title' />)
  const title = await screen.findByText('Unexpected Title')
  expect(title).not.toBeNull()
})
