const { config } = require("webpack");

class Scene2 extends Phaser.Scene {
    
    displayTime;
    currentDay;
    //the higher the timerate, the slower the clock moves
    timeRate;
    timeRateCounter;

    constructor() {
        super("playGame");
        config.totalTime = 420;
        this.timeRate = 4;
        this.timeRateCounter = 0;
        this.currentDay = 0;
        
    }
    init(data){
        this.score = config.player.savings;
        //this.scene.launch("menuS");
       // this.scene.bringToTop("menuS");
      //  this.scene.sleep("menuS");
      this.spriteX = data.playerLocation[0];
      this.spriteY = data.playerLocation[1];

      //LOTTERY WINNING RANDOM EVENT
      if(Math.floor(Math.random() * 200)==1){
        console.log("LOTTERY WINNER EVENT!!!");
        alert("YOU JUST WON THE FISHERMEN'S LOTTERY FOR $100,000");
        this.score+=100000;
      }

    }
    create() {
        //background music
        this.music = this.sound.add("theme");
        this.rainSound = this.sound.add("rainSound");

        
        var musicConfig ={
            mute: false,
            volume: .05,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        }
        if (this.currentDay==0){ 
            this.music.play(musicConfig);
        }
        //console.log("RANDOM NUMBER" + Math.floor(Math.random() * 100));

        config.player.boat = config.boatList[config.player.boatIndex];
        
        this.background= this.add.tileSprite(0,0, config.width, config.height, "background");
        this.sand = this.add.tileSprite(400, 450, config.width, 80, "sand");
        this.water= this.add.tileSprite(400,790, config.width, config.height, "water");
        this.road = this.add.tileSprite(0, 160, config.width, 40, "road");
        this.road2 = this.add.tileSprite(0, 300, config.width, 40, "road");
        this.sandedge = this.add.tileSprite(0, 480, config.width, 40, "sandedge");
        this.grassedge = this.add.tileSprite(0, 400, config.width, 40, "grassedge");
        this.sandedge.setOrigin(0,0);
        this.grassedge.setOrigin(0,0);
        this.car = this.add.image(170,130,"car");
        this.roadVert = this.add.tileSprite(160, 200, 210, 40, "road");
        this.dock = this.add.tileSprite(120, 480, 40, 80, "dock");
        this.dockpillars = this.add.tileSprite(160, 498, 40, 64, "dockpillars");
        this.dockpillars2 = this.add.tileSprite(112, 498, 40, 64, "dockpillars");
        this.roadVert.angle = 90;
        this.dock.setOrigin(0,0);
        this.dockpillars.setOrigin(0,0);
        this.dockpillars2.setOrigin(0,0);
        this.background.setOrigin(0,0);
        this.road.setOrigin(0,0);
        this.road2.setOrigin(0,0);
        this.roadVert.setOrigin(0,0);
        this.sign = this.add.image(690, 70, "billboard");
        this.logo = this.add.image(680, 60, "logo");

        
        
        this.roadedge = this.add.image(160,405, "roadedge");
        this.roadedge.angle = 90;
        this.roadedge.setOrigin(0,0);
        this.bank = this.physics.add.image(400,240,"bank");
        this.bank.body.setSize(60,50);
        this.bank.body.setOffset(10,20);

        //The players home
        this.home = this.physics.add.image(460, 100, "house");

        //Store
        this.business = this.physics.add.image(220, 240, config.businessTextureName);
        this.business.body.setSize(60,60);
        this.business.body.setOffset(10,20);

        this.boatShop = this.physics.add.image(60, 250, "shop");
        this.boatShop.body.setSize(100,70);

        //Restaurant
        this.restaurant = this.physics.add.image(580, 240, "restaurant");
        this.restaurant.body.setSize(60,60);
        this.restaurant.body.setOffset(10,20);
        //Our first loan house
        this.house2 = this.physics.add.image(100,100, "house2");
        //Boat
        this.boat = this.physics.add.image(180, 540, config.player.boat.name);
        this.boat.body.setSize(120,40);
        this.boat.angle = 180;

        


        //this.rowboat = this.add.image(240, 550, "rowboat");
        //this.speedboat = this.add.image(684, 546, "speedboat");
        //this.player = this.physics.add.sprite(300,150, "player");

        
        this.scoreLabel = this.add.bitmapText(10, 20, "pixelFont"," ", 16);
        this.alertCountdown = 100;
        //this.scoreLabel2 = this.add.bitmapText(10, 20, "pixelFont","Debt: " + config.player.portfolio.grossDebt(), 16);
        this.timeLabel = this.add.bitmapText(10, 5, "pixelFont","Time: " + config.totalTime, 16);
        
        this.cursorKeys = this.input.keyboard.createCursorKeys();
        
        
        this.player_anim(this);
        this.rain = this.add.tileSprite(0,0, 1800, 1800, "rain");
        this.rain.visible = false;
        this.rainBuildup = 0;

        this.light = this.add.image(0,0,config.lightFile);
        this.light.setOrigin(0,0);
        this.light.setAlpha(0.1);
        this.physics.add.overlap(this.player, this.boat, this.tada, null, this);
        this.physics.add.overlap(this.player, this.business, this.businessScene, null, this);
        this.physics.add.overlap(this.player, this.home, this.goHome, null, this);
        this.physics.add.overlap(this.player, this.bank, this.goBank, null, this);

        this.physics.add.overlap(this.player, this.restaurant, this.goResturant, null, this);

        this.physics.add.overlap(this.player, this.boatShop, this.goBoatShop, null, this);

        this.physics.add.collider(this.player,this.water);
        this.physics.add.overlap(this.player, this.house2, this.houseRepair, null, this);

    
    }
    businessScene() {
        //this.scene.stop("menuS")
        this.scene.start("store_scene");
    }

