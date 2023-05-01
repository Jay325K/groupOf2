const drinkPage = document.querySelector(".drink_page");
const drinkList = document.querySelector(".drink_list");
const category = document.querySelector(".content_category");
console.log(category);
let pageNum = "1";

const getMenu = () => {
  const response = fetch("./menu_list.json");
  return response.then((res) => res.json());
};

const drinkPrintExec = async (num) => {
  try {
    const list = await getMenu();
    const category = [
      "coffee/decaffeine",
      "latte/choco/tea",
      "hollyccino/crush",
      "smoothie/juice/sparkling",
    ];
    const allDrink = [
      ...list["drink"][category[0]],
      ...list["drink"][category[1]],
      ...list["drink"][[category[2]]],
      ...list["drink"][[category[3]]],
    ];
    const coffeeDecaffeine = [...list["drink"][category[0]]];
    const latteChocoTea = [...list["drink"][category[1]]];
    const hollyccinoCrush = [...list["drink"][category[2]]];
    const smoothieJuiceSpacling = [...list["drink"][category[3]]];
    if (!num || pageNum == num) {
      drinkPagePrint(allDrink, num);
    }
  } catch (error) {
    console.log(error);
  }
};

const drinkPagePrint = (list, page) => {
  for (let i = (parseInt(page) - 1) * 20; i < 20 * page; i++) {
    drinkList.innerHTML += `<li><a href="#none"><img src="${list[i].image}" alt=""><span>${list[i].name}</span></a></li>`;
    if (i + 1 == list.length) {
      break;
    }
  }
};

window.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname.includes("drink")) {
    drinkPrintExec(pageNum);
  }
});

drinkPage.addEventListener("click", (e) => {
  console.log("click");
  if (pageNum !== e.target.innerHTML && e.target.localName == "span") {
    pageNum = e.target.innerHTML;
    drinkList.innerHTML = "";
    drinkPrintExec(pageNum);
  }
});
