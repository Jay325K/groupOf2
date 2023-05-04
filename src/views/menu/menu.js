const drinkPage = document.querySelector(".drink_page");
const drinkList = document.querySelector(".drink_list");
const drinkCategory = document.querySelector(".drink_category");
const drinkCategoryCheckBox = document.querySelectorAll(
  ".drink_category > label"
);
const drinkDetailwrap = document.querySelector(".drink_detail--wrap");
const drinkDetailDesc = document.querySelector(".drink_detail--desc");
const drinkNutritional = document.querySelector(".drink_nutritional");
const drinkDetailClose = document.querySelector(".drink_detail--close_btn");
const menuCategoryArray = {
  drink: [
    "coffee/decaffeine",
    "latte/choco/tea",
    "hollyccino/crush",
    "smoothie/juice/sparkling",
  ],
  food: ["cake", "sandwich/toast", "bakery", "food"],
  md: ["product", "food"],
};
let menuListArray = [];
let drinkCategoryChecked = [true];
let drinkPageNum = "1";
let pageName = [];

const getMenu = () => {
  const response = fetch("./menu_list.json");
  return response.then((res) => res.json());
};

const drinkPrintExec = async () => {
  try {
    const menu = await getMenu();
    if (drinkPageNum) {
      drinkPagePrintProcess(menu[pageName]);
    }
  } catch (error) {
    console.log(error);
  }
};
const drinkPagePrintProcess = (menu) => {
  drinkListArray = [];
  menuListArray = [];
  drinkList.innerHTML = "";
  drinkPage.innerHTML = "";

  drinkListGenerate(menu);
  const pageCount = Math.ceil(menuListArray.length / 20);

  for (let i = 1; i <= pageCount; i++) {
    if (pageCount != 1)
      drinkPage.innerHTML += `<button><span>${i}</span></button>`;
  }
  drinkPagePrint();
};
const drinkListGenerate = (menu) => {
  if (drinkCategoryChecked[0]) {
    menuCategoryArray[pageName].forEach((e) => {
      menuListArray = [...menuListArray, ...menu[e]];
    });
  } else if (drinkCategoryChecked[0] == false) {
    drinkCategoryChecked.forEach((e, index) => {
      if (e) {
        menuListArray = [
          ...menuListArray,
          ...menu[menuCategoryArray[pageName][index - 1]],
        ];
      }
    });
  }
};
const drinkPagePrint = () => {
  for (let i = (parseInt(drinkPageNum) - 1) * 20; i < 20 * drinkPageNum; i++) {
    if (!menuListArray[i]) {
      drinkList.innerHTML += `<li class="blank_item"></li>`;
    } else if (menuListArray[i]) {
      drinkList.innerHTML += `<li><a href="#none"><img src="${menuListArray[i].image}" alt=""><span>${menuListArray[i].name}</span></a></li>`;
    }
  }
};
const modalPrintExec = async (name) => {
  try {
    const menu = await getMenu();
    modalPrintProcess(menu[pageName], name);
    drinkDetailwrap.classList.remove("display_none");
  } catch (error) {
    console.log(error);
  }
};

const modalPrintProcess = (menu, name) => {
  menuListArray = [];
  menuCategoryArray[pageName].forEach((e) => {
    menuListArray = [...menuListArray, ...menu[e]];
  });
  const nameFilter = menuListArray.filter((data) => data["name"] === name)[0];
  modalPrint(nameFilter);
  if (nameFilter.nutritional) {
    drinkNutritionalPrint(nameFilter);
  }
};
const modalPrint = (data) => {
  drinkDetailDesc.innerHTML = `
  <img src="${data.image}" alt="" />
  <h3>${data.name}</h3>
  <p>${data.nameEn}</p>
  <span>${data.text}</span>  
  `;
};
const drinkNutritionalPrint = (data) => {
  const nameFilterKeys = Object.keys(data.nutritional);
  drinkNutritional.innerHTML += `
  ${drinkNutritionalStaticPrint(nameFilterKeys)}
  ${test(data, nameFilterKeys)}
  `;
};
const drinkNutritionalStaticPrint = (keys) => {
  return `
  <tbody>
  <tr>
  ${keys.length == 6 ? "" : "<th></th>"}
  <th>칼로리</td>
  <th>당류</th>
  <th>단백질</th>
  <th>포화지방</th>
  <th>나트륨</th>
  <th>카페인</th>
  </tr>`;
};
const test = (data, keys) => {
  let returnText;
  if (keys.length == 6) {
    returnText = "<tr>";
    keys.forEach((key) => {
      returnText += `<td>${data.nutritional[key]}</td>`;
    });
    returnText += "</tr></tbody>";
  } else {
    returnText = "";
    keys.forEach((key) => {
      const nutritionalKeys = Object.keys(data.nutritional[key]);
      returnText += `<tr><th>${key}</th>`;
      nutritionalKeys.forEach((e) => {
        returnText += `<td>${data.nutritional[key][e]}</td>`;
      });
    });
    returnText += "</tr></tbody>";
  }
  return returnText;
};
window.addEventListener("DOMContentLoaded", () => {
  const pageSlash = window.location.pathname.split("/");
  pageName = pageSlash[pageSlash.length - 1].split(".")[0];
  drinkPrintExec();
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
    for (let i = 1; i < drinkCategoryCheckBox.length; i++) {
      drinkCategoryChecked[i] = false;
      drinkCategoryCheckBox[i].lastElementChild.checked = false;
    }
  }

  for (let i = 0; i < drinkCategoryCheckBox.length; i++) {
    drinkCategoryChecked[i] = drinkCategoryCheckBox[i].lastElementChild.checked;
  }
  drinkPrintExec();
});

drinkList.addEventListener("click", (e) => {
  if (e.target.localName === "img") {
    modalPrintExec(e.target.nextElementSibling.innerHTML);
    console.log(e.target.nextElementSibling.innerHTML);
  } else if (e.target.localName === "span") {
    modalPrintExec(e.target.innerHTML);
    console.log(e.target.innerHTML);
  }
});
drinkDetailClose.addEventListener("click", () => {
  drinkNutritional.innerHTML = "";
  drinkDetailwrap.classList.add("display_none");
});
