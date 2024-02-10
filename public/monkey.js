class Monkey{
    constructor(){
        this.position = createVector(random(width), random(height));

        this.velocity = p5.Vector.random2D();
        this.velocity.setMag(random(2));
        this.prevVelocity = createVector();

        this.acceleration = createVector();
        this.prevAcceleration = createVector();
        this.maxForce = 0.2;
        this.maxSpeed = 3;

        this.indexFrame = random();
        
        // From -9 to -2 : Swim left
        // From -2 to -1 : rotate left more
        // From -1 to  0 : rotate left less
        // From  0 to  1 : rotate right less
        // From  1 to  2 : rotate right more
        // From  2 to  9 : Swim right
        this.indexTurn = 0;
        this.isTurning = false;
        if (this.velocity.x >= 0) {
            this.direction = DIR.RIGHT;
            this.indexTurn = this.maxSpeed;
        } else{ 
            this.direction = DIR.LEFT;
            this.indexTurn = this.maxSpeed;
        }
    }

    edges(){
        if (this.position.x > width) {
            this.position.x = 0;
        } else if (this.position.x < 0) {
            this.position.x = width;
        } if (this.position.y > height) {
            this.position.y = 0;
        } else if (this.position.y < 0) {
            this.position.y = height;
        }
    }

    align(monkeys){
        let perceptionRadius = 25;
        let steering = createVector();
        let total = 0;
        for (let other of monkeys){
            let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
            if (other != this && d<perceptionRadius){
                steering.add(other.velocity);
                total++;
            }
        }
        if (total > 0){
            steering.div(total);
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
        }
        return steering;
    }

    separation(monkeys){
        let perceptionRadius = 24;
        let steering = createVector();

        let total = 0;
        for (let other of monkeys){
            let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
            if (other != this && d<perceptionRadius){
                let diff = p5.Vector.sub(this.position, other.position);
                diff.div(d*d);
                steering.add(diff);
                total++;
            }
        }

        if (total > 0){
            steering.div(total);
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
        }
        return steering;
    }

    cohesion(monkeys) {
        let perceptionRadius = 50;
        let steering = createVector();
        let total = 0;
        for (let other of monkeys) {
          let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
          if (other != this && d < perceptionRadius) {
            steering.add(other.position);
            total++;
          }
        }
        if (total > 0) {
          steering.div(total);
          steering.sub(this.position);
          steering.setMag(this.maxSpeed);
          steering.sub(this.velocity);
          steering.limit(this.maxForce);
        }
        return steering;
      }


    flock(monkeys) {
        let alignment = this.align(monkeys);
        let cohesion = this.cohesion(monkeys);
        let separation = this.separation(monkeys);

        alignment.mult(parseFloat(alignSlider.value));
        cohesion.mult(parseFloat(cohesionSlider.value));
        separation.mult(parseFloat(separationSlider.value));
    
        this.acceleration.add(alignment);
        this.acceleration.add(cohesion);
        this.acceleration.add(separation);
    }
    
    update() {

        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed);

        if (this.velocity.x < 0) this.indexTurn -= 0.1;
        if (this.velocity.x > 0) this.indexTurn += 0.1;

        this.indexTurn = min(this.indexTurn, this.maxSpeed);
        this.indexTurn = max(this.indexTurn, -this.maxSpeed);

        this.indexFrame += 0.1;

/*         if (this.isTurning == false){
            //if (this.prevAcceleration.x * this.acceleration.x < 0){
            if (this.prevVelocity.x * this.velocity.x < 0){
                this.isTurning = true;

                if (this.velocity.x >= 0){
                    
                    this.direction = DIR.RIGHT;

                    this.indexFrame = 0;
                } else{
                    this.direction = DIR.LEFT;
                    this.indexFrame = 0.99;
                }
            }
        }

        if (this.isTurning == true){
            if (this.direction == DIR.LEFT) this.indexFrame -= 0.1;
            if (this.direction == DIR.RIGHT) this.indexFrame += 0.1;

            if (this.indexFrame < 0 || this.indexFrame > 1) {
                this.isTurning = false;
                this.indexFrame = random();
            }
        }

        this.prevVelocity = this.velocity.copy(); */

        this.acceleration.mult(0);
    }
    
    show(sprite) {
        strokeWeight(6);
        stroke(255);
        point(this.position.x, this.position.y);
        //sprite.show(this.position.x, this.position.y, this.indexFrame, this.direction, this.isTurning)
        sprite.show(this.position.x, this.position.y, this.indexFrame, this.indexTurn)
    }
}






