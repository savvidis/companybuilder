(function($){

  $(document).ready(function () {
    $('body').click(function () {
      if($('#si-curtain-nav .si-curtain-desktop').is(':visible') && $('#si-curtain-nav .si-curtain-button').hasClass('out')) {
        $('#si-curtain-nav .si-curtain-button').click();
      }
    });

    $('#si-curtain-nav .si-curtain-button').click(function (e) {
      e.stopPropagation();
      var $this = $(this);
      $this.toggleClass('out', '');
      $('#si-curtain-nav .si-curtain-desktop .si-curtain-content').slideToggle('fast');
    });

    $('#si-curtain-nav .si-curtain-desktop .si-curtain-content').click(function (e) {
      e.stopPropagation();
    });

    $('#si-curtain-nav .si-curtain-top .logo').click(function (e) {
      e.stopPropagation();
    });

    $('#si-curtain-nav .si-curtain-top').click(function () {
      var $this = $(this);
      $('#si-curtain-nav .si-curtain-toggle').slideToggle('fast', function () {
        mobileCurtain($this);
      });
    });

    var lastScrollTop = 0;
    $('.si-curtain-scroll-container').scroll(scrollEvent);
    $(window).scroll(scrollEvent);

    function scrollEvent(e) {
      e.stopPropagation();
      var top = $(this).scrollTop();
      scrollingButton($('#si-curtain-nav .si-curtain-button'), top, 40, function () {
        scrollingButton($('#si-curtain-nav .si-curtain-top'), top, 45, function () {
          lastScrollTop = top;
        });
      });
    }

    function scrollingButton($btn, top, max, callback) {
      if(!$btn.hasClass('out')) {
        if (top > lastScrollTop) {
          if(top > max) {
            $btn.slideUp('fast', function () {
              $btn.clearQueue();
            });
          }
        }
        else {
          $btn.slideDown('fast', function () {
            $btn.clearQueue();
          });
        }
      }
      callback();
    }

    function mobileCurtain($this) {
      $(window).scrollTop(0);
      var $toggle = $('#si-curtain-nav .si-curtain-toggle');
      var height = $this.height() + $toggle.height();
      if($(window).height() > height) {
        height = $(window).height();
      }
      if($this.hasClass('out')) {
        $this.removeClass('out');
        $this.find('.burger').show();
        $this.find('.close').hide();
        $('body').css({
          height: '',
          overflow: ''
        });
        $('html').css({
          overflowX: '',
          overflowY: ''
        });
        $('#si-curtain-nav .si-curtain-mobile').css('position', '');
      }
      else {
        $this.addClass('out');
        $this.find('.burger').hide();
        $this.find('.close').show();
        $('body').css({
          height: height,
          overflow: 'hidden'
        });
        $('html').css({
          overflowX: 'auto',
          overflowY: 'auto'
        });
        $('#si-curtain-nav .si-curtain-mobile').css('position', 'relative');
      }
    }

  });

})(jQuery);