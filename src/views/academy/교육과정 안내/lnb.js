  $(function(){

    $('.guide_wrap>ul>li>a:eq(1)').css('color','rgb(197,47,48)');

    $('.guide_wrap>ul>li>a').on('click focus',function(){
      $('.guide_wrap>ul>li>a').css('color','#2e2e2e');
      $('.guide_wrap>ul>li>ul').removeClass('active');
      $(this).next().toggleClass('active');
      if($(this).next().hasClass('active')==true){
        $(this).css('color','rgb(197,47,48)');
      }
    })
  })