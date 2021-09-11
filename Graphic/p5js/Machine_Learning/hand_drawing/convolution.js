class Kernel{
    constructor(h,w,s){
        this.height = h;
        this.width = w;
        this.data = []
        for (let i =0; i< h; i++){
            this.data[i] = [];
            for (let j=0; j< w; j++){
                this.data[i][j] = s;
            }
        }
    }

    show(){
        console.table(this.data);
    }

    static newEdgeDetect(){
        let res = new Kernel(3,3, -1);
        res.data[1][1] = 8;
        return res;
    }

    static appleKernel(image, poX, poY, kernel){
        let rr=0;
        let rg=0;
        let rb=0
        for (let i=0; i<kernel.height; i++){
            for (let j=0; j<kernel.width; j++){
                let c = image.get(poX-1+i, poY-1+j);
                // let red = red(c);
                // let green = green(c);
                // let blue = blue(c);
                // rr += kernel[i][j] * red;
                // rg += kernel[i][j] * green;
                // rb += kernel[i][j] * blue;
            }
        }
        return color(rr,rg,rb);
    }

}