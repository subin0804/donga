gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);

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
  delay: 8000,

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





// /* Business2 */
// const businesSwiper2 = new Swiper('.business2_swiper', {
//   slidesPerView: 1,
//   autoplay: {
//     delay: 3000,
//   },
//   effect:'fade',
//   // speed:500,
//   loop: true,
//   clickable: true,
//   pagination: {
//     el: '.swiper-pagination',
//     type: 'custom',
//       renderCustom: function (swiper, current, total) {
//         return `
//           <div class="custom_pagination_wrap">
//             <span class="num">0${current}</span>
//             <div class="progress">
//               <div class="bar"></div>
//             </div>
//             <span class="num">0${total}</span>
//           </div>
//         `
//       },
//       // effect: fade,
//   },
// });

const businesSwiper2 = new Swiper('.business2_swiper', {
  slidesPerView: 1,
  autoplay: {
    delay: 3000,
  },
  effect: 'fade',
  fadeEffect: {
    crossFade: true, // 이미지 부드럽게 페이드 처리
  },
  loop: true,
  clickable: true,
  pagination: {
    el: '.swiper-pagination',
    type: 'custom',
    renderCustom: function (swiper, current, total) {
      return `
        <div class="custom_pagination_wrap">
          <span class="num">0${current}</span>
          <div class="progress">
            <div class="bar"></div>
          </div>
          <span class="num">0${total}</span>
        </div>
      `;
    },
  },

  // ✅ 텍스트와 이미지에 동시에 fade 적용
  on: {
    slideChangeTransitionStart: function () {
      const slides = document.querySelectorAll('.business2_swiper .swiper-slide');

      // 모든 슬라이드의 텍스트/이미지 숨기기
      slides.forEach(slide => {
        const textBox = slide.querySelector('.txt_box');
        const imgBox = slide.querySelector('.img_box');

        if (textBox) textBox.style.opacity = '0';
        if (imgBox) imgBox.style.opacity = '0';
      });

      // 현재 슬라이드 텍스트/이미지만 보이게
      const activeSlide = document.querySelector('.business2_swiper .swiper-slide-active');
      if (activeSlide) {
        const activeTextBox = activeSlide.querySelector('.txt_box');
        const activeImgBox = activeSlide.querySelector('.img_box');

        setTimeout(() => {
          if (activeTextBox) activeTextBox.style.opacity = '1';
          if (activeImgBox) activeImgBox.style.opacity = '1';
        }, 100);
      }
    }
  }
});







/* News */
const newsSwiper = new Swiper('.news_img_swiper', {
  autoplay: true,
  slidesPerView: 5, 
  spaceBetween: 40,
  centeredSlides: true,
  loopedSlides: 2,
  loop: true,
  navigation: {
    nextEl: '.swiper-next',
    prevEl: '.swiper-prev',
  },
})
const newsSwiper2 = new Swiper('.news_text_swiper', {
  autoplay: true,
  loop: true,
  slidesPerView: 5,
  spaceBetween: 40,
  centeredSlides: true,
  loopedSlides: 2,
  // navigation: {
  //   nextEl: '.swiper-next',
  //   prevEl: '.swiper-prev',
  // },
  // effect: 'fade',
  // watchSlidesProgress: true,
  // freeMode: true,
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



// business → business2 스크롤 애니메이션
gsap.registerPlugin(ScrollTrigger);

// 📌 1. business 섹션: 비디오 확대 + 텍스트 등장
gsap.timeline({
  scrollTrigger: {
    trigger: '.business',
    start: 'top top',
    end: '+=1200',
    pin: true,
    scrub: 1.5,
  }
})
.to('.business video', {
  scale: 3.3,
  borderRadius: '0%',
  duration: 1
})
.to('.business_text', {
  autoAlpha: 1,
  y: 0,
  duration: 2
});

// 📌 2. business2가 등장할 때 텍스트 & 비디오 사라짐
gsap.to('.business_text', {
  scrollTrigger: {
    trigger: '.business2',
    start: 'top 90%',
    end: 'top center',
    scrub: 1.5,
  },
  autoAlpha: 0,
  duration: 1.5,
});

gsap.to('.business video', {
  scrollTrigger: {
    trigger: '.business2',
    start: 'top 90%',
    end: 'top center',
    scrub: 1.5,
  },
  opacity: 0,
  duration: 1.5,
});

// 📌 3. business2 슬라이드 전체 등장 (부드럽게 페이드 인)
gsap.from('.business2_swiper', {
  scrollTrigger: {
    trigger: '.business2',
    start: 'top 80%',
    toggleActions: 'play none none none',
  },
  autoAlpha: 0,
  y: 50,
  duration: 1.2,
  ease: 'power2.out'
});
