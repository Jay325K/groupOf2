window.onload=()=>{
    let id_input_box = document.getElementById('id_input_box');
    let pw_input_box = document.getElementById('pw_input_box');

    id_input_box.children[0].value='';
    pw_input_box.children[0].value='';

    /* 아이디 입력란이 비어있거나 비어있지 않을시 */
    id_input_box.onchange=()=>{
        if(id_input_box.children[0].value.length!=0){
            id_input_box.children[1].classList.add('active');
        }else{
            id_input_box.children[1].classList.remove('active');
        }
    }

    /* 비밀번호 입력란이 비어있거나 비어있지 않을시 */
    pw_input_box.onchange=()=>{
        if(pw_input_box.children[0].value.length!=0){
            pw_input_box.children[1].classList.add('active');
        }else{
            pw_input_box.children[1].classList.remove('active');
        }
    }

    let login_btn = document.getElementById('login_btn');
    login_btn.addEventListener('click',function(){
        if(id_input_box.children[0].value==''){
            alert('아이디를 입력해주세요.');
            return 0;
        }

        if(pw_input_box.children[0].value==''){
            alert('비밀번호를 입력해주세요.');
            return 0;
        }

        $.ajax({
            type:'get', //http 타입
            url:'../id_pw_list.json', //호출url
            cache:'false', //캐시처리
            data:'', //호출시 보낼 파라미터 데이터
            dataType:'json', //http통신시 응답 데이터 타입
            success: function (id_pw_list){
                let id_pw_same_count=function(){
                    for(let x=0; x<id_pw_list.length; x++){
                        if((id_input_box.children[0].value == id_pw_list[x].id) && (pw_input_box.children[0].value == id_pw_list[x].password)){
                            return 1;
                        }
                    }
                    return 0;
                };

                if(id_pw_same_count()==1){
                    location.href='../../main/index.html';
                }else{
                    alert('아이디 혹은 비밀번호를 잘못 입력 하셨습니다.');
                }
            }
        }); 
    });
}
