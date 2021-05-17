//const { config } = require("webpack");

class Base_property extends Phaser.Scene {
    totalTime;
    
    constructor(){
        super("Base_property")
    }


    
    preload(){
        this.load.image("buy", "assets/buttons/button_buy-property.png");
        this.load.image("leave", "assets/buttons/button_return-to-town.png");
        this.load.image("sleep", "assets/buttons/sleep_button.png");
        this.load.image("fishing","assets/buttons/button_go-fishing.png");
        this.load.image("buyUpgrade", "assets/buttons/button_buy-upgrade.png");
    }
    create(){
        var Scene2 = this.scene.get("Scene2");
        Scene2.nextDay(this);
        Scene2.totalTime;
    }

    

    add_buttons(scene, asset){
        scene.buy_button = scene.add.image(174, 501, "buy");
        scene.buy_button.setInteractive();
        scene.buy_button.on("pointerup", function(){
            this.buy_property(asset);
        }, this);
        scene.leave_button = scene.add.image(571, 501, "leave");
        scene.leave_button.setInteractive();
        scene.leave_button.on("pointerup", function(){
            this.back_to_map(asset.name, scene);
        }, this);
    }
    // for adding upgrade purchasing buttons to a scene
    add_upgrades(scene, asset, upgrade){
        scene.upgrade_button = scene.add.image(174, 501, "buyUpgrade");
        scene.upgrade_button.setInteractive();
        scene.upgrade_button.on("pointerup", function(){
            this.buy_upgrade(upgrade, asset);
        }, this);
        scene.leave_button = scene.add.image(571, 501, "leave");
        scene.leave_button.setInteractive();
        scene.leave_button.on("pointerup", function(){
            this.back_to_map(asset.name, scene);
        }, this);
    }

    //For when there is nothing left to buy

    add_leave_button(scene, asset){
        scene.leave_button = scene.add.image(571, 501, "leave");
        scene.leave_button.setInteractive();
        scene.leave_button.on("pointerup", function(){
            this.back_to_map(asset.name, scene);
        }, this);
    }
    
    // Adds in buttons for your home, go back to town, or go to sleep
    
    home_buttons(scene){
        var Scene2 = scene.scene.get("playGame");
        scene.buy_button = scene.add.image(174, 561, "sleep");
        scene.buy_button.setInteractive();
        scene.buy_button.on("pointerup", Scene2.nextDay, Scene2);
        scene.buy_button.on("pointerup", function(){
            this.back_to_map("home", scene);
        }, this);
        scene.leave_button = scene.add.image(571, 561, "leave");
        scene.leave_button.setInteractive();
        scene.leave_button.on("pointerup", function(){
            this.back_to_map("home", scene);
        }, this);
    }
    
    fishing_buttons(scene){
        var Scene2 = scene.scene.get("playGame");
        if (config.player.boatIndex < config.boatList.length - 1) {
            scene.upgrade_button = scene.add.image(174,461, "upgradeBoat");
            scene.upgrade_button.setInteractive();
            scene.upgrade_button.on("pointerup", function(){
                if (config.player.boatIndex == config.boatList.length - 1)
                    alert("You already have the best boat!");
                else {
                    if (config.player.savings >= config.player.boat.upgradeCost) {
                        config.player.savings -= config.player.boat.upgradeCost;
                        config.player.boat = config.boatList[++config.player.boatIndex];
                        alert(config.player.boat.name + " successfully purchased.");
                        this.back_to_map("fishing", scene);
                    }
                    else {
                        alert("You cannot afford this upgrade yet.");
                    }
                }
            }, this);
        }
        scene.buy_button = scene.add.image(174, 561, "fishing");
        scene.buy_button.setInteractive();
        scene.buy_button.on("pointerup", Scene2.nextDay, Scene2);
        scene.buy_button.on("pointerup", function() {
            config.player.savings += config.player.boat.profits;

            //SMALL SHARK CATCH EVENT
            if(Math.floor(Math.random() * 50)==1){
                console.log("MAKO SHARK EVENT");
                alert("Caught a Mako Shark! +$10000");
                config.player.savings +=10000;
            //MEGALODON CATCH EVENT
              }if(Math.floor(Math.random() * 200)==1){
                console.log("MEGALODON EVENT");
                alert("YOU CAUGHT THE MYSTICAL MEGALODON +$1000000");
                config.player.savings +=1000000;
              }

            console.log("gone fishing" + config.rainCounter);
            if (config.rainedYesterday) {
                console.log("rain bonus applied");
                config.rainCounter = 0;
                config.player.savings += config.player.boat.profits * 0.5;
            }
        });
        scene.buy_button.on("pointerup", function(){
            this.back_to_map("fishing", scene);
        }, this);
        scene.leave_button = scene.add.image(571, 561, "leave");
        scene.leave_button.setInteractive();
        scene.leave_button.on("pointerup", function(){
            this.back_to_map("fishing", scene);
        }, this);
    }
    

    //When you select the sleep button, it increments the time to "7:00am" the next day and gives you your daily returns
 
    buy_property(asset){
        console.log("buy property");
        var menu = this.scene.get('menuS');
        
        var score = config.player.buyProperty(asset);
        if(score != 0){
            menu.createInfoImage2(asset, config.player.portfolio.assets.length-1);
        }
        console.log(config.player.portfolio);
    }

    buy_upgrade(upgrade, property){

        var index = 0;

        config.player.portfolio.assets.forEach(function(item){
            var found = false;
            if(item.name == property.name){
                found = true;
            }
            if(!found){
                index+=1;
            }
        
        });

        var menu = this.scene.get('menuS');

        
        console.log("buy upgrade");
        
        config.player.buyUpgrade(upgrade, property);
        menu.addUpgradeInfo(config.player.portfolio.assets[index], index);
        console.log(config.player.portfolio);
    }

    back_to_map(asset, scene){
        var map = this.scene.get("playGame");
        scene.scene.start("playGame", {"score" : config.player.savings, "playerLocation": map.getPropertyLocation(asset)});
    }

    test(){
        console.log("from bp");
    }

    update(){

    }
}