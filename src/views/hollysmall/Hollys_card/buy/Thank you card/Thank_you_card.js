$(function(){
    let this_count = img_slide($('form .img_slide').children().length / $('form .img_slide').length);
    let move_count=0;
    let move_length=0;
    let move_ul = $('form .img_slide');
    $('button').on('click',function(){
        /* 이전 다음 버튼 누를시 슬라이드 이동 */
        if($(this).hasClass('prev')==true){
            if(move_count>0){
                move_length+=218.79;
                move_ul.animate({left:move_length+'px'});
                move_count--;
            }
        }else{
            if(move_count<this_count){
                move_length-=218.79;
                move_ul.animate({left:move_length+'px'});
                move_count++;
            }
        }
    })

    function img_slide(img_length){
        if(img_length<=3){
            return img_length;
        }
        return img_length-3;
    }
})