$(document).ready(function() {
  const navbarIconUrl = '../data/icons/navbar_icon.svg';
  const navbarIconCloseUrl = '../data/icons/navbar_icon_close.svg';

  let navBarIconFlag = true;

  //prevent animation on page load
  $('.navbar-icon').addClass('page-load');
  $('.navbar-content').addClass('page-load');

  $.ajax({
    url: navbarIconUrl,
    dataType: 'text', // Specify text data type for SVG content
    success: function(svgContent) {
      $('.navbar-icon svg').html(svgContent);
    },
    error: function(error) {
      console.error('Error fetching SVG:', error);
    }
  });

  $('.navbar-icon').click(function() {

    $('.navbar-icon').removeClass('page-load');
    $('.navbar-content').removeClass('page-load');
    // Update state variable and toggle icons
    navBarIconFlag = !navBarIconFlag;

    // Fetch and display the appropriate icon based on the state
    const iconUrl = navBarIconFlag ? navbarIconUrl : navbarIconCloseUrl;
    $.ajax({
      url: iconUrl,
      dataType: 'text',
      success: function(svgContent) {
        $('.navbar-icon').toggleClass("active");
        $('.navbar-icon').css('animation-play-state', 'running');
        setTimeout(function() {
          $('.navbar-icon svg').html(svgContent);
        }, 300);
      },
      error: function(error) {
        console.error('Error fetching SVG:', error);
      }
    });

    // Toggle navbar class
    $('.navbar').toggleClass("active");
    $('.navbar-content').toggleClass("active");
  });
})
