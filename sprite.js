

//SPRITESHEET DIDDY 48x43

//Swimming animation
// Turn animation


class Sprite {
    constructor(spriteSheet, framesSwim, framesTurn, spriteWidth, spriteHeight) {
      this.framesSwim = framesSwim; // Indexes of frames
      this.framesTurn = framesTurn; // Indexes of frames

      this.w = spriteWidth;
      this.h = spriteHeight;

      this.animation = [];

      for (let i = 0; i < this.framesSwim + this.framesTurn; i++){
        console.log(i);
        let sprite = spriteSheet.get(i*spriteWidth, 0, spriteWidth, spriteHeight)
        this.animation.push(sprite);
      }
    }

    show(x, y, time, direction, isTurning) {
        let index = floor((time * this.framesSwim + frameCount*0.3)) % this.framesSwim;
        
        if (isTurning){
            index = floor (time * 4);
            if (index < 3){
                push();
                scale(-1, 1);
                image(this.animation[this.framesSwim + this.framesTurn - index - 1], -x, y);
                pop();
            } else{
                image(this.animation[this.framesSwim + index - 2], x, y);
            }
        }
        else{
            if (direction == DIR.RIGHT){
                image(this.animation[index], x, y);
            } else{
                push();
                scale(-1, 1);
                image(this.animation[index], -x, y);
                pop();
            }
        }
    }

    show(x, y, indexFrame, indexTurn){

        let index = floor((this.framesSwim + indexFrame)) % this.framesSwim;


        // From -9 to -2 : Swim left
        // From -2 to -1 : rotate left more
        // From -1 to  0 : rotate left less
        // From  0 to  1 : rotate right less
        // From  1 to  2 : rotate right more
        // From  2 to  9 : Swim right

        if (indexTurn < -2){
            push();
            scale(-1, 1);
            image(this.animation[index], -x, y);
            pop();
        }
        else if (indexTurn >= -2 && indexTurn < -1){
            image(this.animation[18], x, y);
        } else if (indexTurn >= -1 && indexTurn < 0){
            image(this.animation[17], x, y);
        } else if (indexTurn >= 0 && indexTurn < 1){
            image(this.animation[16], x, y);
        } else if (indexTurn >= 1 && indexTurn < 2){
            image(this.animation[15], x, y);
        } else if (indexTurn >= 2){
            image(this.animation[index], x, y);
        }

    }

  }
