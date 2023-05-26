const giftconBuyProductImg = document.querySelector(
  ".giftcon_buy--product_img"
);
const giftconBuyProductName = document.querySelector(
  ".giftcon_buy--product_name"
);
const giftconBuyProductPrice = document.querySelector(
  ".giftcon_buy--product_price"
);
const giftconBuyPayDetailProductPrice = document.querySelector(
  ".giftcon_buy--pay_detail--product_price"
);
const giftconBuyPayDetailDelivery = document.querySelector(
  ".giftcon_buy--pay_detail--shipping_fee"
);
const giftconBuyPayDetailTotal = document.querySelector(
  ".giftcon_buy--pay_detail--total"
);
const giftconBuyResultHome = document.querySelector(
  ".giftcon_buy--result_home"
);
const giftconBuyPayBtn = document.querySelector(".giftcon_buy--pay_btn");
const receiverName = document.querySelector(".receiver_name");
const receiverTelMid = document.getElementById("receiver_tel--mid");
const receiverTelEnd = document.getElementById("receiver_tel--end");
const radioNamePay = document.getElementsByName("pay");

const { prName, img, price } = JSON.parse(localStorage.getItem("giftInfo"));
const nowPage = window.location.pathname.slice(23, -5);
const shippingFee = "2,500";
let payChecked = 0;

const productPrint = () => {
  giftconBuyProductImg.innerHTML = `<img src="../../${img.slice(
    9,
    img.length
  )}" alt="" />`;
  giftconBuyProductName.innerHTML = `<p>${prName}</p>`;
  giftconBuyProductPrice.innerHTML = `<p>판매가 : ${price}원</p>`;
};

const productPayPrint = () => {
  const moneyTotal =
    parseInt(price.split(",").join("")) +
    parseInt(shippingFee.split(",").join(""));
  const moneyTotlaStr = moneyTotal.toString();
  const moneyTotalArr = [
    moneyTotlaStr.slice(0, moneyTotlaStr.length - 3),
    moneyTotlaStr.slice(moneyTotlaStr.length - 3),
  ];
  giftconBuyPayDetailProductPrice.textContent = `${price}원`;
  giftconBuyPayDetailDelivery.textContent = `${shippingFee}원`;
  giftconBuyPayDetailTotal.textContent = `${moneyTotalArr}원`;
};
const inputCheck = () => {
  if (!receiverName.value) {
    alert("받는 사람의 이름을 적어주세요.");
    receiverName.focus();
  } else if (!receiverTelMid.value) {
    alert("받는 사람의 번호를 입력해 주세요.");
    receiverTelMid.focus();
  } else if (!receiverTelEnd.value) {
    alert("받는 사람의 번호를 입력해 주세요.");
    receiverTelEnd.focus();
  } else {
    radioNamePay.forEach((node) => {
      if (!node.checked) {
        payChecked += 1;
      }
    });
    if (payChecked === 5) {
      alert("결제 수단을 선택해 주세요.");
      payChecked = 0;
    } else {
      pageMove();
    }
  }
};
const pageMove = () => {
  location.href = "./giftcon_buy_result.html";
};
window.addEventListener("DOMContentLoaded", () => {
  if (nowPage === "giftcon_buy") {
    productPrint();
    productPayPrint();
  }
});

if (nowPage === "giftcon_buy_result") {
  giftconBuyResultHome.addEventListener("click", () => {
    localStorage.removeItem("giftInfo");
  });
}
if (nowPage === "giftcon_buy") {
  giftconBuyPayBtn.addEventListener("click", () => {
    inputCheck();
  });
}
