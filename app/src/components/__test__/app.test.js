import { render } from "@testing-library/react";
import App from "../../App";

// test('test', () => {
//     expect(true).toBe(true);
// })

describe("data fetching and display", () => {
  test("check that data is fetched correctly from the JSON file", () => {
    const { getAllByTestId } = render(<App />);

    const cardsGrid = getAllByTestId("cards-grid");

    // Check if at least one card is rendered
    expect(cardsGrid.length).toBeGreaterThan(0);

    // Check if the first card has the right title
    expect(cardsGrid[0]).toHaveTextContent("Level up");
  });
});
