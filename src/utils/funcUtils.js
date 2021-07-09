export const arrayPrepend = (value, array) => {
  var newArray = array.slice();
  newArray.unshift(value);
  return newArray;
};

export const arrayMove = (arr, startIndex, endIndex) => {
  const result = Array.from(arr);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};
