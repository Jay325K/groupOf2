$(function(){
    /* 기본값 */
    loader("Hollys card","Hollys_card.html","Hollys_card.js");

    $('.design>div>a').on('click',function(){
        $('.design>div>a').next().addClass('screen_out');
        let card_floder_name = $(this).text()+ ' card';    /* 폴더명 */

        let card_html_file_name = $(this).text() +' card.html'; /* 가져올 html파일명 */
        card_html_file_name= card_html_file_name.split(' ').join('_');

        let card_js_file_name = $(this).text() +' card.js'; /* 가져올 js파일명 */
        card_js_file_name= card_js_file_name.split(' ').join('_');

        $(this).next().removeClass('screen_out');
        loader(card_floder_name, card_html_file_name, card_js_file_name);

    });


    function loader(floder_name, html_url, js_url){
        let html_url_txt = floder_name+'/'+html_url;
        let js_url_txt =floder_name+'/'+js_url;
        $.ajax({
            url: html_url_txt,	// HTML 파일 가져올 경로
            dataType: "html",
            success: function (html){
        
                $(".card_img_wrap").html(html); // HTML 코드 붙여넣기
        
                $.getScript({
                    url: js_url_txt,		// script 가져올 경로
                    success: function () {	 // 스크립트 가져온 후에 실행할 코드
                    }
                });
            }
        });
    }
})