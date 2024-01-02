import { Middleware } from "redux";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { toast } from "react-toastify";
const baseURL = "http://localhost:8080/api";
import {
  apiCallBegan,
  apiCallFailed,
  apiCallSuccess,
} from "../actions/apiActions";

const api: Middleware =
  ({ dispatch }) =>
  (next) =>
  async (action: any) => {
    if (action.type !== apiCallBegan.type) return next(action);
    next(action);

    const {
      url,
      data,
      method,
      onStart,
      onError,
      onSuccess,
      params,
      successMsg,
    } = action.payload;

    if (onStart) dispatch({ type: onStart });

    const config: AxiosRequestConfig = {
      baseURL,
      url,
      params,
      method,
      data,
      headers: {
        "x-auth-token": localStorage.getItem("token") || null,
      },
    };

    if (params) {
      config.params = { ...config.params, ...params };
    }

    try {
      const request = await axios.request(config);

      const data = request.data;
      const status = request.status;

      dispatch(apiCallSuccess(data));

      if (onSuccess) dispatch({ type: onSuccess, payload: { status, data } });

      if (successMsg) toast.success(successMsg, { autoClose: 2500 });
    } catch (error) {
      const axiosError = (error as AxiosError).response?.data;
      const errStatus = (error as AxiosError).response?.status;

      if (axiosError) {
        if ((errStatus as number) >= 500) {
          toast.error("Unexpected Error Occured", { autoClose: 2500 });
        } else {
          toast.error(axiosError as string, { autoClose: 2500 });
        }

        dispatch(apiCallFailed(axiosError));
      }

      if (onError) dispatch({ type: onError, payload: axiosError });
    }
  };
