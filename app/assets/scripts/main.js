'use strict';
import config from './config';
import OAM from 'oam-design-system';
import dateFormat from 'dateformat';
import $ from 'jquery';
window.$ = $;

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
const updateLatest = () => {
  // Fetch metadata for the three most recent images, in descending order
  const catalogueUrl = 'https://api.openaerialmap.org/meta?order_by=acquisition_end&sort=desc&limit=3';
  $.getJSON(catalogueUrl, (data) => {
    data.results.forEach((imgData, i) => {
      const targetDiv = $(`#image-${i + 1}`);
      // Update the thumbnail, image platform, and acquisition date metadata
      $('.latest-imagery__image', targetDiv).prepend(
        $('<img>', {alt: 'Recent Imagery', src: imgData.properties.thumbnail}));
      $('.uploaded', targetDiv).text(
        dateFormat(imgData.acquisition_start, 'mmmm dS, yyyy'));
      $('.source', targetDiv).text(imgData.platform);
      $('.loading', targetDiv).removeClass('revealed');
    });
  });
};

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
