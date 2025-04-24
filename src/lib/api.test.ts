import axios from "axios";
import { toast } from "react-toastify";
import {
  fetchAllWidgets,
  createWidget,
  updateWidget,
  deleteWidget,
} from "./api";

jest.mock("axios");
jest.mock("react-toastify", () => ({
  toast: {
    error: jest.fn(),
  },
}));

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Widget API", () => {
  const widget = {
    name: "test-widget",
    description: "A test widget",
    price: 99,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch all widgets", async () => {
    mockedAxios.get.mockResolvedValue({ data: [widget] });

    const result = await fetchAllWidgets();

    expect(mockedAxios.get).toHaveBeenCalledWith(
      "http://localhost:9000/v1/widgets"
    );
    expect(result).toEqual([widget]);
  });

  it("should create a widget", async () => {
    mockedAxios.post.mockResolvedValue({ data: widget });

    const result = await createWidget(widget);

    expect(mockedAxios.post).toHaveBeenCalledWith(
      "http://localhost:9000/v1/widgets",
      widget
    );
    expect(result).toEqual(widget);
  });

  it("should update a widget", async () => {
    const updated = { ...widget, price: 199 };
    mockedAxios.put.mockResolvedValue({ data: updated });

    const result = await updateWidget(widget.name, updated);

    expect(mockedAxios.put).toHaveBeenCalledWith(
      `http://localhost:9000/v1/widgets/${widget.name}`,
      updated
    );
    expect(result).toEqual(updated);
  });

  it("should delete a widget", async () => {
    mockedAxios.delete.mockResolvedValue({ data: widget });

    const result = await deleteWidget(widget);

    expect(mockedAxios.delete).toHaveBeenCalledWith(
      `http://localhost:9000/v1/widgets/${widget.name}`
    );
    expect(result).toEqual(widget);
  });

  it("should toast an error on failed request", async () => {
    const errorResponse = {
      response: {
        status: 400,
        data: ["Something went wrong"],
      },
    };

    mockedAxios.get.mockRejectedValue(errorResponse);

    await expect(fetchAllWidgets()).rejects.toThrow();
    expect(toast.error).toHaveBeenCalledWith("Something went wrong");
  });
});
