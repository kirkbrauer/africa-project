// init controller
controller = new ScrollMagic.Controller();

//Code for anchor links
controller.scrollTo(function(target) {

  TweenMax.to(window, 0.5, {
    scrollTo : {
      y : target, // scroll position of the target along y axis
      autoKill : true // allows user to kill scroll action smoothly
    },
    ease : Cubic.easeInOut
  });

});

$(document).on("click", "a[href^=#]", function(e) {
  var id = $(this).attr("href");

  if($(id).length > 0) {
    e.preventDefault();

    // trigger scroll
    controller.scrollTo(id);

    // If supported by the browser we can also update the URL
    if (window.history && window.history.pushState) {
      history.pushState("", document.title, id);
    }
  }

});

//Template:
// {duration, offset, reverse, triggerelement, tween, pinelement, lockscroll}

var hide_content = new TimelineMax()
  .to("#view-container", 1 , {opacity: 0})
  .to("#map-wrapper", 1 , {opacity: 1});

var show_content = new TimelineMax()
  .to("#view-container", 1 , {opacity: 1})
  .to("#map-wrapper", 1 , {opacity: 0.5});

//Controller for scroll locking
scrolllock = false;
var locked = false;
$('body').on({
    'mousewheel': function(e) {
      if (e.originalEvent.wheelDelta >= 0) {
        //Scroll Up
      } else {
        if (scrolllock) {
          console.log("Lock");
          e.preventDefault();
          e.stopPropagation();
          setTimeout(function(){ scrolllock = false; }, 1000);
        }
      }
    }
})
// Pin continent for whole Duration
new $.ScrollMagic.Scene({
        duration: 1400,  // the scene should last for a scroll distance of 100px
        offset: 0,
      })
      .setPin("#map-wrapper", {pushFollowers: false})
      .addIndicators("Pin")
      .addTo(controller); // assign the scene to the controller

new $.ScrollMagic.Scene({
        duration: 500,  // the scene should last for a scroll distance of 100px
        offset: 50,
        reverse: true
      })
      .setTween(".map", {scale: 2.5, left: -500, top: 250, ease: Expo.easeIn})
      .on('leave', function (event) {
        if (event.state === "AFTER") {
          console.log("end");
          scrolllock = true;
        }
      })
      .addIndicators()
      .addTo(controller); // assign the scene to the controller

new $.ScrollMagic.Scene({
      duration: 10,  // the scene should last for a scroll distance of 100px
      offset: 540,
      reverse: true
    })
    .setTween(show_content)
    .addIndicators()
    .addTo(controller); // assign the scene to the controller

new $.ScrollMagic.Scene({
          duration: 10,  // the scene should last for a scroll distance of 100px
          offset: 670,
          reverse: true
          })
          .setTween(hide_content)
          .addIndicators()
          .addTo(controller); // assign the scene to the controller

new $.ScrollMagic.Scene({
        duration: 500,  // the scene should last for a scroll distance of 100px
        offset: 700,
        reverse: true
      })
      .setTween(".map", {scale: 1.0, left: 0, top: 0})
      .addIndicators()
      .addTo(controller); // assign the scene to the controller


new $.ScrollMagic.Scene({ duration: 200,offset: 25
            })
            .setTween(".title", {opacity: 0})
            .addIndicators()
            .addTo(controller); // assign the scene to the controller
