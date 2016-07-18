'use strict';
import OAM from 'oam-design-system';
import $ from 'jquery';
import moment from 'moment';
import centroid from 'turf-centroid';
import tilebelt from 'tilebelt';

// Header Interactivity
document.querySelector('[data-hook="global-menu:trigger"]').addEventListener('click', function (e) {
  e.preventDefault();
  e.target.classList.toggle('button--active');

  document.querySelector('[data-hook="global-menu:wrapper"]').classList.toggle('menu-wrapper--open');
}, false);

// Use image metadata to construct OAM Browser URL describing the map view,
// associated grid tile, and image id
const constructUrl = (imgData) => {
  const previewZoom = 10;
  // Use turf to calculate the center of the image
  const center = centroid({
    type: 'Feature',
    geometry: imgData.geojson
  }).geometry.coordinates;
  // Calculate the tile quadkey for the image using Mapbox tilebelt
  // * a square at zoom Z is the same as a map tile at zoom Z+3 (previewZoom)
  const tile = tilebelt.pointToTile(center[0], center[1], previewZoom + 3);
  const quadKey = tilebelt.tileToQuadkey(tile);
  const mapView = center[0] + ',' + center[1] + ',' + previewZoom;
  // Return OAM Browser URL including map view, tile, and image id
  return `http://beta.openaerialmap.org/#/${mapView}/${quadKey}/${imgData._id}`;
};

// Update Latest Imagery containers to describe and link to most recent imagery
const updateLatest = () => {
  // Fetch metadata for the three most recent images, in descending order
  const catalogueUrl = 'https://api.openaerialmap.org/meta?order_by=acquisition_end&sort=desc&limit=3';
  $.getJSON(catalogueUrl, (data) => {
    data.results.forEach((imgData, i) => {
      const targetEl = $(`#image-${i + 1} a`);
      // Update the thumbnail, image platform, and acquisition date metadata
      $('.latest-imagery__image', targetEl).prepend(
        $('<img>', {alt: 'Recent Imagery', src: imgData.properties.thumbnail}));
      $('.uploaded', targetEl).text(
        moment(imgData.acquisition_start.slice(0, -1)).format('MMMM Do YYYY'));
      $('.source', targetEl).text(imgData.platform);
      // Update link by generating an OAM Browser URL to the image
      targetEl.attr('href', constructUrl(imgData));
      // Fade out loading spinner
      $('.loading', targetEl).removeClass('revealed');
    });
  });
};

// Run functions
OAM.hello();
updateLatest();
