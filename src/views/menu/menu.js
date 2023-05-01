const drinkPage = document.querySelector(".drink_page");
const drinkList = document.querySelector(".drink_list");

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
    const coffeeDecaffeine = "";
    const latteChocoTea = "";
    const hollyccinoCrush = "";
    const smoothieJuiceSpacling = "";
    if (!num || num == 1) {
      drinkFirstPrint(allDrink);
    } else if (num == 2) {
      drinkSecondPrint(allDrink);
    } else if (num == 3) {
      drinkThirdPrint(allDrink);
    }
  } catch (error) {
    console.log(error);
  }
};

const drinkFirstPrint = (list) => {
  for (let i = 0; i < 20; i++) {
    drinkList.innerHTML += `<li><a href="#none"><img src="${list[i].image}" alt=""><span>${list[i].name}</span></a></li>`;
  }
};
const drinkSecondPrint = (list) => {
  for (let i = 20; i < 40; i++) {
    drinkList.innerHTML += `<li><a href="#none"><img src="${list[i].image}" alt=""><span>${list[i].name}</span></a></li>`;
  }
};
const drinkThirdPrint = (list) => {
  for (let i = 40; i < list.length; i++) {
    drinkList.innerHTML += `<li><a href="#none"><img src="${list[i].image}" alt=""><span>${list[i].name}</span></a></li>`;
  }
};

window.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname.includes("drink")) {
    drinkPrintExec();
  }
});

drinkPage.addEventListener("click", (e) => {
  const pageNum = e.target.innerHTML;
  if (pageNum == "1" || pageNum == "2" || pageNum == "3") {
    drinkList.innerHTML = "";
    drinkPrintExec(pageNum);
  }
});
