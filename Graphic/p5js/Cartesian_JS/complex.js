class Complex{
    constructor(r,i){
        if ((r!=undefined)&&(i!=undefined)){
            this.real = r;
            this.im = i;
        }else{
            this.real = random(0,1);
            this.im = random(0,1);
        }
    }

    static i(){
        return new Complex(0,1);
    }

    static conjugate(a){
        return new Complex(a.real, -a.im);
    }

    static add(a,b){
        return new Complex(a.real + b.real, a.im + b.im);
    }

    static subtract(a,b){
        return new Complex(a.real - b.real, a.im - b.im);
    }

    static multiply(a,b){
        return new Complex(a.real * b.real - a.im * b.im, a.real*b.im + a.im*b.real);
    }

    static divide(a,b){
        let con = Complex.conjugate(b);
        let n = this.multiply(a,con);
        let m = this.multiply(b,con);
        return new Complex(n.real/m.real, n.im/m.real); 
    }

    static argument(a){
        if (a.real < 0){
            return atan(a.im/a.real)+PI;
        }
        return atan(a.im/a.real); 
    }

    static modulus(a){
        return sqrt(pow(a.real,2) + pow(a.im,2));
    }

    static power(a,n){
        let theta = this.argument(a);
    }

}
