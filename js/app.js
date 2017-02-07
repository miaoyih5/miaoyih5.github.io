window.onload = (function(win) {

    var isSwiper = true
    var star = 10

    //执行加载
    loading()

    //加载函数
    function loading(){
      $('body').css('overflow','hidden')
      initPage()
    }

    function initPage(){
        var submitData = {
            
        };
        $.post('http://t6.miaoxing101.com//index.php?s=/home/index/anli', submitData,
        function(data) {
          createCase(data)
          //添加搜索框变化动画
          searchBoxChange()
          //事件绑定
          bindEvent()
          //监听滚动条
          ListenScroll()
          $('.loading').css({display:'none',background:'rgba(0,0,0,0.7)'})
          $('body').css('overflow','auto')
        },"json")
    }

    //事件绑定函数
    function bindEvent() {
        //搜索框点击事件
        $('.globalnav .search-box').on('click', function() {
                $('.search-panel').animate({ right: '0' })
                $('body').css('overflow', 'hidden')
                $('.return').hide()
            })
        //取消按钮点击事件
        $('.search-box .cancel').on('click', function() {
            $('.search-panel').animate({ right: '-7.5rem' })
            $('body').css('overflow', 'auto')
            $('.return').show()
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

        //返回首页按钮点击事件
        $('.return').on('click',function(){
          $('.project-show').css('display','none')
          $('.warpper').css('display','block')
        })

        //热词点击事件
        $('#word-box ul li').on('click',function(){
          var str = $(this).html()
          search(str)
          $('.return').show()
          $('body').css('overflow', 'auto')
        })

        //搜索icon点击事件
        $('#search-icon').on('click',function(){
          var str = $(this).siblings().children().eq(0).val()
          search(str)
          $('body').css('overflow', 'auto')
        })

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
        isSwiper = false
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
              loadAnthorCase()
            }
        });
    }

    //加载案例
    function loadAnthorCase(){
      $('.loading').show()
      console.log(star)
      var submitData = {
            star:star
        };
        $.post('http://t6.miaoxing101.com//index.php?s=/home/index/ajaxanli', submitData,
        function(data) {
          createCase(data)
          star = star + 10
          setTimeout(function(){
            $('.loading').hide()
          },1000)
        },"json")
    }

    //生成案例
    function createCase(data){
      var title = ''
      var view = ''
      var src = ''
      var str = ''
      var strAll = ''
      var id = 0
      for(var i=0;i<data.list.length;i++){
        title = data.list[i].title
        view = data.list[i].view
        id= data.list[i].id
        src = "http://t6.miaoxing101.com/" + data.list[i].img

        str = "<li data-id="+id+"><div class='outer'><img src='"+src+"' alt=''><div class='number'><div class='icon'><img src='img/yanjing.png' alt=''></div><span>"+view+"</span></div></div><p>"+title+"</p></li>"

        strAll = strAll + str

      }

      $('.plist').append(strAll)
      bindCase()
        
      
    }

    function bindCase(){
        //案例点击跳页事件
        $('.plist li').on('click', function() {
            var id = $(this).data('id')
            doProjectAjax(id)
        })
    }

    function doProjectAjax(id){
      $('.loading').show()
      var submitData = {
            id:id
        };
        $.post('http://t6.miaoxing101.com//index.php?s=/home/index/detail', submitData,
        function(data) {
          Partculars(data)
        },"json")
    }

    //生成案例详情页
    function Partculars(data){


      var urlStr1 = 'url(http://t6.miaoxing101.com'+data.detail.imgpath[0]+')'
      var urlStr2 = 'url(http://t6.miaoxing101.com'+data.detail.imgpath[1]+')'
      var urlStr3 = 'url(http://t6.miaoxing101.com'+data.detail.imgpath[2]+')'

      $('#project-title').html(data.detail.title)
      $('#project-view').html(data.detail.view)
      $('.portion1').css('background',urlStr1)
      $('.portion2').css('background',urlStr2)
      $('.portion3').css('background',urlStr3)

      $('.loading').hide()

      $('.warpper').css('display', 'none')
      $('.project-show').css('display', 'block')
      window.scrollTo(0,0);
      if(isSwiper){
        initSwiper()
      }
    }

    //搜索功能
    function search(str){
      // alert(str)
      $('.search-panel').animate({ right: '-7.5rem' })
      $('.project-show').hide()
      $('.warpper').show()
      $('.loading').show()
      setTimeout(function(){
        $('.loading').hide()
      },1000)
    }

    function loadimg(imgData){

    }

})(window)
