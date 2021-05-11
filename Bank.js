class Bank extends Phaser.Scene{
    constructor() {
        super("bank");

    }

    init(data){
        this.score = data.score;
    }
    preload() {
        this.load.image("take", "assets/buttons/button_take-loan.png");
        this.load.image("leave", "assets/buttons/button_return-to-town.png");
        this.load.image("scroll", "assets/textures/scroll.png");
    }
    create(){
        //this.background= this.add.image(config.width/2, config.height/2, "scroll");
        this.create_loans();
        config.loans.forEach(this.listLoan, this);
    
        this.cursorKeys = this.input.keyboard.createCursorKeys();

        this.leave_button = this.add.image(400, 550, "leave");
        this.leave_button.setInteractive();
        this.leave_button.on("pointerup", this.back_to_map, this);

        var onceAMonthText = this.add.bitmapText(260, 460, "pixelFont", "Loans are refreshed every 5 days", 23, 1);

        this.loans_taken = [];
        console.log(this.loans_taken);
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

    listLoan(item, index){
        var loan_text = this.add.bitmapText(10, index*120+50, "pixelFont", item, 23, 1);
        var buy_button = this.add.image(config.width-100, index*145+50, "take");
        buy_button.setInteractive();
        buy_button.on("pointerup",  function(){
            this.takeLoan2(item, index, buy_button, loan_text)}, this);

        return buy_button;
    }

    takeLoan2(item, index, buy_button, loan_text){
        config.player.takeLoan(item);
        //config.loans.splice(index, 1);
        this.loans_taken.push(index);
        console.log(config.loans);
        buy_button.destroy();
        loan_text.destroy();

    }

    remove_loan(){
        config.loans.splice()
    }

    back_to_map(){
        this.loans_taken.sort();
        
        config.loans.splice(this.loans_taken[0], this.loans_taken.length);

        var map = this.scene.get("playGame");
        map.player.x = map.getPropertyLocation("bank")[0];
        map.player.y = map.getPropertyLocation("bank")[1];

        this.scene.stop();
        this.scene.start("playGame", {"score" : 25, "playerLocation": map.getPropertyLocation("bank")});
    }

    create_loans(){
        var Scene2 = this.scene.get("playGame");
        console.log("Create loans" +Scene2.currentDay);
    }

    
    
    
        

}