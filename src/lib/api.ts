import axios from "axios";
import { toast } from "react-toastify";
import { Widget } from "../schema/widget-form-schema";

const BASE_URL = "http://localhost:9000";

const http = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

http.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      console.error("Axios error response:", {
        status: error.response.status,
        data: error.response.data,
      });
      toast.error(error.response.data[0]);
      return Promise.reject(error as Error);
    }
  }
);

export const paths = {
  widget: `${BASE_URL}/v1/widgets`,
};

export const fetchAllWidgets = async (): Promise<Widget[]> =>
  await http.get(`${paths.widget}`);

export const createWidget = async (widget: Widget) =>
  await http.post<Widget>(`${paths.widget}`, widget);

export const updateWidget = async (
  prevName: string,
  widget: Widget
): Promise<Widget> => await http.put(`${paths.widget}/${prevName}`, widget);

export const deleteWidget = async (widget: Widget): Promise<Widget> =>
  await http.delete(`${paths.widget}/${widget.name}`);
