$(document).ready(function () {
    $(".gnb").mouseenter(function () {
        $(".sub_menu").slideDown();
    });
    $(".gnb").mouseleave(function () {
        $(".sub_menu").slideUp();
    });
});
