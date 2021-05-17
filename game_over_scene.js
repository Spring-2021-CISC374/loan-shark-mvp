class game_over_scene extends Phaser.Scene{
    constructor(){
        super("gameOver");
    }

    preload(){
            //lOADING IN THE ASSETS YO!
        this.load.image("logo", "assets/logos/loanSharkLogo.png");
        this.load.image("play", "assets/buttons/button_play.png");
        this.load.image("bg", "assets/objects/TITLESCENE_BG.png");
        this.load.image("playAgain","assets/buttons/play-again.png")

    }

    create(){
            // PUTS THINGS ON THE SCREEN YO!
        this.background= this.add.image(400,300, "bg");
       // this.background.setOrigin(400,300);
        this.logo = this.add.image(400, 100, "logo");
        
        this.restart_button = this.add.image(config.width/2, 500, "playAgain");
        this.restart_button.setInteractive();
        this.restart_button.on("pointerup", function() {
            var menu = this.scene.get("menuS");

            config = resetData();
            config.totalTime = 0;
            menu.scene.stop();
            this.scene.start("bootGame", {"score" : 10}, {"totalTime" : 0});
        }, this);

        var scene2 = this.scene.get("playGame");
        
        this.days = this.add.text(275, 140, "It took you:  \n", { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',fontSize: '50px',
         color: "#FFFFFF", align: 'center'});
         this.days2 = this.add.text(370, 180, scene2.currentDay , { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',fontSize: '100px',
         color: "#f20000", align: 'left'});
         this.days3 = this.add.text(175, 160, "\n\n days to be debt free!", { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',fontSize: '50px',
         color: "#FFFFFF", align: 'center'});
        //this.add.bitmapText(10, 200, "pixelFont", "You finished with "+ (config.player.portfolio.grossDebt())+ " in total debt", 40, 1);
        //this.add.bitmapText(10, 250, "pixelFont", "You finished with "+ config.player.portfolio.totalAssets().toFixed(2)+ " in assets", 25, 1);
        //this.add.bitmapText(10, 300, "pixelFont", "You finished with "+ config.player.portfolio.netDebt().toFixed(2)+ " in net debt(debt - assets purchased)", 25, 1);
        this.feedback = this.add.text(50, 375, "Try to take fewer loans and look for lower intrest rates to finish in a faster time!", { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',fontSize: '20px',
        color: "#FFFFFF", align: 'center'});
        //this.add.bitmapText(10, 350, "pixelFont", "You the least amount of debt you could have finished with is "+ config.hiScore+ "!", 25, 1);
       // this.add.bitmapText(10, 400, "pixelFont", "Play again and make better decisions to try and get this score!", 25, 1);

       
        

    }
    
    
    update(){
       // this.leaveMenu();

    }
    
    


















    /* TODO: 
    *    
    * 
    * ADD COOL BG TO TITLE SCREEN
    * ADD A TUTORIAL BUTTOIN TO THE TITLE SCREEN  
    * 
    *   figureout how tf phaser works man
    */
}