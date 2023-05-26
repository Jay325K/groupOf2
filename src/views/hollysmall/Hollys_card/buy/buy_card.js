let card_list_wrap = document.querySelectorAll('.card_category_img_box li');

let main_contents_list = document.querySelectorAll('.show_ul_page>ul>li');
main_contents_list[1].style.visibility='hidden';
main_contents_list[2].style.visibility='hidden';

console.log(main_contents_list);

card_list_wrap.forEach(e=>{
    e.children[2].addEventListener('click',()=>{
        for(let x=0; x<card_list_wrap.length; x++){
            card_list_wrap[x].children[1].innerHTML='';
        }
        e.children[1].innerHTML='<i class="fa-solid fa-check"></i>';

        let check_img_src= e.children[0].getAttribute('src'); //카드 이미지 주소값
        let check_img_alt= e.children[0].getAttribute('alt'); //카드 이미지 alt값
        let check_img_name = e.children[2].innerText;         //카드 이름

        document.querySelector('.page_my_selected_card_img_wrap .my_select_card_show_img').setAttribute('src',check_img_src);
        document.querySelector('.result_wrap .card_message .my_select_card_wrap .my_selected_card_img img').setAttribute('src',check_img_src);

        document.querySelector('.page_my_selected_card_img_wrap .my_select_card_show_img').setAttribute('alt',check_img_alt);
        document.querySelector('.result_wrap .card_message .my_select_card_wrap .my_selected_card_img img').setAttribute('alt',check_img_alt);

        document.querySelector('.result_wrap .my_order>div>div>p .my_select_card_name').innerHTML=check_img_name;
        document.querySelector('.result_wrap .card_message .my_select_card_wrap .my_select_card_text p').innerHTML=check_img_name;

        
    });
    console.log(e);
    e.children[2].addEventListener('focus',()=>{
        for(let x=0; x<card_list_wrap.length; x++){
            card_list_wrap[x].children[0].style.border='0';
        }
        e.children[0].style.border='3px solid #000';
        e.children[0].style.borderRadius='10px';
    });


})


let gift_me = document.getElementById('gift_me'); /* check_box */
let total_number = document.getElementById('total_number');
let pay_info_table = document.querySelector('.gift_info_table_wrap .gift_info_table table tr:nth-child(2) td:nth-child(2) ul'); // 받는사람 탭 에 ul
let receiver_list = document.querySelector('.receiver_list table tbody');

//받을 인원의 수가 바뀔경우
document.getElementById('total_number').onchange=()=>{
    if(document.getElementById('total_number').hasAttribute('readonly')==false) {
        pay_info_table.innerHTML='';
        receiver_list.innerHTML='';
        if(total_number.value.match(/[1-5]/g)){
            for(let x=0; x<Number(total_number.value); x++){
                pay_info_table.innerHTML+='<li><div><label for="receiver">이름</label><input type="text" id="receiver" maxlength="6"></div><div><label for="tel_number">전화번호</label><input type="text" id="tel_number" value="010" readonly="readonly">-<label for="tel_middle_number" class="screen_out">전화번호 중간자리</label><input type="tel" id="tel_middle_number" minlength="4" maxlength="4">-<label for="tel_last_number" class="screen_out">전화번호 뒷자리</label><input type="tel" id="tel_last_number" minlength="4" maxlength="4"></div></li>';
                receiver_list.innerHTML+='<tr><td class="name_list"><p></p></td><td class="telnum_list"><p></p></td></tr>';
            }
        }else{
            alert('받을 인원은 1~5까지만 입력 가능합니다.');
            total_number.value='';
        }

        /* 바뀐 인원수에서 정보를 입력할 경우 결제 확인란에도 같이 적히는 구간 */
        for(let x=0; x<pay_info_table.children.length; x++){
            pay_info_table.children[x].onkeyup=()=>{
                console.log(pay_info_table.children[x].children[1].children);
                let name =pay_info_table.children[x].children[0].children[1].value;;
                let tel_first=pay_info_table.children[x].children[1].children[1].value;
                let tel_middle=pay_info_table.children[x].children[1].children[3].value;
                let tel_last=pay_info_table.children[x].children[1].children[5].value;
                

                receiver_list.children[x].children[0].children[0].innerHTML=name
                receiver_list.children[x].children[1].children[0].innerHTML=tel_first+'-'+tel_middle+'-'+tel_last;
            }
        }   
    }
}

/* 받을 인원에서 나에게 선물하기 체크할시 */
gift_me.onclick=()=>{
    if(gift_me.checked){
        pay_info_table.innerHTML='<li><div><label for="receiver">이름</label><input type="text" id="receiver" maxlength="6" value="박주현" readonly="readonly"></div><div><label for="tel_number">전화번호</label><input type="text" id="tel_number" value="010" readonly="readonly">-<label for="tel_middle_number" class="screen_out">전화번호 중간자리</label><input type="tel" id="tel_middle_number" minlength="4" maxlength="4" value="2388" readonly="readonly">-<label for="tel_last_number" class="screen_out">전화번호 뒷자리</label><input type="tel" id="tel_last_number" minlength="4" maxlength="4" value="0662" readonly="readonly"></div></li>';
        receiver_list.innerHTML='<tr><td class="name_list"><p>박주현</p></td><td class="telnum_list"><p>010-2388-0662</p></td></tr>';  

        total_number.setAttribute('readonly','readonly');
        total_number.value='1';
    }else{
        total_number.removeAttribute('readonly');
        document.getElementById('receiver').removeAttribute('readonly');
        document.getElementById('tel_middle_number').removeAttribute('readonly');
        document.getElementById('tel_last_number').removeAttribute('readonly');
    }
}



