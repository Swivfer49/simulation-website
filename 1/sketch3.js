let noiseDetail=8;
let proDif=2;
let offsetX=0;
let offsetY=0;
let seed=2;



function setup(){
    createCanvas(200,200);
    resetN();

}

function draw(){

}

function resetN(){

    let img=createImage(width,height);
    img.loadPixels();
    for(let x=0;x<width;x++){
        for(let y=0;y<height;y++){

            img.set(x,y,color(getValue(x,y)));

        }
    }
    img.updatePixels();
    image(img,0,0);
}


function getValue(x,y){

    noiseSeed(seed);
    let n1=noise((x+offsetX)/noiseDetail,(y+offsetY)/noiseDetail);
    let n2=noise((x+offsetX)/(noiseDetail*proDif),(y+offsetY)/(noiseDetail*proDif));
    let r=Math.min(width/2,height/2);
    let d=constrain(dist(x,y,width/2,height/2)-r,0,Infinity);
    let v1=constrain(n2,0,d/r);
    let v2=constrain(v1,0,n1);
    let v3=v2*255;

    return v3;
}