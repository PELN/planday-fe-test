import { render, fireEvent } from "@testing-library/react";
import App from "../../App";
import Pagination from "../Pagination/Pagination";

describe("pagination functionality", () => {
  test("renders link list items for pagination", () => {
    const { getAllByRole } = render(<App />);

    const listItems = getAllByRole("listitem");
    expect(listItems).toHaveLength(4);
  });

  test("check if correct number of cards is displayed based on items per page", () => {
    const { getAllByTestId } = render(<App />);

    const cards = getAllByTestId("card");
    expect(cards.length).toBe(6);
  });

  test("clicking on page number 2 updates the page data and checks if buttons are acting as they should", () => {
    const onPageChangeMock = jest.fn();

    const { getByText, getByRole } = render(
      <Pagination
        totalItems={20}
        itemsPerPage={6}
        currentPage={1}
        onPageChange={onPageChangeMock}
      />
    );

    // Click on page number 2
    const pageNumberTwo = getByText("2");
    fireEvent.click(pageNumberTwo.closest("a"));

    // Check if onPageChange function is called with page number 2
    expect(onPageChangeMock).toHaveBeenCalledWith(2);

    // Check if the Previous button is enabled
    const prevButton = getByRole("button", { name: "Previous" });
    expect(prevButton.getAttribute("disabled")).toBe("");

    // Click on Next button
    const nextButton = getByText("Next");
    fireEvent.click(nextButton);
  });
});
