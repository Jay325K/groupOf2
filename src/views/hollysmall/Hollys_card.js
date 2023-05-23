let btn__ =document.querySelectorAll('.hollys_card_design_wrap .card_box a');
let num=0;
let count=0;
/* 다음, 이전 버튼 눌렀을때 다른카드 보여주기 */
for(let x=0; x<btn__.length; x++){
    btn__[x].onclick=function(){
        if(this.classList.contains('prev') && count>0){
            document.querySelector('.hollys_card_design_wrap .card_box ul').style.transform='translateX('+(num += 250)+'px)';
            count--;            
        }else if(this.classList.contains('prev') && count==0){
            count=9;
            num=-250*9;
            document.querySelector('.hollys_card_design_wrap .card_box ul').style.transform='translateX('+(num)+'px)';
        }
        if(this.classList.contains('next') && count<9){
            document.querySelector('.hollys_card_design_wrap .card_box ul').style.transform='translateX('+(num -= 250)+'px)';
            count++;
        }else if(this.classList.contains('next') && count==9){
            count=0;
            num=0;
            document.querySelector('.hollys_card_design_wrap .card_box ul').style.transform='translateX('+(num)+'px)';
        }
    }
}

/* 5초마다 다른 카드 보여주기 */
    let another_card= setInterval(function(){
        if(count==9){
            num=0;
            document.querySelector('.hollys_card_design_wrap .card_box ul').style.transform='translateX('+num+'px)';
            count=0;
        }else{
            document.querySelector('.hollys_card_design_wrap .card_box ul').style.transform='translateX('+(num -= 250)+'px)';
            count++;
        }
    },5000);

    document.querySelector('.buy_btn').onclick=function(){
        clearInterval(another_card);
    }