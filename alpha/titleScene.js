class titleScene extends Phaser.Scene{
    constructor(){
        super("titleS");
    }

    preload(){
            //lOADING IN THE ASSETS YO!
        this.load.image("logo", "assets/logos/loanSharkLogo.png");
        this.load.image("play", "assets/buttons/button_play.png");
        this.load.image("info", "assets/buttons/button_info.png");
        this.load.image("bg", "assets/objects/TITLESCENE_BG.png");
    }
    


    create(){
            // PUTS THINGS ON THE SCREEN YO!
        this.background= this.add.image(400,300, "bg");
       // this.background.setOrigin(400,300);
        this.logo = this.add.image(400, 200, "logo");
        this.leave_button = this.add.image(400, 300, "play");
        
        
        this.leave_button.setInteractive();
        this.leave_button.on("pointerup", this.leaveMenu, this);

        this.info_button = this.add.image(400, 400, "info");
        this.info_button.setInteractive();
        this.info_button.on("pointerup", function(){
            alert("Loan shark is an open world property buing game.\nWin by trying to buy the most amount of properties\n with the least amount of debt from the bank.")
        }, this);

    }
    

    update(){
       // this.leaveMenu();

    }
    leaveMenu(){
            //LEAVES THE MENU AND STARTS THE GAME YO!
            this.scene.start("playGame", {"score" : 10}, {"totalTime" : 0});
        };
    


















    /* TODO: 
    *    
    * 
    * ADD COOL BG TO TITLE SCREEN
    * ADD A TUTORIAL BUTTOIN TO THE TITLE SCREEN  
    * 
    *   figureout how tf phaser works man
    */
}