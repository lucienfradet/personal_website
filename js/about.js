$(document).ready(function() {
  $('.image-wrapper').on('mousemove', function(event) {
    let containerWidth = $(this).width();
    let containerHeight = $(this).height();
    let mouseX = event.pageX - $(this).offset().left;
    let mouseY = event.pageY - $(this).offset().top;
    let moveX = (mouseX - (containerWidth / 2)) / 10; // Adjust sensitivity
    let moveY = (mouseY - (containerHeight / 2)) / 10; // Adjust sensitivity
    let centerX = containerWidth / 2;
    let centerY = containerHeight / 2;

    // Calculate the angle of rotation
    let deltaX = mouseX + centerX;
    let deltaY = mouseY + centerY;
    if (mouseX < centerX && mouseY < centerY) {
      // angleInDegrees -= 45;
      deltaY = centerX + mouseX;
    }     
    if (mouseX < centerX && mouseY > centerY) {
      // angleInDegrees -= 45;
      deltaY = centerY + mouseY;
    }     
    let angleInDegrees = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

    if (mouseX < centerX) {
      angleInDegrees -= 60;
    }     
    if (mouseX > centerX && mouseY > centerY) {
      angleInDegrees -= 20;
    }
    // Adjust the angle based on the mouse position
    let middlePart = containerWidth/6;
    if (mouseX < centerX + middlePart && mouseX > centerX - middlePart) {
      angleInDegrees = 0;
    }     
    $('.moving-image').css('transform', 'translate(' + moveX + 'px, ' + moveY + 'px) rotate(' + angleInDegrees + 'deg)');
  });

  $('.image-wrapper').on('mouseleave', function() {
    $('.moving-image').css('transform', 'translate(0, 0) rotate(0deg)');
  });
});
