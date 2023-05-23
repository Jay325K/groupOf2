$(function(){
  $.ajax({
    url: 'curiculum_menu_list/coffee_holic/coffee_holic.html',	// HTML 파일 가져올 경로
    dataType: "html",
    success: function (html){
        $("#coffee_holic_content_wrap").html(html); // HTML 코드 붙여넣기
    }
  });

  $.ajax({
    url: 'curiculum_menu_list/coffee_brewing/coffee_brewing.html',	// HTML 파일 가져올 경로
    dataType: "html",
    success: function (html){
        $("#coffee_brewing_content_wrap").html(html); // HTML 코드 붙여넣기
    }
  });

  $.ajax({
    url: 'curiculum_menu_list/coffee_mania/coffee_mania.html',	// HTML 파일 가져올 경로
    dataType: "html",
    success: function (html){
        $("#coffee_mania_content_wrap").html(html); // HTML 코드 붙여넣기
    }
  });

  $.ajax({
    url: 'curiculum_menu_list/espresso_advance/espresso_advance.html',	// HTML 파일 가져올 경로
    dataType: "html",
    success: function (html){
        $("#espresso_advance_menu_content_wrap").html(html); // HTML 코드 붙여넣기
    }
  });
  
  $.ajax({
    url: 'curiculum_menu_list/latte_art/latte_art.html',	// HTML 파일 가져올 경로
    dataType: "html",
    success: function (html){
        $("#Latte_art_content_wrap").html(html); // HTML 코드 붙여넣기
    }
  });

  $.ajax({
    url: 'curiculum_menu_list/brista_master/brista_master.html',	// HTML 파일 가져올 경로
    dataType: "html",
    success: function (html){
        $("#brista_master_content_wrap").html(html); // HTML 코드 붙여넣기

        $.getScript({
          url: 'curiculum_menu_list/brista_master/brista_master.js',		// script 가져올 경로
          success: function () {	 // 스크립트 가져온 후에 실행할 코드
              
          }
        });
    
      }
  });

  $.ajax({
    url: 'curiculum_menu_list/brista_string_2/brista_string_2.html',	// HTML 파일 가져올 경로
    dataType: "html",
    success: function (html){
        $("#brista_string_2_content_wrap").html(html); // HTML 코드 붙여넣기
    }
  });

  $.ajax({
    url: 'curiculum_menu_list/brista_string_1/brista_string_1.html',	// HTML 파일 가져올 경로
    dataType: "html",
    success: function (html){
      $("#brista_string_1_content_wrap").html(html); // HTML 코드 붙여넣기
        
      $.getScript({
        url: 'curiculum_menu_list/brista_string_1/brista_string_1.js',		// script 가져올 경로
        success: function () {	 // 스크립트 가져온 후에 실행할 코드
            
        }
      });
    
    }
  });
})