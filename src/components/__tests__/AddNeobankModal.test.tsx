import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import AddNeobankModal from "../AddNeobankModal"
import { renderWithI18n } from "@/test-utils"

const mockOnClose = jest.fn()
const originalFetch = global.fetch

function renderModal() {
  return renderWithI18n(<AddNeobankModal onClose={mockOnClose} />)
}

beforeEach(() => {
  mockOnClose.mockClear()
})

afterEach(() => {
  global.fetch = originalFetch
  jest.restoreAllMocks()
})

describe("AddNeobankModal - Form Sections", () => {
  describe("Section headings", () => {
    it("should render 'Contact Info' section heading", () => {
      renderModal()
      expect(
        screen.getByText("Contact Info")
      ).toBeInTheDocument()
    })
  })

  describe("Contact Info section fields", () => {
    it("should have a contact name input", () => {
      renderModal()
      expect(
        screen.getByPlaceholderText("Your name")
      ).toBeInTheDocument()
    })

    it("should have an email input", () => {
      renderModal()
      expect(
        screen.getByPlaceholderText("contact@example.com")
      ).toBeInTheDocument()
    })

    it("should have a telegram input", () => {
      renderModal()
      expect(
        screen.getByPlaceholderText("@username")
      ).toBeInTheDocument()
    })

    it("should have a message textarea", () => {
      renderModal()
      expect(
        screen.getByPlaceholderText("Your message...")
      ).toBeInTheDocument()
    })
  })

  describe("Form is a single form element", () => {
    it("should have exactly one form element", () => {
      const { container } = renderModal()
      const forms = container.querySelectorAll("form")
      expect(forms).toHaveLength(1)
    })
  })

  describe("Form submission", () => {
    it("should submit all fields", async () => {
      const user = userEvent.setup()
      const mockFetch = jest.fn().mockResolvedValue({ ok: true })
      global.fetch = mockFetch

      renderModal()

      await user.type(screen.getByPlaceholderText("Your name"), "John Doe")
      await user.type(
        screen.getByPlaceholderText("contact@example.com"),
        "john@test.com"
      )
      await user.type(screen.getByPlaceholderText("@username"), "@johndoe")
      await user.type(screen.getByPlaceholderText("Your message..."), "Hello")

      await user.click(screen.getByRole("button", { name: /submit neobank/i }))

      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          body: expect.stringContaining('"contactName":"John Doe"'),
        })
      )
    })
  })
})
