let particles=[];
let names;
let blurDisplay;
function preload(){
   
    names=[
        "Bert",
        "Dave",
        "Steve",
        "Scott",
        "Cal",
        "Chad",
        "Jack",
        "Mark",
        "Jason",
        "Zach",
        "Sam",
        "Ted",
        "Ned",
        "Randy",
        "Garry",
        "Frank",
        "Robert",
        "Dan",
        "Mike",
        "Edwina",
        "Mackenzie",
        "Clint",
        "Rebeca",
        "James",
        "Simon",
        "Spencer"
    ];

}

function addParticle(inputId1,inputId2){
    let n1=document.getElementById(inputId1).value;
    let n2=document.getElementById(inputId2).value;
    let np=new Particle(random(0,width),random(0,height));
    np.name=n1;
    np.id=n2;
    particles.push(np);
}

function setup(){
    createCanvas(windowWidth/2,windowHeight/2);
    blurDisplay=createGraphics(windowWidth/2,windowHeight/2);
    
    
    for(let i=0;i<names.length;i++){
        //particles[i]=new particle(random(0,width),random(0,height));
        //particles[i].name=names[i];

    }
      

   
}
function draw(){
   // background(255);
   blurDisplay.fill(255,50);
   blurDisplay.rect(0,0,width,height);
   image(blurDisplay,0,0,width,height);
        
        for(let i=0;i<particles.length;i++){
            particles[i].update();
for(let j=0;j<particles.length;j++){
    if(j!=i){
        let jc= [];
        jc.push(...particles[j].connected, ...particles[j].toConnect);
        let ic= [];
        ic.push(...particles[i].connected, ...particles[i].toConnect);
        if(ic.indexOf(j)==-1&&jc.indexOf(i)==-1){
            
            if(particles[i].pos==particles[j].pos){
                particles[j].pos.x+=0.01;
            }
        let d=p5.Vector.dist(particles[j].pos,particles[i].pos);
        if(d>0&&d<particles[i].dd){
            particles[i].ApplyForce(p5.Vector.sub(particles[i].pos,particles[j].pos).normalize().mult((particles[i].dd-d)/particles[i].dd));
            stroke(255,0,0);
            line(particles[i].pos.x,particles[i].pos.y,particles[j].pos.x,particles[j].pos.y);
        }
        if(d>particles[i].dd&&d<particles[i].dd*2&&particles[i].id==particles[j].id){
            particles[i].ApplyForce(p5.Vector.sub(particles[i].pos,particles[j].pos).normalize().mult((particles[i].dd*2-d)/-(particles[i].dd*2)));
            stroke(0,0,255);
            line(particles[i].pos.x,particles[i].pos.y,particles[j].pos.x,particles[j].pos.y);
        }
        if(d>0&&d<4){
            particles[i].addConnection(j);
        }
    }else{
        
    }
    }
}

        
         if(mouseIsPressed&&mouseX>=0&&mouseX<=width&&mouseY>=0&&mouseY<=height)
         {
            particles[i].ApplyForce(p5.Vector.sub(createVector(mouseX,mouseY),particles[i].pos).normalize());
        }
    }
    for(let i=0;i<particles.length;i++){
        particles[i].display();
    }
}
class Particle{
    
    constructor(x,y){
        this.pos=createVector(x,y);
        this.vel=createVector(0,0);
        this.acc=createVector(0,0);
        this.r=10;
        this.connected=[];
        this.toConnect=[];
        this.dd=100;
        this.id=int(random(0,6));
        //random(20,40);
        this.col=color(random(0,255),random(0,255),random(0,255));
        
    }

    update(){
        for(let j=0;j<this.toConnect.length;j++){

            this.connected.push(this.toConnect[j]);
        }
        this.toConnect=[];
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.acc=createVector(0,0);

        this.edges(false);
        this.friction();

        for(let i=0;i<this.connected.length;i++){
            let connectedParticle=particles[this.connected[i]];
            let dVector=p5.Vector.sub(connectedParticle.pos,this.pos);
            if(dVector==createVector(0,0)){
                dVector=createVector(0.1,0);
            }
            let ndVector=createVector(dVector.x,dVector.y);
            ndVector.normalize();
            
            ndVector.mult(this.dd);
            let p=createVector(connectedParticle.pos.x,connectedParticle.pos.y)
            connectedParticle.pos=ndVector.add(this.pos);
            //connectedParticle.vel.add(p5.Vector.sub(connectedParticle.pos,p).mult(0.5));
            stroke(0,255,0);
            line(this.pos.x,this.pos.y,connectedParticle.pos.x,connectedParticle.pos.y);
        }
        //window.console.log(this.pos,this.vel,this.acc);
    }

    display(){
        ellipseMode(CENTER);
        blurDisplay.fill(0,0);
        blurDisplay.stroke(this.col);
        stroke(this.col);
        blurDisplay.strokeWeight(this.r);
        strokeWeight(1);
        blurDisplay.line(this.pos.x,this.pos.y,this.pos.x-this.vel.x,this.pos.y-this.vel.y);
        //blurDisplay.ellipse(this.pos.x,this.pos.y,this.r,this.r);
        if(this.name!=null){

            //if(dist(mouseX,mouseY,this.pos.x,this.pos.y)<=this.r)
            {
            fill(0);
            textAlign(CENTER);
            text(this.name,this.pos.x,this.pos.y-10);
            
            
        }
        }
        let ncl=[];
        for(let i=0;i<this.connected.length;i++){

            if(p5.Vector.dist(this.pos,particles[this.connected[i]].pos)>this.dd+1||p5.Vector.dist(this.pos,particles[this.connected[i]].pos)<this.dd-1){
                ncl.push(this.connected[i]);
            }else{
                ncl.push(this.connected[i]);
            }

        }
        this.connected=ncl;
    }

    ApplyForce(force){
        let mass= 20;
        this.acc.add(createVector(force.x/mass,force.y/mass));
    }

    addConnection(i){
        this.toConnect.push(i);
    }

    edges(l){

        if(this.pos.x>width-this.r/2){
            if(l==false)
            {
            this.vel.x*=-0.5;
            this.pos.x=width-this.r/2;
        }else{
            this.pos.x-=width;
        }
        }
        else if(this.pos.x<this.r/2){
            if(l==false)
            {
                this.vel.x*=-0.5;
                this.pos.x=this.r/2;
            }else{
                this.pos.x+=width;  
            }
            
        }
        if(this.pos.y>height-this.r/2){
            if(l==false)
            {
                this.vel.y*=-0.5;
                this.pos.y=height-this.r/2;
            }else{
                this.pos.y-=height;
            }
            
        }
        else if(this.pos.y<this.r/2){
            if(l==false)
            {
                this.vel.y*=-0.5;
                this.pos.y=this.r/2;
            }else{
                this.pos.y+=height;
            }
            
        }

    }

    friction(){
        this.vel.mult(0.99);
    }

}

function windowResized() {
    resizeCanvas(windowWidth/2, windowHeight/2);
    blurDisplay=createGraphics(width,height);
  }