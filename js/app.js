window.onload = (function(win) {

    loading()

    function loading(){
      $('body').css('overflow','hidden')
      setTimeout(function(){
        $('.loading').css({display:'none',background:'rgba(0,0,0,0.7)'})
        $('body').css('overflow','auto')
        init()
      },2000)
    }

    function init() {
        searchBoxChange()
        bindEvent()
        ListenScroll()
        createCase()
    }

    //事件绑定函数
    function bindEvent() {
        //搜索框点击事件
        $('.globalnav .search-box').on('click', function() {
                $('.search-panel').animate({ right: '0' })
                $('body').css('overflow', 'hidden')
            })
        //取消按钮点击事件
        $('.search-box .cancel').on('click', function() {
            $('.search-panel').animate({ right: '-7.5rem' })
            $('body').css('overflow', 'auto')
        })

        //咨询按钮点击事件，弹出咨询框
        $('.project-show .button2').on('click', function() {
            $('.consult').css('display', 'block')
        })

        //咨询框关闭按钮点击事件
        $('.consult .container .top .icon').on('click', function() {
            $('.consult').css('display', 'none')
        })

        //联系我们按钮点击事件
        $('.consult .container .bottom p').eq(0).on('click', function() {
            alert('aaa')
        })

        bindCase()
    }

    //初始化swiper
    function initSwiper() {
        var mySwiper = new Swiper('.swiper-container', {
            effect: 'coverflow',
            slidesPerView: 3,
            centeredSlides: true,
            loop: true,
            coverflow: {
                rotate: 30,
                stretch: 10,
                depth: 60,
                modifier: 2,
                slideShadows: true
            }
        })
    }

    //定时器监听页面滚动，搜索框变化
    function searchBoxChange() {
        var oContent = document.getElementsByClassName('content')[0]
        setInterval(function() {
            var oTop = oContent.getBoundingClientRect().top
            if (oTop < 0) {
                $('.header').addClass('ad')
            } else {
                $('.header').removeClass('ad')
            }
        }, 100)
    }


    //滚动条监听事件
    function ListenScroll() {
        $(window).scroll(function() {　　
            var scrollTop = $(this).scrollTop();　　
            var scrollHeight = $(document).height();　　
            var windowHeight = $(this).height();
            var isProjectShow = $('.project-show').css('display');
            if (scrollTop + windowHeight == scrollHeight&&isProjectShow =='none') {
              loadCase()
            }
        });
    }

    //加载案例
    function loadCase(){
      setTimeout(function(){
        $('.loading').css('display','none')
        createCase()
      },1000)
      $('.loading').css('display','block')
    }

    //生成案例
    function createCase(){
      var str = "<li><div class='outer'><img src='img/1.jpg' alt=''><div class='number'><div class='icon'><img src='img/yanjing.png' alt=''></div><span>186</span></div></div><p>瞄星案例</p></li>"
      

      for(var i= 0;i<10;i++){
        $('.plist').append(str)
        bindCase()
      }
        
      
    }

    function bindCase(){
        //案例点击跳页事件
        $('.plist li').one('click', function() {
            $('.warpper').css('display', 'none')
            $('.project-show').css('display', 'block')
            window.scrollTo(0,0);
            initSwiper()
        })
    }

    //生成案例详情页
    function Partculars(){

    }



    function doAjax(){
      var url = 'http://t6.miaoxing101.com/index.php?s=/admin/database/index/index'
      $.ajax({
        url:url,
        dataType:"json",
        type:'get',
        success:function(data){
          cosole.log(data)
        }
      })
    }


})(window)
