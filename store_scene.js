class store_scene extends Phaser.Scene{
    constructor() {
        super("store_scene");

    }

    init(data){
        this.score = data.score;
    }
    preload() {
        this.load.image("buy", "assets/buttons/button_buy-property.png");
        this.load.image("leave", "assets/buttons/button_return-to-town.png");
        this.load.image("back", "assets/textures/businessOldBackground.png", {
            frameWidth: 400,
            frameHeight: 300
        });
    }
    create(){
        //console.log(this.score);
        this.background= this.add.tileSprite(0,0, config.width+1000, config.height+1000, "back");
        this.background.setOrigin(0,0);


        /*this.housecost = this.add.bitmapText(10, 5, "pixelFont","House cost: $100,000", 32, 1);
        

        this.repair_cost = this.add.bitmapText(10, 40, "pixelFont","Repair cost: $70,000", 32, 1);

        this.monthly_revenue = this.add.bitmapText(10, 80, "pixelFont","$1000 a month/$12,000 a year", 32, 1);

        this.loan_rate = this.add.bitmapText(10, 120, "pixelFont","Loan amount: $170,000, 8%, 10 years", 32, 1);*/
        this.text = this.add.bitmapText(200, 150, "pixelFont", config.assets.store.toString(), 45, 1);

        this.text = this.add.bitmapText(300, 100, "pixelFont", "You have $" +config.player.savings, 30, 1);


        this.cursorKeys = this.input.keyboard.createCursorKeys();


        var Base_property = this.scene.get("Base_property");
        Base_property.add_buttons(this, config.assets.house);
        

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