window.onload=()=>{
    let id_input_box = document.getElementById('id_input_box');
    let pw_input_box = document.getElementById('pw_input_box');

    console.log(id_input_box.children[1]);
    console.log(pw_input_box);

    /* 아이디 입력란이 비어있거나 비어있지 않을시 */
    id_input_box.onchange=()=>{
        if(id_input_box.children[0].value.length!=0){
            id_input_box.children[1].classList.add('active');
            id_input_box.nextSibling.style.display='block';
        }else{
            id_input_box.children[1].classList.remove('active');
            id_input_box.nextSibling.style.display='none';
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
}
