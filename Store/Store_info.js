

let requestURL = 'Store_info.json';
let request = new XMLHttpRequest();
request.open('GET',requestURL);
request.responseType='json';
request.send();

request.onload = function() {
    let locate = request.response;
    console.log(locate[0].locate);
    var locate_city=[];
    for(let x=0; x<locate.length; x++){
        locate_city[x] = locate[x].locate;
    }
    $(function(){
        let local_text ='';
        console.log($('.local_city li').length);
        for(let x =0; x<$('.local_city li').length; x++){
            local_text=local_text+' '+$('.local_city li').eq(x).text();
        }
        local_text=local_text.split(' ');
        local_text.shift();
        
        $('.local_city li').on('click',function(){
            let city=$(this).text();    //내가 클릭했을때 지정할 도시
            let bor=[]; //도시중 '시/구'만 저장할 공간
            let bor_index=0;
            let bor_remove_dup=['뒤로가기'];
            let bor_remove_dup_index=1;
            /* click시 도시중 '구'만 뽑아내기 ex(서울 '송파구', 서울 '서초구', 서울 '마포구)*/
            locate_city.forEach(function(el){
                if(el.match(city)){
                    bor[bor_index]=el.slice(3);
                    bor_index++;
                }
            });

            //'~구'들중에 중복을 제거하고 '구'는 하나만 출력
            bor.forEach(function(el){
                let count=0;
                for(let x=0; x<=bor_remove_dup.length; x++){
                    if(el==bor_remove_dup[x]){
                        count++;
                    }
                }
                if(count==0){
                    bor_remove_dup[bor_remove_dup_index]=el;
                    bor_remove_dup_index++;
                }
            })
            console.log(bor_remove_dup);
            $('.local_city').css({'display':'none'});
            for(let x=0; x<bor_remove_dup.length; x++){
                let myLi = document.createElement('li');
                let myA = document.createElement('a');
                myA.setAttribute('href','#none');
                myA.textContent=bor_remove_dup[x];
                myLi.append(myA);
                document.querySelector('.local_city_bor').append(myLi);
            }

            /* 뒤로가기 버튼 누를시 다시 지역이 뜰 수 있도록 설정 */
            $('.local_city_bor li').on('click',function(){
                if($(this).index()===0){
                    $('.local_city').css({'display':'flex'});
                    $('.local_city_bor').text('');
                }else{
                    
                }
            });
        });

        
    });
}