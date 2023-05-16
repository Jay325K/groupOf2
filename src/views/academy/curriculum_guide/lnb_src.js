function ajax_load(link_){
    $(function(){
        $('.lnb ul li a').on('click',function(){
            if($(this).parent().index()==0){
                let html_file = link_+'.html';
                let js_file = link_+'.js';
                ajax_link(html_file, js_file);
            }else if($(this).parent().index()==1){
                let html_file = link_+'.html';
                let js_file = link_+'.js';
                ajax_link(html_file, js_file);
            }else{
                /* let html_file = link_;
                let js_file = link_;
                ajax_link(html_file, js_file); */
            }
        })

            function ajax_link(html_file, js_file){
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
            }
    })
    
}