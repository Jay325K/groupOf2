
    $(function(){
        $('.lnb ul li a').on('click',function(){
            if($(this).parent().index()==0){
                 $.ajax({
                    url: 'course_guide/course_guide.html',	// HTML 파일 가져올 경로
                    dataType: "html",
                    success: function (html){
                
                        $("#sec_two_container").html(html); // HTML 코드 붙여넣기
                
                        $.getScript({
                            url: 'course_guide/course_guide.js',		// script 가져올 경로
                            success: function () {	 // 스크립트 가져온 후에 실행할 코드
                            }
                        });
                    }
                }); 
            }else if($(this).parent().index()==1){
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
            }else{
                /* let html_file = link_;
                let js_file = link_;
                ajax_link(html_file, js_file); */
            }
        });

            /* function ajax_link(html_file, js_file){
                $.ajax({
                    url: html_file,	// HTML 파일 가져올 경로
                    dataType: "html",
                    success: function (html){
                
                        $("#sec_two_container").html(html); // HTML 코드 붙여넣기
                
                        $.getScript({
                            url: js_file,		// script 가져올 경로
                            success: function () {	 // 스크립트 가져온 후에 실행할 코드
                            }
                        });
                    }
                });
            } */
        
    });