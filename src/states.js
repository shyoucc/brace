/*

@状态模式

*/

// OfflightState

let OfflightState = function(light){
    this.light = light
}

OfflightState.prototype.buttonWasPressed = function(){
    // 行为
    console.log('弱光')
    // 切换行为
    this.light.setState(this.light.weaklightState)
}

let WeaklightState = function(light){
    this.light = light
}

WeaklightState.prototype.buttonWasPressed = function(){
    console.log('强光')
    this.light.setState(this.light.stronglightState)
}

let StronglightState = function(light){
    this.light = light
}

StronglightState.prototype.buttonWasPressed = function(){
    console.log('关灯')
    this.light.setState(this.light.offlightState)
}

const Light = function(){
     this.offlightState = new OfflightState(this)
     this.weaklightState = new WeaklightState(this)
     this.stronglightState = new StronglightState(this)
     this.button = null
}

Light.prototype.init = function(){
    let button = document.createElement('button')
    let self = this

    this.button = document.body.appendChild(button)
    this.button.innerHTML = '开关'

    // 初始状态
    this.currState = this.offlightState;

    this.button.onclick = function(){
        self.currState.buttonWasPressed()
    }
}

Light.prototype.setState = function(newState){
    this.currState = newState
}

window.Light = Light

export default Light
