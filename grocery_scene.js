class grocery_scene extends Phaser.Scene{
    constructor() {
        super("grocery_scene");

    }

    init(data){
        this.score = data.score;
    }
    preload() {
        this.load.image("buy", "assets/buttons/button_buy-property.png");
        this.load.image("leave", "assets/buttons/button_return-to-town.png");
        this.load.image("buyUpgrade", "assets/buttons/button_buy-upgrade.png");
        this.load.image("backGrocery", "assets/textures/groceryStoreBackground.png", {
            frameWidth: 400,
            frameHeight: 300
        });
    }
    create(){
        //console.log(this.score);
        this.background= this.add.tileSprite(0,0, config.width+1000, config.height+1000, "backGrocery");
        this.background.setOrigin(0,0);


        /*this.housecost = this.add.bitmapText(10, 5, "pixelFont","House cost: $100,000", 32, 1);
        

        this.repair_cost = this.add.bitmapText(10, 40, "pixelFont","Repair cost: $70,000", 32, 1);

        this.monthly_revenue = this.add.bitmapText(10, 80, "pixelFont","$1000 a month/$12,000 a year", 32, 1);

        this.loan_rate = this.add.bitmapText(10, 120, "pixelFont","Loan amount: $170,000, 8%, 10 years", 32, 1);*/
        
        this.text = this.add.bitmapText(300, 100, "pixelFont", "You have $" +config.player.savings, 30, 1);


        this.cursorKeys = this.input.keyboard.createCursorKeys();


        var Base_property = this.scene.get("Base_property");

        if (config.assets.grocery.isOwned){
            if (config.upgrades.extraInventory.isOwned){
                this.text = this.add.bitmapText(200, 150, "pixelFont", config.assets.grocery.toString(), 45, 1);
                Base_property.add_leave_button(this, config.assets.grocery);
            } else {
                this.text = this.add.bitmapText(200, 150, "pixelFont", config.assets.grocery.toString() +"Expand inventory for $100000\n Upgrade yield: $4000/day", 45, 1);
                Base_property.add_upgrades(this, config.assets.grocery, config.upgrades.extraInventory);
            }
        } else{
            
            this.text = this.add.bitmapText(200, 150, "pixelFont", config.assets.grocery.toString(), 45, 1);
            Base_property.add_buttons(this, config.assets.grocery);
        }

        //scene.buyInventoryUpgrade = scene.add.image(174, 501, "buy");
        //scene.buyInventoryUpgrade.setInteractive();
        

    }


    update(){
        this.changeSceneManager()
    }

    changeSceneManager(){
        if(this.cursorKeys.space.isDown){
            //this.scene.wake("playGame",{"score" : this.score});
            //this.scene.switch("house","playGame");
            this.scene.start("playGame", {"score" : this.score});
            
        }
    }
    
        

}