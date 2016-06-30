'use strict';
import config from './config';
import OAM from 'oam-design-system';

OAM.hello();

console.log.apply(console, config.consoleMessage);
console.log('Environment', config.environment);

// Header Interactivity
document.querySelector('[data-hook="global-menu:trigger"]').addEventListener('click', function (e) {
  e.preventDefault();
  e.target.classList.toggle('button--active');

  document.querySelector('[data-hook="global-menu:wrapper"]').classList.toggle('menu-wrapper--open');
}, false);

// Grab most recent imagery for the hero image container, if we choose to do that.
function updateHero () {
}

// Update the containers for the most recent imagery
function updateLatest () {
}

// Add Flexslider to Projects Section
function createSlider () {
  $('.flex-slider').flexslider({
    animation: 'slide',
    directionNav: true,
    slideshowSpeed: 6000000,
  });
  // $('.flex-next').prependTo('.HOT-Nav-Projects');
  // $('.flex-control-nav').prependTo('.HOT-Nav-Projects');
  // $('.flex-prev').prependTo('.HOT-Nav-Projects');
};

updateHero();
updateLatest();

console.log("waffles!")