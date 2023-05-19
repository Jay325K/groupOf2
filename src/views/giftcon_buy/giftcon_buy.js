const giftconBuyProductImg = document.querySelectorAll(
  ".giftcon_buy--product_img"
);
const giftconBuyProductName = document.querySelectorAll(
  ".giftcon_buy--product_name"
);
const giftconBuyProductPrice = document.querySelectorAll(
  ".giftcon_buy--product_price"
);
const { prName, img, price } = JSON.parse(localStorage.getItem("giftInfo"));

const productPrint = () => {
  giftconBuyProductImg.forEach((e) => {
    e.innerHTML = `<img src="../../${img.slice(9, img.length)}" alt="" />`;
  });
  giftconBuyProductName.forEach((e) => {
    e.innerHTML = `<p>${prName}</p>`;
  });
  giftconBuyProductPrice[0].innerHTML = `<p>판매가 : ${price}</p>`;
  giftconBuyProductPrice[1].innerHTML = `<p>${price}</p>`;
};

window.addEventListener("DOMContentLoaded", () => {
  productPrint();
});
