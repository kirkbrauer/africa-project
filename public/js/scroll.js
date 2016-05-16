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
/*$('body').on({
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
})*/
// Pin continent for whole Duration
new $.ScrollMagic.Scene({
        duration: 1000,  // the scene should last for a scroll distance of 100px
        offset: 0,
      })
      .setPin("#map-wrapper", {pushFollowers: false})
      .addTo(controller); // assign the scene to the controller

new $.ScrollMagic.Scene({ duration: 100,offset: 25
      })
      .setTween(".title", {opacity: 0})

      .addTo(controller); // assign the scene to the controller

var fadetitle = new TimelineMax()
  .staggerTo("#africa-people", 1 , {opacity: 1})
  .staggerTo("#africa-people", 1 , {opacity: 0});

new $.ScrollMagic.Scene({ duration: 100,offset: 125
      })
      .setTween(fadetitle)

      .addTo(controller); // assign the scene to the controller

var fadetitle_1 = new TimelineMax()
    .staggerTo("#africa-country", 1 , {opacity: 1})
    .staggerTo("#africa-country", 1 , {opacity: 0});

new $.ScrollMagic.Scene({ duration: 100,offset: 225
      })
      .setTween(fadetitle_1)

      .addTo(controller); // assign the scene to the controller

var fadetitle_2 = new TimelineMax()
      .staggerTo("#africa-mile", 1 , {opacity: 1})
      .staggerTo("#africa-mile", 1 , {opacity: 0});

new $.ScrollMagic.Scene({ duration: 100,offset: 325
      })
      .setTween(fadetitle_2)

      .addTo(controller); // assign the scene to the controller

new $.ScrollMagic.Scene({
        duration: 300,  // the scene should last for a scroll distance of 100px
        offset: 250,
        reverse: true
      })
      .setTween(".map", {scale: 2.5, left: -500, top: 250, ease: Expo.easeIn})
      .on('leave', function (event) {
        if (event.state === "AFTER") {
          console.log("end");
          scrolllock = true;
        }
      })

      .addTo(controller); // assign the scene to the controller

new $.ScrollMagic.Scene({
      duration: 10,  // the scene should last for a scroll distance of 100px
      offset: 540,
      reverse: true
    })
    .setTween(show_content)

    .addTo(controller); // assign the scene to the controller

    new $.ScrollMagic.Scene({
          duration: 10,  // the scene should last for a scroll distance of 100px
          offset: 540,
          reverse: true
        })
        .setTween(".navbar", {opacity: 1})

        .addTo(controller); // assign the scene to the controller
