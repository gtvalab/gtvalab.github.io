/**
 * Georgia Tech Visual Analytics Lab
 * Contact: endert \[at\] gatech \[dot\] edu
 */

// data
var carouselIndex = 0;
var carouselInterval = null;
var sidenavInstance = null;
var carouselInstance = null;

// load navigation and sidenav
$(".navigation-container").load("/includes/navigation.html", function () {
  // initialize materialize sidenav component instance
  sidenavInstance = M.Sidenav.init($(".sidenav"), {})[0];
});

// load gallery images and set up carousel
if ($(".carousel.carousel-slider").length) {
  $.getJSON("/data/gallery.json", function (data) {
    // create gallery elements from file
    createGalleryElements(data);

    // initialize materialize carousel component instance
    carouselInstance = M.Carousel.init($(".carousel.carousel-slider"), {
      indicators: true,
      onCycleTo: onCycleTo,
    })[0];

    // set listener for window resize event
    window.addEventListener(
      "resize",
      debounce(function () {
        // re-initialize materialize components
        carouselInstance.destroy();
        carouselInstance = M.Carousel.init($(".carousel.carousel-slider"), {
          indicators: true,
          onCycleTo: onCycleTo,
        })[0];
        carouselInstance.set(carouselIndex);
      }, 100),
      true
    );

    // advance the carousel on a timer every 10 seconds
    carouselInterval = setInterval(function () {
      carouselInstance.next();
      carouselIndex = carouselInstance.center;
    }, 10000);
  });
}

// load news items
if ($(".news-item-container").length) {
  $.getJSON("/data/news.json", function (data) {
    createNewsElements(data);
  });
}

// load current people and alumni
if ($(".people-container").length) {
  $.getJSON("/data/currentPeople.json", function (data) {
    createCurrentPeopleElements(data);
  });
  $.getJSON("/data/alumni.json", function (data) {
    createAlumniElements(data);
  });
}

// load projects
if ($(".projects-container").length) {
  $.getJSON("/data/projects.json", function (data) {
    createProjectsElements(data);
  });
}

// load publications
if ($(".publications-container").length) {
  $.getJSON("/data/publications.json", function (data) {
    createPublicationsElements(data);
  });
}

// load the footer
$(".footer-container").load("/includes/footer.html");

