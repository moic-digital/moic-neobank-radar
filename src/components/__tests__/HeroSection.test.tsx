import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import HeroSection from "../HeroSection"

// Mock Lottie to avoid animation issues in tests
jest.mock("lottie-react", () => ({
  __esModule: true,
  default: () => <div data-testid="lottie-animation" />,
}))

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: Record<string, unknown>) => <img {...props} />,
}))

// Mock LogoRain
jest.mock("@/components/LogoRain", () => ({
  __esModule: true,
  default: () => <div data-testid="logo-rain" />,
}))

const mockOnCompare = jest.fn()

function renderHero(props: { onCompare?: () => void } = {}) {
  return render(<HeroSection onCompare={props.onCompare ?? mockOnCompare} />)
}

beforeEach(() => {
  mockOnCompare.mockClear()
})

describe("HeroSection - CTA Buttons", () => {
  describe("Rendering", () => {
    it("should render the Explore Cards button", () => {
      renderHero()
      expect(
        screen.getByRole("button", { name: /explore cards/i })
      ).toBeInTheDocument()
    })

    it("should render the Compare Cards button", () => {
      renderHero()
      expect(
        screen.getByRole("button", { name: /compare cards/i })
      ).toBeInTheDocument()
    })

    it("should render CTA buttons after the subtitle text", () => {
      renderHero()
      const subtitle = screen.getByText(/compare fees, perks/i)
      const exploreBtn = screen.getByRole("button", { name: /explore cards/i })

      const position = subtitle.compareDocumentPosition(exploreBtn)
      // Node.DOCUMENT_POSITION_FOLLOWING = 4
      expect(position & 4).toBe(4)
    })
  })

  describe("Explore Cards button", () => {
    it("should smooth scroll to #cards when clicked", async () => {
      const user = userEvent.setup()
      const mockScrollIntoView = jest.fn()
      const mockElement = document.createElement("div")
      mockElement.scrollIntoView = mockScrollIntoView

      jest.spyOn(document, "getElementById").mockReturnValue(mockElement)

      renderHero()
      await user.click(screen.getByRole("button", { name: /explore cards/i }))

      expect(document.getElementById).toHaveBeenCalledWith("cards")
      expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: "smooth" })

      jest.restoreAllMocks()
    })
  })

  describe("Compare Cards button", () => {
    it("should call onCompare callback when clicked", async () => {
      const user = userEvent.setup()
      renderHero()

      await user.click(screen.getByRole("button", { name: /compare cards/i }))

      expect(mockOnCompare).toHaveBeenCalledTimes(1)
    })
  })

  describe("Existing hero content", () => {
    it("should still render the title", () => {
      renderHero()
      expect(
        screen.getByRole("heading", { name: /neobank radar/i })
      ).toBeInTheDocument()
    })

    it("should still render the subtitle", () => {
      renderHero()
      expect(
        screen.getByText(/compare fees, perks and find the perfect/i)
      ).toBeInTheDocument()
    })

    it("should still render the Powered by MOIC link", () => {
      renderHero()
      expect(screen.getByAltText("MOIC")).toBeInTheDocument()
    })
  })
})
