$(document).ready(function(){

    /**     게시판 페이징     **/
    $('main .content .board_wrap .board_list_wrap .board_page a').click(function(){
        var page_id = $(this).attr('data-tab');
        
        $('main .content .board_wrap .board_list_wrap .board_page a').removeClass('current');
        $('main .content .board_wrap .board_list_wrap .board_list .page-cont').removeClass('current');

        $(this).addClass('current');
        $('#'+page_id).addClass('current');
    })

    /**     게시판 페이징 버튼     **/
    $('main .content .board_wrap .board_list_wrap .board_page a').click(function(){
        $('main .content .board_wrap .board_list_wrap .board_page a').removeClass('on');
        $(this).addClass('on');
    })
})