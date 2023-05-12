// 이메일이 잘못되었는지 확인하는 함수 
function CheckEmail(str){
     var reg_email = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
     if(!reg_email.test(str)) {                            
          return false;
     }              
     else {
          return true;
     }
}                                

//신청하기 버튼을 클릭했을 때 실행되는 함수                                 
function GoToEnroll(){
	var obEmail = document.getElementById("email");
    var middle_number = document.getElementById('middle_number');
    var end_number = document.getElementById('end_number');

    console.log(middle_number.value.length);
    if(middle_number.value.length<4 || end_number.value.length<4){
        alert('핸드폰 번호를 다시 입력해주세요');
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

    
}