$(function(){
    planner_in_infomation();
    
    $.ajax({
        type:'get', //http 타입
        url:'calendar_plan.json', //호출url
        cache:'false', //캐시처리
        data:'', //호출시 보낼 파라미터 데이터
        dataType:'json', //http통신시 응답 데이터 타입
        success: function(calendar_plan){
            
            /* load 완료시 기본세팅 */
            let nowday__date= new Date();
            //현재 연도,월,일,요일 설정
            let nowyear = nowday__date.getFullYear();
            let change_year = nowyear;
            let nowmonth = nowday__date.getMonth()+1;
            let change_month = nowmonth;
            let nowdate = nowday__date.getDate();

            //현재 연, 월 테이블 출력
            $('.show_year').text(change_year+'년');
            $('.show_month').text(change_month+'월');

            /* setting_date에 nowdate를 전달하는 이유는 date_for함수에 현재 날짜에 배경색을 바꾸기 위함 */
            setting_date(nowdate, change_month, change_year);
            planner_in_text_click();
            $('.plan').text('');
            for(let x=0; x<calendar_plan.length; x++){
                table_appended(calendar_plan[x]);
            }
            planner_in_infomation();
            /**************************/
            

            /* 년도나 월 바꾸는 버튼 클릭시 */
            $('.year_month div a').on('click',function(){
                $('.plan').text('');
                $('.date table tr td span').text(''); 
                if($(this).hasClass('month_prev')){
                    change_month--;
                }
                else if($(this).hasClass('month_next')){
                    change_month++;
                }
                else if($(this).hasClass('year_prev')){
                    change_year--;
                }
                else{
                    change_year++;
                }
        
                if(change_month===0){
                    change_month=12;
                    change_year--;
                }else if(change_month===13){
                    change_month=1;
                    change_year++;
                }
                
                $('.show_year').text(change_year+'년');
                $('.show_month').text(change_month+'월');
        
                setting_date(nowdate, change_month, change_year)
        
                planner_in_text_click();

                if($('.plan').text()==''){
                    $('<div style="padding:30px 0; font-size:0.9em; text-align:center; color:gray;">일정이 없습니다.</div>').appendTo('.plan');
                }
            }); 
            

            function planner_in_text_click(){
                /* 날짜에 있는 글씨 클릭시 */
                $('.date__days .date a').on('click',function(){
                    let academy_info_arr=[]; 
                    // 날짜에 있는 글씨에서 '-'제거
                    if($(this).parent().hasClass('class_location')){
                        academy_info_arr[0]=$(this).text().split('- ').join('');
                        academy_info_arr[1]=$(this).parent().next().children().text().split('- ').join('');
                    }
                    else{
                        academy_info_arr[0]=$(this).parent().prev().children().text().split('- ').join('');
                        academy_info_arr[1]=$(this).text().split('- ').join('');
                    }

                    for(let x=0; x<calendar_plan.length; x++){
                        if(academy_info_arr[0]==calendar_plan[x].more.class_space && academy_info_arr[1]==calendar_plan[x].more.class_content){
                            $('.plan').text('');

                            table_appended(calendar_plan[x]); //append함수 호출
                            $('.plan li>div').addClass('active'); //날짜에 있는 텍스트 클릭시에 해당 정보만 볼 수 있도록 active class 추가
                        }

                        planner_in_infomation();/* 클릭했을때 아코디언 효과를 추가 */
                    }
                });
            }

            /* 날짜 설정 */
            function setting_date(nowdate, change_month, change_year){
                //매연, 매월 1일의 연도, 월, 일, 요일 설정
                
        
                let oneday__date = new Date(change_year+'-'+change_month+'-01');
                let oneyear = oneday__date.getFullYear();
                let onemonth = oneday__date.getMonth()+1;
                let oneday = oneday__date.getDay();
                console.log('od =',oneday)
                let month_last_date = date_length(change_year,change_month);
        
                myTR_numb(oneday, month_last_date);
                now_date_reading(oneyear,onemonth,(nowdate + oneday -1),change_month,change_year);
                    /* date_for함수에 nowyear,nowmonth를 전달하는 이유는 현재 날짜에 배경색을 바꾸기 위함 */
                date_for(oneday, month_last_date,change_year,change_month);
            }

/*********** setting_date 함수에서 부르는 함수들 *************/
            /* 월마다 최대 몇일까지 있는지 구분 */
            function date_length(year,month){
                let date_31=31;
                let date_30=30;
                let date_29=29;
                let date_28=28;
                if(year%4===0 && month===2){
                    return date_29;
                }else if(month===2){
                    return date_28;
                }else if(String(month).match(/[1|3|5|7|8|10|12]/g)){
                    return date_31;
                }else{
                    return date_30;
                }
            }


            /* 달마다 바뀌는 날짜마다 해당 주만큼 tr과 날짜만큼의 td생성
                ex) 2015년은 4주동안있음 즉 tr이 4개 필요
                ex) 2023년은 6주동안있음 즉 tr이 6개 필요
            */
            function myTR_numb(oneday, month_last_date){
                $('.date__days .date table').text('');
                let result = Math.ceil((month_last_date + oneday)/7);
                let append_table='';
                for(let x=0; x<result; x++){
                        append_table+='<tr>';
                    for(let y=0; y<7; y++){
                        append_table+='<td style="overflow:hidden"><span></span><div style="padding-left:10px; padding-top:25px;">  <div class="class_location" style="font-size:0.7em; width:80px;"><a href="#none"></a></div>  <div class="class_name" style="font-size:0.7em; width:80px; font-weight: 100;"><a href="#none"></a></div>  </div></td>';
                    }
                }
                $('.date__days .date table').html(append_table);
                
            }

            /* 오늘 날짜 백그라운드 변경 */
            function now_date_reading(oneyear,onemonth,nowdate,onemonth,oneyear){
                console.log(nowyear);
                console.log(nowmonth);
                console.log(nowdate)
                if(nowyear === oneyear && nowmonth === onemonth){
                    
                    
                    $('.date table tr td').eq(nowdate).css('background','rgba(199,47,48,0.3)');
                    
                }else{
                    $('td').hover(function(){$(this).css('background','rgb(248,248,248)')},function(){$(this).css('background','0')})
                    $('.date table tr td').css('background','#fff');
                }
        
            }

            /* 월 1일이 어떤 요일인지 알아내서 31일까지 달력에 날짜및 일정 출력하기 */
            function date_for(oneday, month_last_date,change_year,change_month){
                let start_date=0; //1일부터 마지막일수
                let now_calendar_date  =[];
                for(let x=0; x<calendar_plan.legnth; x++){
                    if(calendar_plan[x].split('.')[0]==change_year && calendar_plan[x].split('.')[1]==change_month){
                        now_calendar_date[0] =calendar_plan[x].split('.')[0];
                        now_calendar_date[1] =calendar_plan[x].split('.')[1];
                        break;
                    }
                }
                
                for(let x=oneday; x<month_last_date+oneday; x++){
                    start_date++;

                    $('.date table tr td span').eq(x).text(start_date);

                    calendar_plan.forEach((e)=>{
                        
                        if(e.open.split('.')[0]==change_year && e.open.split('.')[1]==change_month && e.open.split('.')[2]==start_date){
                            $('.class_location a').eq(x).text('- '+e.more.class_space);
                            $('.class_name a').eq(x).text('- '+e.more.class_content);
                            
                            table_appended(e);
                            planner_in_infomation();
                        }
                    })
                }
                
            }
/********************************************/
            function table_appended(calendar_plan_txt){

                let list_li=document.createElement('li');
            
                let list_a=document.createElement('a');
                let list_a_text = document.createTextNode(calendar_plan_txt.full_name);
                list_a.setAttribute('href','#none');
                list_a.appendChild(list_a_text);

            
            
                let list_div = document.createElement('div');
                list_div.setAttribute('class','plan_accordion');
                let list_table = document.createElement('table');
            
                let list_tr_one = document.createElement('tr');
                let list_tr_two = document.createElement('tr');
                let list_tr_three = document.createElement('tr');
                let list_tr_four = document.createElement('tr');
                let list_tr_five = document.createElement('tr');
            
                /* tr에 구분탭(th,td) */
                let list_th_one = document.createElement('th');
                let list_th_one_text = document.createTextNode('구분');
                list_th_one.appendChild(list_th_one_text);
                let list_td_one = document.createElement('td');
                let list_td_one_text = document.createTextNode(calendar_plan_txt.month);
                list_td_one.appendChild(list_td_one_text);
            
                /* tr에 교육기간탭(th,td) */
                let list_th_two = document.createElement('th');
                let list_th_two_text = document.createTextNode('교육기간');
                list_th_two.appendChild(list_th_two_text);
                let list_td_two = document.createElement('td');
                let list_td_two_text = document.createTextNode(calendar_plan_txt.edc_per);
                list_td_two.appendChild(list_td_two_text);
            
                /* tr에 개강일 탭(th,td) */
                let list_th_three = document.createElement('th');
                let list_th_three_text = document.createTextNode('개강일');
                list_th_three.appendChild(list_th_three_text);
                let list_td_three = document.createElement('td');
                let list_td_three_text = document.createTextNode(calendar_plan_txt.open);
                list_td_three.appendChild(list_td_three_text);
            
                /* tr에 진행구분탭(th,td) */
                let list_th_four = document.createElement('th');
                let list_th_four_text = document.createTextNode('진행 구분');
                list_th_four.appendChild(list_th_four_text);
                let list_td_four = document.createElement('td');
                let list_td_four_text = document.createTextNode(calendar_plan_txt.present_sit);
                list_td_four.appendChild(list_td_four_text);
            
                /* tr에 비고탭(th,td) */
                let list_th_five = document.createElement('th');
                let list_th_five_text = document.createTextNode('비고');
                list_th_five.appendChild(list_th_five_text);
                let list_td_five = document.createElement('td');
            
                /* 비고탭쪽 td안에 div */
                let list_td_five_div_teacher = document.createElement('div');
                let list_td_five_div_teacher_text = document.createTextNode('강사: ');
                list_td_five_div_teacher.appendChild(list_td_five_div_teacher_text);
                let list_td_five_div_class_content = document.createElement('div');
                let list_td_five_div_class_content_text = document.createTextNode('강의 내용: ');
                list_td_five_div_class_content.appendChild(list_td_five_div_class_content_text);
                let list_td_five_div_class_space = document.createElement('div');
                let list_td_five_div_class_space_text = document.createTextNode('강의실: ');
                list_td_five_div_class_space.appendChild(list_td_five_div_class_space_text);
                let list_td_five_div_days = document.createElement('div');
                let list_td_five_div_days_text = document.createTextNode('날짜: ');
                list_td_five_div_days.appendChild(list_td_five_div_days_text);
            
                /* div 안에 span */
                let list_td_five_span_teacher =document.createElement('span');
                let list_td_five_span_teacher_text = document.createTextNode(calendar_plan_txt.more.teacher);
                list_td_five_span_teacher.setAttribute('class','teacher');
                list_td_five_span_teacher.appendChild(list_td_five_span_teacher_text);
            
                let list_td_five_span_class_content =document.createElement('span');
                let list_td_five_span_class_content_text = document.createTextNode(calendar_plan_txt.more.class_content);
                list_td_five_span_class_content.setAttribute('class','content');
                list_td_five_span_class_content.appendChild(list_td_five_span_class_content_text);
            
                let list_td_five_span_class_space =document.createElement('span');
                let list_td_five_span_class_space_text = document.createTextNode(calendar_plan_txt.more.class_space);
                list_td_five_span_class_space.setAttribute('class','class_locate');
                list_td_five_span_class_space.appendChild(list_td_five_span_class_space_text);

                let list_td_five_span_days =document.createElement('span');
                let list_td_five_span_days_text = document.createTextNode(calendar_plan_txt.more.days);
                list_td_five_span_days.setAttribute('class','days');
                list_td_five_span_days.appendChild(list_td_five_span_days_text);
            
                /*  
                <div><span></span></div>
                로 만들어주는 작업 
                */
                list_td_five_div_teacher.appendChild(list_td_five_span_teacher);
                list_td_five_div_class_content.appendChild(list_td_five_span_class_content);
                list_td_five_div_class_space.appendChild(list_td_five_span_class_space);
                list_td_five_div_days.appendChild(list_td_five_span_days);
            
                /*  
                <tr>
                    <th></th>
                    <td><div><span></span></div></td>
                </tr>
                로 만들어주는 작업 
                */
                list_td_five.appendChild(list_td_five_div_teacher);
                list_td_five.appendChild(list_td_five_div_class_content);
                list_td_five.appendChild(list_td_five_div_class_space);
                list_td_five.appendChild(list_td_five_div_days);

                /*  
                <tr>
                    <th></th>
                    <td><div><span></span></div></td>
                </tr>
                로 만들어주는 작업 
                */
                //th
                list_tr_one.appendChild(list_th_one);
                list_tr_two.appendChild(list_th_two);
                list_tr_three.appendChild(list_th_three);
                list_tr_four.appendChild(list_th_four);
                list_tr_five.appendChild(list_th_five);
                //td
                list_tr_one.appendChild(list_td_one);
                list_tr_two.appendChild(list_td_two);
                list_tr_three.appendChild(list_td_three);
                list_tr_four.appendChild(list_td_four);
                list_tr_five.appendChild(list_td_five);
                /*  
                <table>
                    <tr>
                        <th></th>
                        <td><div><span></span></div></td>
                    </tr>
                </table>
                로 만들어주는 작업 
                */
                list_table.appendChild(list_tr_one)
                list_table.appendChild(list_tr_two)
                list_table.appendChild(list_tr_three)
                list_table.appendChild(list_tr_four)
                list_table.appendChild(list_tr_five)

            
                /*  
                <div class="plan_accordion">
                    <table>
                        <tr>
                            <th></th>
                            <td><div><span></span></div></td>
                        </tr>
                    </table>
                </div>
                로 만들어주는 작업 
                */
                list_div.appendChild(list_table);
            
            
                /*
                <li>
                    <a href="#none"></a>
                    <div class="plan_accordion">
                        <table>
                            <tr>
                                <th></th>
                                <td><div><span></span></div></td>
                            </tr>
                        </table>
                    </div>
                </li>
                로 만들어주는 작업 
                */
                list_li.appendChild(list_a);
                list_li.appendChild(list_div);
            
                /*
                <ul class="plan">
                    <li>
                        <a href="#none"></a>
                        <div class="plan_accordion">
                            <table>
                                <tr>
                                    <th></th>
                                    <td><div><span></span></div></td>
                                </tr>
                            </table>
                        </div>
                    </li>
                </ul>
                로 만들어주는 작업 
                */
                document.querySelector('.plan').appendChild(list_li);
            }
        }/* Jquery ajax success */
    })

    /* 달력에 텍스트 클릭시 해당 플랜 화면 출력 */
    function planner_in_infomation(){
        $('.plan li>a').on('click focus',function(){
            $('.plan li>a').next().removeClass('active');
            $(this).next().addClass('active');
        });
    }
});