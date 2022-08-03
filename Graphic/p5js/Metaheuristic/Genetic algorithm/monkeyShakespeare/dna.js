class DNA{
    constructor(dnaLength){
        if (typeof dnaLength == 'number'){
            this.data = [];
            for (let i=0; i<dnaLength; i++){
                let rd = Math.floor(random(32,126));
                this.data[i] = char(rd);
            }
            this.fitness = 0;
        }else{
            this.data = dnaLength;
            this.fitness = 0;
        }
    }

    show(){
        console.log(this.data);
    }

    mutate(rate){
        for (let i=0; i<this.data.length; i++){
            let proba = random(1);
            if (proba <= rate){
                this.data[i] = char(Math.floor(random(32,126)));
            }
        }
    }
}