/**
 * Georgia Tech Visual Analytics Lab
 * Contact: endert \[at\] gatech \[dot\] edu
 */

// data
var carouselIndex = 0;

// initialize materialize component instances
var sidenavInstance = M.Sidenav.init(document.querySelectorAll(".sidenav"), {})[0];
var carouselInstance = M.Carousel.init(document.querySelectorAll(".carousel.carousel-slider"), {
  indicators: true,
  onCycleTo: function () {
    if (carouselInstance) {
      carouselIndex = carouselInstance.center;
    }
  },
})[0];

// set listener for window resize event
window.addEventListener(
  "resize",
  debounce(function (event) {
    // re-initialize materialize components
    sidenavInstance.destroy();
    sidenavInstance = M.Sidenav.init(document.querySelectorAll(".sidenav"), {})[0];
    carouselInstance.destroy();
    carouselInstance = M.Carousel.init(document.querySelectorAll(".carousel.carousel-slider"), {
      indicators: true,
      onCycleTo: function () {
        if (carouselInstance) {
          carouselIndex = carouselInstance.center;
        }
      },
    })[0];
    carouselInstance.set(carouselIndex);
  }, 100),
  true
);

// advance the carousel on a timer every 10 seconds
setInterval(function () {
  carouselInstance.next();
  carouselIndex = carouselInstance.center;
}, 10000);

/**
 * Simple throttle function.
 * See: https://stackoverflow.com/a/27078401
 * @param {*} callback
 * @param {*} limit
 * @returns
 */
function throttle(callback, limit) {
  var waiting = false;
  return function () {
    if (!waiting) {
      callback.apply(this, arguments);
      waiting = true;
      setTimeout(function () {
        waiting = false;
      }, limit);
    }
  };
}

/**
 * Simple debounce function.
 * See: https://stackoverflow.com/a/24004942
 * @param {*} func
 * @param {*} wait
 * @param {*} immediate
 * @returns
 */
function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this;
    var args = arguments;
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      timeout = null;
      if (!immediate) {
        func.apply(context, args);
      }
    }, wait);
    if (callNow) func.apply(context, args);
  };
}
