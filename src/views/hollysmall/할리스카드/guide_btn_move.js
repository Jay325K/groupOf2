$(function(){
    $('.guide_card_img section a:eq(0)').css('color','white');
    $('.guide_card_img section a:eq(0)').next().removeClass('screen_out');


    $('.guide_card_img section a').on('click',function(){
        $('.guide_card_img section a').removeClass('active');
        $('.guide_card_img section a').css('color','#2e2e2e');
        $('.guide_card_img section a').next().addClass('screen_out');
        bg_color_move($(this).parent().index());
        $(this).toggleClass('active');

        if($(this).hasClass('active')==true){
            $(this).css('color','white');
            $(this).next().removeClass('screen_out');
        }
    })

    function bg_color_move(idx){
        let move=(idx-1)*146;
        $('.btn_color').animate({left:move+'px'},200);
    }
})
