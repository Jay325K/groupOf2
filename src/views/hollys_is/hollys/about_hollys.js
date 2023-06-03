const aboutContentTopMainSpanUnderLine = document.querySelector(
  ".about_content--top_main--span_under--line"
);

window.addEventListener("scroll", (e) => {
  const heightScrollY = this.scrollY;
  if (heightScrollY >= 500) {
    aboutContentTopMainSpanUnderLine.classList.add(
      "about_content--top_main--span_under--line_active"
    );
  }
});
