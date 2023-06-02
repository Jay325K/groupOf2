$(document).ready(function(){
    
    $('.content').removeClass('membership');

    $('#storeDistrict select').on('change', function() {
        $('#store option:gt(0)').remove();
    });

            $('#sidoCd').on('change', function() {
        if (!$(this).val()) {
            $('#region option:gt(0)').remove();
            return;
        }

        var html = shopAjax('00', $(this).val(), '구/군');

        $('#region option:gt(0)').remove();
        $('#region').html(html);

    });

            $('#region').on('change', function() {
        if (!$(this).val()) return;

        var ajaxOpt = {
            url : "/customer/domesticStoreAjax.do",
            data : {"sidoCd" : $('#sidoCd').val(), "regionCd" : $('#region').val() }
        };

        var data = getSyncJSON(ajaxOpt);
        if (jQuery.isEmptyObject(data)) return;

        if (!jQuery.isArray(data)) data = [data];

        var arrStr = [];
        $(data).each(function() {
            arrStr.push('<option value="' + this.storCd + '">' + this.storNm + '</option>');
        });

        $('#store').append(arrStr.join()).focus();

    }).change();

            $("[name^='file']").change( function() {
        var fileVal = $(this).val();

        if (fileVal != null && fileVal != "") { //이미지 업로드
            var fileExt = "";
            fileExt = fileVal.substring(fileVal.lastIndexOf('.')+1, fileVal.length);
            fileExt = fileExt.toLowerCase();
            if (fileExt != "jpg" && fileExt != "jpeg" && fileExt != "png"
                    && fileExt != "gif" ) {
                alert("업로드 가능 확장자 (jpg, jpeg, png, gif) 입니다.");
                $(this).val("");
                return;
            }
        }
    });

    $('#vocHighcate').on('change', function() {
        if (!$(this).val()) return;

        var ajaxOpt = {
            url : '/customer/categoryListAjax.do',
            data : { 'code' : $(this).val() }
        };

        var data = getSyncJSON(ajaxOpt);
        if (jQuery.isEmptyObject(data)) return;

        if (!jQuery.isArray(data)) data = [data];

        var arrStr = [];
        $(data).each(function() {
            arrStr.push('<option value="' + this.codeCd + '">' + this.codeNm + '</option>');
        });

        
    });

            $('#store').on('change', function() {
        $('#storCd').val($(this).val());
    });

            $(".number-only").keyup(function(e) {
        if (!(event.keyCode >= 37 && event.keyCode <= 40)) {
            var inputVal = $(this).val();
            $(this).val(inputVal.replace(/[^0-9]/gi, ''));

        }
    });
});

    function onProc(){

    var jqElem = $(':radio[name=agree_yn]:checked');

    if(jqElem.val() != 1){
        alert("개인정보처리방침에 동의해 주셔야합니다.");
        $('#agree_y').focus();
        return false;
    }

    jqElem = $('#vocHighcate');
    if(!jqElem.val()){
        alert("분류를 선택해 주십시오.");
        jqElem.focus();
        return false;
    }

    

    jqElem = $('#vocTitle');
    if(!jqElem.val()){
        alert("제목을 기입해 주십시오.");
        jqElem.focus();
        return false;
    }

    jqElem = $('#custNm');
    if(!jqElem.val()){
        alert("성명을 기입해 주십시오.");
        jqElem.focus();
        return false;
    }

    jqElem = $('#email');
    if(!jqElem.val() || !jqElem.val().isEmail()) {
        alert("이메일을 기입해 주십시오.(예 : hollys@hollys.co.kr)");
        jqElem.focus();
        return false;
    }

    jqElem = $('#mobile2');
    if(!jqElem.val() || isNaN(jqElem.val())){
        alert("휴대폰 번호를 기입해 주십시오.");
        jqElem.val("").focus();
        return false;
    }

    jqElem = $('#mobile3');
    if(!jqElem.val() || isNaN(jqElem.val())){
        alert("나머지 휴대폰 번호를 기입해 주십시오.");
        jqElem.val("").focus();
        return false;
    }

    if(!($('#mobile1').val() + $('#mobile2').val() + $('#mobile3').val()).isMobile()){
        alert("올바른 휴대폰 번호를 기입해 주십시오.");
        $('#mobile2').focus();
        return false;
    }

    $('#mobile').val($('#mobile1').val() + $('#mobile2').val() + $('#mobile3').val());

    jqElem = $('#areaDiv');
    jqElem = $('#sidoCd');
    if(!jqElem.val()){
        alert("시/도를 선택해 주십시오.");
        jqElem.focus();
        return false;
    }
    if (jqElem.val() != '본사') {
        jqElem = $('#region');
        if(!jqElem.val()){
            alert("구/군을 선택해 주십시오.");
            jqElem.focus();
            return false;
        }
    }

    jqElem = $('#store');
    if(!jqElem.val() && $('#sidoCd').val() != '본사'){
        alert("이용매장을 입력해 주십시오.");
        jqElem.focus();
        return false;
    }

    jqElem = $('#visitDt1');
    if(!jqElem.val()){
        alert("방문일자를 입력해 주십시오.");
        jqElem.focus();
        return false;
    }

    jqElem = $('#visitDt2');
    if(!jqElem.val()){
        alert("방문일자를 입력해 주십시오.");
        jqElem.focus();
        return false;
    }

    jqElem = $('#visitDt3');
    if(!jqElem.val()){
        alert("방문일자를 입력해 주십시오.");
        jqElem.focus();
        return false;
    }

    $('#visitDt').val($('#visitDt1').val()+$('#visitDt2').val()+$('#visitDt3').val());

    jqElem = $('#strContent');
    if(!jqElem.val()){
        alert("내용을 입력해 주십시오.");
        jqElem.focus();
        return false;
    }

    $("#frm").submit();
}

function shopAjax(nationCd, sidoCd, txt) {
    var ajaxOpt = {
        url : '/customer/inquiry/shopDivListAjax.do',
        data : { 'nationCd' : nationCd, 'sidoCd' : sidoCd }
    };

    var data = getSyncJSON(ajaxOpt);
    if (jQuery.isEmptyObject(data)) return;

    if (!jQuery.isArray(data)) data = [data];

    var html = '<option value="">--'+ txt +'--</option>';
    $(data).each(function() {
        if(this.codeCd != 'KOR') {
            html +='<option value="' + this.codeCd + '">' + this.codeNm + '</option>';
        }
    });

    return html;
}