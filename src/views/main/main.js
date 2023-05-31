$(function () {
  let section_number = document.querySelectorAll('article section');
  let texts = document.querySelectorAll('.text1, .text2, .menuT, .text3');

  /*             //메인 컨텐츠가 main태그 맨 위에 붙어있게하기
              document.querySelector('article').style.transform='translateY(0)'; */
  let time = 1;  //페이지 멈추기 위해 변하는 변수
  let count = 0; // 페이지 수만큼 변할 변수
  let move_distance_vh = 0;// 페이지 높이
  let move_distance_px = 0;// 페이지 높이
  let footer_height = document.querySelector('footer').offsetHeight;


  $("body").on("mousewheel", function (event) {
    /* 스크롤 다운 */
    if (event.originalEvent.wheelDelta < 0 && time == 1) {
      time = 0;
      setTimeout(function () { time = 1 }, 1000)
      if (time == 1) { return 0; }
      console.log('b');
      if (count < section_number.length - 1) {//vh 단위로 페이지 이동
        count++;
        move_distance_vh -= 100;
        document.querySelector('main').style.transform = 'translateY(' + move_distance_vh + 'vh)';
        
      } else if (count == section_number.length - 1) {//(footer)높이만큼 페이지이동
        count++;
        move_distance_px -= footer_height;
        document.querySelector('main').style.transform = 'translateY(calc(' + ((section_number.length - 1) * -100) + 'vh + ' + move_distance_px + 'px))';
      }

      /* 스크롤 업 */
    } else if (event.originalEvent.wheelDelta > 0 && time == 1) {
      time = 0;
      setTimeout(function () { time = 1 }, 1000)
      if (time == 1) { return 0; }
      console.log('b');
      if (count > 0 && count < section_number.length) { //vh 단위로 페이지 이동
        count--;
        move_distance_vh += 100;
        document.querySelector('main').style.transform = 'translateY(' + move_distance_vh + 'vh)';
      } else if (count == section_number.length) { //(footer)높이만큼 페이지이동
        count--;
        move_distance_px += footer_height;
        document.querySelector('main').style.transform = 'translateY(calc(' + ((section_number.length - 1) * -100) + 'vh + ' + move_distance_px + 'px))';
      }
    }

  });
  // Intersection Observer를 생성할 콜백 함수
  const callback = function(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // 텍스트가 화면에 진입할 때 'text-fade-in' 클래스 추가
        entry.target.classList.add('text-fade-in');
        // Intersection Observer 관찰 중지
        observer.unobserve(entry.target);
      }
    });
  };

  // Intersection Observer 생성
  const options = {
    threshold: 0.5 // 텍스트가 50% 이상 화면에 보일 때 콜백 함수 호출
  };
  const observer = new IntersectionObserver(callback, options);

  // 텍스트 요소를 선택하여 Intersection Observer에 관찰 대상으로 등록
  const text1 = document.querySelector('.text1');
  const win_text = document.querySelector('.win_text');
  const dep_text = document.querySelector('.dep_text');
  const holText = document.querySelector('.hol_text');
  const dep2Text = document.querySelector('.dep2_text');
  observer.observe(text1);
  observer.observe(win_text);
  observer.observe(dep_text);
  observer.observe(holText);
  observer.observe(dep2Text);

  
})

history.scrollRestoration='manual';