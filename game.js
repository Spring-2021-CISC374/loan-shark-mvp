class Loan{
    name;
    principle;
    interestRate;
    duration;
    comp;
    owed;
    monthsPaid;
    constructor(name, principle, interest, months){
        this.name = name;
        this.principle = principle;
        this.interestRate = interest;
        this.duration = months;
        var comp= Math.pow((1+this.interestRate), this.duration);
        this.owed= this.principle*comp;
        this.monthsPaid =0;
        
    }

    getPayment(){
        var comp = Math.pow((1+this.interestRate), this.duration/7);
        var top = this.interestRate*comp;
        var bottom = comp-1;
        return (this.principle*(top/bottom)).toFixed(2);
    }

    toString(){
        var amount = "Loan amount: $" + this.principle;
        var interest = "Intrest Rate: " + this.interestRate*100 + "% per week";
        var duration = "Duration: " + this.duration + " days";
        var payment = "Payment: $" + this.getPayment() + " per week";
        return this.name+"\n"+amount+"\n"+interest+"\n"+duration+"\n"+payment;
    }

    
}

class Property{
    name;
    dailyIncome;
    price;
    constructor(name, income, price){
        this.name = name;
        this.dailyIncome = income;
        this.price = price;
    }

    getProfit(){
        return this.dailyIncome;
    }

    toString(){
        var name = "Property name: " + this.name;
        var dailyIncome = "Daily Income: " + this.dailyIncome + " per day";
        var price = "Price: $" + this.price + "";
        
        return name+"\n"+dailyIncome+"\n"+price;
    }
}



class Player {
    constructor(){
        this.name = "Player";
        this.portfolio = new Portfolio;
        this.credit_score = 500;
        this.savings = 0;
        this.loans_completed =0;
    }

    buyProperty(beingBought){
        if (this.savings >= beingBought.price){
            alert("property successfully purchased.");
            this.portfolio.assets.push(beingBought);
            this.savings -= beingBought.price;
            return beingBought.price;
        } else {
            alert("you cannot afford this property.");
            return 0;
        }
        
    }

    takeLoan(loan){
        //console.log(config.loans[0].toString());
        console.log(loan.toString());
        this.savings += loan.principle;
        this.portfolio.loans.push(loan);
        //console.log(loan);
        
    }
    calculate_player_rates(){
        var base_rates = [.08, .10, .12];
        var improved_rates = [.04,.06,.08];
        //var best_rates = []
        if(this.loans_completed >3){
            return improved_rates;
        }
        else{
            return base_rates;
        }
    }

    

}

// The portfolio class is where properties the player owns and loans the player has taken out are stored

class Portfolio {
    assets;
    loans;
    constructor(){
        this.assets = [];
        this.loans = [];
    }


    //Daily returns only pays off loans every 30 days, but earns income every day
    dailyReturns(currentDay){
        this.dailyReturn = 0;
        this.assets.forEach(element => {
            this.dailyReturn += element.getProfit();
        });
        if (currentDay%30 == 0){
            this.loans.forEach(element => {
                this.dailyReturn -= element.getPayment();
            });
        }
        console.log(this.dailyReturn);
        return this.dailyReturn;
    }

    grossDebt(){
        var tot=0;
        this.loans.forEach(function(item){
            tot += item.owed;
        });

        return tot;
    }
    totalAssets(){
        var tot=0;
        this.assets.forEach(function(item){
            tot += item.price;
        });

        return tot;
    }

    netDebt(){
        var a = this.grossDebt();
        var b = this.totalAssets();
        return b-a;
    }

    

}


var config = {
    width:800,
    height:600,
    backgroundColor:0x000000,
    scene: [Scene1,Scene2, titleScene,Base_property, home_scene, location_contract_scene,menuScene, Beach, Bank,
         game_over_scene, shop_scene, store_scene],
    physics: {
        default: "arcade",
        arcade:{
            debug: true
        }
    },
    player: new Player(),
    assets: {
        house : new Property("house", 4000, 170000),
        boat : new Property("boat", 2000, 75000),
        shop : new Property("shop", 9000, 200000),
        store : new Property("store", 5000, 100000),
    },

    assetsList: [
         new Property("house", 4000, 170000),
         new Property("boat", 2000, 75000),
         new Property("shop", 9000, 200000),
         new Property("store", 5000, 100000),
    ],
    loans:[
        new Loan("Loan 1", 1000, .08, 14),
        new Loan("Loan 2", 2000, .06, 35),
        new Loan("Loan 3", 1500, .10, 21),
      

        //new Loan("boat")
    ],
    bankTimer :1,
    hiScore :0

}
function hiScore(list, config){
    var total = 0;
    var i = 0;
    list.forEach(function(item){
        
        if(i >3){
            total += Math.pow((1+.04), 21)*item.price;
            i++
        }
        else{
            total += Math.pow((1+.08), 21)*item.price;
            i++;
        } 
    });

    config.hiScore= total.toFixed(2);
}

function setLoans(properties, config){
    var new_loans = [];
    var min = 1000000000000000000000000000000000000000000000000;
    properties.forEach(function(item, index){
        if(item.price < min){
            min = item.price;
        }
    });

    var rates = config.player.calculate_player_rates();
    var durations = [];
    for(var i = 0; i < 4; i++){
        var value = 21;
        durations.push(21+(7*i));
    }
    console.log(durations);
   // const random = Math.floor(Math.random() * months.length);
    for(var i = 1; i < 4; i++){
        var randomDuration = Math.floor(Math.random() * durations.length);
       
        var name = "Loan " + i;
        var loan=new Loan(name, min, rates[i-1], durations[randomDuration]);
        new_loans.push(loan);
        durations.splice(randomDuration, 1);
    }
    console.log(new_loans);

    config.loans = new_loans;
}

hiScore(config.assetsList, config);
setLoans(Object.values(config.assets), config);
console.log(config.player.name);
var game = new Phaser.Game(config);