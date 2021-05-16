class menuScene extends Phaser.Scene{
    constructor(){
        super("menuS");
    }

    preload(){

      //  this.load.image("Lbox", "assets/objects/UI-ELEMENT-LTextbox.png");
        //this.load.image("sbox", "assets/objects/UI-ELEMENT-STextbox.png");
        //this.load.image("menu", "assets/objects/UI-ELEMENT-MENU.png");
        
    
    }


    create(){
        
        //this.menu = this.add.image(400, 300, "menu");
        this.sbox = this.add.image(400, 300, "menuBG");

        
        //this.timeLabel = this.add.bitmapText(10, 36, "pixelFont","Time: " + config.totalTime, 16);
        
        //this.add.bitmapText(242, 115, "pixelFont", "MENU", 45, 1);

        //this.leave_button = this.add.image(100, 50, "sbox");
        
        //this.leave_button.setInteractive();
        //this.leave_button.on("pointerup", this.leaveMenu, this);
        
        //this.scoreLabel = this.add.bitmapText(10, 20, "pixelFont","Money:  " + config.player.savings, 16);
        //this.scoreLabel2 = this.add.bitmapText(10, 36, "pixelFont","Debt: " + config.player.portfolio.grossDebt(), 16);
        
        this.scoreLabel = this.add.text(160, 100, "Money:  " + config.player.savings, { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', color: "#FFFFFF"});
        this.scoreLabel2 = this.add.text(160, 120, "Money:  " + config.player.savings, { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', color: "#FFFFFF"});

        this.properties = this.add.text(325, 100, "Assets:  " + config.player.portfolio.createMenuString(), { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', 
        color: "#00FFFF", fontSize: '16px', backgroundColor: '#00000', align: "center"});
       // this.info = this.add.text(325, 150, "", { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', color: "#ffffff"});

        //this.add.bitmapText(242, 150, "pixelFont",config.player.name, 28, 1);
        //this.add.bitmapText(242, 210, "pixelFont",config.player.portfolio.loans[0].toString(), 28, 1);
        this.propImages = this.add.group();

        //this.createInfoImage();
       // this.moreAssetInfo();

    }
    

    update(){
        //this.add.text(0, 0, 'Hello World', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
        this.leave();
       // this.moreAssetInfo();

        this.scoreLabel.setText("Money:  $" + config.player.savings.toLocaleString());
        this.scoreLabel2.setText("Debt: $" + config.player.portfolio.grossDebt().toLocaleString());
        this.properties.setText("Properties Owned:\n\t "+ config.player.portfolio.createMenuString());
        //this.createInfoImage();

    }
    
    moreAssetInfo(){
        var key =0;
        var info;
        var keys = ["ONE", "TWO", "THREE", "FOUR", "FIVE", "SIX", "SEVEN", "EIGHT", "NINE"];
        config.player.portfolio.assets.forEach(element => {
            info = info + element.toString()+"\n\n\n";
            var keyStr = 'keydown-'+ keys[1];
            
           /* this.input.keyboard.on(keyStr, function (event) {
                this.info.setText(info);
            },this);*/
        })

        //this.info.setText(info); 
    }

    createInfoImage(element, i){
        var startY = 170 + (95 *i);
        //config.player.portfolio.assets.forEach(element => {
            this.propImages.create(170, startY , element.name);
            this.add.text(325, startY, element.toString(), { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', color: "#ffffff"});
            startY += 95;
        //})
        
    }

    leave(){
        
        this.input.keyboard.on('keydown-A', function (event) {
            this.scene.sleep("menuS");
        },this);

          
        
    }
    leaveMenu(){
        
            this.scene.start("playGame", {"score" : config.player.savings});
        };
    


















    /* TODO: 
    *   Make menu popup when the player enters the shops or houses
    *   Give functionality to the menu
    *           Display Loans and assets
    *           Add text to buttons
    *           
    *   add cool background to menu
    *   some red errors pop up so maybe fix em
    *   Make loading text
    *   
    * 
    * 
    * 
    *   figureout how tf phaser works man
    */
}