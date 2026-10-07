const success = (data) => ({
  success: true,
  data,
});

const error = (code,message) => ({
  success: false,
  code,
  message,
});

export { success, error };
