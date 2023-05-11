$(function(){
    let nowday__date= new Date();
    //현재 연도,월,일,요일 설정
    let nowyear = nowday__date.getFullYear();
    let change_year = nowyear;
    let nowmonth = nowday__date.getMonth()+1;
    let change_month = nowmonth;
    let nowdate = nowday__date.getDate();
    
    /* setting_date에 nowdate를 전달하는 이유는 date_for함수에 현재 날짜에 배경색을 바꾸기 위함 */
    setting_date(nowdate, change_month, change_year);
    
    /* 년도나 월 바꾸는 버튼 클릭시 */
    $('.year_month div a').on('click',function(){
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

        
    }); 

    function setting_date(nowdate, change_month, change_year){
        //매연, 매월 1일의 연도, 월, 일, 요일 설정
        

        let oneday__date = new Date(change_year+'-'+change_month+'-01');
        let oneyear = oneday__date.getFullYear();
        let onemonth = oneday__date.getMonth()+1;
        let oneday = oneday__date.getDay();
        

        let month_last_date = date_length(change_year,change_month);

        myTR_numb(oneday, month_last_date);
        now_date_reading(oneyear,onemonth,nowdate,change_month,change_year);
            /* date_for함수에 nowyear,nowmonth를 전달하는 이유는 현재 날짜에 배경색을 바꾸기 위함 */
        date_for(oneday, month_last_date);


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
                append_table+='<td><span></span></td>';
            }
        }
        $('.date__days .date table').html(append_table);

    }
    
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


    /* 월 1일이 어떤 요일인지 알아내서 31일까지 달력에 출력하기 */
    function date_for(oneday, month_last_date){
        let start_date=0;
        for(let x=oneday; x<month_last_date+oneday; x++){
            start_date++;
            $('.date table tr td span').eq(x).text(start_date);
        }
    }

    /* 오늘 날짜 백그라운드 변경 */
    function now_date_reading(oneyear,onemonth,nowdate,onemonth,oneyear){
        if(nowyear === oneyear && nowmonth === onemonth){
            
            
            $('.date table tr td').eq(nowdate).css('background','rgba(199,47,48,0.3)');
            
        }else{
            $('td').hover(function(){$(this).css('background','rgb(248,248,248)')},function(){$(this).css('background','0')})
            $('.date table tr td').css('background','#fff');
        }

    }
});