$(document).ready(function() {
  const LOCAL_STORAGE_DARK_MODE_NAME = "lucienCussonFradetPersonalWebSiteDarkMode";

  // Function to check screen size
  let mobileFlag = false;
  function checkScreenSize() {
    var windowWidth = $(window).width();
    if (windowWidth <= 991) {
      mobileFlag = true;
      // If window width is smaller than or equal to 991
      $(".navbar-icon").show();
      $(".navbar-desktop-menu").hide();
      $(".buttom-social").hide();
    } else {
      mobileFlag = false;
      // If window width is greater than 991
      $(".navbar-icon").hide();
      $(".navbar-desktop-menu").show();
      $(".buttom-social").show();
    }
  }

  // Initial check on page load
  checkScreenSize();

  // Check on window resize
  $(window).resize(checkScreenSize);

  let lastScrollTop = 0;

  function checkScrollPosition() {
    var scrollPosition = $(this).scrollTop();

    // Check if the current scroll position is greater than the last scroll position
    if (scrollPosition > lastScrollTop){
      // Scrolling down
      $(".navbar").css("transform", "translateY(-100%)");
    } else {
      // Scrolling up
      $(".navbar").css("transform", "translateY(0)");
    }

    // Update the last scroll position
    lastScrollTop = scrollPosition <= 0 ? 0 : scrollPosition;
  }

  checkScrollPosition();

  $(window).scroll(checkScrollPosition);

  // navbar mobile
  const navbarIconUrl = '/data/icons/navbar_icon.svg';
  const navbarIconCloseUrl = '/data/icons/navbar_icon_close.svg';

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

  $(".media-container").hover(
    function() {
      let $video = $(this).find(".video"); // Find the video element
      if ($video.length) { // Check if the video element exists
        $video.show(); // Show the video
        $(this).find(".image").css('opacity', 0); // Hide the image
        $video.get(0).play(); // Play the video
      }
    },
    function() {
      let $video = $(this).find(".video"); // Find the video element
      if ($video.length) { // Check if the video element exists
        $video.hide(); // Hide the video
        $(this).find(".image").css('opacity', 1); // Show the image
        $video.get(0).pause(); // Pause the video
      }
    }
  );

  // fix agent montreal video
  $('#agent-mtl-video').on('loadedmetadata', function() {
    this.currentTime = 2;
  });

  let images = $('.multiple-images img');
  let currentIndex = 0;
  let previousIndex = 0;

  function showImage(index) {
    images.eq(previousIndex).css('opacity', 0);
    images.eq(index).css('opacity', 1);
  }

  function nextImage() {
    previousIndex = currentIndex;
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
  }

  // Initial setup
  showImage(0);

  // Set interval to switch images every 5 seconds
  setInterval(nextImage, 5000); // Adjust the interval time as needed

  // ******* adjust for mobile ********

  // store contentElements
  let contentLeft = [];
  let contentRight = [];
  let contentCenter = [];
  let contentId = [];

  $('.content.content-left').each(function() {
    contentLeft.push($(this));
  })
  $('.content.content-right').each(function() {
    contentRight.push($(this));
  })
  $('.content.content-center').each(function() {
    contentCenter.push($(this));
  })
  $('.media-container').each(function() {
    let id = $(this).attr('id');
    if (id) {
      contentId.push({ id: id, element: $(this) })
    }
  })

  function addContentClass() {
    for (const e of contentLeft) {
      e.addClass('content-left')
    }
    for (const e of contentRight) {
      e.addClass('content-right')
    }
    for (const e of contentCenter) {
      e.addClass('content-center')
    }
    for (const e of contentId) {
      e.element.attr('id', e.id);
    }
  }

  function removeContentClass() {
    for (const e of contentLeft) {
      e.removeClass('content-left')
    }
    for (const e of contentRight) {
      e.removeClass('content-right')
    }
    for (const e of contentCenter) {
      e.removeClass('content-center')
    }
    for (const e of contentId) {
      e.element.removeAttr('id');
    }
  }

  function toggleMobileDisplay() {
    let screenWidth = window.innerWidth;

    if (screenWidth < 479) {
      $('.pill-container').hide(); // Hide the pill container if screen width is less than 479
      removeContentClass();
    } else {
      $('.pill-container').show(); // Show the pill container if screen width is 479 or greater
      addContentClass();
    }
  }

  // Initial call to set the initial state based on screen width
  toggleMobileDisplay();

  // Event listener to toggle pill container on window resize
  $(window).resize(toggleMobileDisplay);

  $(document).ready(function() {
    $("#button-view-all-work-wrapper").mouseenter(function() {
      $("#button-view-all-work").css("transform", "rotate(-5deg)");
      setTimeout(function() {
        $("#button-view-all-work").css("transform", "rotate(10deg)");
      }, 250); // Delay for 50% of the animation duration
    });
  });

  // Mouse leave event handler for #button-view-all-work-wrapper
  $("#button-view-all-work-wrapper").mouseleave(function() {
    // Apply transform: rotate(0deg); to #button-view-all-work
    $("#button-view-all-work").css("transform", "rotate(0deg)");
  });

  // Dark mode functionality
  // Check if user has a preference stored
  const darkModePreference = localStorage.getItem(LOCAL_STORAGE_DARK_MODE_NAME);
  
  // Apply dark mode if preference exists
  if (darkModePreference === 'enabled') {
    $('body').addClass('dark-mode');
  }
  
  // Toggle dark mode function
  function toggleDarkMode() {
    // Toggle dark mode class on body
    $('body').toggleClass('dark-mode');
    
    // Update localStorage based on current state
    if ($('body').hasClass('dark-mode')) {
      localStorage.setItem(LOCAL_STORAGE_DARK_MODE_NAME, 'enabled');
    } else {
      localStorage.setItem(LOCAL_STORAGE_DARK_MODE_NAME, 'disabled');
    }
  }
  
  // Click handlers for both desktop and mobile toggles
  $('#darkModeToggleDesktop, #darkModeToggleMobile').click(function() {
    toggleDarkMode();
  });
  
  // Handle navbar SVG icons (if needed - using CSS filter approach)
  function loadNavbarIcon() {
    const isDarkMode = $('body').hasClass('dark-mode');
    const iconUrl = navBarIconFlag ? navbarIconUrl : navbarIconCloseUrl;
    
    $.ajax({
      url: iconUrl,
      dataType: 'text',
      success: function(svgContent) {
        $('.navbar-icon svg').html(svgContent);
      },
      error: function(error) {
        console.error('Error fetching SVG:', error);
      }
    });
  }
})
