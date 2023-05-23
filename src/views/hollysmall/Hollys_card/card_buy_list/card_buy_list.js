

window.onload=()=>{
    let recipient_list = document.querySelectorAll('.hollys_card_buy_list table tbody tr');
    
    
    if(recipient_list.length>10){
        let all_page_btn= document.querySelector('.page_length');
        let all_page_length=(Math.ceil(recipient_list.length/10)); //페이지 버튼 갯수

        
        /* 페이지 넘버 버튼 생성 */
        all_page_btn.innerHTML='';
        for(let x=0; x<all_page_length; x++){
            all_page_btn.innerHTML+=`<a href='#none'>${x+1}</a>`;
        }

        /* 로드했을시 초기값 */
        recipient_list.forEach(e=>{
            e.classList.add('screen_out');
        })
        for(let page_num=0*10; page_num<(0*10)+10; page_num++){
            recipient_list[page_num].classList.remove('screen_out');
        }
        
        for(let x=0; x<all_page_btn.children.length; x++){
            
            /* 페이지 넘버 버튼 누를시 */
            all_page_btn.children[x].onclick=()=>{
                /*해당 페이지 이외의 정보들 숨기기 */
                recipient_list.forEach(e=>{
                    e.classList.add('screen_out');
                })

                if(x!=(all_page_btn.children.length-1)){ // 마지막 페이지가 아닐 경우
                    for(let page_num=x*10; page_num<(x*10)+10; page_num++){
                        recipient_list[page_num].classList.remove('screen_out');
                    }
                }else{ //마지막 페이지일 경우
                    for(let page_num=x*10; page_num<recipient_list.length; page_num++){
                        recipient_list[page_num].classList.remove('screen_out');
                    }
                }
            }
        }

    } 
}