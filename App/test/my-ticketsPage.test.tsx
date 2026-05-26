import { it } from 'vitest'
import { render } from '@testing-library/react'

import Page from '../src/app/my-tickets/page'

it('renders my tickets page', async () => {
  render(<Page />)
})