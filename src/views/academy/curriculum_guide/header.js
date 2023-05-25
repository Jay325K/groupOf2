$(function(){
    $.ajax({
        url: '/src/views/footer_header/header.html',	// HTML 파일 가져올 경로
        dataType: "html",
        success: function (html){

            $('#header').html(html); // HTML 코드 붙여넣기

            $.getScript({
                url: '/src/views/footer_header/header.js',		// script 가져올 경로
                success: function () {	 // 스크립트 가져온 후에 실행할 코드
                    
                }
            });
        }
    }); 
})