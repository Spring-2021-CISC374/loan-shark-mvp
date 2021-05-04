class game_over_scene extends Phaser.Scene{
    constructor(){
        super("gameOver");
    }

    preload(){
            //lOADING IN THE ASSETS YO!
        this.load.image("logo", "assets/logos/loanSharkLogo.png");
        this.load.image("play", "assets/buttons/button_play.png");
        this.load.image("bg", "assets/objects/TITLESCENE_BG.png");
    }
    


    create(){
            // PUTS THINGS ON THE SCREEN YO!
        this.background= this.add.image(400,300, "bg");
       // this.background.setOrigin(400,300);
        this.logo = this.add.image(400, 100, "logo");

        this.add.bitmapText(10, 200, "pixelFont", "You finished with "+ (config.player.portfolio.grossDebt()).toFixed(2)+ " in total debt", 40, 1);
        //this.add.bitmapText(10, 250, "pixelFont", "You finished with "+ config.player.portfolio.totalAssets().toFixed(2)+ " in assets", 25, 1);
        //this.add.bitmapText(10, 300, "pixelFont", "You finished with "+ config.player.portfolio.netDebt().toFixed(2)+ " in net debt(debt - assets purchased)", 25, 1);

        this.add.bitmapText(10, 350, "pixelFont", "You the least amount of debt you could have finished with is "+ config.hiScore+ "!", 25, 1);
        this.add.bitmapText(10, 400, "pixelFont", "Play again and make better decisions to try and get this score!", 25, 1);

       
        

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