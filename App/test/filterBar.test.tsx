import { it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'

import FilterBar from '../src/components/filterBar'

it('selects a ceremony when clicked', async () => {
  const setFunc = vi.fn()
  render(<FilterBar setFunc={setFunc} />)
  const cowell = await screen.findByText('Cowell College')
  fireEvent.click(cowell)
  const go = await screen.findByText('Go')
  fireEvent.click(go)
  expect(setFunc).toHaveBeenCalledWith(expect.objectContaining({
    ceremonies: ['cowell'],
  }))
})

it('selects a method when clicked', async () => {
  const setFunc = vi.fn()
  render(<FilterBar setFunc={setFunc} />)
  const free = await screen.findByText('Free')
  fireEvent.click(free)
  const go = await screen.findByText('Go')
  fireEvent.click(go)
  expect(setFunc).toHaveBeenCalledWith(expect.objectContaining({
    method: ['give'],
  }))
})

it('deselects a ceremony when clicked again', async () => {
  const setFunc = vi.fn()
  render(<FilterBar setFunc={setFunc} />)
  const cowell = await screen.findByText('Cowell College')
  fireEvent.click(cowell)
  fireEvent.click(cowell)
  const go = await screen.findByText('Go')
  fireEvent.click(go)
  expect(setFunc).toHaveBeenCalledWith(expect.not.objectContaining({
    ceremonies: expect.anything(),
  }))
})

it('deselects a method when clicked again', async () => {
  const setFunc = vi.fn()
  render(<FilterBar setFunc={setFunc} />)
  const free = await screen.findByText('Free')
  fireEvent.click(free)
  fireEvent.click(free)
  const go = await screen.findByText('Go')
  fireEvent.click(go)
  expect(setFunc).toHaveBeenCalledWith(expect.not.objectContaining({
    method: expect.anything(),
  }))
})

it('changes term when selected', async () => {
  const setFunc = vi.fn()
  render(<FilterBar setFunc={setFunc} />)
  const select = await screen.findByRole('combobox')
  fireEvent.mouseDown(select)
  const option = await screen.findByRole('option', {name: 'Spring 2025'})
  fireEvent.click(option)
  const go = await screen.findByText('Go')
  fireEvent.click(go)
  expect(setFunc).toHaveBeenCalledWith(expect.objectContaining({
    term: 'Spring 2025',
  }))
})

it('unchecks available when clicked', async () => {
  const setFunc = vi.fn()
  render(<FilterBar setFunc={setFunc} />)
  const checkboxes = await screen.findAllByRole('checkbox')
  fireEvent.click(checkboxes[0])
  const go = await screen.findByText('Go')
  fireEvent.click(go)
  expect(setFunc).toHaveBeenCalledWith(expect.not.objectContaining({
    available: true,
  }))
})

it('rechecks available when clicked again', async () => {
  const setFunc = vi.fn()
  render(<FilterBar setFunc={setFunc} />)
  const checkboxes = await screen.findAllByRole('checkbox')
  fireEvent.click(checkboxes[0])
  fireEvent.click(checkboxes[0])
  const go = await screen.findByText('Go')
  fireEvent.click(go)
  expect(setFunc).toHaveBeenCalledWith(expect.objectContaining({
    available: true,
  }))
})

it('checks verified when clicked', async () => {
  const setFunc = vi.fn()
  render(<FilterBar setFunc={setFunc} />)
  const checkboxes = await screen.findAllByRole('checkbox')
  fireEvent.click(checkboxes[1])
  const go = await screen.findByText('Go')
  fireEvent.click(go)
  expect(setFunc).toHaveBeenCalledWith(expect.objectContaining({
    verified: true,
  }))
})

it('unchecks verified when clicked again', async () => {
  const setFunc = vi.fn()
  render(<FilterBar setFunc={setFunc} />)
  const checkboxes = await screen.findAllByRole('checkbox')
  fireEvent.click(checkboxes[1])
  fireEvent.click(checkboxes[1])
  const go = await screen.findByText('Go')
  fireEvent.click(go)
  expect(setFunc).toHaveBeenCalledWith(expect.not.objectContaining({
    verified: expect.anything(),
  }))
})