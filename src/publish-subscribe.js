/*

@发布订阅模式

*/

const publishSubscribe = {}

publishSubscribe.event = (function(){
    let clientList = {}

    let listen = function(key, fn){
        if (!clientList[key]) {
            clientList[key] = []
        }
        clientList[key].push(fn)
    }

    let trigger = function(){
        let key = Array.prototype.shift.call(arguments)
        let fns = clientList[key]

        if (fns.length === 0 || !fns) {
            return
        }

        for(var i = 0, fn; fn = fns[i++];){
            fn.apply(this, arguments)
        }
    }

    let remove = function(key, fn){
        let fns = clientList[key]
        // 没有人订阅 直接返回
        if (!fns) {
            return false
        }
        if (!fn) {
            // 如果不传入具体回调函数，表示取消key对应的所有订阅
            fns && (fns.length = 0)
        } else {
            for (let i = fns.length - 1 ; i >= 0; i--) {
                let _fn = fns[i]
                if (_fn === fn) {
                    fns.splice(i, 1)
                }
            }
        }
    }

    return {
        listen,
        trigger,
        remove
    }

})()

// 对象动态安装 发布-订阅功能
publishSubscribe.installEvent = function(obj){
    let event = this.event
    for(let i in event){
        obj[i] = event[i]
    }
}

// *********************line*********************//

function test(price){
    console.log('price:', price)
}

let seller = {}
publishSubscribe.installEvent(seller)
// 订阅
seller.listen('fruit100', function(price){
    console.log('price:', price)
})

seller.listen('fruit200', test)

seller.remove('fruit200', test)

// 发布
seller.trigger('fruit100', 20)
seller.trigger('fruit200', 30)

export default publishSubscribe

