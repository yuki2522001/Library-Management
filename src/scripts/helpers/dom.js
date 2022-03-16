/* eslint-disable import/prefer-default-export */
// Create an element with an optional CSS class
const createElement = (tagName, attributes, value) => {
  const element = document.createElement(tagName);

  // Check whether property exist in attributes object or not
  /* eslint-disable no-restricted-syntax */
  for (const prop in attributes) {
    if (Object.prototype.hasOwnProperty.call(attributes, prop)) element[prop] = attributes[prop];
  }

  /**
   * Check whether value is a array or not
   * If array, loop and append all node in array
   */
  if (Array.isArray(value)) {
    value.map((item) => element.append(item));
  } else element.innerHTML = value;

  return element;
};

export { createElement };