    goResturant(){
        this.scene.start("grocery_scene")
    }
    //Players home
    goHome(player, home){
        //this.score+=15;
       // this.scoreLabel.text = "Money: " + this.score;
        this.scene.start("gohome", {"score" : this.score});
    }

    goBoatShop(){
        this.scene.start("shop_scene");
    }
    //Broken down house loan
    houseRepair(player, house){
        //this.score+=15;
        //this.scoreLabel.text = "Money: " + this.score;
        //this.scene.start("house", {"score" : this.score});
        this.scene.start("house",{"score" : this.score});
        this.scene.switch("playGame","house");
    }

    goBank(){
        //this.scene.stop("menuS")
        this.scene.start("bank");
        this.scene.switch("playGame","bank");
    }
    tada() {
        this.scene.start("boat_scene");
    }
    

    startRain() {
        console.log("buildup: " + this.rainBuildup + "volume: " + this.rainSound.volume);
        
        if (this.rainBuildup == 0) {
            this.rainSound.play();
            this.rainSound.volume = 0;
        }
        this.rain.visible = true;
        this.rainSound.volume += 0.002;
        this.rain.setAlpha((this.rainBuildup++)/1000);
        this.rain.tilePositionX += 0.5;
        this.rain.tilePositionY -= .8;
        if (this.rainBuildup == 1000) {
            config.rainCounter = 2000;
            this.rainBuildup = 0;
        }
    }
    update() {
        console.log(config.lightFile);
        //FINDING MONEY RANDOM EVENT
      if(Math.floor(Math.random() * 7500)==1){
        console.log("LOOSE CHANGE EVENT");
        if (config.rainCounter < 0) {
            this.scoreLabel.text="You found some lost money +$500";
            this.alertCountdown = 200;
        }
        this.score+=500;
      }
        config.player.savings = this.score;
        this.updateShoreline();
        this.movePlayerManager();
        //this.loadMenu();
        this.updateTimeOfDay();
        if (config.rainCounter > -300) {
            this.rain.visible = true;
            this.updateRain();
        } else {
            if (config.rainCounter != -400) {
                this.rain.visible = false;
                this.rainSound.volume = 0;
            } else {
                this.startRain();
            }
            
        }
        //adds your daily returns once per day at midnight
        if ((config.totalTime%1440 == 421) && (this.timeRateCounter == 0)){
            this.score += config.player.portfolio.dailyReturns(this.currentDay);
           // this.scoreLabel.text ="Money:" +this.score.toString();
        }

    }
    
    updateRain() {
        config.rainCounter--;
        if (config.rainCounter % 100 == 0)
            console.log(config.rainCounter);
        this.rain.setAlpha((config.rainCounter+300)/1000);
        if (config.rainCounter < 1000 && config.rainCounter > 0) {
            this.rainSound.volume -= 0.002;
            console.log(this.rainSound.volume);
        }
        
        this.rain.tilePositionX += 0.5;
        this.rain.tilePositionY -= .8;
    }
    updateShoreline() {
        this.sandedge.tilePositionX += Math.random() * .18 - 0.09;
        this.water.tilePositionY += Math.random() * 0.05 + 0.05;
        this.water.tilePositionX += Math.random() * .08- 0.04;

    }
    

    movePlayerManager(){
        var isMoving = 0;
        if(this.cursorKeys.left.isDown){
            isMoving = 1;
            if(this.player.x > 0+this.player.width/2){
                if((this.player.y > 490 && this.player.x > 131) || this.player.y <= 490)
                    this.player.x-= 1;
                this.player.flipX=true;
                console.log(this.player.x);

            }
        }
        if(this.cursorKeys.right.isDown){
            isMoving = 1;
            if(this.player.x < config.width-this.player.width/2){
                if((this.player.y > 490 && this.player.x < 154) || this.player.y <= 490)
                    this.player.x++;
                this.player.flipX=false;
                console.log(this.player.x);
            }
        }
        if(this.cursorKeys.up.isDown){
            isMoving = 1;
            if(this.player.y >0+this.player.height/2){
                this.player.y -=1;
                console.log(this.player.y);
            }
        }
        if(this.cursorKeys.down.isDown){
            isMoving = 1;
            if(this.player.y < 490){
                this.player.y +=1;
                console.log(this.player.y)
            }
            if(this.player.x > 125 && this.player.x < 155  && (this.player.y > 489 && this.player.y < 540)) 
                this.player.y++;
        }
        if(this.cursorKeys.space.isDown){
            this.score+=1;
            console.log(this.score);
           // this.scoreLabel.text ="Money:" +this.score.toString();
            
        }
        if (isMoving);
            //scene.player.play("player_anim");
        else{
            //scene.player.play("player_idle");
        }
        
    }

