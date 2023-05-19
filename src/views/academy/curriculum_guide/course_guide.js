function after_load(){
    let menu_index = document.querySelectorAll('.menu_ul li');
    let move_index = document.querySelectorAll('.move_ul>li');

    console.log(move_index);
    let subscript = document.getElementById('btn_subscript');


    /* 메뉴 ul클릭시 백그라운드 색 움직이기 */
    let menu_btn_list = document.querySelectorAll('.course_guide_wrap .menu_ul li');
    let background_color = document.querySelector('.course_guide_wrap>.btn_bg');
    menu_btn_list.forEach((e,idx)=>{
        e.children[0].children[0].onclick=function(){
            for(let x=0; x<menu_btn_list.length; x++){
                menu_btn_list[x].children[0].children[0].style.color='#000';
            }
            setTimeout(function(){e.children[0].children[0].style.color='#fff';},200);
            background_color.style.transform='translateX('+(idx*150)+'px)';
        }

        e.children[0].children[0].onfocus=function(){
            for(let x=0; x<menu_btn_list.length; x++){
                menu_btn_list[x].children[0].children[0].style.color='#000';
            }
            setTimeout(function(){e.children[0].children[0].style.color='#fff';},200);
            background_color.style.transform='translateX('+(idx*150)+'px)';
        }
    })

    //수강신청 안내 페이지 커리큘럼 버튼 클릭시
    console.log(menu_index.length);
    menu_index.forEach((e,idx)=>{
        e.childNodes[1].childNodes[0].addEventListener('click',function(){
            moveul(idx);
        })
        e.childNodes[1].childNodes[0].addEventListener('focus',function(){
            moveul(idx);
        })
    })

    subscript.addEventListener('click',function(){
        moveul(menu_index.length);
    })
    function moveul(idx){
        setTimeout(function(){
            let move_ul = document.querySelector('.move_ul');
            move_ul.style.transform='translateX('+ (idx*-1200) +'px)';
        },50)
        
    }

    // 바리스타2급 Master 탭에 이전, 다음 버튼 클릭시

    let baristar_master_detail_curiculum_move_btn = document.querySelectorAll('.brista_master .detail_curiculum_level a');

    baristar_master_detail_curiculum_move_btn.forEach(e=>{
        e.addEventListener('click',function(){
            if(e.classList.contains('next')){
                document.querySelector('.brista_master .curiculum_show_ul ul').style.transform = 'translate('+(-194.5*4)+'px, -50%)';
            }else{
                document.querySelector('.brista_master .curiculum_show_ul ul').style.transform = 'translate(0px,-50%)';
            }
        })

        e.addEventListener('focus',function(){
            /* 바리스타 마스터 메뉴탭 밑 상세 교육내용 버튼에 포커스 될 시 슬라이드 움직이기 */
            move_index.forEach((el)=>{
                console.log(e.parentNode.parentNode.parentNode.parentElement.getAttribute('class'));
                console.log(el.children[0].children[0].getAttribute('class'));
                if(e.parentNode.parentNode.parentNode.parentElement.getAttribute('class') == el.children[0].children[0].getAttribute('class')){
                    moveul(5);
                } 
            })

            for(let x=0; x<menu_btn_list.length; x++){
                menu_btn_list[x].children[0].children[0].style.color='#000';
            }
            document.querySelector('.menu_ul li:nth-child(6) a').style.color='#fff';
            background_color.style.transform='translateX('+(5*150)+'px)';
        })
        
    })

    // 바리스타 실기특강 1급 탭에 이전, 다음 버튼 클릭시
    let brista_string_1_detail_curiculum_move_btn = document.querySelectorAll('.brista_string_1 .detail_curiculum_level a');

    brista_string_1_detail_curiculum_move_btn.forEach(e=>{
        e.addEventListener('click',function(){
            if(e.classList.contains('next')){
                document.querySelector('.brista_string_1 .curiculum_show_ul ul').style.transform = 'translate('+(-194.5*4)+'px, -50%)';
            }else{
                document.querySelector('.brista_string_1 .curiculum_show_ul ul').style.transform = 'translate(0px,-50%)';
            }
        })
        
    })
}