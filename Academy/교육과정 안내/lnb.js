  $(function(){
    $('.guide_wrap>ul>li>a').on('click focus',function(){
      $('.guide_wrap>ul>li>ul').removeClass('active');
      $(this).next().toggleClass('active');
    })
  })