window.onload=()=>{
    const slide_main_move = document.querySelector('.show_curriculum_content_wrap>.show_ul>ul');
    const slide_contents = document.querySelectorAll('.show_curriculum_content_wrap>.show_ul>ul>li');
    const slide_btn_bg = document.querySelector('.show_curriculum_content_wrap>.show_ul>.menu_bg_color');

    slide_contents.forEach((e,idx)=>{
        e.children[0].onclick=()=>{
            /* 버튼 배경 움직이기 */
            slide_btn_bg.style.transform = 'translateX('+(idx*150)+'px)';

            /* 버튼 글자색 바꾸기 */
            for(let x=0; x<slide_contents.length; x++){
                slide_contents[x].children[0].classList.remove('active');
            }
            e.children[0].classList.add('active');
            
            /* 메인 움직이기 */
            slide_main_move.style.transform='translateX('+(idx*-1200)+'px)';

            /* 메뉴 상단에 고정시키기 */
            for(let x=0; x<slide_contents.length; x++){
                slide_contents[x].children[0].style.transform='translate('+(idx*+1200)+'px,-38px)';
            }
        }
        e.children[0].onfocus=()=>{
            /* 버튼 배경 움직이기 */
            slide_btn_bg.style.transform = 'translateX('+(idx*150)+'px)';

            /* 버튼 글자색 바꾸기 */
            for(let x=0; x<slide_contents.length; x++){
                slide_contents[x].children[0].classList.remove('active');
            }
            e.children[0].classList.add('active');
            
            /* 메인 움직이기 */
            slide_main_move.style.transform='translateX('+(idx*-1200)+'px)';

            /* 메뉴 상단에 고정시키기 */
            for(let x=0; x<slide_contents.length; x++){
                slide_contents[x].children[0].style.transform='translate('+(idx*+1200)+'px,-38px)';
            }
        }
    })

}