export default {
    inserted(el, binding, vNode, oldVnode) {
        $(el).on('click', function(event) {
            if (event.target.nodeName == 'IMG') {
                vNode.context.$EventService.emit('SHOW_IMG_BOX', event.target.src)
            }
        })
    }
}