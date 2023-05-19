$(function(){
    $('.buy_btn').on('click',function(){
        $.ajax({
            url: 'Hollys_card/buy/buy_card.html',	// HTML 파일 가져올 경로
            dataType: "html",
            success: function (html){
        
                $('#content.sec_two').html(html); // HTML 코드 붙여넣기
        
                $.getScript({
                    url: 'Hollys_card/buy/buy_card.js',		// script 가져올 경로
                    success: function () {	 // 스크립트 가져온 후에 실행할 코드
                        
                    }
                });
            }
        }); 
    });
    
        
});