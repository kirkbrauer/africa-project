// init controller
var controller = new ScrollMagic.Controller();

// create a scene
new $.ScrollMagic.Scene({
        duration: 1200,  // the scene should last for a scroll distance of 100px
        offset: 0,
      })
      .setPin("#map-wrapper")
      .addIndicators()
      .addTo(controller); // assign the scene to the controller

new $.ScrollMagic.Scene({
        duration: 500,  // the scene should last for a scroll distance of 100px
        offset: 50,
        reverse: true
      })
      .setTween(".map", {scale: 2.5, left: -500, top: 250, ease: Expo.easeIn})
      .addIndicators()
      .addTo(controller); // assign the scene to the controller

      new $.ScrollMagic.Scene({
              duration: 5,  // the scene should last for a scroll distance of 100px
              offset: 540,
              reverse: true
            })
            .setTween("#info-test", {opacity: 1})
            .addIndicators()
            .addTo(controller); // assign the scene to the controller

new $.ScrollMagic.Scene({
        duration: 500,  // the scene should last for a scroll distance of 100px
        offset: 600,
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
