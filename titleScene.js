class titleScene extends Phaser.Scene{
    constructor(){
        super("titleS");
    }

    preload(){
            //lOADING IN THE ASSETS YO!
        this.load.audio("theme", "assets/sound/sci-fi_platformer12.mp3");
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
            alert("Welcome to Loan Shark!\nYour goal is to buy all the properites and upgrades on the map in the least amount of time possible. \nThe game will not end until you have all properites and no debt."+
            "\nPress m on your keyboard to open the menu and see your money,debt, and income.\nUse arrow keys to move your charecter.")
        }, this);

    }
    

    update(){
       // this.leaveMenu();

    }
    leaveMenu(){
            //LEAVES THE MENU AND STARTS THE GAME YO!
            alert("Welcome to Loan Shark!\nYour goal is to buy all the properites and upgrades on the map in the least amount of time possible. \nThe game will not end until you have all properites and no debt."+
            "\nPress m on your keyboard to open the menu and see your money,debt, and income.\nUse arrow keys to move your charecter.")
            this.scene.start("playGame", {"score" : 10, "playerLocation": [300, 150]}, {"totalTime" : 0});
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