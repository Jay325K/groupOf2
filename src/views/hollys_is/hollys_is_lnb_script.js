const lnbListHollysBtn = document.querySelector(".lnb_list--hollys_btn");
const lnbListHollys = document.querySelector(".lnb_list--hollys");
const lnbListB2bBtn = document.querySelector(".lnb_list--b2b_btn");
const lnbListB2b = document.querySelector(".lnb_list--b2b");

lnbListHollysBtn.addEventListener("click", () => {
  lnbListHollysBtn.classList.toggle("hollys_red");
  lnbListHollys.classList.toggle("display_none");
});
lnbListB2bBtn.addEventListener("click", () => {
  lnbListB2bBtn.classList.toggle("hollys_red");
  lnbListB2b.classList.toggle("display_none");
});
