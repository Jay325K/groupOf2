const drinkPage = document.querySelector(".drink_page");
const drinkList = document.querySelector(".drink_list");
const category = document.querySelector(".content_category");
const checkBox = document.querySelectorAll(".content_category > label");
const categoryArray = [
  "coffee/decaffeine",
  "latte/choco/tea",
  "hollyccino/crush",
  "smoothie/juice/sparkling",
];
let drinkListPrint = [];
let categoryChecked = [true, false, false, false, false];
let pageNum = "1";

const getMenu = () => {
  const response = fetch("./menu_list.json");
  return response.then((res) => res.json());
};

const drinkPrintExec = async () => {
  try {
    const list = await getMenu();

    if (!pageNum || pageNum == pageNum) {
      drinkPagePrint(list);
    }
  } catch (error) {
    console.log(error);
  }
};
const drinkPagePrint = (list) => {
  drinkListPrint = [];
  drinkList.innerHTML = "";
  drinkPage.innerHTML = "";

  for (let i = 0; i < 5; i++) {
    if (categoryChecked[0] == true) {
      drinkListPrint = [
        ...list["drink"][categoryArray[0]],
        ...list["drink"][categoryArray[1]],
        ...list["drink"][categoryArray[2]],
        ...list["drink"][categoryArray[3]],
      ];
    } else if (categoryChecked[i]) {
      drinkListPrint = [
        ...drinkListPrint,
        ...list["drink"][categoryArray[i - 1]],
      ];
    }
  }
  const pageCount = Math.ceil(drinkListPrint.length / 20);

  for (let i = 1; i <= pageCount; i++) {
    drinkPage.innerHTML += `<span>${i}</span>`;
  }

  for (let i = (parseInt(pageNum) - 1) * 20; i < 20 * pageNum; i++) {
    if (!drinkListPrint[i]) {
      drinkList.innerHTML += `<li class="blank_item"></li>`;
    } else if (drinkListPrint[i]) {
      drinkList.innerHTML += `<li><a href="#none"><img src="${drinkListPrint[i].image}" alt=""><span>${drinkListPrint[i].name}</span></a></li>`;
    }
  }
};

window.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname.includes("drink")) {
    drinkPrintExec();
  }
});

drinkPage.addEventListener("click", (e) => {
  if (pageNum !== e.target.innerHTML && e.target.localName == "span") {
    pageNum = e.target.innerHTML;
    drinkPrintExec();
  }
});
category.addEventListener("change", () => {
  pageNum = 1;

  if (
    checkBox[0].lastElementChild.checked == true &&
    categoryChecked[0] == true
  ) {
    checkBox[0].lastElementChild.checked = false;
    categoryChecked[0] = false;
  } else if (
    checkBox[0].lastElementChild.checked == true &&
    categoryChecked[0] == false
  ) {
    checkBox[0].lastElementChild.checked = true;
    categoryChecked[0] = true;
    for (let i = 1; i < 5; i++) {
      categoryChecked[i] = false;
      checkBox[i].lastElementChild.checked = false;
    }
  }

  for (let i = 0; i < 5; i++) {
    categoryChecked[i] = checkBox[i].lastElementChild.checked;
  }
  drinkPrintExec();
});
