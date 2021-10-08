class FuzzyNumber{
    constructor(l,m,u){
        this.lower = l;
        this.modal= m;
        this.upper = u;
    }

    static deFuzzy(f){
        return (f.lower + f.modal + f.upper)/3;
    }

    static add(f1, f2){
        return new FuzzyNumber(f1.lower + f2.lower, f1.modal + f2.modal, f1.upper + f2.upper);
    }

    static subtract(f1,f2){
        return new FuzzyNumber(f1.lower - f2.upper, f1.modal - f2.modal, f1.upper - f2.lower);
    }

    static multiply(f1, f2){
        return new FuzzyNumber(f1.lower * f2.lower, f1.modal * f2.modal, f1.upper * f2.upper);
    }

    static divide(f1, f2){
        return new FuzzyNumber(f1.lower / f2.upper, f1.modal / f2.modal, f1.upper / f2.lower);
    }

    static pow(f, val){
        return new FuzzyNumber(Math.pow(f.lower, val), Math.pow(f.modal, val), Math.pow(f.upper, val));
    }

}