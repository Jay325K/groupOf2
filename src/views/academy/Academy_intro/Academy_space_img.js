$(function(){
    let big_img = $('.space_main_img img');

    //메뉴 클릭시 이미지 바뀜
    $('.space_menu li>a').on('click focus',function(){
        let slice_src =$(this).next().children('a').eq(0).children().attr('src'); // 메뉴클릭시 메뉴에 해당하는 첫번째 이미지 주소
        let slice_alt =$(this).next().children('a').eq(0).children().attr('alt'); // 메뉴클릭시 메뉴에 해당하는 첫번째 이미지 주소
        let small_img =slice_src.slice(0,slice_src.length-4); /* 이미지 주소에서 .jpg만 짜르고 다시 저장 */
        let big_img_name = $(this).text();

        big_img.attr('src',small_img+'_2.jpg');
        big_img.attr('alt',slice_alt);
        $('.space_main_img p').text(big_img_name);
    });

    //작은 이미지 클릭시 큰 이미지 바뀜
    $('.space_img_wrap a img').on('click focus',function(){
        let img_src = $(this).attr('src').slice(0,$(this).attr('src').length-4);
        let img_alt = $(this).attr('alt');
        let big_img_name = $(this).parent().parent().prev().text();

        big_img.attr('src',(img_src+'_2.jpg'));
        big_img.attr('alt',img_alt);

        $('.space_main_img p').text(big_img_name); 
    })
})