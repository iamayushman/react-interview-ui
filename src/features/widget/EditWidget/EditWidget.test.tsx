import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { Widget } from "../../../schema/widget-form-schema";
import EditWidget from "./EditWidget";

jest.mock("react-toastify", () => ({
  toast: {
    error: jest.fn(),
  },
}));

jest.mock("../hooks/useCreateWidget", () => ({
  useCreateWidget: () => ({
    mutate: jest.fn(),
    isPending: false,
    isSuccess: false,
  }),
}));

jest.mock("../hooks/useUpdateWidget", () => ({
  useUpdateWidget: () => ({
    mutate: jest.fn(),
    isPending: false,
    isSuccess: false,
  }),
}));

const mockOnClick = jest.fn();

const widgetMock: Widget = {
  name: "test-widget",
  description: "This is a test widget",
  price: 123,
};

describe("EditWidget", () => {
  it("renders with empty form for create mode", () => {
    render(<EditWidget widget={null} open={true} onClick={mockOnClick} />);
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Description")).toBeInTheDocument();
    expect(screen.getByLabelText("Price")).toBeInTheDocument();
    expect(screen.getByText(/create new widget/i)).toBeInTheDocument();
  });

  it("renders with widget data for edit mode", () => {
    render(
      <EditWidget widget={widgetMock} open={true} onClick={mockOnClick} />
    );
    expect(screen.getByDisplayValue("test-widget")).toBeInTheDocument();
    expect(
      screen.getByDisplayValue("This is a test widget")
    ).toBeInTheDocument();
    expect(screen.getByDisplayValue("123")).toBeInTheDocument();
    expect(screen.getByText(/edit widget/i)).toBeInTheDocument();
  });

  it("calls onClick when cancel button is clicked", () => {
    render(<EditWidget widget={null} open={true} onClick={mockOnClick} />);
    fireEvent.click(screen.getByText("Cancel"));
    expect(mockOnClick).toHaveBeenCalled();
  });

  it("disables submit button when loading", () => {
    jest.mock("../hooks/useCreateWidget", () => ({
      useCreateWidget: () => ({
        mutate: jest.fn(),
        isPending: true,
        isSuccess: false,
      }),
    }));
    render(<EditWidget widget={null} open={true} onClick={mockOnClick} />);
    expect(screen.getByText("Submit")).toBeDisabled();
  });

  it("submits the form on valid input", async () => {
    const mockCreate = jest.fn();
    jest.mock("../hooks/useCreateWidget", () => ({
      useCreateWidget: () => ({
        mutate: mockCreate,
        isPending: false,
        isSuccess: false,
      }),
    }));

    render(<EditWidget widget={null} open={true} onClick={mockOnClick} />);

    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "new-widget" },
    });
    fireEvent.change(screen.getByLabelText("Description"), {
      target: { value: "A new description" },
    });
    fireEvent.change(screen.getByLabelText("Price"), {
      target: { value: "200" },
    });

    fireEvent.click(screen.getByText("Submit"));

    await waitFor(() => {
      expect(mockCreate).toHaveBeenCalled();
    });
  });
});
