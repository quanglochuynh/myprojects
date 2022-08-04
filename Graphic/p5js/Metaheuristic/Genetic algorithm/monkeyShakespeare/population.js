function valid(s1, s2){
    for (let i=0; i<s1.length; i++){
        if (s1.charAt(i) != s2.charAt(i)){
            return false;
        }
    }
    return true;
}

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
        this.maxFitnessID = -1;
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
            if (this.community[i].fitness === 1){
                this.maxFitnessID = i;
            }
        }
        this.bestString = this.community[idmax].data.join("");
        this.community.sort(function (a, b){
            return b.fitness - a.fitness;
        })
    }

    naturalSelection(){
        let lUT = [];
        for(let i in this.community){
            let n = this.community[i].fitness *100;
            for (let k=0; k<n; k++){
                lUT.push(i);
            }
        }
        //update population
        let newPop = [];
        for(let i=0; i<this.community.length; i++){
            let id1 = random(lUT);
            let id2 = random(lUT);
            let middle = floor(random(this.targetString.length));
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
        if (this.maxFitnessID !== -1){
            noLoop();
        }
    }

    lamMau(){
        textSize(18);
        for (let i = 0; i<12; i++){
            text(this.community[i].data.join(""), 50, 200 + i*32);
        }
        for (let i = 12; i<24; i++){
            text(this.community[i].data.join(""), 300, 200 + (i - 12)*32);
        }
    }
}
