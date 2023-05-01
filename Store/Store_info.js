

const requestURL = 'Store_info.json';
let request = new XMLHttpRequest();
request.open('GET',requestURL);
request.responseType='json';
request.send();

request.onload = function() {
    const locate = request.response;
    let locate_city=[];
    for(let x=0; x<locate.length; x++){
        locate_city[x] = locate[x].locate;
    }
    $(function(){

        /* 매장검색 & 지역검색*/
        /* 매장검색 */
        $('.search_Store_button_wrap a').on('click focus',function(){
            $('.search_Store_input_label').removeClass('screen_out');
            $('.locate_Store_input_label').addClass('screen_out');
            $('.locate_Store_input_label').css('display','none');
        });
        /* 지역검색 */
        $('.locate_Store_button_wrap a').on('click focus',function(){
            $('.locate_Store_input_label').removeClass('screen_out');
            $('.search_Store_input_label').addClass('screen_out');
            $('.locate_Store_input_label').css('display','block');
        });


        let local_text ='';
        for(let x =0; x<$('.local_city li').length; x++){
            local_text=local_text+' '+$('.local_city li').eq(x).text();
        }
        local_text=local_text.split(' ');
        local_text.shift();


        
        /* 검색버튼 누를시 검색하는곳 나옴 */
        $('.open_close').on('click',function(){
            $('.search_Store').toggleClass('active');

            if($('.search_Store').hasClass('active')==true){
                $('.open_close').text('닫기');
                $('.search_Store_wrap').css('display','flex');
                $('.search_Store').css({'background':'rgba(255,255,255,1)'});
            }else{
                $('.open_close').text('검색');
                $('.search_Store_wrap').css({'display':'none'});
                $('.search_Store').css({'background':'rgba(0,0,0,0)'});
            }
        });

        let Store_name_text='할리스 케이지할리스에프앤비 서울 중구';
        $('.local_city li').on('click',function(){
            var city=$(this).text();    //내가 클릭했을때 지정할 도시
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
            $('.local_city').css({'display':'none'});
            for(let x=0; x<bor_remove_dup.length; x++){
                let myLi = document.createElement('li');
                let myA = document.createElement('a');
                myA.setAttribute('href','#none');
                myA.textContent=bor_remove_dup[x];
                myLi.append(myA);
                document.querySelector('.local_city_bor').append(myLi);
            }
            
            $('.local_city_bor li').on('click',function(){
                /* 뒤로가기 버튼 누를시 다시 지역이 뜰 수 있도록 설정 */
                if($(this).index()===0){
                    $('.local_city').css({'display':'flex'});
                    $('.local_city_bor').text('');
                }else{
                    /* 지역 '~구' 클릭시 관련지역 매장들 테이블에 출력 */
                    $('.Store_detail_table tbody').text('');
                    var myTbody=$('.Store_detail_table tbody');
                    for(let x=0; x<locate.length; x++){
                        if(locate[x].locate.match(city +" "+ $(this).text())){
                            let myTR= document.createElement('tr');
                            let myTD_locate= document.createElement('td');

                            let myTD_Store_name = document.createElement('td');
                            let myA_myTdStore_name= document.createElement('a');
                            myA_myTdStore_name.setAttribute('href','#none');
                            myTD_Store_name.append(myA_myTdStore_name);

                            let myTD_addr = document.createElement('td');
                            let myA_myTdAddr = document.createElement('a');
                            myA_myTdAddr.setAttribute('href','#none');
                            myTD_addr.append(myA_myTdAddr);

                            let myTD_service = document.createElement('td');
                            let myTD_Tel = document.createElement('td');

                            myTD_locate.textContent=locate[x].locate;
                            myA_myTdStore_name.textContent=locate[x].Store;
                            myA_myTdAddr.textContent=locate[x].addr;
                            myTD_service.textContent=locate[x].Service;
                            myTD_Tel.textContent=locate[x].Tel;
                            
                            myTR.append(myTD_locate);
                            myTR.append(myTD_Store_name);
                            myTR.append(myTD_addr);
                            myTR.append(myTD_service);
                            myTR.append(myTD_Tel);
                            
                            myTbody.append(myTR);
                        }
                    }
                    /* 테이블 누를때 section_three 나타남 */
                    $('.Store_detail_table tbody tr td a').on('click',function(){
                        let Store_TR=$(this).parent().parent();
                        let Store_TR_copy=Store_TR;
                        if(Store_TR.text().match('케이지할리스에프앤비')){
                            Store_TR=Store_name_text;
                        }else{
                            Store_TR='할리스 '+Store_TR.children('td:eq(1)').text();
                        }
                        
                        // 키워드로 장소를 검색합니다
                        ps.keywordSearch(Store_TR, placesSearchCB)
                        $('.sec_three').addClass('active'); 
                        $('.sec_two').addClass('active');
                        $('.sec_one').addClass('active');
                        document.querySelector('.sec_three .Store_name').textContent=(Store_TR.slice(4));
                        document.querySelector('.sec_three .Store_introduce .addr').textContent=Store_TR_copy.children('td:eq(2)').text();
                        document.querySelector('.sec_three .Store_introduce .Tel').textContent=Store_TR_copy.children('td:eq(4)').text();
                    });
                }
            });
        });
        /* 테이블 누를때 section_three 나타내는 초기값 */
        $('.Store_detail_table tbody tr td a').on('click',function(){
            let Store_TR=$(this).parent().parent();
            Store_TR=Store_name_text;

            // 키워드로 장소를 검색합니다
            ps.keywordSearch(Store_TR, placesSearchCB)
            $('.sec_three').addClass('active'); 
            $('.sec_two').addClass('active');
            $('.sec_one').addClass('active');
        });

        /* ↓ 지도 API ↓ */
        // 마커를 클릭하면 장소명을 표출할 인포윈도우 입니다
        var infowindow = new kakao.maps.InfoWindow({zIndex:1});

        var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
            mapOption = {
                center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
                level: 3 // 지도의 확대 레벨
            };  
        
        // 지도를 생성합니다    
        var map = new kakao.maps.Map(mapContainer, mapOption); 

        // 장소 검색 객체를 생성합니다
        var ps = new kakao.maps.services.Places(); 
        
        
        // 키워드로 장소를 검색합니다
        ps.keywordSearch(Store_name_text, placesSearchCB); 
        
        // 키워드 검색 완료 시 호출되는 콜백함수 입니다
        function placesSearchCB (data, status, pagination) {
            if (status === kakao.maps.services.Status.OK) {
            
                // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
                // LatLngBounds 객체에 좌표를 추가합니다
                var bounds = new kakao.maps.LatLngBounds();
            
                for (var i=0; i<data.length; i++) {
                    displayMarker(data[i]);    
                    bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
                }       
            
                // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
                map.setBounds(bounds);
            } 
        }

        // 지도에 마커를 표시하는 함수입니다
        function displayMarker(place) {

            // 마커를 생성하고 지도에 표시합니다
            var marker = new kakao.maps.Marker({
                map: map,
                position: new kakao.maps.LatLng(place.y, place.x) 
            });
        
            // 마커에 클릭이벤트를 등록합니다
            kakao.maps.event.addListener(marker, 'click', function() {
                // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
                infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
                infowindow.open(map, marker);
            });
        }
        
    });


}