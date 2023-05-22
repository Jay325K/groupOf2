
$(function(){
    $.ajax({
        type:'get', //http 타입
        url:'teacher_info.json', //호출url
        cache:'false', //캐시처리
        data:'', //호출시 보낼 파라미터 데이터
        dataType:'json', //http통신시 응답 데이터 타입
        success: function(teacher_infomation){
            console.log(teacher_infomation.length);
            $('.card li').on('click',function(){
                let this_idx=$(this).index();
                //클릭시 작은 이미지 주소 저장
                let img_src = $(this).children().children().children().eq(0).attr('src');
                let img_alt = $(this).children().children().children().eq(0).attr('alt');
                
                $('.card .say_it').removeClass('active');
                $(this).children('.say_it').addClass('active');
        
                /* 작은 이미지의 주소를 프로필 이미지에 저장  0.15초 뒤 실행*/
                setTimeout(() => {
                    $('.teacher_profile .show_teacher_img img').attr('src',img_src).animate({opacity:'1'},150);
                    $('.teacher_profile .show_teacher_img img').attr('alt',img_alt).animate({opacity:'1'},150);
                    $('.info .teacher_name').text(teacher_infomation[this_idx].name).animate({opacity:'1'},150);
                    $('.info .teacher_locate').text(teacher_infomation[this_idx].locate).animate({opacity:'1'},150);
                    $('.info .teacher_small_school').text(teacher_infomation[this_idx].small_school).animate({opacity:'1'},150);
                    $('.info .teacher_middle_school').text(teacher_infomation[this_idx].middle_school).animate({opacity:'1'},150);
                    $('.info .teacher_high_school').text(teacher_infomation[this_idx].high_school).animate({opacity:'1'},150);
                    $('.info .teacher_college').text(teacher_infomation[this_idx].college).animate({opacity:'1'},150);
                }, 150);
                /* 투명하게 만듬 */
                $('.teacher_profile .show_teacher_img img').animate({opacity:'0'},150);
                $('.info .teacher_name').animate({opacity:'0'},150);
                $('.info .teacher_locate').animate({opacity:'0'},150);
                $('.info .teacher_small_school').animate({opacity:'0'},150);
                $('.info .teacher_middle_school').animate({opacity:'0'},150);
                $('.info .teacher_high_school').animate({opacity:'0'},150);
                $('.info .teacher_college').animate({opacity:'0'},150);


            })
        }
        
    })
})