    player_stand(scene) {
        scene.player = scene.physics.add.sprite(300,150, "playerIdle");
        scene.anims.create({
            key: "player_idle",
            frames: scene.anims.generateFrameNumbers("playerIdle"),
            frameRate: 20,
            repeat: -1
          }, this);

          scene.player.play("player_idle");
    }
    player_anim(scene){

        scene.player = scene.physics.add.sprite(this.spriteX,this.spriteY, "player");
        scene.anims.create({
            key: "player_anim",
            frames: scene.anims.generateFrameNumbers("player"),
            frameRate: 20,
            repeat: -1
          }, this);

          scene.player.play("player_anim");
    }

    nextDay(){
        this.score+=100;
        
        /*
        if((this.totalTime%1440)!=0){
            this.totalTime+=(this.totalTime%1440);
            this.totalTime+=420;
        }
        */
        if (config.rainCounter > 0) {
            config.rainedYesterday = true;
            config.rainCounter = 0;
            this.rainSound.stop()
        }
        else {
            config.rainedYesterday = false;
            config.rainCounter = -300;
            var rainChance = Math.random();
            console.log(rainChance);
            if (rainChance < 0.5) {
                config.rainCounter = 3000;
                this.rainSound.volume = 2;
                this.rainSound.play();
            }
        }
            
        
        config.lightLevel = 0.6;
        console.log(config.totalTime);
        config.totalTime+=(1440-(config.totalTime%1440));
        config.totalTime+=420;
        console.log(config.totalTime);
        

        //this.score += config.player.portfolio.dailyReturns(this.currentDay);
        //this.scoreLabel.text ="Money:" +this.score.toString();

        this.scene.start("playGame", {"score" : this.score, "playerLocation": this.getPropertyLocation("home")});
    }

    updateTimeOfDay(){
        this.timeRateCounter++;
        if (this.timeRateCounter == this.timeRate){
            this.timeRateCounter = 0;
            
            config.totalTime += 1;
            if (this.alertCountdown > 0)
                this.alertCountdown--;
            else
                this.scoreLabel.text = " ";
        }
        if (config.totalTime % 144 == 0 && config.rainCounter == -300) {
            var rainChance = Math.random();
            console.log(rainChance);
            if (rainChance < 0.015)
                config.rainCounter = -400;
        }
        if (config.totalTime%1440 > 300 && config.totalTime%1440 < 1100 && config.lightLevel < 1) {
            config.lightLevel+= 0.0005;
            this.light.setAlpha(1-config.lightLevel);
        }
        if (config.totalTime%1440 > 1100) {
            config.lightLevel -= 0.0005;
            this.light.setAlpha(1-config.lightLevel);
        }
        this.timeMod = config.totalTime % 720;
        if(config.totalTime%1440 >= 720){
            this.timeSuffix = "PM";
        } else{
            this.timeSuffix = "AM";
        }
        this.hour = (this.timeMod/60 | 0);
        this.minute = (this.timeMod-(60 * this.hour));
        if (this.minute < 30){
            this.minute = "00";
        }
        else if (this.minute < 60){
            this.minute = "30";
        }
        if (this.hour == 0)
            this.hour = 12;
        if (config.rainCounter > 0 && !config.rainAlert) {
            
            this.scoreLabel.text="it has started to rain!\nEffect: Gain more money for fishing in the rain";
            this.alertCountdown = 300;
            config.rainAlert = true;
        }
        this.currentDay = ((config.totalTime/1440) | 0) + 1;
        this.displayTime = ("Day " + this.currentDay + ", " + this.hour.toString() + ":"  + this.minute.toString() + " " + this.timeSuffix);

        
        this.timeLabel.text = this.displayTime;
        if(config.bankTimer + 4 < this.currentDay){
            setLoans(Object.values(config.assets), config);
            config.bankTimer = this.currentDay;
        }
        //if (config.player.portfolio.grossDebt() <= 0){
            //this.scene.start("gameOver");
       // }
        

        if(config.player.portfolio.assets.length ==4){
            if(config.player.boatIndex == 2){
                if(config.player.portfolio.numUpgrades() ==4){
                    config.player.portfolio.grossDebt() <= 0;
                }
            }
            //this.scene.start("gameOver");
        }
    }
    getPropertyLocation(key){
        if(key == "house2"){
            return [this.house2.x, this.house2.y+60]
        }
        if(key == "shop"){
            return [this.boatShop.x, this.boatShop.y+60]
        }
        if(key == "business"){
            return [this.business.x, this.business.y+60]
        }
        if(key == "restaurant"){
            return [this.restaurant.x, this.restaurant.y+60]
        }
        if(key == "bank"){
            return [this.bank.x, this.bank.y+60]
        }
        if(key == "home"){
            return [this.home.x, this.home.y+60]
        }
        if(key == "fishing"){
            return [140, this.boat.y-70]
        }
    }
  
}