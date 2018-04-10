//define colors on hero and enemys
var enemyColor = new Array("red","#0FF");
var heroColor = new Array("blue","#ff5");
//封装一个公用的坦克父类
function Tank(x,y,direct){
    this.x = x;
    this.y = y;
    this.speed = 3;
    this.direct = direct;
    this.moveUp = function(){
        if (hero.y>0) {
            hero.y -= hero.speed;
        }
        hero.direct = 0;
    }
    this.moveRight = function(){
        if (hero.x+30<500) {
            hero.x += hero.speed;
        }
        hero.direct = 1;
    }
    this.moveBottom = function(){
        if (hero.y+30<300) {
            hero.y += hero.speed;
        }
        hero.direct = 2;
    }
    this.moveLeft = function(){
        if (hero.x>0) {
            hero.x -= hero.speed;
        }
        hero.direct = 3;
    }
}

//hero class
function Hero(x,y,direct,color){
    //inherit from tank class
    this.hero = Tank;
    this.hero(x,y,direct);
    this.color = color;
    this.direct = direct;
    this.isLive = true;
    this.shotEnemy = function(){
        switch(this.direct){
            case 0:
                heroBullet = new Bullet(this.x+9,this.y,this.direct);
            break;
            case 1:
                heroBullet = new Bullet(this.x+30,this.y+9,this.direct);
            break;
            case 2:
                heroBullet = new Bullet(this.x+9,this.y+30,this.direct);
            break;
            case 3:
                heroBullet = new Bullet(this.x,this.y+9,this.direct);
            break;
        }
        heroBullets.push(heroBullet);
        heroBullets[heroBullets.length-1].timer = window.setInterval("heroBullets["+(heroBullets.length-1)+"].run()",50);
    }
}
//enemy class
function EnemyTank(x,y,direct,color){
    this.enemyTank = Tank;
    this.enemyTank(x,y,direct);
    this.color = color;
    this.isLive = true;
    this.timer = null;
    this.speed = 1;
    this.count = 0;
    this.direct = direct;
    this.bulletIsLive = true;
    this.run = function(){
        switch(this.direct){
            case 0:
                if(this.y>0){
                this.y--;
            }
            break;
            case 1:
                if(this.x+30<500){
                this.x += this.speed;
            }
            break;
            case 2:
                if(this.y+30<300){
                this.y += this.speed;
            }
            break;
            case 3:
                if(this.x>0){
                this.x -= this.speed;
            }
            break;
        }
        
        if(this.count>=30){
            this.direct = Math.round(Math.random()*3);
            this.count=0;
        }
        this.count++;
        //check if bullet is alive, if not shoot another one
        if(this.bulletIsLive == false && this.isLive){
            //shoot a bullet with same direction as tank
            switch(this.direct){
                case 0:
                    enemyBullets.push(new Bullet(this.x+9,this.y,this.direct,this,'enemy'));
                break;
                case 1:
                    enemyBullets.push(new Bullet(this.x+30,this.y+9,this.direct,this,'enemy'));
                break;
                case 2:
                    enemyBullets.push(new Bullet(this.x+9,this.y+30,this.direct,this,'enemy'));
                break;
                case 3:
                    enemyBullets.push(new Bullet(this.x,this.y+9,this.direct,this,'enemy'));
                break;
            }
            enemyBullets[enemyBullets.length-1].timer = window.setInterval("enemyBullets["+(enemyBullets.length-1)+"].run()",50);
                this.bulletIsLive = true;
        }
    }
}
//draw tanks 
    function drawTank(hero){
    switch(hero.direct){
        case 0:
        case 2:
            ctx.fillStyle = hero.color[0];
            ctx.fillRect(hero.x,hero.y,5,30);// side of tank
            ctx.fillRect(hero.x+15,hero.y,5,30);// side of tank
            ctx.fillRect(hero.x+6,hero.y+5,8,20);//body of tank
            ctx.fillStyle = hero.color[1];
            ctx.beginPath();
            ctx.arc(hero.x+10,hero.y+15,3,0,Math.PI*2,true);//cap on the tank
            ctx.closePath();
            ctx.fill();
            //draw gun
            ctx.strokeStyle = hero.color[1];
            ctx.lineWidth = 2;
            ctx.moveTo(hero.x+10,hero.y+15);
            if(hero.direct==0){
                ctx.lineTo(hero.x+10,hero.y);
            }else if(hero.direct==2){
                ctx.lineTo(hero.x+10,hero.y+30);
            }
            ctx.stroke();
        break;
        case 1:
        case 3:
            ctx.fillStyle = hero.color[0];
            ctx.fillRect(hero.x,hero.y,30,5);
            ctx.fillRect(hero.x,hero.y+15,30,5);
            ctx.fillRect(hero.x+5,hero.y+6,20,8);
            ctx.fillStyle = hero.color[1];

            ctx.beginPath();
            ctx.arc(hero.x+15,hero.y+10,3,0,Math.PI*2,true);
            ctx.closePath();
            ctx.fill();
            
            ctx.strokeStyle = hero.color[1];
            ctx.lineWidth = 2;
            ctx.moveTo(hero.x+15,hero.y+10);
            if(hero.direct ==1){
                ctx.lineTo(hero.x+30,hero.y+10);
            }else if(hero.direct ==3){
                ctx.lineTo(hero.x,hero.y+10);
            }
            ctx.stroke();
        break;
    }
}

