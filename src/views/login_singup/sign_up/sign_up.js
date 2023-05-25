window.onload=()=>{
    $(function(){
        let pw_input = document.querySelector('.pw_wrap .pw_input_box input');
        let show_hide_pw_btn = document.querySelector('.show_hide_pw_btn');
        let pw_check_input = document.querySelector('.pw_check_input');
        const check = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{1,}$/;
        let show_hide_pw_btn_count=0;

        /* 비밀번호에 포커스될때 */
        pw_input.addEventListener('focus',()=>{
            pw_precondition_move(pw_input.value);
        })

        /* 비밀번호를 입력할때 */
        pw_input.addEventListener('keyup',()=>{
            pw_precondition_move(pw_input.value);
        })

        /* 비밀번호 입력 내가 입력한 텍스트 보이기, 가리기 */
        show_hide_pw_btn.addEventListener('click',function(){
            
            if(show_hide_pw_btn_count==0){
                show_hide_pw_btn.innerHTML='<i class="fa-solid fa-eye"></i>';
                pw_input.setAttribute('type','text');
                pw_check_input.setAttribute('type','text');
                show_hide_pw_btn_count=1;
            }else{
                show_hide_pw_btn.innerHTML='<i class="fa-solid fa-eye-slash"></i>';
                pw_input.setAttribute('type','password');
                pw_check_input.setAttribute('type','password');
                show_hide_pw_btn_count=0;
            }

        })

        /* 비밀번호를 입력할때 */
        pw_check_input.addEventListener('keyup',function(){
            let pw_same =document.querySelector('.pw_same');
            if(pw_input.value=='' || pw_input.value.length<8 || !check.test(pw_input.value)){
                pw_same.innerHTML='비밀번호를 입력해주세요.';
                pw_check_input.value='';
                return 0;
            }else{
                if(pw_input.value==pw_check_input.value){
                    pw_same.style.color='#008000'
                    pw_same.innerHTML='비밀번호가 일치합니다.';
                    document.querySelector('.pw_check_mark').style.background='#90ee90';
                    document.querySelector('.pw_check_mark').style.color='#008000';
                    document.querySelector('.pw_check_mark').innerHTML='<i class="fa-solid fa-check"></i>';
                }else{
                    pw_same.style.color='#c72f2f'
                    pw_same.innerHTML='비밀번호가 일치하지 않습니다.';
                    document.querySelector('.pw_check_mark').style.background='#c72f2f70';
                    document.querySelector('.pw_check_mark').style.color='#c72f2f';
                    document.querySelector('.pw_check_mark').innerHTML='<i class="fa-solid fa-xmark"></i>';
                }
            }
        })



        /* 비밀번호 조건 */
        function pw_precondition_move(pw_value){
            let pw_precondition = $('.pw_precondition_wrap');
            let pw_precondition_length = document.querySelectorAll('.pw_precondition_wrap .pw_precondition li');

            /* 8~15자리일 때 V or X */
            if((pw_value.length>7 && pw_value.length<16)){
                pw_precondition_length[0].children[1].innerHTML='<i class="fa-solid fa-check"></i>';
            }else{
                pw_precondition_length[0].children[1].innerHTML='<i class="fa-solid fa-xmark"></i>';
            }

            /* 특수문자 숫자 영문이 포함 되어있을때 V or X */
            if(check.test(pw_value)){
                pw_precondition_length[1].children[1].innerHTML='<i class="fa-solid fa-check"></i>';
            }else{
                pw_precondition_length[1].children[1].innerHTML='<i class="fa-solid fa-xmark"></i>';
            }

            /* 8~15자리이고 특수문자 숫자 영문이 포함 되어있을때 */
            if((pw_value.length>7 && pw_value.length<16) && check.test(pw_value) || pw_value==0){
                pw_precondition.stop(false).animate();

                pw_precondition.animate({
                    height:'0px'
                },300);
                
            }else{
                if(pw_value.length!=0){
                    pw_precondition.animate({
                        height:'90px'
                    },300);
                }
            }
            
        }
    })
}