const success = (data) => {
  return {
    success: true,
    data,
  };
};

const error = (code, message) => {
  return {
    success: false,
    code,
    message,
  };
};

export { success, error };