// set smooth scroll on all <a> elements after 1 second
setTimeout(() => {
  // URL updates and the element focus is maintained
  // originally found via in Update 3 on http://www.learningjquery.com/2007/10/improved-animated-scrolling-script-for-same-page-links
  var locationPath = filterPath(location.pathname);
  $('a[href*="#"]').each(function () {
    var thisPath = filterPath(this.pathname) || locationPath;
    var hash = this.hash;
    if (hash.replace(/#/, "").length && $("#" + hash.replace(/#/, "")).length) {
      if (
        locationPath == thisPath &&
        (location.hostname == this.hostname || !this.hostname) &&
        this.hash.replace(/#/, "")
      ) {
        var $target = $(hash),
          target = this.hash;
        if (target) {
          $(this).click(function (event) {
            event.preventDefault();
            $("html, body").animate({ scrollTop: $target.offset().top - 64 }, 1000, function () {
              location.hash = target;
              $target.focus();
              if ($target.is(":focus")) {
                //checking if the target was focused
                return false;
              } else {
                $target.attr("tabindex", "-1"); //Adding tabindex for elements not focusable
                $target.focus(); //Setting focus
              }
            });
          });
        }
      }
    }
  });
}, 1000);

/* ============================ HELPERS ==================================== */

/**
 * filter handling for a /dir/ OR /indexordefault.page
 * See: https://css-tricks.com/smooth-scrolling-accessibility/
 */
function filterPath(string) {
  return string
    .replace(/^\//, "")
    .replace(/(index|default).[a-zA-Z]{3,4}$/, "")
    .replace(/\/$/, "");
}

/**
 * Callback when carousel cycles to the next item.
 */
function onCycleTo() {
  if (carouselInstance) {
    carouselIndex = carouselInstance.center;
    if (carouselInterval) {
      clearInterval(carouselInterval);
      carouselInterval = setInterval(function () {
        carouselInstance.next();
        carouselIndex = carouselInstance.center;
      }, 10000);
    }
  }
}

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

/* ============================ FUNCTIONS ================================== */

/**
 * Creates html elements from `gallery.json`
 *
 * ALL fields are REQUIRED.
 *
 * Example:
 * ```
 * <div class="carousel-item">
 *   <div class="carousel-item-container">
 *     <img src="./assets/images/gallery/image.jpg" class="carousel-img" />
 *     <span class="carousel-caption">This is an awesome caption!</span>
 *   </div>
 * </div>
 * ```
 * @param {*} data
 */
function createGalleryElements(data) {
  let items = [];
  let elem;
  for (let i = 0; i < data.length; i++) {
    const g = data[i];
    elem = `
      <div class="carousel-item">
        <div class="carousel-item-container">
          <img src="./assets/images/gallery/${g.image}" class="carousel-img" />
          <span class="carousel-caption">${g.caption}</span>
        </div>
      </div>
    `;
    items.push(elem);
  }
  $(".carousel").get(0).innerHTML = items.join("");
}

/**
 * Creates html elements from `news.json`
 *
 * ALL fields are REQUIRED.
 *
 * Example:
 * ```
 * <div class="row">
 *   <div class="col news-item">
 *     <div class="news-item-date">27 Dec 2021</div>
 *     <div class="news-item-text">
 *       Lots of fun news text!
 *     </div>
 *   </div>
 * </div>
 * ```
 * @param {*} data
 */
function createNewsElements(data) {
  let items = [];
  let elem;
  for (let i = 0; i < data.length; i++) {
    const n = data[i];
    elem = `
      <div class="row">
        <div class="col news-item">
          <div class="news-item-date">${n.date}</div>
          <div class="news-item-text">${n.text}</div>
        </div>
      </div>
    `;
    items.push(elem);
  }
  $(".news-item-container").get(0).innerHTML = items.join("");
}

/**
 * Creates html elements from `currentPeople.json`
 *
 * All non-URL fields are REQUIRED.
 *
 * Missing URL fields and/or email field will be OMITTED.
 *
 * Example of full element created:
 * ```
 * <div class="card people-card">
 *   <div class="card-image">
 *     <a href="https://example.com" target="_blank">
 *       <img src="/assets/images/team/profile.jpeg" class="people-card-img" />
 *       <span class="card-title">firstName</span>
 *     </a>
 *   </div>
 *   <div class="card-content">
 *     <p class="people-card-name"><a href="https://example.com" target="_blank">fullName</a></p>
 *     <p class="people-card-title">PhD Student, CS</p>
 *     <p class="people-card-keywords">Visual analytics; Coffee</p>
 *   </div>
 *   <div class="card-action">
 *     <a href="mailto:email@domain.com" target="_blank">
 *       <i class="material-icons">email</i>
 *     </a>
 *     <a href="https://www.linkedin.com/in/userName" target="_blank">
 *       <img src="/assets/images/icons/linkedin.png" alt="LinkedIn Logo" />
 *     </a>
 *     <a href="https://twitter.com/userName" target="_blank">
 *       <img src="/assets/images/icons/twitter.svg" alt="Twitter Logo" />
 *     </a>
 *     <a href="https://scholar.google.com/citations?user=abcdefg123456" target="_blank">
 *       <img src="/assets/images/icons/Google_Scholar_logo.svg" alt="Google Scholar Logo" />
 *     </a>
 *   </div>
 * </div>
 *```
 * @param {*} data
 */
function createCurrentPeopleElements(data) {
  let items = [];
  let cardImage, cardContent, cardAction;
  let emailAction, linkedinAction, twitterAction, googlescholarAction;

  for (let i = 0; i < data.length; i++) {
    const p = data[i];

    // card image
    if (p.websiteURL) {
      cardImage = `
        <div class="card-image">
          <a href="${p.websiteURL}" target="_blank">
            <img src="/assets/images/team/${p.image}" class="people-card-img" />
            <span class="card-title">${p.firstName}</span>
          </a>
        </div>
      `;
    } else {
      cardImage = `
        <div class="card-image">
          <img src="/assets/images/team/${p.image}" class="people-card-img" />
          <span class="card-title">${p.firstName}</span>
        </div>
      `;
    }

    // card content
    if (p.websiteURL) {
      cardContent = `
        <div class="card-content">
          <p class="people-card-name"><a href="${p.websiteURL}" target="_blank">${p.fullName}</a></p>
          <p class="people-card-title">${p.title}</p>
          <p class="people-card-keywords">${p.keywords}</p>
        </div>
      `;
    } else {
      cardContent = `
        <div class="card-content">
          <p class="people-card-name">${p.fullName}</p>
          <p class="people-card-title">${p.title}</p>
          <p class="people-card-keywords">${p.keywords}</p>
        </div>
      `;
    }

    // card actions
    if (p.email) {
      emailAction = `
        <a href="mailto:${p.email}" target="_blank">
          <i class="material-icons">email</i>
          <span>Email</span>
        </a>
      `;
    } else {
      emailAction = "";
    }
    if (p.linkedinURL) {
      linkedinAction = `
        <a href="${p.linkedinURL}" target="_blank">
          <img src="/assets/images/icons/linkedin.png" alt="LinkedIn Logo" />
          <span>LinkedIn</span>
        </a>
      `;
    } else {
      linkedinAction = "";
    }
    if (p.twitterURL) {
      twitterAction = `
        <a href="${p.twitterURL}" target="_blank">
          <img src="/assets/images/icons/twitter.svg" alt="Twitter Logo" />
          <span>Twitter</span>
        </a>
      `;
    } else {
      twitterAction = "";
    }
    if (p.googlescholarURL) {
      googlescholarAction = `
        <a href="${p.googlescholarURL}" target="_blank">
          <img src="/assets/images/icons/Google_Scholar_logo.svg" alt="Google Scholar Logo" />
          <span>Scholar</span>
        </a>
      `;
    } else {
      googlescholarAction = "";
    }
    cardAction = `
      <div class="card-action">
        ${emailAction}
        ${linkedinAction}
        ${twitterAction}
        ${googlescholarAction}
      </div>
    `;

    items.push(`
      <div class="card people-card">
        ${cardImage}
        ${cardContent}
        ${cardAction}
      </div>
    `);
  }
  $(".people-card-container").get(0).innerHTML = items.join("");
}

/**
 * Creates html elements from `alumni.json`
 *
 * Name and degree fields are REQUIRED.
 *
 * Missing website field will be OMITTED.
 *
 * Example:
 * ```
 * <span><a href="https://example.com" target="_blank">fullName</a> (degreeEarned)</span>
 * ```
 * @param {*} data
 */
function createAlumniElements(data) {
  let items = [];
  let elem;
  for (let i = 0; i < data.length; i++) {
    const p = data[i];
    if (p.websiteURL) {
      elem = `<span><a href="${p.websiteURL}" target="_blank">${p.fullName}</a> (${p.degreeTitle})</span>`;
    } else {
      elem = `<span>${p.fullName} (${p.degreeTitle})</span>`;
    }
    items.push(elem);
  }
  $(".people-alumni-grid").get(0).innerHTML = items.join("");
}

/**
 * Creates html elements from `projects.json`
 *
 * { "title", "text" } fields are REQUIRED.
 *
 * Missing { "image", "pageLink" } field will be OMITTED.
 *
 * Example of full element created:
 * ```
 * <div class="row">
 *   <div class="col s12 m4 l3 project-img-container">
 *     <img src="/assets/images/projects/<image>" class="project-img" />
 *   </div>
 *   <div class="col 12 m8 l9">
 *     <p class="project-content">
 *       <span class="project-title">title</span>
 *       <br />
 *       <span class="project-text">text</span>
 *     </p>
 *     <p class="project-actions">
 *       <span class="project-action"><a href="<link>" target="_blank">text</a></span>
 *       <span>&nbsp;|&nbsp;</span>
 *       <span class="project-action"><a href="<link>" target="_blank">text</a></span>
 *       ...
 *     </p>
 *   </div>
 * </div>
 * ```
 * @param {*} data
 */
function createProjectsElements(data) {
  let items = [];
  let projImage, projContent, projRelated;

  for (let i = 0; i < data.length; i++) {
    const p = data[i];

    // project image
    if (p.image) {
      projImage = `
          <img src="/assets/images/projects/${p.image}" class="project-img" />
        `;
    } else {
      projImage = `
          <img src="/assets/favicon/android-chrome-512x512.png" class="project-img" />
        `;
    }

    // project content
    if (p.pageLink) {
      projContent = `
          <p class="project-content">
            <span class="project-title"><a href="${p.pageLink}">${p.title}</a></span>
            <br />
            <span class="project-text">${p.text}</span>
          </p>
        `;
    } else {
      projContent = `
          <p class="project-content">
            <span class="project-title">${p.title}</span>
            <br />
            <span class="project-text">${p.text}</span>
          </p>
        `;
    }

    // project related
    if (p.related) {
      let related = [];
      for (let k = 0; k < p.related.length; k++) {
        const r = p.related[k];
        related.push(`
          <span class="project-related-arrow">&#187;</span>
          <a href="${r.link}" target="_blank">${r.text}</a></span>
        `);
      }
      projRelated = `
        <div class="project-related">
          <p class="project-related-title">Related Work</p>
          <div class="project-related-grid">
            ${related.join("")}
          </div>
        </div>
      `;
    } else {
      projRelated = "";
    }

    items.push(`
        <div class="row project-container">
          <div class="col s12 m4 l3 project-img-container">
            ${projImage}
          </div>
          <div class="col 12 m8 l9">
            ${projContent}
            ${projRelated}
          </div>
        </div>
      `);
  }
  $(".projects-elem-container").get(0).innerHTML = items.join("");
}

/**
 * Creates html elements from `publications.json`
 *
 * { "title", "authors", "venue" } fields are REQUIRED.
 *
 * Missing { "image", "actions" } fields will be OMITTED.
 *
 * Example of full element created:
 * ```
 * <div class="row">
 *   <div class="col s12 m4 l3 publication-img-container">
 *     <img src="/assets/images/publications/<image>" class="publication-img" />
 *   </div>
 *   <div class="col 12 m8 l9">
 *     <p class="publication-content">
 *       <span class="publication-title">title</span>
 *       <br />
 *       <span class="publication-authors">authors</span>
 *       <br />
 *       <span class="publication-venue">venue</span>
 *     </p>
 *     <p class="publication-actions">
 *       <span class="publication-action"><a href="<link>" target="_blank">text</a></span>
 *       <span>&nbsp;|&nbsp;</span>
 *       <span class="publication-action"><a href="<link>" target="_blank">text</a></span>
 *       ...
 *     </p>
 *   </div>
 * </div>
 * ```
 * @param {*} data
 */
function createPublicationsElements(data) {
  let items = [];
  let elemImage, elemContent, elemAction;

  // for each year
  for (let i = 0; i < data.length; i++) {
    const y = Object.entries(data[i])[0];
    const year = y[0];
    const pubs = y[1];

    // create year header
    items.push(`
      <div id="${year}-header" class="row">
        <div class="col s12">
          <span class="publications-section-header">${year}</span>
          <span class="publications-section-subtitle">(${pubs.length})</span>
        </div>
      </div>
    `);

    // for each publication that year
    for (let j = 0; j < pubs.length; j++) {
      const p = pubs[j];

      // publication image
      if (p.image) {
        elemImage = `
          <img src="/assets/images/publications/${p.image}" class="publication-img" />
        `;
      } else {
        elemImage = `
          <img src="/assets/favicon/android-chrome-512x512.png" class="publication-img" />
        `;
      }

      // publication content
      elemContent = `
        <p class="publication-content">
          <span class="publication-title">${p.title}</span>
          <br />
          <span class="publication-authors">${p.authors}</span>
          <br />
          <span class="publication-venue">${p.venue}</span>
        </p>
      `;

      // publication actions
      let actions = [];
      for (let k = 0; k < p.actions.length; k++) {
        const a = p.actions[k];
        actions.push(`
          <span class="publication-action"><a href="${a.link}" target="_blank">${a.text}</a></span>
        `);
        if (k < p.actions.length - 1) {
          actions.push(`
            <span>&nbsp;|&nbsp;</span>
          `);
        }
      }
      elemAction = `
        <p class="publication-actions">
          ${actions.join("")}
        </p>
      `;

      items.push(`
        <div class="row publication-container">
          <div class="col s12 m4 l3 publication-img-container">
            ${elemImage}
          </div>
          <div class="col 12 m8 l9">
            ${elemContent}
            ${elemAction}
          </div>
        </div>
      `);
    }
  }

  $(".publications-elem-container").get(0).innerHTML = items.join("");
}
