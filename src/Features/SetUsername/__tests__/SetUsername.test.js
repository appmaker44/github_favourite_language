import { render, screen, fireEvent } from "@testing-library/react";

import SetUsername from "../SetUsername";

describe("<SetUsername />", () => {
  it("should disable search button on initial render and when no username has been entered", () => {
    render(<SetUsername />);

    expect(screen.getByRole("button", { name: /search/i })).toBeDisabled();
  });

  it("should enable search button when a username is entered", async () => {
    const callback = jest.fn();

    render(<SetUsername handleChange={callback} username="gregg" />);
    expect(screen.getByRole("button", { name: /search/i })).toBeEnabled();
  });

  it("should trigger onChange callback when input changes", () => {
    const callback = jest.fn();

    render(<SetUsername handleChange={callback} />);
    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "Gary" } });
    const event = callback.mock.calls[0][0];

    expect(event.target.value).toEqual("Gary");
  });

  it("should trigger onSubmit callback when search button pressed", async () => {
    const callback = jest.fn((e) => e.preventDefault());
    const callback2 = jest.fn();

    render(
      <SetUsername
        handleChange={callback2}
        handleSearch={callback}
        username="gregg"
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /search/i }));

    expect(callback).toHaveBeenCalledTimes(1);
  });
});
