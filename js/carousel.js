const pageCarousel = tns({
  container: '.page-carousel .slider-list',
  controls: false,
  gutter: 6,
  edgePadding: 20,
  controls: true,
  controlsContainer: '.page-carousel .page-carousel-controls',
  navContainer: '.page-carousel .thumbnail-list',
  navAsThumbnails: true,
  autoplay: true,
  autoplayHoverPause: true,
  autoplayButtonOutput: false,
  mouseDrag: true,
  preventScrollOnTouch: true,
  responsive: {
    768: {
      gutter: 8,
      edgePadding: 36,
    },
    1200: {
      edgePadding: 50,
    },
  },
})
