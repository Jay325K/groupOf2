let menu_index = document.querySelectorAll('.menu_ul li');
let subscript = document.getElementById('btn_subscript');

console.log(menu_index.length);
menu_index.forEach((e,idx)=>{
    e.childNodes[1].childNodes[0].addEventListener('click',function(){
        moveul(idx);
    })
    e.childNodes[1].childNodes[0].addEventListener('focus',function(){
        moveul(idx);
    })
})

subscript.addEventListener('click',function(){
    moveul(menu_index.length);
})

function moveul(idx){
    let move_ul = document.querySelector('.move_ul');

    move_ul.style.transform='translateX('+ (idx*-1200) +'px)';
}