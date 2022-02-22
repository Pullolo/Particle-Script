const bg = document.getElementsByClassName("bg")[0];
//zdjecie
var img = "images/rain.png";

var body = document.body, html = document.documentElement;
var height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );

class waterDrop{
    constructor(X, Y, Gravity, Id){
        this.X = X;
        this.Y = Y;
        this.Gravity = Gravity
        this.Yvel = 2;
        this.Id = Id;
        bg.innerHTML += '<img class="rain" id="rain' + this.Id + '" src="' + img + '">';
    }
    Xpos(){
        return this.X;
    }
    Ypos(){
        return this.Y;
    }
    Grav(){
        return this.Gravity;
    }
    Yv(){
        return this.Yvel;
    }
    move(){
        this.Yvel += this.Gravity;
        this.Y += this.Yvel;
        document.getElementById("rain" + this.Id).style.left = this.X + "%";
        document.getElementById("rain" + this.Id).style.top = this.Y + "px";
    }
    remove(){
        document.getElementById("rain" + this.Id).remove();
    }
}

class waterDrops{
    constructor(){
        this.waterDrops = [];
    }
    newDrop(X, Y, Gravity, Id){
        var drop = new waterDrop(X, Y, Gravity, Id);
        this.waterDrops.push(drop);
        return drop;
    }
    getDrop(Id){
        return this.waterDrops[Id];
    }
    allDrops(){
        return this.waterDrops;
    }
    numberOfDrops(){
        return this.waterDrops.length;
    }
}

var i = 0;

function start(){
    var rain = new waterDrops();
    setInterval(() => {
        for(var x =0; x < 1; x++){
            // ustawienia kropel ----------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
            rain.newDrop(getRandomInt(-7, 101), -200, 1, i);
            //
            i++;
        }
        rain.allDrops().forEach(waterDrop =>{
            waterDrop.move();
            if(waterDrop.Ypos() > height){
                waterDrop.remove();
                rain.allDrops().shift();
            }
        });
        if(i > 400){
            i = 0;
        }
    }, 20);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

window.onload = start();
