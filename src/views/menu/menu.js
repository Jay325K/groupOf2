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
    const menu = await getMenu();

    if (drinkPageNum) {
      drinkPagePrintProcess(menu);
    }
  } catch (error) {
    console.log(error);
  }
};
const drinkPagePrintProcess = (menu) => {
  drinkListArray = [];
  drinkList.innerHTML = "";
  drinkPage.innerHTML = "";

  drinkListGenerate(menu);
  const pageCount = Math.ceil(drinkListArray.length / 20);

  for (let i = 1; i <= pageCount; i++) {
    if (pageCount != 1)
      drinkPage.innerHTML += `<button><span>${i}</span></button>`;
  }
  drinkPagePrint();
};
const drinkListGenerate = (menu) => {
  for (let i = 0; i < 5; i++) {
    if (drinkCategoryChecked[0] == true) {
      drinkListArray = [
        ...menu["drink"][drinkCategoryArray[0]],
        ...menu["drink"][drinkCategoryArray[1]],
        ...menu["drink"][drinkCategoryArray[2]],
        ...menu["drink"][drinkCategoryArray[3]],
      ];
    } else if (drinkCategoryChecked[i]) {
      drinkListArray = [
        ...drinkListArray,
        ...menu["drink"][drinkCategoryArray[i - 1]],
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
const modalPrintExec = async (name) => {
  try {
    const menu = await getMenu();
    modalPrintProcess(menu, name);
    drinkDetailwrap.classList.remove("display_none");
  } catch (error) {
    console.log(error);
  }
};

const modalPrintProcess = (menu, name) => {
  drinkListArray = [
    ...menu["drink"][drinkCategoryArray[0]],
    ...menu["drink"][drinkCategoryArray[1]],
    ...menu["drink"][drinkCategoryArray[2]],
    ...menu["drink"][drinkCategoryArray[3]],
  ];
  const nameFilter = drinkListArray.filter((data) => data["name"] === name);
  modalPrint(nameFilter);
};
const modalPrint = (data) => {
  drinkDetailDesc.innerHTML = `
  <img src="${data[0].image}" alt="" />
  <h3>${data[0].name}</h3>
  <p>${data[0].nameEn}</p>
  <span>${data[0].text}</span>  
  `;
  drinkNutritionalPrint(data);
};
const drinkNutritionalPrint = (data) => {
  if (data[0].nutritional.hot.calorie == "") {
    drinkNutritional.innerHTML += `
    ${drinkNutritionalStaticPrint()}
    <tr>
    <th>ICED</th>
    <td>${data[0].nutritional.iced.calorie}</td>
    <td>${data[0].nutritional.iced.sugars}</td>
    <td>${data[0].nutritional.iced.protein}</td>
    <td>${data[0].nutritional.iced.saturatedFat}</td>
    <td>${data[0].nutritional.iced.salt}</td>
    <td>${data[0].nutritional.iced.caffeine}</td>
    </tr>
    </tbody>
    `;
  } else if (data[0].nutritional.iced.calorie == "") {
    drinkNutritional.innerHTML += `
    ${drinkNutritionalStaticPrint()}
    <tr>
    <th>HOT</th>
    <td>${data[0].nutritional.hot.calorie}</td>
    <td>${data[0].nutritional.hot.sugars}</td>
    <td>${data[0].nutritional.hot.protein}</td>
    <td>${data[0].nutritional.hot.saturatedFat}</td>
    <td>${data[0].nutritional.hot.salt}</td>
    <td>${data[0].nutritional.hot.caffeine}</td>
    </tr>
    </tbody>
    `;
  } else {
    drinkNutritional.innerHTML += `
    ${drinkNutritionalStaticPrint()}
    <tr>
    <th>HOT</th>
    <td>${data[0].nutritional.hot.calorie}</td>
    <td>${data[0].nutritional.hot.sugars}</td>
    <td>${data[0].nutritional.hot.protein}</td>
    <td>${data[0].nutritional.hot.saturatedFat}</td>
    <td>${data[0].nutritional.hot.salt}</td>
    <td>${data[0].nutritional.hot.caffeine}</td>
    </tr>
    <tr>
    <th>ICED</th>
    <td>${data[0].nutritional.iced.calorie}</td>
    <td>${data[0].nutritional.iced.sugars}</td>
    <td>${data[0].nutritional.iced.protein}</td>
    <td>${data[0].nutritional.iced.saturatedFat}</td>
    <td>${data[0].nutritional.iced.salt}</td>
    <td>${data[0].nutritional.iced.caffeine}</td>
    </tr>
    </tbody>
    `;
  }
};
const drinkNutritionalStaticPrint = () => {
  return `
  <tbody>
  <tr>
  <th></th>
  <th>칼로리</td>
  <th>당류</th>
  <th>단백질</th>
  <th>포화지방</th>
  <th>나트륨</th>
  <th>카페인</th>
  </tr>`;
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

drinkList.addEventListener("click", (e) => {
  if (e.target.localName === "img") {
    modalPrintExec(e.target.nextElementSibling.innerHTML);
  } else if (e.target.localName === "span") {
    modalPrintExec(e.target.innerHTML);
  }
});
drinkDetailClose.addEventListener("click", () => {
  drinkNutritional.innerHTML = "";
  drinkDetailwrap.classList.add("display_none");
});
