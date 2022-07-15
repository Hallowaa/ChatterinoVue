export function contains(array, toSearch) {
    for(let element of array) {
        if(element === toSearch) return true;
    }

    return false;
}

export function getCookie(name) {
    var cookie = document.cookie;
    var result;
    cookie.split(' ').forEach(element => {
        var entry = element.split('=');
        
        if(entry[0] == name) {
            result = entry[1];
        }
    });

    if(result != null) return result;
}

export function isScrolledToBottom(el) {
    const $el = $(el);
    return el.scrollHeight - $el.scrollTop() - $el.outerHeight() < 1;
}

export function addZeroFront(value) {
    return (value < 10?'0'+ value:value);
}

export function get(elementId) {
    return document.getElementById(elementId);
}

export function checkImage(imageSrc, good, bad) {
    let img = new Image();
    img.onload = good; 
    img.onerror = bad;
    img.src = imageSrc;
}

export function newElement(elementType, elementClass, elementId) {
    let element = document.createElement(elementType);
    element.className = elementClass;
    element.id = elementId;
    return element;
}