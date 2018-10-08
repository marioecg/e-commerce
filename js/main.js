/** Animations using anime.js */

const dropDown = document.querySelector('#anime-dropdown');

document.addEventListener('DOMContentLoaded', () => {

  // Initial page load animation

  anime.timeline({
    easing: 'easeOutExpo',
  })
    .add({
      targets: '.c-nav__logo, .c-ham-wrapper, .c-footer',
      opacity: [0, 1],
      duration: 2000,
      delay: 500
    })
    .add({
      targets: '#anime-dropdown',
      opacity: [0, 1],
      translateY: [12, 1],
      offset: '-=1000'
    })
    .add({
      targets: '.c-content__info',
      translateY: [100, 0],
      opacity: [0, 1],
      offset: '-=500',
    })
    .add({
      targets: '.c-content__image--fixed',
      translateY: [-100, 0],
      opacity: [0, 1],
      offset: '-=1000',
    })
})

dropDown.addEventListener('mouseenter', () => {
  anime({
    targets: '.c-nav__dropdown a',
    opacity: [0, 1],
    translateY: [20, 0],
    easing: 'easeOutExpo',
    delay: (el, i) => 100 * i
  })
})

/** Open and close menu screen navigation */

const hamburger = document.querySelector('.c-ham-wrapper');
const body = document.querySelector('body');
let isMenuOpen = false;

function handleMenu() {

  if (isMenuOpen) {

    body.classList.remove('menu-open-active');
    setTimeout(() => body.classList.remove('menu-open'), 500);
    isMenuOpen = false;

  } else {

    body.classList.add('menu-open');
    setTimeout(() => body.classList.add('menu-open-active'), 150);
    isMenuOpen = true;

    anime.timeline({
      easing: 'easeOutExpo',
    })

      .add({
        targets: '.c-menu__nav li',
        opacity: [0, 1],
        translateY: [20, 0],
        delay: (el, i) => 150 * i
      })
      .add({
        targets: '.c-menu__social li',
        opacity: [0, 1],
        offset: '-=500'
      })
  }
}

hamburger.addEventListener('click', handleMenu);

/** Load page content via .fetch() when link is clicked and animate it  */

let tchaikovskyLink = document.querySelector('#tchaikovsky-link');
let mendelssohnLink = document.querySelector('#mendelssohn-link');
let bruchLink = document.querySelector('#bruch-link');
let sibeliusLink = document.querySelector('#sibelius-link');
let brahmsLink = document.querySelector('#brahms-link');
let beethovenLink = document.querySelector('#beethoven-link');
let mozartLink = document.querySelector('#mozart-link');

let linkArray = [tchaikovskyLink, mendelssohnLink, bruchLink, sibeliusLink, brahmsLink, beethovenLink, mozartLink];

linkArray.forEach(eachLink => {

  eachLink.addEventListener('click', (e) => {

    e.preventDefault();

    switch (eachLink) {

      case tchaikovskyLink:
        fetchPage(eachLink, 'tchaikovsky.html');
        break;

      case mendelssohnLink:
        fetchPage(eachLink, 'mendelssohn.html');
        break;

      case bruchLink:
        fetchPage(eachLink, 'bruch.html');
        break;

      case sibeliusLink:
        fetchPage(eachLink, 'sibelius.html');
        break;

      case brahmsLink:
        fetchPage(eachLink, 'brahms.html');
        break;

      case beethovenLink:
        fetchPage(eachLink, 'beethoven.html');
        break;

      case mozartLink:
        fetchPage(eachLink, 'mozart.html');
        break;

    }

  })

})

function fetchPage(link, page) {

  let baseURL = `${window.location.protocol}//${window.location.hostname}`;

  if (window.location.port) {

    baseURL += `:${window.location.port}`;

  }

  fetch(`${baseURL}/${page}`)
    .then(function (response) {

      return response.text()

    })
    .then(function (html) {

      let doc = new DOMParser().parseFromString(html, "text/html");

      anime({
        targets: '.text-section h1, .text-section p, .text-section div',
        translateX: 700,
        opacity: 0,
        easing: 'easeInExpo',
        duration: 700,
        complete: (anim) => {
          document.querySelector('.column-wrapper').remove();
        }
      })

      setTimeout(function () {

        document.querySelector('body').insertBefore(doc.querySelector('.new-content'), document.querySelector('.gallery-nav'));

        anime({
          targets: '.new-content .c-content__info, .new-content .c-content__composer',
          translateX: [-600, 0],
          delay: (el, i) => 100 * i,
          opacity: [0, 1],
          easing: 'easeOutExpo',
        })

      }, 700);
    })
}