// helper function for event listener
function $on(target, type, callback) {
  target.addEventListener(type, callback, false);
}

// helper function for get elements by class name
function $class(target, className) {
  return target.getElementsByClassName(className);
}

// helper function for get element by id
function $id(target, id) {
  return target.getElementById(id);
}

// helper function for query selector
function $qs(target, selectors) {
  return target.querySelector(selectors);
}

// helper function to add classes
function $addClass(target, className) {
  target.classList.add(className);
}

// helper function to remove classes
function $removeClass(target, className) {
  target.classList.remove(className);
}
