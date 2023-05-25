const headerId = document.getElementById("header");
const footerId = document.getElementById("footer");
const body = document.querySelector("body");

const getHeader = () => {
  const response = fetch("/src/views/footer_header/header.html");
  return response.then((res) => res.text());
};
const getFooter = () => {
  const response = fetch("/src/views/footer_header/footer.html");
  return response.then((res) => res.text());
};
const headerFooterExec = () => {
  headerFooterPrint().then(() => {
    headerFooterJs();
  });
};
const headerFooterPrint = async () => {
  const headerData = await getHeader();
  const footerData = await getFooter();
  headerId.innerHTML = headerData;
  footerId.innerHTML = footerData;
};
const headerFooterJs = () => {
  let createScript = document.createElement("script");
  createScript.setAttribute("src", "/src/views/footer_header/header.js");
  body.appendChild(createScript);
};
window.addEventListener("DOMContentLoaded", () => {
  headerFooterExec();
});
