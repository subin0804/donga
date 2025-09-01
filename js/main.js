gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);

console.log('innerWidth:', window.innerWidth);
console.log('devicePixelRatio:', window.devicePixelRatio);




/* 헤더 스크롤*/
window.addEventListener('scroll', function () {
  if (window.scrollY > 10) {
    header.classList.add('scroll')
  }
  else {
    header.classList.remove('scroll')
  }
})

// menu_popup 열었을 때 브라우저 스크롤x
// 메뉴 열기 버튼
document.querySelector('.header_menu').addEventListener('click', function () {
  // 메뉴 팝업 보이기
  document.querySelector('.header_menu_popup').classList.add('on');
  // 스크롤 막기
  document.body.classList.add('fixed');
});

// 메뉴 닫기 버튼 (닫기 아이콘)
document.querySelector('.header_menu_popup .ri-close-line').addEventListener('click', function () {
  // 메뉴 팝업 숨기기
  document.querySelector('.header_menu_popup').classList.remove('on');
  // 스크롤 풀기
  document.body.classList.remove('fixed');
});


/* 헤더 */
const header = document.querySelector('header');
const menuItems = document.querySelectorAll('header #gnb .dep1 > li');
const dep2Links = document.querySelectorAll('header .dep2 a');

// 메뉴 hover 시 열기
menuItems.forEach((item) => {
  item.addEventListener('mouseenter', function () {
    header.classList.add('on');
    this.classList.add('over');
  });

  item.addEventListener('mouseleave', function () {
    this.classList.remove('over');
  });
});

// dep2 클릭 시 닫기
dep2Links.forEach(link => {
  link.addEventListener('click', () => {
    header.classList.remove('on');
    menuItems.forEach(item => item.classList.remove('over'));
  });
});

// header 전체에서 마우스 빠져나가면 닫기
header.addEventListener('mouseleave', function (e) {
  if (!header.contains(e.relatedTarget)) {
    header.classList.remove('on');
    menuItems.forEach(item => item.classList.remove('over'));
  }
});

/* 헤더 util */
const utilBtn = document.querySelector('.header_util button')
const utilList = document.querySelector('.header_util ul')

// utilBtn.addEventListener('click', function() {})
utilBtn.addEventListener('click', function () {
  if (utilList.style.display === 'none') {
    utilList.style.display = 'block'
  } else {
    utilList.style.display = 'none'
  }
})

/* 헤더 검색 */
document.addEventListener('DOMContentLoaded', () => {
const headerEl   = document.getElementById('header');
const container  = headerEl.querySelector('.container');
const searchWrap = headerEl.querySelector('.search_wrap');   // 돋보기 버튼 래퍼
const searchBtn  = searchWrap.querySelector('button');       // 실제 버튼
const searchBox  = headerEl.querySelector('.search_box');    // 패널
const inputEl    = searchBox.querySelector('input');

// 초기 상태
closeSearch(false);

function openSearch(focus = true) {
  headerEl.classList.add('is-search-open');
  searchBtn.setAttribute('aria-expanded', 'true');
  if (focus && inputEl) inputEl.focus();
}

function closeSearch(blur = true) {
  headerEl.classList.remove('is-search-open');
  searchBtn.setAttribute('aria-expanded', 'false');
  if (blur && inputEl && document.activeElement === inputEl) inputEl.blur();
}

function isOpen() {
  return headerEl.classList.contains('is-search-open');
}

// 돋보기 클릭 → 토글
searchWrap.addEventListener('click', (e) => {
  e.preventDefault();
  e.stopPropagation(); // 문서 클릭 닫기와 충돌 방지
  isOpen() ? closeSearch() : openSearch();
});

// 검색 박스 클릭: 폼 안이면 유지, 배경(오버레이) 클릭이면 닫기
searchBox.addEventListener('click', (e) => {
  const isInsideForm = e.target.closest('.search_box form');
  if (isInsideForm) {
    e.stopPropagation(); // 폼 내부는 열림 유지
  } else {
    closeSearch();       // 오버레이 클릭 → 닫기
  }
});

  // 바깥 클릭 → 닫기 (폼 내부만 "안쪽"으로 간주)
  document.addEventListener('click', (e) => {
    const clickedInsideSearch =
      searchWrap.contains(e.target) || e.target.closest('.search_box form');
    if (isOpen() && !clickedInsideSearch) closeSearch();
  });


  // ESC로 닫기
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen()) closeSearch();
  });

  // (선택) submit 시 비어있으면 기본 동작 막기
  const form = searchBox.querySelector('form');
  if (form) {
    form.addEventListener('submit', (e) => {
      if (!inputEl || !inputEl.value.trim()) {
        e.preventDefault();
        inputEl?.focus();
      }
    });
  }
});
// end


