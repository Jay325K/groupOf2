$(function(){
    function goto_next(current_field, next_field, max_length){
        if(current_field.value.length >= max_length)
            next_field.focus();
    }

    function onProc() {
        if(!$("#ck").is(":checked")){
            alert("약관에 동의 하세요");
            return;
        }
        if($("#pCode1").val().length < 1 ){
            alert("응모번호를 입력하세요");
            $("#pCode1").focus();
            return;
        }
        if($("#pCode2").val().length < 1 ){
            alert("응모번호를 입력하세요");
            $("#pCode2").focus();
            return;
        }
        if($("#pCode3").val().length < 1 ){
            alert("응모번호를 입력하세요");
            $("#pCode3").focus();
            return;
        }
        if($("#pCode4").val().length < 1 ){
            alert("응모번호를 입력하세요");
            $("#pCode4").focus();
            return;
        }

        frm.qrNo.value = $("#pCode1").val()+ $("#pCode2").val()+ $("#pCode3").val()+ $("#pCode4").val();
                frm.submit();
    }
})