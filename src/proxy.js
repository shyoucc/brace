/*

@代理模式

*/

const proxy = {}

var mult = function() {
    var result = 1;
    for(var i = 0, l = arguments.length; i < l; i++) {
        result = result * arguments[i]
    }
    return result
}

let multProxyFn = function (fn){
    // 缓存加入
    let cache = {}

    return function(){
        let args = Array.prototype.join.call(arguments)
        if (args in cache) {
            return cache[args]
        }
        return cache[args] = fn.apply(this, arguments)
    }
}

var multProxy = multProxyFn(mult);

multProxy(4, 5, 6)
multProxy(4, 5, 6)

export default proxy
