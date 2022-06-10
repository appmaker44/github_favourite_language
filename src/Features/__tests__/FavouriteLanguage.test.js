import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import FavouriteLanguage from "../FavouriteLanguage";

describe("<FavouriteLanguage />", () => {
  const unmockedFetch = global.fetch;
  beforeAll(() => {
    global.fetch = () =>
      Promise.resolve({
        json: () =>
          Promise.resolve([
            { language: "Java" },
            { language: "Java" },
            { language: null },
            { language: "Python" },
            { language: "JavaScript" },
            { language: "Python" },
            { language: "Python" },
          ]),
      });
  });

  afterAll(() => {
    global.fetch = unmockedFetch;
  });

  it("should display text field that takes a username", () => {
    render(<FavouriteLanguage />);
    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "Barry" } });

    expect(input.value).toEqual("Barry");
  });

  it("should display currently searched username", async () => {
    render(<FavouriteLanguage />);
    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "Barry" } });

    fireEvent.click(screen.getByRole("button", { name: /search/i }));

    const usernameDisplay = screen.getByTestId("usernameHeader");

    await waitFor(() => expect(usernameDisplay).toHaveTextContent("Barry"));
  });

  it("should display favourite language", async () => {
    render(<FavouriteLanguage />);
    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "Barry" } });

    fireEvent.click(screen.getByRole("button", { name: /search/i }));

    const languageDisplay = screen.getByTestId("languageValue");

    await waitFor(() => expect(languageDisplay).toHaveTextContent(/python/i));
  });

  it("should display not found message if User not found", async () => {
    const fetchMock = jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve({ message: "Not Found" }),
      })
    );

    render(<FavouriteLanguage />);
    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "Barry" } });

    fireEvent.click(screen.getByRole("button", { name: /search/i }));

    const languageDisplay = screen.getByTestId("languageValue");

    const usernameDisplay = screen.getByTestId("usernameHeader");

    jest.useFakeTimers();

    jest.advanceTimersByTime(5000);

    await waitFor(() =>
      expect(languageDisplay).toHaveTextContent(/not found/i)
    );
  });

  it("should display request failed message if fetch returns error", async () => {
    const fetchMock = jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.reject({ message: "Failed to fetch" }),
      })
    );

    render(<FavouriteLanguage />);
    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "Barry" } });

    fireEvent.click(screen.getByRole("button", { name: /search/i }));

    const languageDisplay = screen.getByTestId("languageValue");

    await waitFor(() =>
      expect(languageDisplay).toHaveTextContent(/request failed/i)
    );
  });
});
