$(document).ready(function() {
  // Initialize variables
  let currentImageIndex = 0;
  const images = $('.image-slider-container img');
  const totalImages = images.length;
  
  // Show first image, hide others
  updateView();
  
  // Update counter text
  updateCounter();
  
  // Next button click handler
  $('.image-slider-next').click(function() {
    currentImageIndex = (currentImageIndex + 1) % totalImages;
    updateView();
    updateCounter();
  });
  
  // Previous button click handler
  $('.image-slider-prev').click(function() {
    currentImageIndex = (currentImageIndex - 1 + totalImages) % totalImages;
    updateView();
    updateCounter();
  });
  
  // Touch swipe support for mobile
  let touchStartX = 0;
  let touchEndX = 0;
  
  $('.image-slider-container').on('touchstart', function(e) {
    touchStartX = e.originalEvent.touches[0].clientX;
  });
  
  $('.image-slider-container').on('touchend', function(e) {
    touchEndX = e.originalEvent.changedTouches[0].clientX;
    handleSwipe();
  });
  
  function handleSwipe() {
    // Detect swipe direction (50px threshold)
    if (touchStartX - touchEndX > 50) {
      // Swipe left - next image
      $('.image-slider-next').click();
    } else if (touchEndX - touchStartX > 50) {
      // Swipe right - previous image
      $('.image-slider-prev').click();
    }
  }
  
  // Helper functions
  function updateView() {
    // Hide all images
    images.hide();
    // Show current image
    images.eq(currentImageIndex).show();
  }
  
  function updateCounter() {
    $('.image-slider-counter').text((currentImageIndex + 1) + '/' + totalImages);
  }
});
