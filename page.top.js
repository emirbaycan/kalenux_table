firer = [];
site_url = '';
user_api_url = '';

function setElems(a, b) {
    var c, d, i;
    c = document.getElementsByClassName(a);
    d = c.length;
    for (i = 0; i < d; i++) {
        b(c[0]);
    }
}

function setEvent(d, e, f) {
    var a, b, c, i;
    a = document.getElementsByClassName(e);
    b = a.length;
    for (i = 0; i < b; i++) {
        c = a[i];
        c[d] = f.bind(null, c, i);
    }
}
function setOpen(a) {
    document.getElementById(a).dataset.state = "open";
}

function copen(elem) {
    var a, b, c, d, e, f;
    a = elem.dataset.to;
    b = elem.dataset.the;
    c = elem.dataset.next;
    d = elem.dataset.tp;
    e = elem.dataset.tpc;
    f = elem.dataset.tot;
    g = elem.dataset.after;


    if (typeof b !== 'undefined') {
        document.getElementById(b).dataset.state = '';
    }
    if (typeof a !== 'undefined') {
        document.getElementById(a).dataset.state = 'open';
    } else if (typeof c !== 'undefined') {
        if (elem.nextElementSibling.dataset.state == 'open') {
            elem.nextElementSibling.dataset.state = '';
        } else {
            elem.nextElementSibling.dataset.state = 'open';
        }
    } else if (typeof d !== 'undefined') {
        while (d = d - 1) {
            elem = elem.parentNode;
        }
        elem.parentNode.dataset.state = 'open';
    } else if (typeof e !== 'undefined') {
        while (e = e - 1) {
            elem = elem.parentNode;
        }
        elem.parentNode.dataset.state = '';
    } else if (typeof f !== 'undefined') {
        b = document.getElementById(f);
        if (b.dataset.state == 'open') {
            b.dataset.state = '';
        } else {
            b.dataset.state = 'open';
        }
    } else {
        if (elem.dataset.state == 'open') {
            elem.dataset.state = '';
        } else {
            elem.dataset.state = 'open';
        }
    }
    if (typeof g !== 'undefined') {
        eval(g);
    }
}


function asyncGet(url, callback) {
    var a = new XMLHttpRequest();
    a.open('GET', url);
    a.withCredentials = true;
    a.onreadystatechange = function () {
        if (a.readyState == 4) {
            if (a.status == 200) {
                callback(a.response);
            } else {
                //error(errors.connection_error);
            }
        }
    };
    a.send();
}

function postJSON(url, callback, data, params) {
    var a = new XMLHttpRequest();
    a.open('POST', url);
    a.withCredentials = true;
    a.onreadystatechange = function () {
        if (a.readyState == 4) {
            if (a.status == 200) {
                callback(JSON.parse(a.responseText), params);
            } else {
                //error(errors.connection_error);
            }
        }
    }
    if (typeof data != 'undefined') {
        a.setRequestHeader('Content-type', 'application/json');
        a.send(JSON.stringify(data));
    } else {
        a.send();
    }
}

function postForm(url, callback, data, params) {
    var a = new XMLHttpRequest();
    a.open('POST', url);
    a.onreadystatechange = function () {
        if (a.readyState == 4) {
            if (a.status == 200) {
                callback(JSON.parse(a.responseText), params);
            } else {
                //error(errors.connection_error);
            }
        }
    }
    if (typeof data != 'undefined') {
        a.send(data);
    } else {
        a.send();
    }
}

function getJSON(url, callback) {
    var a = new XMLHttpRequest();
    a.open('GET', url);
    a.withCredentials = true;
    a.onreadystatechange = function () {
        if (a.readyState == 4) {
            if (a.status == 200) {
                callback(JSON.parse(a.responseText));
            } else {
                //error(errors.connection_error);
            }
        }
    };
    a.send();
}

function getActions(id) {
    return '<button data-id="' + id + '" class="btn btn-del" onclick="del(this)"><span class="icon-delete"></span></button>';
}

function parseCv(cv) {
    return '<div class="cv"><div class="cv-top"></div><a target="_blank" href="' + site_url + cv + '"></a></div>';
}

function del(elem) {
    postJSON(user_api_url + 'del/application', function (a, b) {
        if (a.result === 1) {
            document.getElementById('item_' + b.elem.dataset.id).remove();
        }
    }, { id: elem.dataset.id }, { elem: elem })
}

document.body.onload = function () {
    document.body.className = '';
    var a, i;
    a = firer.length
    for (i = 0; i < a; i++) {
        firer[i]();
    }
    firer = null;
    setEvent('onclick', 'copen', copen);
}