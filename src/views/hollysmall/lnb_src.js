
$(function(){
    $.ajax({
        url: 'Hollys_card/Hollys_card.html',	// HTML 파일 가져올 경로
        dataType: "html",
        success: function (html){
    
            $("#content").html(html); // HTML 코드 붙여넣기
    
            $.getScript({
                url: 'Hollys_card/Hollys_card.js',		// script 가져올 경로
                success: function () {	 // 스크립트 가져온 후에 실행할 코드
                    
                }
            });
        }
    }); 

    $('.lnb ul li a').on('click',function(){
        if($(this).parent().index()==0){
            $.ajax({
                url: 'Hollys_card/Hollys_card.html',	// HTML 파일 가져올 경로
                dataType: "html",
                success: function (html){
            
                    $("#content").html(html); // HTML 코드 붙여넣기
            
                    $.getScript({
                        url: 'Hollys_card/Hollys_card.js',		// script 가져올 경로
                        success: function () {	 // 스크립트 가져온 후에 실행할 코드
                            
                        }
                    });
                }
            }); 
        }/* else if($(this).parent().index()==2){
            $.ajax({
                url: 'planner/class_time.html',	// HTML 파일 가져올 경로
                dataType: "html",
                success: function (html){
            
                    $("#sec_two_container").html(html); // HTML 코드 붙여넣기
            
                    $.getScript({
                        url: 'planner/class_time.js',		// script 가져올 경로
                        success: function () {	 // 스크립트 가져온 후에 실행할 코드
                        }
                    });
                }
            });
        } */
    });
});