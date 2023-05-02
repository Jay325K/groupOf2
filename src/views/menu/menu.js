const drinkPage = document.querySelector(".drink_page");
const drinkList = document.querySelector(".drink_list");
const drinkCategory = document.querySelector(".drink_category");
const drinkCategoryCheckBox = document.querySelectorAll(
  ".drink_category > label"
);
const drinkCategoryArray = [
  "coffee/decaffeine",
  "latte/choco/tea",
  "hollyccino/crush",
  "smoothie/juice/sparkling",
];
let drinkListArray = [];
let drinkCategoryChecked = [true, false, false, false, false];
let drinkPageNum = "1";

const getMenu = () => {
  const response = fetch("./menu_list.json");
  return response.then((res) => res.json());
};

const drinkPrintExec = async () => {
  try {
    const list = await getMenu();

    if (drinkPageNum) {
      drinkPagePrintProcess(list);
    }
  } catch (error) {
    console.log(error);
  }
};
const drinkPagePrintProcess = (list) => {
  drinkListArray = [];
  drinkList.innerHTML = "";
  drinkPage.innerHTML = "";

  drinkListGenerate(list);
  const pageCount = Math.ceil(drinkListArray.length / 20);

  for (let i = 1; i <= pageCount; i++) {
    if (pageCount != 1) drinkPage.innerHTML += `<span>${i}</span>`;
  }
  drinkPagePrint();
};
const drinkListGenerate = (list) => {
  for (let i = 0; i < 5; i++) {
    if (drinkCategoryChecked[0] == true) {
      drinkListArray = [
        ...list["drink"][drinkCategoryArray[0]],
        ...list["drink"][drinkCategoryArray[1]],
        ...list["drink"][drinkCategoryArray[2]],
        ...list["drink"][drinkCategoryArray[3]],
      ];
    } else if (drinkCategoryChecked[i]) {
      drinkListArray = [
        ...drinkListArray,
        ...list["drink"][drinkCategoryArray[i - 1]],
      ];
    }
  }
};
const drinkPagePrint = () => {
  for (let i = (parseInt(drinkPageNum) - 1) * 20; i < 20 * drinkPageNum; i++) {
    if (!drinkListArray[i]) {
      drinkList.innerHTML += `<li class="blank_item"></li>`;
    } else if (drinkListArray[i]) {
      drinkList.innerHTML += `<li><a href="#none"><img src="${drinkListArray[i].image}" alt=""><span>${drinkListArray[i].name}</span></a></li>`;
    }
  }
};

window.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname.includes("drink")) {
    drinkPrintExec();
  }
});

drinkPage.addEventListener("click", (e) => {
  if (drinkPageNum !== e.target.innerHTML && e.target.localName == "span") {
    drinkPageNum = e.target.innerHTML;
    drinkPrintExec();
  }
});
drinkCategory.addEventListener("change", () => {
  drinkPageNum = 1;

  if (
    drinkCategoryCheckBox[0].lastElementChild.checked == true &&
    drinkCategoryChecked[0] == true
  ) {
    drinkCategoryCheckBox[0].lastElementChild.checked = false;
    drinkCategoryChecked[0] = false;
  } else if (
    drinkCategoryCheckBox[0].lastElementChild.checked == true &&
    drinkCategoryChecked[0] == false
  ) {
    drinkCategoryCheckBox[0].lastElementChild.checked = true;
    drinkCategoryChecked[0] = true;
    for (let i = 1; i < 5; i++) {
      drinkCategoryChecked[i] = false;
      drinkCategoryCheckBox[i].lastElementChild.checked = false;
    }
  }

  for (let i = 0; i < 5; i++) {
    drinkCategoryChecked[i] = drinkCategoryCheckBox[i].lastElementChild.checked;
  }
  drinkPrintExec();
});
