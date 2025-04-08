gsap.registerPlugin(ScrollTrigger);

// 헤더
window.addEventListener('scroll' ,function() {
  if(window.scrollY > 10) {
    header.classList.add('scroll')
  }
  else {
    header.classList.remove('scroll')
  }
})
// 헤더 메뉴
// const header = document.querySelector('header')
// const gnbDep1 = document.querySelectorAll('#gnb .dep1>li')

// gnbDep1.forEach(function(item) {
//   item.addEventListener('mouseover', function() {
//     header.classList.add('scroll')
//   })
//   item.addEventListener('mouseout', function() {
//     header.classList.remove('scroll')
//   })
// })




/* main-swiper */
// const btnPlayStop = document.querySelector('.btn-play-stop');
// let isPlaying = true

const mainSwiper = new Swiper('.main-swiper', {
  delay: 5000,
  autoplay: true,
  loop: true,
  pagination: {
    el: '.swiper-pagination',
    type: 'fraction',
    
  },
  navigation: {
    nextEl: '.swiper-next',
    prevEl: '.swiper-prev',
  },
})

/* ESG */
const esgSwiper = new Swiper('.preview_swiper', {
  autoplay: {
    delay: 5000,
  },
  loop: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});



// business
const businessSwiper = gsap.timeline()
  businessSwiper
      // .to('#box2', {scale: 22})
      .to('.business_content', {width: '120vw', height: '120vw'})
      .to('.business_content', {autoAlpha: 0})
      // .to('business_text', {fade: true})
  ScrollTrigger.create({
      animation: businessSwiper,
      trigger: '.business',
      start: 'top top',
      end: '+=2000',
      pin: true, scrub: true,
  })


/* Business2 */
const businesSwiper2 = new Swiper('.business2_swiper', {
  slidesPerView: 1,
  // centeredSlides: true,
  autoplay: true,
  loop: true,
  // spaceBetween: 100,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});

/* News */
const newsSwiper = new Swiper('.news_img_swiper', {
  autoplay: true,
  slidesPerView: 5, 
  spaceBetween: 40,
  loop: true,
  navigation: {
    nextEl: '.swiper-next',
    prevEl: '.swiper-prev',
  },
})
const newsSwiper2 = new Swiper('.news_text_swiper', {
  autoplay: true,
  slidesPerView: 5,
  spaceBetween: 40,
  loop: true,

})


/* product_swiper */
const productSwiper = new Swiper('.product_swiper', {
  autoplay: true,
  loop: true,
  slidesPerView: 'auto', 
  spaceBetween: 20,
  pagination: {
    el: '.swiper-pagination',
    type: 'fraction',
  },
  navigation: {
    nextEl: '.swiper-next',
    prevEl: '.swiper-prev',
  },
})



        