$.ajax({
    url: "../lnb.html",	// HTML 파일 가져올 경로
    dataType: "html",
    success: function (html){
  
        $("#sec_one").html(html); // HTML 코드 붙여넣기
  
        $.getScript({
            url: "../lnb.js",		// script 가져올 경로
            success: function () {	 // 스크립트 가져온 후에 실행할 코드
            }
        });
    }
});