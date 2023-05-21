// 이메일이 잘못되었는지 확인하는 함수 
function CheckEmail(str){
    const reg_email = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
    if(!reg_email.test(str)) {                            
         return false;
    }              
    else {
         return true;
    }
}                                

//신청하기 버튼을 클릭했을 때 실행되는 함수                                 
function GoToEnroll(){
    const obEmail = document.getElementById("email");
    const group_num = document.getElementById('group_num');
    const middle_number = document.getElementById('middle_number');
    const end_number = document.getElementById('end_number');
    const name = document.getElementById('name');
    const course_name = document.getElementById('course_name');

    if(name.value.length==0){
        alert('이름을 입력해주세요');
        name.focus();
        return 0;
    }
    if(course_name.value=='선택'){
        alert('듣고싶은 강좌를 선택해주세요.');
        course_name.focus();
        return 0;
    }
    if(group_num.value=='선택'){
        alert('신청할 인원수를 선택해주세요');
        return 0;
    }
    if(middle_number.value.length<4){
       alert('핸드폰 번호를 다시 입력해주세요');
       middle_number.focus();
       return 0;
    }
    
    if(end_number.value.length<4){
        alert('핸드폰 번호를 다시 입력해주세요');
        end_number.focus();
        return 0;
    }

    if (!obEmail.value) {
       alert("이메일을 입력하세요!");
       obEmail.focus();
       return 0;
    }
    else{          
       if(!CheckEmail(obEmail.value)){
           alert("이메일 형식이 잘못되었습니다");
           obEmail.focus();
           return 0;
       }
    }
    window.location.href = '../curiculum_guide.html';
    alert('신청이 완료되었습니다.');
    
}


let form_change = document.getElementById('course_register_form');
function form_onchange(){
    let complete_marcha = 10;
    const conplete_underline = document.querySelector('.complete_underline');
    const obEmail = document.getElementById("email");
    const group_num = document.getElementById('group_num');
    const middle_number = document.getElementById('middle_number');
    const end_number = document.getElementById('end_number');
    const name = document.getElementById('name');
    const course_name = document.getElementById('course_name');
    
    if(name.value.length>1){
        complete_marcha+=7;
    }
    if(course_name.value!='선택'){
        complete_marcha+=8;
    }
    if(middle_number.value.length==4 && end_number.value.length==4){
        complete_marcha+=7;
    }
    if(obEmail.value && CheckEmail(obEmail.value)) {
        complete_marcha+=8;
    }
    if(group_num.value!='선택'){
        complete_marcha+=7;
    }

    conplete_underline.style.width=complete_marcha+'%';
}