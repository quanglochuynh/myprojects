byte[] data = loadBytes("data/airplane.npy");
int total = 2000;
byte[] outData = new byte[total*784];
int outIndex = 0;

size(280,280);
for (int n=0; n<total; n++){
  //PImage img = createImage(28,28,RGB);
  //img.loadPixels();
  for (int i=0; i<784; i++){
    byte val = data[i+80+n*784];
    //img.pixels[i] = color(255-val & 0xff);
    outData[outIndex] = val;
    outIndex++;
    //println(red(img.pixels[i]));
  }
  //img.updatePixels();
  //int x = 28* (n%10);
  //int y = 28* (n/10);
  //image(img,x,y);
}


saveBytes("airplane2000.bin", outData);
println("done");
