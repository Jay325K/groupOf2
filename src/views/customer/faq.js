$(function () {
    var ObjectShow = function (mode) {
        var target,
            set,
            speed,
            mode;

            this.showToggle = function () {
                switch (mode) {
                    case "slide":
                        if (set == true) target.stop().slideDown({ duration: speed });
                        else target.stop().slideUp({ duration: speed });
                        break;
    
                    case "fade":
                        if (set == true) target.stop().fadeIn({ duration: speed });
                        else target.stop().fadeOut({ duration: speed });
                        break;
    
                    case "alpha":
                        if (set == true) target.stop().animate({ 'opacity': 1 }, speed);
                        else target.stop().animate({ 'opacity': 0 }, speed);
    
                    default:
                        if (set == true) target.stop().show({ duration: speed });
                        else target.stop().hide({ duration: speed });
                }
            }

        this.initialize = function (info) {
            target = info.target;
            set = info.isShow;
            speed = info.speed;
        }
    }


    var questionList;
    var answerList;
    var objectShow;

    (function ($) {
        $(function () {
            init();
        });
    })(jQuery);

    // ---------------------------------------- //
    //					init
    // ---------------------------------------- //
    function init() {
        objectShowInit();
        questionListInit();
        answerListInit();
        mouseInit();
    }

    function objectShowInit() {
        objectShow = new ObjectShow('fade');
        ObjectShow.prototype.isVisible = false;
    }

    function questionListInit() {
        questionList = $('dt');
        questionList.css('cursor', 'pointer');
    }

    function answerListInit() {
        answerList = $('dd');

        jQuery.each(answerList, function (i, e) {
            answerSetVisible($(answerList[i]), false, 0);
        });
    }

    function mouseInit() {
        questionList.on('click', function () {
            var id = $(this).index() / 2;
            var isHidden = $(answerList.get(id)).is(':hidden');
            var answer = $(answerList.get(id));

            answerSetVisible(answer, isHidden, (isHidden ? 0 : 0));
        });
    }

    // ---------------------------------------- //
    //					control
    // ---------------------------------------- //
    function answerSetVisible(target, isHidden, speed) {
        objectShow.initialize({ target: target, isShow: isHidden, speed: speed });
        objectShow.showToggle();
    }
});