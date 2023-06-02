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
