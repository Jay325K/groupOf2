window.onload=()=>{
    $(function(){

        $.ajax({
            type:'get', //http 타입
            url:'../id_pw_list.json', //호출url
            cache:'false', //캐시처리
            data:'', //호출시 보낼 파라미터 데이터
            dataType:'json', //http통신시 응답 데이터 타입
            success: function(id_pw_list){
                document.querySelector('.id_input').value='';
                document.querySelector('.name_input').value='';
                document.querySelector('.tel_input').value='';
                document.querySelector('.pw_check_input').setAttribute('readonly','readonly');

                let pw_input = document.querySelector('.pw_wrap .pw_input_box input');
                let show_hide_pw_btn = document.querySelector('.show_hide_pw_btn');
                let pw_check_input = document.querySelector('.pw_check_input');
                let pw_same =document.querySelector('.pw_same');

                const check = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{1,}$/; //영문, 숫자, 특수문자 정규식
                let email_ = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;    // 이메일 정규식
                let tel_=/^[0-9]{3}-[0-9]{4}-[0-9]{4}$/; //전화번호 정규식

                var id_overlap_check_btn_click_number = 0; //아이디 중복검사 버튼 누른 횟수
                var id_overlap_check_number = 0; //중복검사 횟수

                /* 아이디 중복확인 버튼 누를시 */
                let id_overlap_check_btn = document.querySelector('.id_overlap_check_btn');
                id_overlap_check_btn.addEventListener('click',function(){
                    if(document.querySelector('.id_input').value.length==0){
                        alert('아이디를 입력해주세요.');
                        return 0;
                        
                    }
                    if(!email_.test(document.querySelector('.id_input').value)){
                        alert('이메일 형식에 맞지 않습니다.');
                        return 0;
                    }

                    id_pw_list.forEach(e=>{
                        if(e.id != document.querySelector('.id_input').value){
                            id_overlap_check_number++;
                        }
                    })

                    if(id_overlap_check_number == id_pw_list.length){
                        document.querySelector('.id_check_txt').innerHTML='사용할 수 있는 아이디입니다';
                        document.querySelector('.id_check_txt').style.color='#008000';
                        id_overlap_check_btn_click_number=1;
                    }else{
                        document.querySelector('.id_check_txt').innerHTML='이미 가입된 아이디입니다.';
                        document.querySelector('.id_check_txt').style.color='#c72f2f';
                        id_overlap_check_btn_click_number=0;
                    }
                    
                    id_overlap_check_number=0;
                    console.log(id_overlap_check_btn_click_number);
                })
                
                document.querySelector('.id_input').addEventListener('change',function(){
                    id_overlap_check_btn_click_number=0;
                })


                
                
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

                
                /* 비밀번호 조건 */
                function pw_precondition_move(pw_value){

                    let pw_precondition = $('.pw_precondition_wrap');
                    let pw_precondition_length = document.querySelectorAll('.pw_precondition_wrap .pw_precondition li');

                    if(pw_input.value != pw_check_input.value){
                        pw_check_input.value='';
                        pw_same.innerHTML='비밀번호를 입력해주세요.';
                        pw_same.style.color='#000';
                        document.querySelector('.pw_check_mark').style.background='transparent';
                        document.querySelector('.pw_check_mark').style.color='transparent';
                    }

                    /* 8~15자리일 때 V or X */
                    if((pw_value.length>7)){
                        pw_precondition_length[0].children[1].innerHTML='<i class="fa-solid fa-check"></i>';
                    }else{
                        pw_precondition_length[0].children[1].innerHTML='<i class="fa-solid fa-xmark"></i>';
                        document.querySelector('.pw_check_input').setAttribute('readonly','readonly');
                    }

                    /* 특수문자 숫자 영문이 포함 되어있을때 V or X */
                    if(check.test(pw_value)){
                        pw_precondition_length[1].children[1].innerHTML='<i class="fa-solid fa-check"></i>';
                    }else{
                        pw_precondition_length[1].children[1].innerHTML='<i class="fa-solid fa-xmark"></i>';
                        document.querySelector('.pw_check_input').setAttribute('readonly','readonly');
                    }

                    /* 8~15자리이고 특수문자 숫자 영문이 포함 되어있을때 */
                    if((pw_value.length>7) && check.test(pw_value) || pw_value==0){
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

                /* 비밀번호 확인란을 입력할때 */
                pw_check_input.addEventListener('keyup',function(){
                    
                    if(pw_input.value=='' || pw_input.value.length<8 || !check.test(pw_input.value)){
                        pw_same.innerHTML='비밀번호를 입력해주세요.';
                        return 0;
                    }else{
                        pw_check_input.removeAttribute('readonly');
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

                    if(pw_check_input.value.length<1){
                        pw_same.style.color='#000'
                        pw_same.innerHTML='비밀번호를 입력해주세요.';
                        document.querySelector('.pw_check_mark').style.background='transparent';
                        document.querySelector('.pw_check_mark').style.color='transparent';
                    }
                })

                /* 이전 버튼 누를시 */
                document.querySelector('.go_prev_page').addEventListener('click',function(){
                    window.history.back();
                })

                /* 회원가입 버튼 누를시 */
                document.querySelector('.sign_up_btn').addEventListener('click',function(){
                    console.log(id_overlap_check_btn_click_number);
                    if(id_overlap_check_btn_click_number==0){
                        alert('아이디 중복확인이 필요합니다.');
                        return 0;
                    }
                    if(pw_check_input.value<8 || pw_check_input.value!=pw_input.value){
                        alert('비밀번호 확인이 필요합니다.');
                        return 0;
                    }
                    
                    if(!tel_.test(document.querySelector('.tel_input').value)){
                        alert('전화번호를 잘못 입력하셨습니다.');
                        return 0;
                    }
                    if(document.querySelector('.name_input').value ==''){
                        alert('이름을 입력하세요.');
                        return 0;
                    }

                    for(let x=0; x<id_pw_list.length; x++){
                        if(id_pw_list[x].tel==document.querySelector('.tel_input').value){
                            alert('이미 가입된 전화번호입니다.');
                            return 0;
                        }
                    }

                    alert('회원가입이 완료되었습니다.');
                    location.href='../login/login.html';
                })
            }
        })
    })
}