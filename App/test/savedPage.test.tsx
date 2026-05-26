import { it } from 'vitest'
import { render } from '@testing-library/react'

import Page from '../src/app/saved/page'

it('renders saved page', async () => {
  render(<Page />)
})