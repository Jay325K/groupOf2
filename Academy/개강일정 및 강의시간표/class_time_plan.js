$(function(){
    $('.plan li a').on('click focus',function(){
        $('.plan li a').next().removeClass('active');
        $(this).next().addClass('active');
    });
});