import * as apiActions from "../actionCreators/api";

const toastify = (store) => (next) => (action) => {
  if (action.type === apiActions.apiFailure.type)
    console.log(`Toastify: An error happened => ${action.payload}`);
  return next(action);
};

export default toastify;
