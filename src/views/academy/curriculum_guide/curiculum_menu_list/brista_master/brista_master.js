const brista_master_img_slide = document.querySelectorAll('.brista_master_content_wrap .detail_curiculum_level>a');
const brista_master_slide_ul = document.querySelector('.brista_master_content_wrap .curiculum_show_ul ul');

let brista_master_move_slide_distance=0; //이동될 거리
let brista_master_move_slide_count=0;


/* 슬라이드 움직이기 */
brista_master_img_slide.forEach(e=>{

    e.onclick=()=>{
        if(e.classList.contains('prev') && brista_master_move_slide_count>0){
            brista_master_move_slide_distance+=740;
            brista_master_slide_ul.style.transform='translateX('+brista_master_move_slide_distance+'px)';
            brista_master_move_slide_count--;
        }else if(e.classList.contains('next') && brista_master_move_slide_count<1){
            brista_master_move_slide_distance-=740;
            brista_master_slide_ul.style.transform='translateX('+brista_master_move_slide_distance+'px)';
            brista_master_move_slide_count++;
        }
    }
    
})