export const getIndexById = (array, id) => {
  return array.findIndex((item) => item.id === id);
};
