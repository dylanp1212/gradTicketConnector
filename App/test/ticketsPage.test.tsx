import { it } from 'vitest'
import { render } from '@testing-library/react'

import Page from '../src/app/tickets/page'

it('renders tickets page', async () => {
  render(<Page />)
})