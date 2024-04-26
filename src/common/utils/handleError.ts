export const handleError = (error: any) => {
  if (error.code === '23505') {
    return {
      statusCode: 400,
      message: 'Product with this name already exists',
    };
  }
  return {
    statusCode: 500,
    message: 'Internal server error',
  };
};
