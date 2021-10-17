class electreOne{
    constructor(table){
        this.numOfCriterias = table.length[1].length;
        this.numOfAlternatives = table.length;
        this.data = table;
    }
}