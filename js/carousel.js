const pageCarousel = tns({
  container: '.page-carousel .slider-list',
  controls: false,
  gutter: 6,
  edgePadding: 70,
  controls: true,
  controlsContainer: '.page-carousel .page-carousel-controls',
  navContainer: '.page-carousel .thumbnail-list',
  navAsThumbnails: true,
  mouseDrag: true,
  preventScrollOnTouch: true,
  responsive: {
    768: {
      gutter: 8,
      edgePadding: 110,
    },
    1200: {
      edgePadding: 75,
    },
  },
})
