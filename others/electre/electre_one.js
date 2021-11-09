class electreOne{
    constructor(table){
        this.numOfCriterias = table[0].length;
        this.numOfAlternatives = table.length;
        this.data = table;
    }
}