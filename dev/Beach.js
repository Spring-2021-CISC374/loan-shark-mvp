class Beach extends Phaser.Scene {
    constructor() {
        super("beach");
        
    }

    preload() {
        this.load.spritesheet("beach_background", "assets/textures/beach_background.png",{
        frameWidth: config.width,
        frameHeight: config.height});
    }

    create(){
        

        this.beach = this.add.sprite(config.width/2, config.height/2, "beach_background");
        //this.player = this.physics.add.sprite(300,150, "player");

        this.beach.anims.create({
            key: "beach_anim",
            frames: this.anims.generateFrameNumbers("beach_background"),
            frameRate: 5,
            repeat: -1
          });
        this.beach.play("beach_anim");

        this.player = this.physics.add.sprite(300,150, "player");
        this.anims.create({
            key: "player_anim",
            frames: this.anims.generateFrameNumbers("player"),
            frameRate: 20,
            repeat: -1
          });

          this.player.play("player_anim");
          this.cursorKeys = this.input.keyboard.createCursorKeys();
    }
    update(){
        this.movePlayerManager();
    }

    movePlayerManager(){
        if(this.cursorKeys.left.isDown){
            if(this.player.x > 0+this.player.width/2){
                this.player.x -=1;
                this.player.flipX=true;
                console.log(this.player.x);

            }
        }
        if(this.cursorKeys.right.isDown){
            if(this.player.x < config.width-this.player.width/2){
                this.player.x +=1;
                this.player.flipX=false;
                console.log(this.player.x);
            }
        }
        if(this.cursorKeys.up.isDown){
            if(this.player.y >0+this.player.height/2){
                this.player.y -=1;
                console.log(this.player.y);
            }
        }
        if(this.cursorKeys.down.isDown){
            if(this.player.y < 506){
                this.player.y +=1;
                console.log(this.player.y)
            }
        }
        if(this.cursorKeys.space.isDown){
            this.score+=1;
            console.log(this.score);
            this.scoreLabel.text ="Money:" +this.score.toString();
            
        }
        
        
        else{}
        
    }
}