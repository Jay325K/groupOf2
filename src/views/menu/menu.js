const getMenu = () => {
  const response = fetch("./menu_list.json");
  return response.then((res) => res.json());
};

const drinPrintExec = async () => {
  try {
    list = await getMenu();
    drinkPrint(list);
  } catch (error) {
    console.log(error);
  }
};

const drinkPrint = (list) => {
  const dirnkList = document.querySelector(".drink_list");
  const listObj = list["drink"];
  console.log(listObj);

  listObj.forEach((data) => {
    dirnkList.innerHTML += `<li><a href="#none"><img src="${data.image}" alt=""><span>${data.name}</span></a></li>`;
  });
};

window.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname.includes("drink")) {
    drinPrintExec();
  }
});
