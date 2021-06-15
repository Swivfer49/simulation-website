let lines=[];

function setup(){

    //setup the canvas
    createCanvas(windowWidth,windowHeight);

    //make all the lines
    for(let i=0;i<10;i++){

        lines[i]=new Bound(random(width),random(height),random(width),random(height));

    }

    //add lines for the edges
    lines.push(new Bound(0,0,width,0));
    lines.push(new Bound(width,0,width,height));
    lines.push(new Bound(width,height,0,height));
    lines.push(new Bound(0,height,0,0));

}

function draw(){

    //background(0);
    fill(0,40);
    rect(0,0,width,height);
    stroke(255,100);


    //raycasting origin mouse pointer
    let pos=createVector(mouseX,mouseY);
    for(let r=0;r<360;r+=0.5){

        let dir=p5.Vector.fromAngle(radians(r));
        let pt=raycast(pos,dir,lines);
        if(pt!=null){
            line(pos.x,pos.y,pt.x,pt.y);
        }

    }

}

//a class that is a line
class Bound{

    constructor(x1,y1,x2,y2){

        //the first point
        this.pos1=createVector(x1,y1);

        //the second point
        this.pos2=createVector(x2,y2);
    }

}

//is like a laser
//returns a point
function raycast(pos,dir,lns){

    let record=Infinity;
    let clpt=null;

    for(let i=0;i<lns.length;i++){

        let pt=rayCastLine(pos,dir,lns[i]);
        if(pt!=null){
            let d=p5.Vector.dist(pt,pos);
            if(d<record){
                record=d;
                clpt=pt;
            }
        }

    }

    return clpt;

}

//is like a laser
//returns a point
function rayCastLine(pos,dir,ln){

    const x1=ln.pos1.x;
    const y1=ln.pos1.y;
    const x2=ln.pos2.x;
    const y2=ln.pos2.y;
    const x3=pos.x;
    const y3=pos.y;
    const x4=pos.x-dir.x;
    const y4=pos.y-dir.y;
    const den=(x1-x2)*(y3-y4)-(y1-y2)*(x3-x4);
    if(den!=0){
      const t=((x1-x3)*(y3-y4)-(y1-y3)*(x3-x4))/den
      const u=((x1-x2)*(y1-y3)-(y1-y2)*(x1-x3))/den
      if(t>0&&t<1&&u>0){
        let pt=createVector((x1+t*(x2-x1)),(y1+t*(y2-y1)));
        return pt;
       
      }
    }
}

