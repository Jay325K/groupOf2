const locationCategory = document.querySelector(".location_category");
const locationCategoryContent = document.querySelector(
  ".location_category--content"
);
const locationAddress = document.querySelector(".location_address");

const printExec = (category) => {
  if (category === "본사") {
    headOfficePrint();
  } else if (category === "아카데미") {
    academyPrint(category);
  } else if (category === "커피클럽 로스팅 센터") {
    roastingCenterPrint(category);
  }
};

const headOfficePrint = () => {
  console.log("??!");
  locationCategoryContent.innerHTML = `
  <h3>본사</h3>
  <section class="location_head--office_content">
              <section class="location_head--office_address">
                <p>
                  <span>주소 : </span
                  ><span
                    >서울특별시 중구 통일로 92, 9층(순화동, 케이지타워)</span
                  >
                </p>
                <p><span>5호선 서대문역 6번 출구 250m</span></p>
              </section>
              <section class="location_head--office_tel">
                <p><span>가맹문의 : </span><span>02-6350-7229</span></p>
                <p><span>고객센터 : </span><span>02-2188-7100</span></p>
              </section>
            </section>
            <section class="location_head--office_email">
              <p>
                <span>점포개발팀</span><span>develop@hollyscoffee.com</span>
              </p>
              <p><span>B2B팀</span><span>b2b@hollyscoffee.com</span></p>
              <p><span>브랜딩팀</span><span>mkt@hollyscoffee.com</span></p>
              <p><span>인사총무팀</span><span>hr_ga@hollyscoffee.com</span></p>
              <p><span>구매팀</span><span>buyer@hollyscoffee.com</span></p>
            </section>
  `;
};
const academyPrint = () => {
  locationCategoryContent.innerHTML = `
  <h3>아카데미</h3>
            <section class="location_address">
              <p>
                <span>주소 : </span
                ><span>서울특별시 종로구 삼일대로 395 종로빌딩 5층</span>
              </p>
              <p>1. 지하철 1,3,5호선 '종로 3가역' 15번 출구에서 도보 5분</p>
              <p>
                2. 지하철 1호선 ‘종각역’ 4번 출구 혹은 종각 지하 쇼핑센터 12번
                출구에서 도보 3분
              </p>
            </section>
            <section class="location_email">
              <p><span>이메일 : </span><span>academy@hollyscoffee.com</span></p>
            </section>
  `;
};
const roastingCenterPrint = () => {
  locationCategoryContent.innerHTML = `
  <h3>커피클럽 로스팅 센터</h3>
            <section>
              <section class="location_address">
                <p>
                  <span>주소 : </span
                  ><span>경기도 파주시 문산읍 돈유3로 87, 1~2층</span>
                </p>
              </section>
              <section class="location_tel">
                <p><span>전화번호 : </span><span>070-7734-3785</span></p>
              </section>
            </section>
            <section class="location_email">
              <p>
                <span>이메일 : </span><span>roasting@hollyscoffee.com</span>
              </p>
            </section>`;
};

window.addEventListener("DOMContentLoaded", () => {
  // window.print();
  const headOffice = "본사";
  printExec(headOffice);
});
locationCategory.addEventListener("click", (e) => {
  const category = e.target.textContent;
  printExec(category);
});

// 카카오 맵 api
var mapContainer = document.getElementById("map"), // 지도를 표시할 div
  mapOption = {
    center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
    level: 3, // 지도의 확대 레벨
  };

// 지도를 생성합니다
var map = new kakao.maps.Map(mapContainer, mapOption);

// 주소-좌표 변환 객체를 생성합니다
var geocoder = new kakao.maps.services.Geocoder();

// 주소로 좌표를 검색합니다
geocoder.addressSearch(
  "서울특별시 종로구 삼일대로 395",
  function (result, status) {
    // 정상적으로 검색이 완료됐으면
    if (status === kakao.maps.services.Status.OK) {
      var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

      var imageSrc = "../../../assets/images/hollysis/location_01.png"; // 마커이미지의 주소입니다
      imageSize = new kakao.maps.Size(52, 70); // 마커이미지의 크기입니다

      // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
      var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

      // 결과값으로 받은 위치를 마커로 표시합니다
      var marker = new kakao.maps.Marker({
        map: map,
        position: coords,
        image: markerImage, // 마커이미지 설정
      });

      // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
      map.setCenter(coords);
    }
  }
);
