;(function($){
    $.extend({
        magnifier: function(m_option) {
            /* 
            * m_option.bigContainer: 大图的包裹层元素
            * m_option.bigImg: 大图
            * m_option.smallContainer: 小图的包裹层元素
            * m_option.smallImg: 小图
            * m_option.mirror: 小图上的放大镜
            */
            // 获得一些基础属性
            var m_option = $.extend({}, m_option);
            var bigWidth = m_option.bigContainer.width();
            var bigHeight = m_option.bigContainer.height();
            var smallWidth = m_option.smallContainer.width();
            var smallHeight = m_option.smallContainer.height();
            var mirrorWidth = m_option.mirror.width();
            // 根据图片的宽高比计算放大镜的高度
            m_option.mirror.css('height', bigHeight / bigWidth * mirrorWidth + 'px');
            var mirrorHeight = m_option.mirror.height();
            var maxTranslateX = smallWidth - mirrorWidth;
            var maxTranslateY = smallHeight - mirrorHeight;
            // 计算出小图与镜子的大小比例
            var magnification = smallWidth / mirrorWidth;
            // 计算出大图与镜子的移动距离比例
            var moveRatio = bigWidth / mirrorWidth;
            // 鼠标在小图区域内移动
            m_option.smallContainer.mousemove(function(event){
                var translateX = checklimitRange(event.pageX - $(this).offset().left - mirrorWidth / 2, maxTranslateX);
                var translateY = checklimitRange(event.pageY - $(this).offset().top - mirrorHeight / 2, maxTranslateY);
                m_option.mirror.css({
                    webkitTransform: 'translate(' + translateX + 'px,' + translateY + 'px)',
                    transform: 'translate(' + translateX + 'px,' + translateY + 'px)'
                });
                var bigImgTranslateX = translateX * moveRatio * -1;
                var bigImgTranslateY = translateY * moveRatio * -1;
                m_option.bigImg.css({
                    width: magnification * 100 + '%',
                    webkitTransform: 'translate(' + bigImgTranslateX + 'px,' + bigImgTranslateY + 'px)',
                    transform: 'translate(' + bigImgTranslateX + 'px,' + bigImgTranslateY + 'px)'
                });
            });
            // 鼠标移入和移出小图区域
            m_option.smallContainer.hover(function() {
                m_option.mirror.show();
            }, function() {
                m_option.mirror.hide();
                m_option.bigImg.css({
                    width: '100%',
                    webkitTransform: 'translate(' + 0 + 'px,' + 0 + 'px)',
                    transform: 'translate(' + 0 + 'px,' + 0 + 'px)'
                });
            })

            function checklimitRange(value, max) {
                return value <= 0 ? 0 : value >= max ? max : value;
            }
        }
    });
})(jQuery);