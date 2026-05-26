import { cleanup } from '@testing-library/react'
import { afterEach, beforeEach, vi } from 'vitest'

export const mockRouter = {
  push: vi.fn(),
}

export const routerSpy = vi.spyOn(mockRouter, 'push')

vi.mock('next/navigation', () => ({
  useRouter: () => mockRouter,
}))

beforeEach(() => {
  vi.clearAllMocks()
})

afterEach(() => {
  cleanup()
})