// 메뉴 관련 요소 선택
const menuBtn = document.querySelector('.header_menu'); // 햄버거 아이콘
const menuBox = document.querySelector('.header_menu_popup'); // 사이트맵 팝업
const menuClose = document.querySelector('.header_menu_popup .ri-close-line'); // 닫기 아이콘

// 처음엔 팝업 숨김
menuBox.style.display = 'none';

// 햄버거 버튼 클릭 시 사이트맵 열기
menuBtn.addEventListener('click', () => {
  menuBox.style.display = 'block';
});

// 닫기 아이콘 클릭 시 사이트맵 닫기
menuClose.addEventListener('click', () => {
  menuBox.style.display = 'none';
});

// 브라우저 크기 변경 시 자동 닫기 (781px 이상일 때)
window.addEventListener('resize', () => {
  if (window.innerWidth > 1281) {
    menuBox.style.display = 'none';
  }
});


/* 메뉴 팝업 - 모바일 */
const menuIcons = document.querySelectorAll('.header_menu_popup .dep1 > li > a > i');
const dep2Menus = document.querySelectorAll('.header_menu_popup .dep2');

menuIcons.forEach(function (item, i) {
  item.addEventListener('click', function (event) {
    event.preventDefault(); // a 태그의 기본 동작 방지

    const isActive = dep2Menus[i].classList.contains('active');
    dep2Menus.forEach(dep2 => dep2.classList.remove('active'));

    // 클릭한 항목이 기존에 닫혀있던 경우만 열기
    if (!isActive) {
      dep2Menus[i].classList.add('active');
    }
  });
});


/* 메인 비주얼 */
const mainSwiper = new Swiper('.main-swiper', {
  loop: true,
  autoplay: {
    delay: 9999999, // 동영상 길이로 제어할 것이므로 의미 없는 값
    disableOnInteraction: false,
  },
  pagination: {
    el: '.swiper-pagination',
    type: 'fraction',
  },
  navigation: {
    nextEl: '.swiper-next',
    prevEl: '.swiper-prev',
  },
  on: {
    slideChangeTransitionStart() {
      if (!isPaused) {
        const currentVideo = document.querySelectorAll('.swiper-slide video')[mainSwiper.realIndex];
        resetProgressBar(currentVideo.duration);
      }
    }
  }
});

const progressBar = document.querySelector('.progress .bar');
const playBtn = document.querySelector('.btn-play-stop i');
let isPaused = false;
let progressTimeout = null;

// 프로그레스바 초기화 함수
function resetProgressBar(duration) {
  clearTimeout(progressTimeout);
  progressBar.style.animation = 'none';
  progressBar.offsetHeight; // 리플로우 강제 발생
  progressBar.style.animation = `slideBar ${duration}s linear forwards`;

  // 해당 영상 끝나면 다음 슬라이드로 전환
  progressTimeout = setTimeout(() => {
    mainSwiper.slideNext();
  }, duration * 1000);
}


/* Brand Story */
document.addEventListener('DOMContentLoaded', () => {
  const targets = document.querySelectorAll('.brand_story_wrap ul strong');

  targets.forEach((el) => {
    const raw = el.textContent.trim();
    const match = raw.match(/[\d.,]+/);

    if (!match) return;

    const end = Number(match[0].replace(/,/g, '')); 
    const suffix = raw.replace(match[0], '');       

    // 개별 지속시간/시작값 지정 가능 (data-duration, data-from)
    const duration = Number(el.dataset.duration || 1.8);
    const startVal = Number(el.dataset.from || 0);

    const obj = { val: startVal };

    gsap.to(obj, {
      val: end,
      duration,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
        once: true, 
      },
      onUpdate: () => {
        const shown = Math.round(obj.val).toLocaleString('ko-KR');
        el.textContent = shown + suffix;
      },
    });
  });
});



