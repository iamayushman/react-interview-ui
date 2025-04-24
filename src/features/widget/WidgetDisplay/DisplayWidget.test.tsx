import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { Widget } from "../../../schema/widget-form-schema";
import { useDeleteWidget } from "../hooks/useDeleteWidget";
import DisplayWidget from "./DisplayWidget";

jest.mock("../hooks/useDeleteWidget");

const mockDelete = jest.fn();
(useDeleteWidget as jest.Mock).mockReturnValue({ mutate: mockDelete });

const mockWidget: Widget = {
  name: "Test Widget",
  description: "A widget for testing",
  price: 99,
};

describe("DisplayWidget", () => {
  const onClickMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders widget details correctly", () => {
    render(<DisplayWidget widget={mockWidget} onClick={onClickMock} />);

    expect(screen.getByText("Test Widget")).toBeInTheDocument();
    expect(screen.getByText("$99")).toBeInTheDocument();
    expect(screen.getByText("A widget for testing")).toBeInTheDocument();
  });

  it("calls onClick with widget when Edit button is clicked", () => {
    render(<DisplayWidget widget={mockWidget} onClick={onClickMock} />);

    fireEvent.click(screen.getByText(/edit/i));
    expect(onClickMock).toHaveBeenCalledWith(mockWidget);
  });

  it("shows delete confirmation dialog when Delete is clicked", async () => {
    render(<DisplayWidget widget={mockWidget} onClick={onClickMock} />);

    fireEvent.click(screen.getByText(/delete/i));

    expect(
      await screen.findByText(/are you sure you want to delete/i)
    ).toBeInTheDocument();
    expect(screen.getByText("Test Widget")).toBeInTheDocument();
  });

  it("calls deleteWidget when confirmed", async () => {
    render(<DisplayWidget widget={mockWidget} onClick={onClickMock} />);

    fireEvent.click(screen.getByText(/delete/i));

    await screen.findByText(/are you sure you want to delete/i);

    fireEvent.click(screen.getByRole("button", { name: "Delete" }));

    expect(mockDelete).toHaveBeenCalledWith(mockWidget);
  });

  it("closes dialog when Cancel is clicked", async () => {
    render(<DisplayWidget widget={mockWidget} onClick={onClickMock} />);

    fireEvent.click(screen.getByText(/delete/i));
    fireEvent.click(await screen.findByText("Cancel"));

    await waitFor(() => {
      expect(
        screen.queryByText(/are you sure you want to delete/i)
      ).not.toBeInTheDocument();
    });
  });
});
