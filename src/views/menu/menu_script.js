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
const menuModalGift = document.querySelector(".menu_modal--gift");
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
let pageBtn = "";
let giftInfo = {
  prName: "",
  img: "",
  price: "",
};
let menuListArray = [];
let menuCategoryChecked = [true];
let pageNum = "1";
let pageName = "";

const getMenu = () => {
  const response = fetch("../menu_list.json");
  return response.then((res) => res.json());
};

const menuPrintExec = async () => {
  try {
    const menu = await getMenu();
    menuPrintProcess(menu[pageName]);
  } catch (error) {
    console.log(error);
  }
};
const menuPrintProcess = (menu) => {
  menuListArray = [];
  menuList.innerHTML = "";

  menuListGenerate(menu);
  if (menuPage.innerHTML === "") {
    pagePrint();
  }
  menuPrint();
};
const menuListGenerate = (menu) => {
  if (menuCategoryChecked[0]) {
    menuCategoryArray[pageName].forEach((e) => {
      menuListArray.push(...menu[e]);
    });
  } else if (menuCategoryChecked[0] == false) {
    menuCategoryChecked.forEach((e, index) => {
      if (e) {
        menuListArray.push(...menu[menuCategoryArray[pageName][index - 1]]);
      }
    });
  }
};
const pagePrint = () => {
  const pageCount = Math.ceil(menuListArray.length / 20);
  for (let i = 1; i <= pageCount; i++) {
    if (pageCount != 1)
      menuPage.innerHTML += `<button type="button" class="page_btn">${i}</button>`;
  }
  pageBtn = document.querySelectorAll(".page_btn");
  if (pageBtn[0] !== undefined) {
    pageBtn[0].classList.add("hollys_red");
  }
};
const menuPrint = () => {
  for (let i = (parseInt(pageNum) - 1) * 20; i < 20 * pageNum; i++) {
    if (!menuListArray[i]) {
      const createBlank = document.createElement("li");
      createBlank.classList.add("blank_item");
      menuList.insertAdjacentElement("beforeend", createBlank);
    } else if (menuListArray[i]) {
      const createItem = document.createElement("li");
      createItem.innerHTML = `<a href="#none"><img src="${menuListArray[i].image}" alt=""><span>${menuListArray[i].name}</span></a>`;
      menuList.insertAdjacentElement("beforeend", createItem);
    }
  }
};
const modalPrintExec = (name) => {
  modalPrintProcess(name);
  menuModalWrap.classList.remove("display_none");
};
const modalPrintProcess = (name) => {
  const nameFilter = menuListArray.filter((data) => data["name"] === name)[0];
  giftInfoSet(nameFilter);
  modalPrint(nameFilter);
  if (nameFilter.allergy) {
    menuAllergy.innerHTML = `<p>알레르기 유발요인 : ${nameFilter.allergy}<br>
  ※ 식품 등의 표시 · 광고의 관한 법률에 의거하여 알레르기 표시항목에 한해서만 표기함</p>`;
  }
};
const giftInfoSet = (data) => {
  giftInfo.prName = data.name;
  giftInfo.img = data.image;
  giftInfo.price = data.price;
};
const modalPrint = (data) => {
  menuModalDetail.innerHTML = `
  <img src="${data.image}" alt=""  class="modal_menu--img"/>
  <p class="modal_menu--title">${data.name}</p>
  <p class="modal_menu--title_en">${data.nameEn}</p>
  <p class="modal_menu--desc">${data.text}</p>
  `;
  if (data.caution) {
    menuModalDetail.innerHTML += `
    <p class="modal_menu--caution">${data.caution}</p>`;
  }
  if (data.nutritional) {
    menuNutritionalPrint(data);
  }
  if (data.price !== "") {
    menuModalGift.innerHTML = `
    <a href="../../giftcon_buy/giftcon_buy.html" class="menu_modal--gift_btn">GIFT 구매하기</a>`;
  } else {
    menuModalGift.innerHTML = "";
  }
};
const menuNutritionalPrint = (data) => {
  const nutritionalKeys = Object.keys(data.nutritional);
  servingSizePrint(data);

  menuNutritional.innerHTML += `  
  ${nutritionalStaticPrint(nutritionalKeys)}
  ${nutritionalTable(data, nutritionalKeys)}
  `;
};
const servingSizePrint = (data) => {
  menuServingsize.innerHTML = `${
    data.servingSize ? `<p>${data.servingSize}</p>` : ""
  }
  `;
};
const nutritionalStaticPrint = (nutritionalKeys) => {
  return `
  <tbody>
  <tr>
  ${nutritionalKeys.length !== 6 ? "<th></th>" : ""}
  <th>칼로리</td>
  <th>당류</th>
  <th>단백질</th>
  <th>포화지방</th>
  <th>나트륨</th>
  <th>카페인</th>
  </tr>`;
};
const nutritionalTable = (data, nutritionalKeys) => {
  let returnText;
  if (nutritionalKeys.length == 6)
    returnText = drinkNutritional(data, nutritionalKeys);
  else returnText = noDrinkNutritional(data, nutritionalKeys);
  return returnText;
};
const drinkNutritional = (data, nutritionalKeys) => {
  let text;
  text = "<tr>";
  nutritionalKeys.forEach((key) => {
    text += `<td>${data.nutritional[key]}</td>`;
  });
  text += "</tr></tbody>";
  return text;
};
const noDrinkNutritional = (data, nutritionalKeys) => {
  let text = "";
  nutritionalKeys.forEach((key) => {
    const nutritionalKeys = Object.keys(data.nutritional[key]);
    text += `<tr><th>${key}</th>`;
    nutritionalKeys.forEach((e) => {
      text += `<td>${data.nutritional[key][e]}</td>`;
    });
  });
  text += "</tr></tbody>";
  return text;
};

