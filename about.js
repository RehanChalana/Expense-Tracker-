// making images go in a loop
let panel = document.querySelector(".panel");
let images = ["url(./images/slide-01.jpg)","url(./images/slide-02.jpg)","url(./images/slide-03.jpg)"];
let index = 0;
function changeBackground() {
    panel.style.backgroundImage = images[index];
    index = (index + 1) % images.length;
}

setInterval(changeBackground, 3000);


// adding load animation to feat
document.addEventListener('DOMContentLoaded', function() {
    var myElements = document.querySelectorAll('.feat'); // Change '.myElementClass' to your actual selector
  
    myElements.forEach(function (element) {
      element.classList.add('hidden'); // Optionally add 'hidden' class to set initial state
    });
  
    function isElementInViewport(el) {
      if (!el || typeof el.getBoundingClientRect !== 'function') {
        return false;
      }
  
      var rect = el.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    }
  
    function handleVisibility() {
      myElements.forEach(function (element) {
        if (isElementInViewport(element)) {
          element.classList.add('visible');
        } else{
            element.classList.remove('visible');
        }
      });
    }
  
    window.addEventListener('scroll', handleVisibility);
    // Check visibility on page load
    handleVisibility();
  });
