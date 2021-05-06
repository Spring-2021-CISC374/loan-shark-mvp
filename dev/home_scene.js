class home_scene extends Phaser.Scene{
    constructor() {
        super("gohome");

    }

    init(data){
        this.score = data.score;
    }
    preload() {
        //this.load.image("buy", "assets/buttons/button_buy-property.png");
        this.load.image("leave", "assets/buttons/button_return-to-town.png");
        this.load.image("sleep", "assets/buttons/sleep_button.png");
        this.load.image("bedroom", "assets/textures/fishinghut.jpg", {
            frameWidth: 600,
            frameHeight: 300
        });
    }
    
    create(){
        //console.log(this.score);
        this.background= this.add.tileSprite(0,0, config.width+1200, config.height+1000, "bedroom");
        this.background.setOrigin(0,0);

        this.housecost = this.add.bitmapText(10, 5, "pixelFont","Welcome Home!", 32, 1);
        
        this.cursorKeys = this.input.keyboard.createCursorKeys();


        var Base_property = this.scene.get("Base_property");
        Base_property.home_buttons(this);
        

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