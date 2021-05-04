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