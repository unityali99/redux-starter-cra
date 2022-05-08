import axios from "axios";
import * as apiActions from "../actionCreators/api";

const api =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    const actionPayload = action.payload;

    if (action.type !== apiActions.apiRequest.type) return next(action);

    if (actionPayload.onStart) dispatch({ type: actionPayload.onStart });

    next(action);

    try {
      const response = await axios.request({
        baseURL: "http://localhost:9001/api",
        url: actionPayload.url,
        method: actionPayload.method ? actionPayload.method : "get",
        data: actionPayload.data ? actionPayload.data : {},
      });

      dispatch(apiActions.apiSuccess(response.data));
      if (actionPayload.onSuccess)
        dispatch({ type: actionPayload.onSuccess, payload: response.data });
    } catch (error) {
      dispatch(apiActions.apiFailure(error.message));
      if (actionPayload.onFailure)
        dispatch({ type: actionPayload.onFailure, payload: error.message });
    }
  };
export default api;
