const myInfoUserCheck = document.getElementById("my_info--user_check");
const myInfoClickBtn = document.querySelector(".my_info--click_btn");
const myInfoUid = document.querySelector(".my_info--uid");
const myInfoUPassword = document.querySelector(".my_info--u_password");

myInfoUserCheck.addEventListener("submit", (e) => {
  e.preventDefault();
});
myInfoClickBtn.addEventListener("click", () => {
  if (!myInfoUPassword.value) {
    alert("비밀번호를 입력하지 않았습니다.");
  } else if (
    myInfoUid.value === "admin012" &&
    myInfoUPassword.value === "adminPW"
  ) {
    location.href = "#none";
  } else {
    alert("비밀번호를 잘못 입력하셨습니다.");
    myInfoUPassword.value = "";
  }
});
