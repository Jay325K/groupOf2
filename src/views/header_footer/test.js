$(function(){
    window.addEventListener('scroll',function(){
        let this_scroll = window.pageYOffset;
        console.log(this_scroll);

        if(this_scroll>0){
            $('.header_first').addClass('active');
        }else{
            $('.header_first').removeClass('active');
        }
    })

    $('header .all_menu_wrap .gnb_m>ul').find('li>a').hover(function(){
        //alert('test');
        $(this).find('ul').css({'color':'red'});
        //$(this).find('ul>li>a').css({'display':'block'});
    },function(){
        $(this).css({'color':'#fff'});
        //$(this).find('ul>li>a').css({'display':'none'});
    })
});