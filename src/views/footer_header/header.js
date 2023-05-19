$(function(){
    /***   sticky gnb   ***/
    window.addEventListener('scroll',function(){
        let scroll = window.pageYOffset;

        if(scroll>0){
            $('.header').addClass('active');
            $('.header_first').addClass('active');
        }else{
            $('.header').removeClass('active');
            $('.header_first').removeClass('active');
        }
    });

    /***   depth-02   ***/
    $('.gnb').mouseenter(function(){
        $('.depth-02').show();
    });
    $('.gnb').mouseleave(function(){
        $('.depth-02').hide();
    })
});