import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { Widget } from "../../../schema/widget-form-schema";
import { useWidgets } from "../hooks/useWidgets";
import { WidgetList } from "./WidgetList";

jest.mock("../hooks/useWidgets");

const mockUseWidgets = useWidgets as jest.Mock;

const mockWidgets: Widget[] = [
  {
    name: "Widget 1",
    description: "A cool widget",
    price: 100,
  },
  {
    name: "Widget 2",
    description: "Another cool widget",
    price: 200,
  },
];

describe("WidgetList component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading state", () => {
    mockUseWidgets.mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
      refetch: jest.fn(),
    });

    render(<WidgetList />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("renders error state with retry button", () => {
    const refetch = jest.fn();
    mockUseWidgets.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: true,
      refetch,
    });

    render(<WidgetList />);
    expect(screen.getByText(/error loading/i)).toBeInTheDocument();

    const reloadButton = screen.getByText(/reload/i);
    fireEvent.click(reloadButton);
    expect(refetch).toHaveBeenCalled();
  });

  it("renders widgets when data is available", () => {
    mockUseWidgets.mockReturnValue({
      data: mockWidgets,
      isLoading: false,
      error: null,
      refetch: jest.fn(),
    });

    render(<WidgetList />);
    expect(screen.getByText("Widget 1")).toBeInTheDocument();
    expect(screen.getByText("Widget 2")).toBeInTheDocument();
  });

  it("shows message when widget list is empty", () => {
    mockUseWidgets.mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
      refetch: jest.fn(),
    });

    render(<WidgetList />);
    expect(screen.getByText(/no widgets yet/i)).toBeInTheDocument();
  });

  it("opens dialog when FAB is clicked", async () => {
    mockUseWidgets.mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
      refetch: jest.fn(),
    });

    render(<WidgetList />);
    fireEvent.click(screen.getByRole("button", { name: /add/i }));

    await waitFor(() => {
      expect(screen.getByText(/create new widget/i)).toBeInTheDocument();
    });
  });
});