/* 금액선택 바뀔시 */
let money_select = document.getElementById('money_select');
money_select.onchange=()=>{
    document.querySelector('.card_amount').innerHTML=money_select.value;
}


/* 메세지 입력 바뀔시 */
let message = document.getElementById('message');
message.onkeyup=()=>{
    document.querySelector('.my_message_text').innerHTML=message.value;

    document.querySelector('#message + div').innerHTML=message.value.length+'/100';
}


let move_ul = document.querySelector('.show_ul_page>ul');
let distance =0;

const special_pattern = /[`0-9|~!@#$%^&*|\\\'\";:\/?]/gi;               //특수문자, 숫자, 공백 걸러내는 필터
const special_pattern2 = /[`a-zA-Z|ㄱ-힣|~!@#$%^&*|\\\'\";:\/?]/gi;     //영어, 한글, 특수문자, 공백 걸러내는 필터
/* 다음 버튼 클릭시 */
document.querySelectorAll('.next_step').forEach((e,idx)=>{
    e.addEventListener('click',()=>{
        // 첫번째 버튼 클릭시
        if(idx==0){
            let check_empty_length=0;

            // 카드가 체크 되었는지 확인
            for(let x=0; x<card_list_wrap.length; x++){
                if(card_list_wrap[x].children[1].childNodes.length!=0){
                    check_empty_length++;
                }
            }
            //카드가 선택 되어있지 않다면 선택하라는 메세지 띄움
            if(check_empty_length==0){
                alert('카드 디자인을 선택해주세요.');
            }else{
                main_contents_list[1].style.visibility='visible';
                distance-=1200;
                move_ul.style.transform='translateX('+distance+'px)';
            }
        }else{//두번째 버튼 클릭시
            for(let x=0; x<pay_info_table.children.length; x++){
                
                if(special_pattern.test(pay_info_table.children[x].children[0].children[1].value)==true){
                    alert('받는 사람 이름에는 숫자, 특수문자, 공백이 포함될 수 없습니다.');
                    return 0;
                }
                if(special_pattern2.test(pay_info_table.children[x].children[1].children[3].value) || special_pattern2.test(pay_info_table.children[x].children[1].children[5].value)){
                    alert('받는 사람 전화번호에는 문자, 공백이 들어갈 수 없습니다.');
                    
                    return 0;
                } 
                if(pay_info_table.children[x].children[0].children[1].value==''){
                    alert('받는 사람 이름을 입력해주세요.');

                    return 0;
                }
                if(pay_info_table.children[x].children[1].children[3].value=='' || pay_info_table.children[x].children[1].children[5].value==''){
                    alert('전화번호를 입력해주세요.');
                    return 0;
                } 
                pay_info_table.children[x].children[0].children[1].onchange=()=>{
                    if(pay_info_table.children[x].children[0].children[1].value==''){
                        main_contents_list[2].style.visibility='hidden';
                    }
                }
                pay_info_table.children[x].children[1].children[3].onchange=()=>{
                    if(pay_info_table.children[x].children[1].children[3].value==''){
                        main_contents_list[2].style.visibility='hidden';
                    }
                }
                pay_info_table.children[x].children[1].children[5].onchange=()=>{
                    if(pay_info_table.children[x].children[1].children[5].value==''){
                        main_contents_list[2].style.visibility='hidden';
                    }
                }
            }
            main_contents_list[2].style.visibility='visible';
            distance-=1200;
            move_ul.style.transform='translateX('+distance+'px)'
        }
    });
})


/* 첫번째 다음버튼 입력시 카드 border 없애기 */
let page_move_btn = document.querySelector('.page_move_btn_wrap .btn_locate_right .next_step');
page_move_btn.addEventListener('focus',function(){
    for(let x=0; x<card_list_wrap.length; x++){
        card_list_wrap[x].children[0].style.border='0';
    }
})

/* 이전 버튼 클릭시 */
document.querySelectorAll('.prev_step').forEach((e,idx)=>{
    e.onclick=()=>{
        if(idx==1){
            setTimeout(function(){main_contents_list[2].style.visibility='hidden';},400);
        }else{
            setTimeout(function(){main_contents_list[1].style.visibility='hidden';},400);
        }
        distance+=1200;
        move_ul.style.transform='translateX('+distance+'px)';
    }
})

/* 결제정보 확인창에서 카드선택 화면 누를시 */
document.querySelector('.prev_select_design').onclick=()=>{
    distance=0;
    setTimeout(function(){
        main_contents_list[1].style.visibility='hidden';
        main_contents_list[2].style.visibility='hidden';
    },400);
    move_ul.style.transform='translateX('+distance+'px)'
}