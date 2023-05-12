const menuPage = document.querySelector(".menu_page");
const menuList = document.querySelector(".menu_list");
const menuCategory = document.querySelector(".menu_category");
const menuCategoryCheckbox = document.querySelectorAll(
  ".menu_category--checkbox"
);
const menuModalWrap = document.querySelector(".menu_modal--wrap");
const menuModalDetail = document.querySelector(".menu_modal--detail");
const menuNutritional = document.querySelector(".menu_nutritional");
const menuModalCloseBtn = document.querySelector(".menu_modal--close_btn");
const menuServingsize = document.querySelector(".menu_servingsize");
const menuAllergy = document.querySelector(".menu_allergy");
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
  const response = fetch("../menu_list.json");
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
  menuList.innerHTML = "";
  menuPage.innerHTML = "";

  drinkListGenerate(menu);
  const pageCount = Math.ceil(menuListArray.length / 20);

  for (let i = 1; i <= pageCount; i++) {
    if (pageCount != 1)
      menuPage.innerHTML += `<button><span>${i}</span></button>`;
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
      menuList.innerHTML += `<li class="blank_item"></li>`;
    } else if (menuListArray[i]) {
      menuList.innerHTML += `<li><a href="#none"><img src="${menuListArray[i].image}" alt=""><span>${menuListArray[i].name}</span></a></li>`;
    }
  }
};
const modalPrintExec = async (name) => {
  try {
    const menu = await getMenu();
    modalPrintProcess(menu[pageName], name);
    menuModalWrap.classList.remove("display_none");
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
  menuAllergy.innerHTML = `<p>알레르기 유발요인 : ${nameFilter.allergy}<br>
  ※ 식품 등의 표시 · 광고의 관한 법률에 의거하여 알레르기 표시항목에 한해서만 표기함</p>`;
};
const modalPrint = (data) => {
  menuModalDetail.innerHTML = `
  <img src="${data.image}" alt="" />
  <h3>${data.name}</h3>
  <p>${data.nameEn}</p>
  <p>${data.text}</p>
  ${data.caution ? `<p>${data.caution}</p>` : ""}
  `;
  if (data.nutritional) {
    drinkNutritionalPrint(data);
  }
};
const drinkNutritionalPrint = (data) => {
  const nameFilterKeys = Object.keys(data.nutritional);
  console.log(menuServingsize);
  menuServingsize.innerHTML = `${
    data.servingSize ? `<p>${data.servingSize}</p>` : ""
  }
  `;
  menuNutritional.innerHTML += `  
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

menuPage.addEventListener("click", (e) => {
  if (drinkPageNum !== e.target.innerHTML && e.target.localName == "span") {
    drinkPageNum = e.target.innerHTML;
    drinkPrintExec();
  }
});
menuCategory.addEventListener("change", () => {
  drinkPageNum = 1;

  if (
    menuCategoryCheckbox[0].lastElementChild.checked == true &&
    drinkCategoryChecked[0] == true
  ) {
    menuCategoryCheckbox[0].lastElementChild.checked = false;
    drinkCategoryChecked[0] = false;
  } else if (
    menuCategoryCheckbox[0].lastElementChild.checked == true &&
    drinkCategoryChecked[0] == false
  ) {
    menuCategoryCheckbox[0].lastElementChild.checked = true;
    drinkCategoryChecked[0] = true;
    for (let i = 1; i < menuCategoryCheckbox.length; i++) {
      drinkCategoryChecked[i] = false;
      menuCategoryCheckbox[i].lastElementChild.checked = false;
    }
  }

  for (let i = 0; i < menuCategoryCheckbox.length; i++) {
    drinkCategoryChecked[i] = menuCategoryCheckbox[i].lastElementChild.checked;
  }
  drinkPrintExec();
});

menuList.addEventListener("click", (e) => {
  if (e.target.localName === "img") {
    modalPrintExec(e.target.nextElementSibling.innerText);
  } else if (e.target.localName === "span") {
    modalPrintExec(e.target.innerHTML);
    console.log(e.target.innerHTML);
  }
});
menuModalCloseBtn.addEventListener("click", () => {
  menuNutritional.innerHTML = "";
  menuModalWrap.classList.add("display_none");
});
