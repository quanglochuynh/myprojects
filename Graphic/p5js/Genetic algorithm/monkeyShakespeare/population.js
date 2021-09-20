class Population{
    constructor(targetString, numOfDNA, mutationRate){
        this.community = [];
        for (let i=0; i<numOfDNA; i++){
            this.community.push(new DNA(targetString.length))
        }
        this.mutationRate = mutationRate;
        this.targetString = targetString;
        this.generation = 0;
        this.bestString = "";
    }

    calculateFitness(){
        let maxf=0;
        let idmax = 0;
        for (let i in this.community){
            let f=0;    
            for (let j = 0; j<this.targetString.length; j++){
                if (this.community[i].data[j] == this.targetString[j]){
                    f++;
                }
            }
            if (f>maxf){
                maxf = f;
                idmax = i;
            }
            this.community[i].fitness = Math.pow(f/this.targetString.length, 4);
        }
        textSize(32);
        this.bestString = this.community[idmax].data.join("");
        text(this.bestString, 50, 300);
    }

    naturalSelection(){
        let lUT = [];
        for(let i in this.community){
            let n = this.community[i].fitness *1000;
            for (let k=0; k<n; k++){
                lUT.push(i);
            }
        }
        //console.log(lUT);
        //update population
        let newPop = [];
        for(let i=0; i<this.community.length; i++){
            let id1 = random(lUT);
            let id2 = random(lUT);
            let middle = floor(random(this.targetString.length));
            //console.log(id1 + '   ' + id2 + '   ' + middle);            
            let newStr = [];
            for (let j=0; j<this.targetString.length; j++){
                if (j<=middle){
                    newStr.push(this.community[id1].data[j]);
                }else{
                    newStr.push(this.community[id2].data[j]);
                }
            }            
            newPop.push(new DNA(newStr));
        }
        this.community = newPop;
        this.generation++;
    }

    mutate(){
        for (let i in this.community){
            this.community[i].mutate(this.mutationRate);
        }
    }

    evaluateResult(){
        if (this.bestString === this.targetString){
            noLoop();
        }
    }
}
