import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import FilterDropdown from "../FilterDropdown"

const ITEMS = [
  { value: "usd", label: "USD ($)" },
  { value: "eur", label: "EUR" },
  { value: "gbp", label: "GBP" },
] as const

const defaultProps = {
  value: "",
  placeholder: "Currency",
  items: ITEMS,
  onChange: jest.fn(),
}

beforeEach(() => {
  defaultProps.onChange.mockClear()
})

afterEach(() => {
  jest.restoreAllMocks()
})

describe("FilterDropdown — clear button (X)", () => {
  it("should NOT show clear button when no value is selected", () => {
    render(<FilterDropdown {...defaultProps} value="" />)

    expect(screen.queryByLabelText(/clear/i)).not.toBeInTheDocument()
  })

  it("should show clear button when a value is selected", () => {
    render(<FilterDropdown {...defaultProps} value="usd" />)

    expect(screen.getByLabelText(/clear/i)).toBeInTheDocument()
  })

  it("should call onChange with empty string when clear button is clicked", async () => {
    const user = userEvent.setup()
    render(<FilterDropdown {...defaultProps} value="usd" />)

    await user.click(screen.getByLabelText(/clear/i))

    expect(defaultProps.onChange).toHaveBeenCalledWith("")
  })

  it("should NOT open the dropdown when clear button is clicked", async () => {
    const user = userEvent.setup()
    render(<FilterDropdown {...defaultProps} value="usd" />)

    await user.click(screen.getByLabelText(/clear/i))

    // Dropdown items should not be visible
    expect(screen.queryByText("EUR")).not.toBeInTheDocument()
  })
})

describe("FilterDropdown — dropdown menu", () => {
  it("should NOT have a reset option inside the dropdown", async () => {
    const user = userEvent.setup()
    render(<FilterDropdown {...defaultProps} value="" />)

    // Open dropdown
    await user.click(screen.getByRole("button", { name: /currency/i }))

    // The old "No filter" / placeholder reset option should not exist
    // Only the actual items should be present
    const buttons = screen.getAllByRole("button")
    const dropdownButtons = buttons.filter(
      (b) => b.textContent === "USD ($)" || b.textContent === "EUR" || b.textContent === "GBP"
    )
    expect(dropdownButtons).toHaveLength(3)

    // The old reset option ("Currency" as a second button inside the dropdown) should not exist
    // Only the trigger button should have the placeholder text
    const currencyButtons = screen.queryAllByRole("button", { name: "Currency" })
    expect(currencyButtons).toHaveLength(1) // only the trigger, not a reset option
  })

  it("should still allow selecting an item from the dropdown", async () => {
    const user = userEvent.setup()
    render(<FilterDropdown {...defaultProps} value="" />)

    await user.click(screen.getByRole("button", { name: /currency/i }))
    await user.click(screen.getByText("EUR"))

    expect(defaultProps.onChange).toHaveBeenCalledWith("eur")
  })
})
