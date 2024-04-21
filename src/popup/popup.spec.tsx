import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Popup from './popup'

// Now you can use the mocked chrome object in your tests
describe('Popup', () => {
  beforeEach(() => {
    const mockData = { skipIntro: true }
    global.chrome = {
      runtime: {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        lastError: null
      },
      storage: {
        sync: {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          get: jest.fn((_, callback) => { callback(mockData) }),
          set: jest.fn()
        }
      }
    }
  })
  it('renders correctly', () => {
    const { getByAltText, getByRole } = render(<Popup />)

    // Check if the logo is in the document
    expect(getByAltText('UninterruptedFlix Logo')).toBeInTheDocument()

    // Check if the checkbox is in the document
    const checkbox = getByRole('checkbox')
    expect(checkbox).toBeInTheDocument()

    // Check if the checkbox can be checked
    fireEvent.click(checkbox)
    expect(checkbox).toBeChecked()

    // Check if chrome.storage.sync.set was called when the checkbox was clicked
    expect(chrome.storage.sync.set).toHaveBeenCalledWith({ skipIntro: true }, expect.any(Function))
  })
})
