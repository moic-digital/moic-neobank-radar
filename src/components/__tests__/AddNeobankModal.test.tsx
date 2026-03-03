import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import AddNeobankModal from "../AddNeobankModal"

const mockOnClose = jest.fn()

function renderModal() {
  return render(<AddNeobankModal onClose={mockOnClose} />)
}

beforeEach(() => {
  mockOnClose.mockClear()
})

describe("AddNeobankModal - Form Sections", () => {
  describe("Section headings", () => {
    it("should render 'Contact Info' section heading", () => {
      renderModal()
      expect(
        screen.getByText("Contact Info")
      ).toBeInTheDocument()
    })

    it("should render 'Neobank Info' section heading", () => {
      renderModal()
      expect(
        screen.getByText("Neobank Info")
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
  })

  describe("Neobank Info section fields", () => {
    it("should have a neobank name input", () => {
      renderModal()
      expect(
        screen.getByPlaceholderText("Neobank name")
      ).toBeInTheDocument()
    })

    it("should have a site input that accepts URLs without protocol", () => {
      renderModal()
      const siteInput = screen.getByPlaceholderText("example.com")
      expect(siteInput).toBeInTheDocument()
      expect(siteInput).toHaveAttribute("type", "text")
    })

    it("should have founded, cashback max, and currencies inputs", () => {
      renderModal()
      expect(screen.getByPlaceholderText("2023")).toBeInTheDocument()
      expect(screen.getByPlaceholderText("e.g. 8%")).toBeInTheDocument()
      expect(
        screen.getByPlaceholderText("USD, EUR, BTC...")
      ).toBeInTheDocument()
    })
  })

  describe("Section ordering", () => {
    it("should render Contact Info section before Neobank Info section", () => {
      renderModal()
      const contactHeading = screen.getByText("Contact Info")
      const neobankHeading = screen.getByText("Neobank Info")

      const contactPosition =
        contactHeading.compareDocumentPosition(neobankHeading)
      // Node.DOCUMENT_POSITION_FOLLOWING = 4
      expect(contactPosition & 4).toBe(4)
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
    it("should submit all fields from both sections", async () => {
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
      await user.type(
        screen.getByPlaceholderText("Neobank name"),
        "TestBank"
      )
      await user.type(screen.getByPlaceholderText("example.com"), "testbank.io")
      await user.type(screen.getByPlaceholderText("2023"), "2024")
      await user.type(screen.getByPlaceholderText("e.g. 8%"), "5%")
      await user.type(
        screen.getByPlaceholderText("USD, EUR, BTC..."),
        "USD, BTC"
      )

      await user.click(screen.getByRole("button", { name: /submit/i }))

      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          body: expect.stringContaining('"contactName":"John Doe"'),
        })
      )
      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          body: expect.stringContaining('"neobankName":"TestBank"'),
        })
      )
    })
  })
})
