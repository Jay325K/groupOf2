window.onload=()=>{
    const tel_=/^[0-9]{3}-[0-9]{4}-[0-9]{4}$/; //전화번호 정규식
    const email_ = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
    document.querySelector('.id_search_btn').addEventListener('click',function(){

        if(!tel_.test(document.querySelector('#tel_search_tel_input').value)){
            alert('전화번호 형식이 아닙니다.');
            return 0;
        }

        $.ajax({
            type:'get', //http 타입
            url:'../id_pw_list.json', //호출url
            cache:'false', //캐시처리
            data:'', //호출시 보낼 파라미터 데이터
            dataType:'json', //http통신시 응답 데이터 타입
            success: function(id_pw_list){
                for(let x=0; x<id_pw_list.length; x++){
                    if(id_pw_list[x].tel==document.querySelector('#tel_search_tel_input').value){
                        alert(`찾으시는 아이디는: ${id_pw_list[x].id} 입니다.`)
                        return 0;
                    }
                }
            }
        });
    })

    document.querySelector('.pw_search_btn').addEventListener('click',function(){
        

        if(!tel_.test(document.querySelector('#pw_search_tel_input').value)){
            alert('전화번호 형식이 아닙니다.');
            return 0;
        }

        if(!email_.test(document.querySelector('#email_input').value)){
            alert('이메일 형식이 아닙니다.');
            return 0;
        }

        $.ajax({
            type:'get', //http 타입
            url:'../id_pw_list.json', //호출url
            cache:'false', //캐시처리
            data:'', //호출시 보낼 파라미터 데이터
            dataType:'json', //http통신시 응답 데이터 타입
            success: function(id_pw_list){
                for(let x=0; x<id_pw_list.length; x++){
                    if(id_pw_list[x].tel==document.querySelector('#tel_search_tel_input').value && id_pw_list[x].id == document.querySelector('#email_input').value){
                        alert(`찾으시는 비밀번호는: ${id_pw_list[x].password} 입니다.`)
                        return 0;
                    }
                }
            }
        });
    })
}