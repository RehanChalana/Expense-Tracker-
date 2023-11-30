// making buttons redirect to links
document.querySelector("#loginBtn").addEventListener('click',function(){
    window.location.href="index.html"
})

document.querySelector("#registerBtn").addEventListener('click',function(){
    window.location.href="Signup.html"
})






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

    var featElements = document.querySelectorAll('.feat');
    var statElements = document.querySelectorAll('.stat');
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
      featElements.forEach(function (element) {
        if (isElementInViewport(element)) {
          element.classList.add('visible');
        } else{
            element.classList.remove('visible');
        }
      });

      statElements.forEach(function (element){
        if(isElementInViewport(element)) {
            element.classList.add('statLoaded')
        } else{
            element.classList.remove('statLoaded');
        }
    })}
    window.addEventListener('scroll', handleVisibility);

    handleVisibility();
  });


// making stat elements having loading animation
