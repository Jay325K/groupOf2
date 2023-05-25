const headerId = document.getElementById("header");
const footerId = document.getElementById("footer");
const html = document.querySelector("html");

const getHeader = () => {
  const response = fetch("/src/views/footer_header/header.html");
  return response.then((res) => res.text());
};
const getFooter = () => {
  const response = fetch("/src/views/footer_header/footer.html");
  return response.then((res) => res.text());
};

const headerPrint = async () => {
  let headerData = await getHeader();
  headerId.innerHTML = headerData;
};
const footerPrint = async () => {
  let footerData = await getFooter();
  footerId.innerHTML = footerData;
};
const headerFooterJs = () => {
  let scr = document.createElement("script");
  scr.setAttribute("src", "/src/views/footer_header/header.js");
  html.appendChild(scr);
};
window.addEventListener("DOMContentLoaded", () => {
  headerPrint();
  footerPrint();
  headerFooterJs();
});
