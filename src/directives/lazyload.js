function inView(element) {
    // + 20 是为了防止底部加载不出来，另外也是为了提前一点点加载出来
    return ($(window).height() + $(window).scrollTop() + 20) >= $(element).offset().top
}

export default {
    bind() {

    },
    inserted(el, binding, vNode, oldVnode) {
        if(inView(el)) {
            el.setAttribute('src', el.getAttribute('data-src'))
        }
        $(window).on('scroll', function() {
            if(inView(el)) {
                el.setAttribute('src', el.getAttribute('data-src'))
            }
        })
    }
}