window.addEventListener("DOMContentLoaded", () => {
  const pageSlash = window.location.pathname.split("/");
  pageName = pageSlash[pageSlash.length - 1].split(".")[0];
  menuPrintExec();
});

menuPage.addEventListener("click", (e) => {
  if (pageNum !== e.target.innerHTML && e.target.localName == "button") {
    pageBtn.forEach((e) => e.classList.remove("hollys_red"));
    e.target.classList.add("hollys_red");
    pageNum = e.target.innerHTML;
    menuPrintExec();
    menuCategory.scrollIntoView();
  }
});
menuCategory.addEventListener("change", () => {
  pageNum = 1;

  if (
    menuCategoryCheckbox[0].lastElementChild.checked == true &&
    menuCategoryChecked[0] == true
  ) {
    menuCategoryCheckbox[0].lastElementChild.checked = false;
    menuCategoryChecked[0] = false;
  } else if (
    menuCategoryCheckbox[0].lastElementChild.checked == true &&
    menuCategoryChecked[0] == false
  ) {
    menuCategoryCheckbox[0].lastElementChild.checked = true;
    menuCategoryChecked[0] = true;

    for (let i = 1; i < menuCategoryCheckbox.length; i++) {
      menuCategoryChecked[i] = false;
      menuCategoryCheckbox[i].lastElementChild.checked = false;
    }
  }

  for (let i = 0; i < menuCategoryCheckbox.length; i++) {
    menuCategoryChecked[i] = menuCategoryCheckbox[i].lastElementChild.checked;
  }
  menuPage.innerHTML = "";
  menuPrintExec();
});

menuList.addEventListener("click", (e) => {
  if (e.target.localName === "img") {
    modalPrintExec(e.target.nextElementSibling.innerText);
  } else if (e.target.localName === "span") {
    modalPrintExec(e.target.innerHTML);
  }
});
menuModalCloseBtn.addEventListener("click", () => {
  menuNutritional.innerHTML = "";
  menuModalWrap.classList.add("display_none");
});

menuModalGift.addEventListener("click", () => {
  localStorage.setItem("giftInfo", JSON.stringify(giftInfo));
});
