const recruitNotice = document.querySelector(".recruit_recruit--notice");
const recruitImg = document.querySelector(".recruit_recruit--img");

const getNotice = () => {
  const response = fetch("./recruit_notice.json");
  return response.then((res) => res.json());
};
const windowLoadNoticePrint = async () => {
  const data = await getNotice();
  const notice = data.notice;

  notice.forEach((i) => {
    recruitNotice.innerHTML += `<p><a href="#none">${i.title}</a></p>`;
  });
  recruitImg.innerHTML = `<img src="${notice[0].image}" alt="" />`;
};
const noticeImgPrint = async (title) => {
  const data = await getNotice();
  const notice = data.notice;
  let noticeArray = [];
  notice.forEach((i) => {
    noticeArray.push(i);
  });
  const titleFilter = noticeArray.filter((i) => i["title"] === title)[0];
  recruitImg.innerHTML = `<img src="${titleFilter.image}" alt="" />`;
};
window.addEventListener("DOMContentLoaded", () => {
  windowLoadNoticePrint();
});
recruitNotice.addEventListener("click", (e) => {
  noticeImgPrint(e.target.innerHTML);
});
