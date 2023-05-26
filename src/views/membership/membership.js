$(document).ready(function () {
  /**   slider   **/
  $(".pager a").click(function () {
    var width = $(".list_wrap li img").width();
    //     console.log(width);
    var idx = $(this).index();
    //     console.log(idx);

    $(".list_wrap ul").animate({ left: -width * idx });
  });

  /**   pager   **/
  $(".pager a").click(function () {
    $(".pager a").removeClass("active");
    $(this).addClass("active");
  });
});
