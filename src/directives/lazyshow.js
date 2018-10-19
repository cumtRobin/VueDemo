function inView(element) {
    return ($(window).height() + $(window).scrollTop() + 20) >= $(element).offset().top
}

export default {
    inserted(el, binding, vNode, oldVnode) {
        if(inView(el)) {
            $(el).addClass('lazy-show')
        } else {
            $(el).addClass('lazy-hide')
        }
        $(window).on('scroll', function() {
            if(inView(el)) {
                $(el).removeClass('lazy-hide').addClass('lazy-show')
            }
        })
    }
}