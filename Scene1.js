

class Scene1 extends Phaser.Scene {
    
    constructor() {
        super("bootGame");
    }


    preload() {
        
        this.load.image("background", "assets/textures/grass.png");
        this.load.image("water", "assets/textures/water.png");
        this.load.image("road", "assets/textures/road.png");
        this.load.image("roadedge", "assets/textures/roadsand.png");
        this.load.image("dock", "assets/textures/dock.png");
        this.load.image("sand", "assets/textures/sand.png");
        this.load.image("sandedge", "assets/textures/sandedge.png");
        this.load.image("rain", "assets/textures/rain.png");
        this.load.image("grassedge", "assets/textures/grassedge.png");
        this.load.image("dockpillars", "assets/textures/dockpillars.png");
        this.load.image("restaurant","assets/objects/food.png");
        this.load.image("house", "assets/objects/ViableHouse1.png");
        this.load.image("house2", "assets/objects/ViableHouse2.png");

        this.load.image("boatUpgrades", "assets/textures/dockBoat.jpg");
        
        this.load.image("home", "assets/objects/fishhut.jpg", {
            frameWidth: 128,
            frameHeight: 128
        });
        
        this.load.image("businessOld", "assets/objects/businessOld.png");
        this.load.image("businessRestored", "assets/objects/business.png");
        this.load.image("shop", "assets/objects/ViableShop.png");
        this.load.image("car", "assets/objects/car.png");
        this.load.spritesheet("business", "assets/sprites/business.png", {
            frameWidth: 80,
            frameHeight: 80
        });
        this.load.spritesheet("playerIdle", "assets/sprites/pirateIdle.png", {
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.spritesheet("playerWalk", "assets/sprites/pirateWalk.png", {
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.spritesheet("player", "assets/sprites/pirateWalk.png", {
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.image("logo", "assets/logos/loanSharkLogo.png");
        this.load.image("billboard", "assets/logos/billboard.png");
        this.load.image("raft", "assets/objects/LS-Raft.png");
        this.load.image("speedboat", "assets/objects/speedboat.png");
        this.load.image("rowboat", "assets/objects/rowboat.png");
        
        this.load.bitmapFont("pixelFont","assets/font/font.png","assets/font/font.xml");

        this.load.image("bank", "assets/objects/bank.png", {
            frameWidth: 32,
            frameHeight: 32
        });

        this.load.image("menuBG", "assets/objects/menu_bg.png", {
            frameWidth: 32,
            frameHeight: 32
        });
       
    }
    create() {
        this.scene.launch("menuS");
        this.scene.bringToTop("menuS");
        this.scene.sleep("menuS");
        this.add.text(20,20,"Loading game...");
        //this.person = new  Player();
        //console.log(Player.name);
        //this.scene.start("gameOver", {"score" : this.score});
        this.scene.launch("titleS", {"score" : this.score});
        this.scene.setVisible(false);
    }

    update(){
        this.loadMenu();
    }
    loadMenu(){
        var isA = this.scene.isActive("playGame");
       // console.log(isA);
        if((isA)){
            this.input.keyboard.on('keydown-A', function (event) {
            this.scene.bringToTop("menuS");
            this.scene.wake("menuS");
            
            },this);
        }
    }

    
}