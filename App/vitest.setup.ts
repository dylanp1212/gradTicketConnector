import { cleanup } from '@testing-library/react'
import { afterEach, beforeEach, vi } from 'vitest'

export const mockRouter = {
  push: vi.fn(),
}

export const routerSpy = vi.spyOn(mockRouter, 'push')

vi.mock('next/navigation', () => ({
  useRouter: () => mockRouter,
}))

vi.mock('next/headers', () => ({
  cookies: vi.fn(() => Promise.resolve({
    get: vi.fn(() => undefined),
    delete: vi.fn(),
  })),
}))

vi.mock('./src/listing/service', () => ({
  ListingService: class {
    getAllListings = vi.fn().mockResolvedValue([])
    getAllListingsByMember = vi.fn().mockResolvedValue([])
    getListingById = vi.fn().mockResolvedValue(null)
    createNewListing = vi.fn().mockResolvedValue(null)
    editQuantity = vi.fn().mockResolvedValue(null)
    editMethod = vi.fn().mockResolvedValue(null)
    editAvailable = vi.fn().mockResolvedValue(null)
  },
}))

vi.mock('./src/saved/service', () => ({
  SavedService: class {
    saveListing = vi.fn().mockResolvedValue('')
    removeSavedListing = vi.fn().mockResolvedValue('')
    checkSaved = vi.fn().mockResolvedValue(false)
    getAllSavedListings = vi.fn().mockResolvedValue([])
  },
}))

vi.mock('./src/member/service', () => ({
  MemberService: class {
    getName = vi.fn().mockResolvedValue(undefined)
  },
}))

vi.mock('./src/message/service', () => ({
  MessageService: class {
    createMessage = vi.fn().mockResolvedValue(null)
    getAllConvos = vi.fn().mockResolvedValue([])
    getConvo = vi.fn().mockResolvedValue([])
  },
}))

beforeEach(() => {
  vi.clearAllMocks()
})

afterEach(() => {
  cleanup()
})
