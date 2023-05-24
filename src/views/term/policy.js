$(document).ready(function(){
    /*** info select option ***/
    $('#infoterms').change(function(){
        var val = $(this).val();
        //alert(val);

        if(val=='9'){
            $('.term_contents .text').find('.8').hide();
            $('.term_contents .text').find('.9').show();
        }else if(val=='8'){
            $('.term_contents .text').find('.8').show();
            $('.term_contents .text').find('.9').hide();
        }
    });

    /*** service term select option ***/
    $('#servterms').change(function(){
        var val = $(this).val();
        // alert(val);

        if(val == '3'){
            $('.term_contents .text').find('.2').hide();
            $('.term_contents .text').find('.3').show();
        }else if(val == '2'){
            $('.term_contents .text').find('.3').hide();
            $('.term_contents .text').find('.2').show();
        }
    })

    /*** membership term select option ***/
    $('#memterms').change(function(){
        var val = $(this).val();
        //alert(val);

        if(val == '7'){
            $('.term_contents .text').find('.7').show();
            $('.term_contents .text').find('.6').hide();
        }else if(val == '6'){
            $('.term_contents .text').find('.6').show();
            $('.term_contents .text').find('.7').hide();
        }
    })

    /*** card term select option ***/
    $('#cardterms').change(function(){
        var val = $(this).val();
        // alert(val);

        if(val == '5'){
            $('.term_contents .text').find('.4').hide();
            $('.term_contents .text').find('.5').show();
        }else if(val == '4'){
            $('.term_contents .text').find('.5').hide();
            $('.term_contents .text').find('.4').show();
        }
    })


})

