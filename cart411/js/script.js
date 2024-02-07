$(document).ready(function() {
  // setup image grid
  const vacantImageGrid = $("#vacant-img-grid");

  function randomizeVacantImages() {
    // Define the number of images you want
    const numberOfImages = 5;

    for (let i = 0; i < numberOfImages; i++) {
      const img = $("<img>");
      (i === 0) ? img.attr("src", "data/images/vacant_examples/vacant.png") : img.attr("src", `data/images/vacant_examples/vacant(${i + 1}).png`)
      img.attr("alt", "Random Image");
      img.css("width", getRandomSize() + "px");
      img.css("grid-area", getRandomPosition());

      vacantImageGrid.append(img);
    }
  }

  function getRandomSize() {
    return Math.floor(Math.random() * 500) + 400; // Adjust the range as needed
  }

  function getRandomPosition() {
    const rowStart = Math.floor(Math.random() * 4) + 1; // Adjust the number of rows as needed
    const colStart = Math.floor(Math.random() * 4) + 1; // Adjust the number of columns as needed
    const rowEnd = rowStart + Math.floor(Math.random() * 2) + 1;
    const colEnd = colStart + Math.floor(Math.random() * 2) + 1;

    return `${rowStart} / ${colStart} / ${rowEnd} / ${colEnd}`;
  }

  // call the function on load
  randomizeVacantImages();

  // bind a "hidden" click action to move images
  vacantImageGrid.on('click', function() {
    vacantImageGrid.empty();
    randomizeVacantImages();
  }); 

  document.querySelectorAll('a.scroll-to').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
});
});
