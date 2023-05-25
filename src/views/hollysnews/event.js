$(document).ready(function(){

    /**     select / option     **/
    $('#event').change(function(){
        var val = $(this).val();
        //alert(val);

        if(val == 'M'){
            //alert('M');
            $('.board_list .page-cont').find('.M').show();
            $('.board_list .page-cont').find('.O').show();
            $('.board_list .page-cont').find('.S').show();

            $('.board_list .page-cont').find('.O').hide();
            $('.board_list .page-cont').find('.S').hide();
        }else if(val == 'O'){
            $('.board_list .page-cont').find('.M').show();
            $('.board_list .page-cont').find('.O').show();
            $('.board_list .page-cont').find('.S').show();

            $('.board_list .page-cont').find('.M').hide();
            $('.board_list .page-cont').find('.S').hide();
        }else if(val == 'S'){
            $('.board_list .page-cont').find('.M').show();
            $('.board_list .page-cont').find('.O').show();
            $('.board_list .page-cont').find('.S').show();
            
            $('.board_list .page-cont').find('.M').hide();
            $('.board_list .page-cont').find('.O').hide();
        }else if(val == 'all'){
            //alert('all');
            $('.board_list .page-cont').find('.M').show();
            $('.board_list .page-cont').find('.O').show();
            $('.board_list .page-cont').find('.S').show();
        }
    });

    /**     게시판 페이징     **/
    $('main .content .board_wrap .board_list_wrap .board_page a').click(function(){
        var page_id = $(this).attr('data-tab');
        
        $('main .content .board_wrap .board_list_wrap .board_page a').removeClass('current');
        $('main .content .board_wrap .board_list_wrap .board_list .page-cont').removeClass('current');

        $(this).addClass('current');
        $('#'+page_id).addClass('current');
    })

    /**     게시판 페이징 버튼 효과     **/
    $('main .content .board_wrap .board_list_wrap .board_page a').click(function(){
        $('main .content .board_wrap .board_list_wrap .board_page a').removeClass('on');
        $(this).addClass('on');
    })
    
})