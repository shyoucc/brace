// 发布订阅模式

const event = {
    clientList: [],
    listen: function(key, fn){
        if (!this.clientList[key]) {
            this.clientList[key] = []
        }
        this.clientList[key].push(fn)
    },
    trigger: function(){
        let key = Array.prototype.shift.call(arguments)
        let fns = this.clientList[key]

        if (fns.length === 0 || !fns) {
            return
        }

        for (var i = 0,fn; fn = fns[i++]) {
            fn.appay(this, arguments)
        }
    }
}

// 对象动态安装 发布-订阅功能
const installEvent = function(obj){
    for(i in event){
        obj[i] = event[i]
    }
}

// *********************line*********************//

let seller = {}
installEvent(seller)
// 订阅
seller.listen('fruit100', function(price){
    console.log('price:', price)
})

seller.listen('fruit200', function(price){
    console.log('price:', price)
})

// 发布
seller.trigger('fruit100', 20)
seller.trigger('fruit200', 30)

