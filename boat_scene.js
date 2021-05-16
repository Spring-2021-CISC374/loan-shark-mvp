class boat_scene extends Phaser.Scene{
    constructor() {
        super("boat_scene");

    }

    init(data){
        this.score = data.score;
    }
    preload() {
        //this.load.image("buy", "assets/buttons/button_buy-property.png");
        this.load.image("leave", "assets/buttons/button_return-to-town.png");
        this.load.image("sleep", "assets/buttons/sleep_button.png");
        this.load.image("fishing","assets/buttons/button_go-fishing.png");
        this.load.image("upgradeBoat", "assets/buttons/button_upgrade-boat.png")
        this.load.image("boatUpgrades", "assets/textures/dockBoat.jpg", {
            frameWidth: 400,
            frameHeight: 300
        });
    }
    
    create(){
        //console.log(this.score);
        this.background= this.add.tileSprite(0,0, config.width+1000, config.height+1000, "boatUpgrades");
        this.background.setOrigin(0,0);

        this.housecost = this.add.bitmapText(10, 5, "pixelFont","Let's Sail The Seas!", 32, 1);
    
        var message = "Current Fishing profits: $" + config.player.boat.profits + "/day";
        if (config.rainCounter > 1)
            message += " + $" + config.player.boat.profits * 0.5 + " Rain Bonus!"
        this.boatcost = this.add.bitmapText(10, 300, "pixelFont",message, 32, 1);

        if (config.player.boatIndex < config.boatList.length - 1)
            this.boatUpgrade = this.add.bitmapText(10, 340, "pixelFont","Player Savings: $" + config.player.savings + "\nBoat Upgrade cost: $" + config.player.boat.upgradeCost + "\nBenefit: +$" + (config.boatList[config.player.boatIndex+1].profits - config.player.boat.profits) + " per fishing day", 32, 1);
        else
        this.housecost = this.add.bitmapText(10, 340, "pixelFont","You own the best boat!", 32, 1);
            

        this.cursorKeys = this.input.keyboard.createCursorKeys();


        var Base_property = this.scene.get("Base_property");
        Base_property.fishing_buttons(this);
        

    }

    update(){
        this.changeSceneManager()
    }

    changeSceneManager(){
        if(this.cursorKeys.space.isDown){
            this.scene.start("playGame", {"score" : this.score});
            
        }
    }
    
        

}