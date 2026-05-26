import { it } from 'vitest'
import { render } from '@testing-library/react'

import Page from '../src/app/new/page'

it('renders new posting page', async () => {
  render(<Page />)
})