/* ESG */
const esgSwiper = new Swiper('.preview_swiper', {
  autoplay: {
    delay: 5000,
  },
  slidesPerView: 'auto',
  loop: false,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});


/* product_swiper */
const productSwiper = new Swiper('.product_swiper', {
  autoplay: true,
  loop: true,
  slidesPerView: 'auto',
  spaceBetween: 20,
  breakpoints: {
    0: {
      spaceBetween: 20, 
    },
    501: {
      spaceBetween: 20, 
    }
  },

  pagination: {
    el: '.swiper-pagination',
    type: 'fraction',
  },
  navigation: {
    nextEl: '.swiper-next',
    prevEl: '.swiper-prev',
  },
});


// business → business2 스크롤 애니메이션
gsap.registerPlugin(ScrollTrigger);

// 1. business 섹션: 비디오 확대 + 텍스트 등장
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

// 2. business2가 등장할 때 텍스트 & 비디오 사라짐
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

// 3. business2 슬라이드 전체 등장 (부드럽게 페이드 인)
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



/* Business2 */
const currentEl = document.querySelector('.custom_pagination_wrap .current');
const totalEl = document.querySelector('.custom_pagination_wrap .total');
const barEl = document.querySelector('.custom_pagination_wrap .bar');
const businesSwiper2 = new Swiper('.business2_swiper', {
  // slidesPerView: 1,
  slidesPerView: 'auto',        
  loop: true,
  effect: 'fade',
  autoplay: {
    delay: 3000,
  },
  on: {
    init: function () {
      const totalSlides = document.querySelectorAll('.business2_swiper .swiper-slide:not(.swiper-slide-duplicate)').length;
      totalEl.textContent = totalSlides < 10 ? `0${totalSlides}` : totalSlides;
      currentEl.textContent = `01`;

      setTimeout(() => {
        barEl.classList.add('animate');
      }, 50);

      const activeSlide = document.querySelector('.swiper-slide-active .txt_box');
      if (activeSlide) activeSlide.style.opacity = '1';
    },
    slideChange: function () {
      const current = this.realIndex + 1;
      currentEl.textContent = current < 10 ? `0${current}` : current;

      barEl.classList.remove('animate');
      void barEl.offsetWidth;
      barEl.classList.add('animate');
    },
    slideChangeTransitionStart: function () {
      const slides = document.querySelectorAll('.business2_swiper .swiper-slide');
      slides.forEach(slide => {
        const textBox = slide.querySelector('.txt_box');
        if (textBox) textBox.style.opacity = '0';
      });

      const activeSlide = document.querySelector('.business2_swiper .swiper-slide-active');
      if (activeSlide) {
        const activeTextBox = activeSlide.querySelector('.txt_box');
        setTimeout(() => {
          if (activeTextBox) activeTextBox.style.opacity = '1';
        }, 100);
      }
    }
  }
});


/* News */
const newsSwiper = new Swiper('.news_img_swiper', {
  // autoplay: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  slidesPerView: 'auto',
  spaceBetween: 40,
  centeredSlides: true,
  centeredSlidesBounds: true, 
  loopedSlides: 8,
  loop: true,
  
  navigation: {
    nextEl: '.swiper-next',
    prevEl: '.swiper-prev',
  },
  breakpoints: {
    0: {
      slidesPerView: 'auto',
      spaceBetween: 30,
    },
    501: {
      slidesPerView: 'auto',
      spaceBetween: 40,
    },
    768: {
      slidesPerView: 'auto',
      spaceBetween: 40,
    },
    1024: {
      slidesPerView: 'auto',
      spaceBetween: 40,
    }
  }
})
const newsSwiper2 = new Swiper('.news_text_swiper', {
  // autoplay: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  slidesPerView: 'auto',
  spaceBetween: 40,
  centeredSlides: true,
  centeredSlidesBounds: true, 
  loopedSlides: 8,
  loop: true,
  navigation: {
    nextEl: '.swiper-next',
    prevEl: '.swiper-prev',
  },
});

// 방법1 이미지 ↔ 텍스트 슬라이더 동기화
newsSwiper.controller.control = newsSwiper2;
newsSwiper2.controller.control = newsSwiper;


