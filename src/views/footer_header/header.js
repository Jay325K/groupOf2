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
    window.addEventListener('resize',function(){
        if(window.innerWidth<1920 && window.innerWidth>1200){
            
                let window_width = this.innerWidth;
                let background_move_locate = document.querySelector('.depth-02');
                console.log('window-width = ' + window_width);
                console.log(', (background_move_locate.clientWidth+720) =' + (background_move_locate.clientWidth+720));

                console.log(', result = =' +((background_move_locate.clientWidth+720) - window_width));
                console.log(', result = =' +(window_width-(background_move_locate.clientWidth+720)));
                
                background_move_locate.style.backgroundPosition=(0+(window_width-(1920))) +'px 100%'; 
            
            
        }
    })
});