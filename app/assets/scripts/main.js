'use strict';
import OAM from 'oam-design-system';
import $ from 'jquery';
import moment from 'moment';
import centroid from 'turf-centroid';
import tilebelt from 'tilebelt';

import {OAMCatalogApi, OAMBrowserUrl} from './config.js';

// Set the unqique image, provider, and sensor counts used in the header
const setHeaderStats = () => {
  const url = `${OAMCatalogApi}/analytics/?limit=1`;
  $.getJSON(url, function (data) {
    const stats = data.results[0];
    $('#stats--images')
      .html(stats.count.toLocaleString()).removeClass('invisible');
    $('#stats--sensors')
      .html(stats.sensor_count.toLocaleString()).removeClass('invisible');
    $('#stats--providers')
      .html(stats.provider_count.toLocaleString()).removeClass('invisible');
  });
};

// Convert Ground Sample Distance to meter resolution
const gsdToUnit = (gsd) => {
  let unit = 'm';
  // If it's less than 1m, convert to cm so it displays more nicely
  if (gsd < 1) {
    unit = 'cm';
    gsd = (gsd * 100).toFixed(2);
  }
  if (gsd < 1) gsd = 0;
  return `${gsd} ${unit}`;
};

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
  return `${OAMBrowserUrl}/#/${mapView}/${quadKey}/${imgData._id}`;
};

// Update Latest Imagery containers to describe and link to most recent imagery
const updateLatestImagery = () => {
  // Fetch metadata for the three most recent images, in descending order
  const catalogueUrl = `${OAMCatalogApi}/meta?order_by=acquisition_end&sort=desc&limit=3`;
  $.getJSON(catalogueUrl, (data) => {
    data.results.forEach((imgData, i) => {
      const targetEl = $(`#image-${i + 1} a`);
      // Update the thumbnail, image platform, and acquisition date metadata
      $('.latest-imagery__image', targetEl).prepend(
        $('<img>', {alt: 'Recent Imagery', src: imgData.properties.thumbnail}));
      $('#date', targetEl).text(
        moment(imgData.acquisition_start.slice(0, -1)).format('MMMM Do YYYY'));
      $('#provider', targetEl).text(imgData.provider);
      $('#resolution', targetEl).text(gsdToUnit(imgData.gsd));
      // Update link by generating an OAM Browser URL to the image
      targetEl.attr('href', constructUrl(imgData));
      // Fade out loading spinner
      $('.loading', targetEl).removeClass('revealed');
    });
  });
};

// Add header Interactivity
document.querySelector('[data-hook="global-menu:trigger"]').addEventListener('click', function (e) {
  e.preventDefault();
  e.target.classList.toggle('button--active');
  document.querySelector('[data-hook="global-menu:wrapper"]').classList.toggle('menu-wrapper--open');
}, false);

// Run functions
OAM.hello();
setHeaderStats();
updateLatestImagery();
