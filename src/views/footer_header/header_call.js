$(function(){
    $.ajax({
        url: '/src/views/footer_header/header.html',
        dataType: 'html',
        success: function(html){
            $('#header').html(html);

            $.getScript({
                url: '/src/views/footer_header/header.js',
                success: function(){}
            })
        }
    });

    $.ajax({
        url: '/src/views/footer_header/footer.html',
        dataType: 'html',
        success: function(html){
            $('#footer').html(html);
        }
    });
})