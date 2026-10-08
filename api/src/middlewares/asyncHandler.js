export default (asyncHandler) => (req, res, next) => {
  Promise.resolve(asyncHandler(req, res, next)).catch(next);
};
