export  function arrayChange(currentValue, oldValue,array,object) {
  if (oldValue > currentValue) {
    array.pop()
  } else {
    array.push(object);
  }
}
