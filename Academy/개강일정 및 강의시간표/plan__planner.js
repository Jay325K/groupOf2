
$(function(){
    $.ajax({
        url: "class_time_plan.html",	// HTML 파일 가져올 경로
        dataType: "html",
        success: function (html){
      
            $("#plan__planner").html(html); // HTML 코드 붙여넣기

            $.getScript({
                url: "class_time_plan.js",		// script 가져올 경로
                success: function () {	 // 스크립트 가져온 후에 실행할 코드
                }
            });
        }
      });
    $('.button_wrap a').on('click',function(){
        if($(this).hasClass('plan_btn')){
            $.ajax({
                url: "class_time_plan.html",	// HTML 파일 가져올 경로
                dataType: "html",
                success: function (html){
              
                    $("#plan__planner").html(html); // HTML 코드 붙여넣기

                    $.getScript({
                        url: "class_time_plan.js",		// script 가져올 경로
                        success: function () {	 // 스크립트 가져온 후에 실행할 코드
                        }
                    });
                }
              });
        }else{
            $.ajax({
                url: "class_time_planner.html",	// HTML 파일 가져올 경로
                dataType: "html",
                success: function (html){
              
                    $("#plan__planner").html(html); // HTML 코드 붙여넣기

                    $.getScript({
                        url: "class_time_planner.js",		// script 가져올 경로
                        success: function () {	 // 스크립트 가져온 후에 실행할 코드
                        }
                    });
                }
              });
        }
    });

});

