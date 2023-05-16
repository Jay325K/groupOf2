const locationCategory = document.querySelector(".location_category");
const locationCategoryContent = document.querySelector(
  ".location_category--content"
);
const locationAddress = document.querySelector(".location_address");

const getData = () => {
  const response = fetch("./location.json");
  return response.then((res) => res.json());
};

const printExec = async (category) => {
  const data = await getData();

  if (category === "본사") {
    headOfficePrint(data, category);
  } else if (category === "아카데미") {
    academyPrint(data);
  } else if (category === "커피클럽 로스팅 센터") {
    roastingCenterPrint(data);
  }
};

const headOfficePrint = (data, category) => {
  locationCategoryContent.innerHTML = `
    <h3>본사</h3>
    <section>
    <p><span>주소 : </span><span>${data.headOffice["address"]}</span></p>
    </section>
    `;
};
const academyPrint = () => {
  console.log("아카데미");
};
const roastingCenterPrint = () => {
  console.log("커피클럽 로스팅 센터");
};

window.addEventListener("DOMContentLoaded", () => {
  const headOffice = "본사";
  printExec(headOffice);
});
locationCategory.addEventListener("click", (e) => {
  const category = e.target.textContent;
  printExec(category);
});
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
