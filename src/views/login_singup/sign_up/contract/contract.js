
window.onload=()=>{

    let go_sign_up_page= document.querySelector('.go_sign_up_page');
    let list = document.querySelectorAll('.general_conditions_agree ul li');


    list.forEach((e,idx)=>{

        if(idx!=0){
            /* 약관 동의 클릭시 팝업창 띄우기 */
            e.children[1].addEventListener('click',function(){
                let g_name = e.children[0].children[1].innerText.slice(0,e.children[0].children[1].innerText.length-5);

                e.children[2].classList.remove('screen_out');
                e.children[2].classList.add('active');

                e.children[2].children[0].children[0].innerHTML=g_name;

                /* X 클릭시 약관동의 닫기 */
                e.children[2].children[0].children[2].onclick=()=>{
                    e.children[2].classList.add('screen_out');
                    e.children[2].classList.remove('active');
                }
            })
            
            /* 체크박스 가 전부 체크될시 전체동의 체크박스에도 체크 */
            document.querySelector('.general_conditions_agree>form').onchange=()=>{
                let checked_count=0;
                console.log(list.length);
                for(let x=1; x<list.length; x++){
                    if(list[x].children[0].children[0].checked){
                        checked_count++;
                    }
                }
            
                if(checked_count==3){
                    list[0].children[0].children[0].checked=true;
                    go_sign_up_page.classList.add('active');
                    go_sign_up_page.setAttribute('href','../sign_up.html');
                    
                }else{
                    list[0].children[0].children[0].checked=false;
                    go_sign_up_page.classList.remove('active');
                    go_sign_up_page.setAttribute('href','#none');
                }
            }
        }else{
            // 전체 약관동의 체크시 모든 체크박스 체크
            //체크 후 해제시 모든 체크박스 체크 해제
            e.children[0].children[0].addEventListener('change',function(){

                if(e.children[0].children[0].checked){
                    list.forEach(el=>{
                        el.children[0].children[0].checked=true;
                        go_sign_up_page.classList.add('active');
                        go_sign_up_page.setAttribute('href','../sign_up.html');
                        
                    })
                }else{
                    list.forEach(el=>{
                        el.children[0].children[0].checked=false;
                        go_sign_up_page.classList.remove('active');
                        go_sign_up_page.setAttribute('href','#none');
                    })
                }
            })
        }
    })
}




function src_call(src_link){
    document.querySelector('.popup_contents').innerHTML='';
    $(function(){
        $.ajax({
            url: src_link,	// HTML 파일 가져올 경로
            dataType: "html",
            success: function (html){
                $(".popup_contents").html(html); // HTML 코드 붙여넣기
            }
        });
    })
}