const myMembershipContentManagementContentWrap = document.querySelector(
  ".my_membership--content_management--content_wrap"
);
const myMembershipContentManagementMenuCrown = document.querySelector(
  ".my_membership--content_management--menu_crown"
);
const myMembershipContentManagementMenuCard = document.querySelector(
  ".my_membership--content_management--menu_card"
);

const managementMenuCrownPrint = () => {
  myMembershipContentManagementContentWrap.innerHTML = `
    <section class="my_membership--content_management--crown">
              <section
                class="my_membership--content_management--crown_assortment"
              >
                <span
                  class="my_membership--content_management--crown_assortment--txt"
                  >CROWN</span
                >
                <span
                  class="my_membership--content_management--crown_assortment--txt"
                  >적립일</span
                >
                <span
                  class="my_membership--content_management--crown_assortment--txt"
                  >소멸일</span
                >
                <span
                  class="my_membership--content_management--crown_assortment--txt"
                  >적립개수</span
                >
              </section>
              <section class="my_membership--content_management--crown_notice">
                <img
                  src="../../../assets/images/my_page/no_data.png"
                  alt=""
                  class="my_membership--content_management--crown_notice--none_img"
                />
                <span>내역이 없습니다.</span>
              </section>
            </section>
    `;
};
const managementMenuCardPrint = () => {
  myMembershipContentManagementContentWrap.innerHTML = `
    <section class="my_membership--content_management--membership">
              <section class="my_membership--content_management--membership_re">
                <span class="my_membership--content_management--membership_txt"
                  >모바일 멤버십 카드 재발급</span
                ><a
                  href="#none"
                  class="my_membership--content_management--membership_link"
                  >바로가기</a
                >
              </section>
              <section
                class="my_membership--content_management--membership_register"
              >
                <span class="my_membership--content_management--membership_txt"
                  >실물 카드 등록</span
                >
                <a
                  href="#none"
                  class="my_membership--content_management--membership_link"
                  >바로가기</a
                >
              </section>
              <section
                class="my_membership--content_management--membership_stop"
              >
                <span class="my_membership--content_management--membership_txt"
                  >멤버십 카드 사용중지</span
                >
                <a
                  href="#none"
                  class="my_membership--content_management--membership_link"
                  >사용중지</a
                >
              </section>
            </section>
    `;
};
const hollysRedBgClassAdd = () => {
  const myMembershipContentManagementMenuCrownClass = [
    ...myMembershipContentManagementMenuCrown.classList,
  ];
  const myMembershipContentManagementMenuCrownFilter =
    myMembershipContentManagementMenuCrownClass.filter(
      (e) => e === "hollys_red--bg"
    );
  const myMembershipContentManagementMenuCardClass = [
    ...myMembershipContentManagementMenuCard.classList,
  ];
  const myMembershipContentManagementMenuCardFilter =
    myMembershipContentManagementMenuCardClass.filter(
      (e) => e === "hollys_red--bg"
    );
  if (myMembershipContentManagementMenuCrownFilter[0] === undefined) {
    myMembershipContentManagementMenuCrown.classList.add("hollys_red--bg");
    myMembershipContentManagementMenuCard.classList.remove("hollys_red--bg");
  } else if (myMembershipContentManagementMenuCardFilter[0] === undefined) {
    myMembershipContentManagementMenuCard.classList.add("hollys_red--bg");
    myMembershipContentManagementMenuCrown.classList.remove("hollys_red--bg");
  }
};

window.addEventListener("DOMContentLoaded", () => {
  managementMenuCrownPrint();
  myMembershipContentManagementMenuCrown.classList.add("hollys_red--bg");
});
myMembershipContentManagementMenuCrown.addEventListener("click", () => {
  managementMenuCrownPrint();
  hollysRedBgClassAdd();
});
myMembershipContentManagementMenuCard.addEventListener("click", () => {
  managementMenuCardPrint();
  hollysRedBgClassAdd();
});