//define bullet
function Bullet(x,y,direct,tank,type){
    this.x = x;
    this.y = y;
    this.speed = 3;
    this.direct = direct;
    this.timer = null;
    this.isLive = true;
    this.tank = tank;
    this.type = type;
    this.run = function(){
        switch(this.direct){
            case 0:
                this.y -= this.speed;
            break;
            case 1:
                this.x += this.speed;
            break;
            case 2:
                this.y += this.speed;
            break;
            case 3:
                this.x -= this.speed;
            break;
        }
       
        document.getElementById('add3').innerText = " number of bullets you shoot: "+heroBullets.length;
        if(this.x <0 || this.x>=500 ||this.y<0 || this.y>300 || this.isLive==false){
            this.isLive = false;
            if(this.type=='enemy'){
                this.tank.bulletIsLive = false;
            }
            window.clearInterval(this.timer);
        }
    }
}
function drawHeroBullet(bullets){
    for(var i=0;i<bullets.length;i++){
        var heroBullet = bullets[i];
        if(heroBullet.isLive){
            ctx.fillStyle = '#FEF26E';
            ctx.fillRect(heroBullet.x,heroBullet.y,2,2);
        }
    }
}
//draw enemy bullet
function drawEnemyBullet(enemyBullets){
    for(var i=0;i<enemyBullets.length;i++){
        var enemyBullet = enemyBullets[i];
        if(enemyBullet.isLive){
            ctx.fillRect(enemyBullet.x,enemyBullet.y,2,2);
        }
    }
}
function isHitEnemyTank(heroBullets,enemyTanks){
    for(var i=0;i<heroBullets.length;i++){
        for(var j=0;j<enemyTanks.length;j++){
            //check the bullet(x, y), if its in the range of the tank 
            if(enemyTanks[j].isLive){
                switch(enemyTanks[j].direct){
                case 0:
                case 2:
                    if(heroBullets[i].x>=enemyTanks[j].x&&heroBullets[i].x<=enemyTanks[j].x+20&&heroBullets[i].y>=enemyTanks[j].y&&heroBullets[i].y<=enemyTanks[j].y+30){
                        //mark dead if bullet inside the range
                        heroBullets[i].isLive = false;
                        enemyTanks[j].isLive = false;
                        var bomb = new Bomb(enemyTanks[j].x,enemyTanks[j].y);
                        bombs.push(bomb);

                }
                break;
                case 1:
                case 3:
                    if(heroBullets[i].x>=enemyTanks[j].x&&heroBullets[i].x<=enemyTanks[j].x+30&&heroBullets[i].y>=enemyTanks[j].y&&heroBullets[i].y<=enemyTanks[j].y+20){
                        //mark dead
                        heroBullets[i].isLive = false;
                        enemyTanks[j].isLive = false;
                        var bomb = new Bomb(enemyTanks[j].x,enemyTanks[j].y);
                        bombs.push(bomb);
                }
                break;
            }
            }
            
        }
    }
}

//define bomb
function Bomb(x,y){
    this.x = x;
    this.y = y;
}

//check if bullet hit hero
function isHitHeroTank(enemyBullets,heroTank){
    for(var i=0;i<enemyBullets.length;i++){
        if(enemyBullets[i].isLive && heroTank.isLive){
            switch(heroTank.direct){
            case 0:
            case 2:
                if(enemyBullets[i].x >= heroTank.x && enemyBullets[i].x <= heroTank.x+20 && enemyBullets[i].y >= heroTank.y && enemyBullets[i].y <= heroTank.y +30){
                heroTank.isLive = false;
                enemyBullets[i].isLive = false;
            }
            break;
            case 1:
            case 3:
                if(enemyBullets[i].x >= heroTank.x && enemyBullets[i].x <= heroTank.x+30 && enemyBullets[i].y >= heroTank.y && enemyBullets[i].y <= heroTank.y +20){
                heroTank.isLive = false;
                enemyBullets[i].isLive = false;
            }
            break;
        }
        }
    }
}