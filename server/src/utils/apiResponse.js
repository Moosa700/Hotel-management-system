export const success = (
  res,
  message,
  data = null,
  status = 200,
  meta = null
) => {
  const response = {
    success: true,
    message,
    data,
  };

  if (meta) {
    response.meta = meta;
  }

  return res.status(status).json(response);
};

export const error = (
  res,
  message = "Something went wrong.",
  status = 400,
  errors = null
) => {
  const response = {
    success: false,
    message,
  };

  if (errors) {
    response.errors = errors;
  }

  return res.status(status).json(response);
};