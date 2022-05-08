const logger = (param) => (store) => (next) => (action) => {
  console.log("Logging", param);

  //Below code Lets the action to happen
  return next(action);
};

export default logger;
