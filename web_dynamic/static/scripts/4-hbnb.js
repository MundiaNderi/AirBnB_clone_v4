$(document).ready(function() {
  // Store the selected amenities
  var selectedAmenities = [];

  // Listen for changes on each input checkbox tag
  $('input[type="checkbox"]').change(function() {
    var amenityId = $(this).data('id');
    var amenityName = $(this).data('name');

    // Check if the checkbox is checked
    if ($(this).is(':checked')) {
      // Add the Amenity ID to the selected amenities list
      selectedAmenities.push(amenityId);
    } else {
      // Remove the Amenity ID from the selected amenities list
      var index = selectedAmenities.indexOf(amenityId);
      if (index > -1) {
        selectedAmenities.splice(index, 1);
      }
    }

    // Update the h4 tag inside the div Amenities with the list of Amenities checked
    $('.amenities h4').text(selectedAmenities.join(', '));
  });
});

// api_status = "OK" check
$.get('http://0.0.0.0:5001/api/v1/status/', function (info, status) {
  if (status === 'OK') {
    $('#api_status').addClass('available');
  } else {
    $('#api_status').removeClass('available');
  }
});

// task 4
  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    contentType: 'application/json',
    data: '{}',
    success: function (info) {
      for (let i = 0; i < info.length; i++) {
        const place = info[i];
        $('.places').append(
          '<article><div class="title_box"><h2>' + place.name +
            '</h2><div class="price_by_night">$' + place.price_by_night +
            '</div></div><div class="information"><div class="max_guest">' +
            rmAddS(place.max_guest, 'Guest') +
            '</div><div class="number_rooms">' +
            rmAddS(place.number_rooms, 'Bedroom') +
            '</div><div class="number_bathrooms">' +
            rmAddS(place.number_bathrooms, 'Bathroom') +
            '</div></div><div class="description">' +
            place.description + '</div></article>');
      }
    }
  });

  function rmAddS (num, name) {
    if (num === 1) { return `${num} ${name}`; } else { return `${num} ${name}s`; }
  }
});

 // Button click event
  $('button').click(function() {
    // Make a POST request to places_search with selected amenities
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      contentType: 'application/json',
      data: JSON.stringify({ amenities: selectedAmenities }),
      success: function(info) {
        $('.places').empty(); // Clear existing places

        for (let i = 0; i < info.length; i++) {
          const place = info[i];
          $('.places').append(
            '<article><div class="title_box"><h2>' + place.name +
            '</h2><div class="price_by_night">$' + place.price_by_night +
            '</div></div><div class="information"><div class="max_guest">' +
            rmAddS(place.max_guest, 'Guest') +
            '</div><div class="number_rooms">' +
            rmAddS(place.number_rooms, 'Bedroom') +
            '</div><div class="number_bathrooms">' +
            rmAddS(place.number_bathrooms, 'Bathroom') +
            '</div></div><div class="description">' +
            place.description + '</div></article>');
        }
      }
    });
  });

  function rmAddS(num, name) {
    if (num === 1) {
      return `${num} ${name}`;
    } else {
      return `${num} ${name}s`;
    }
  }
});
