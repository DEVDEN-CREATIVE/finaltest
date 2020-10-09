// Points for fingers
const fingerJoints = {
  thumb: [0, 1, 2, 3, 4],
  indexFinger: [0, 5, 6, 7, 8],
  middleFinger: [0, 9, 10, 11, 12],
  ringFinger: [0, 13, 14, 15, 16],
  pinky: [0, 17, 18, 19, 20],
};

// Infinity Gauntlet Style
const style = {
  0: { color: "black", size: 15 },
  1: { color: "gold", size: 6 },
  2: { color: "green", size: 10 },
  3: { color: "gold", size: 6 },
  4: { color: "gold", size: 6 },
  5: { color: "purple", size: 10 },
  6: { color: "gold", size: 6 },
  7: { color: "gold", size: 6 },
  8: { color: "gold", size: 6 },
  9: { color: "blue", size: 10 },
  10: { color: "gold", size: 6 },
  11: { color: "gold", size: 6 },
  12: { color: "gold", size: 6 },
  13: { color: "red", size: 10 },
  14: { color: "gold", size: 6 },
  15: { color: "gold", size: 6 },
  16: { color: "gold", size: 6 },
  17: { color: "orange", size: 10 },
  18: { color: "gold", size: 6 },
  19: { color: "gold", size: 6 },
  20: { color: "gold", size: 6 },
};

// Drawing function
export const drawHand = (predictions, ctx) => 
{
  // Check if we have predictions
  if (predictions.length > 0) 
  {
    // Loop through each prediction
    predictions.forEach((prediction) => {
      // Grab landmarks
      const landmarks = prediction.landmarks;

      // Loop through fingers
      for (let j = 0; j < Object.keys(fingerJoints).length; j++) {
        let finger = Object.keys(fingerJoints)[j];
        //  Loop through pairs of joints
        for (let k = 0; k < fingerJoints[finger].length - 1; k++) {
          // Get pairs of joints
          const firstJointIndex = fingerJoints[finger][k];
          const secondJointIndex = fingerJoints[finger][k + 1];

          // Draw path
          ctx.beginPath();
          ctx.moveTo(
            landmarks[firstJointIndex][0],
            landmarks[firstJointIndex][1]
          );
          ctx.lineTo(
            landmarks[secondJointIndex][0],
            landmarks[secondJointIndex][1]
          );
          ctx.strokeStyle = "plum";
          ctx.lineWidth = 4;
          ctx.stroke();
        }
      }
      var wrist= new Image();
      wrist.setAttribute('src',"https://ashish7777777.github.io/bracelet/bracelet.png ");
      var ring= new Image();
      ring.setAttribute('src','https://ashish7777777.github.io/Ring/ring.png');
      //wrist.setAttribute('src','https://restcountries.eu/data/afg.svg');
      var RingfingerX=landmarks[13][0];
      var RingfingerY=landmarks[13][1];
      var RingfingerUpperJointX=landmarks[14][0];
      var RingfingerUpperJointY=landmarks[14][1];
      var finger_angle_in_radian=Math.atan((RingfingerUpperJointY - RingfingerY )/(RingfingerUpperJointX- RingfingerX ));
      if(RingfingerUpperJointX-RingfingerX>0)
      {
        finger_angle_in_radian=-finger_angle_in_radian;
      }
      else
      {
        finger_angle_in_radian=Math.PI+(-finger_angle_in_radian);
      }

      ctx.save();
      ctx.translate(landmarks[14][0],landmarks[14][1]);
      ctx.rotate((Math.PI/2 - finger_angle_in_radian));
      ctx.drawImage(ring,-ring.width/2,-ring.height/2+50);
      ctx.restore();
      


      //calculating angle......
      var wristX=landmarks[0][0];
      var wristY=landmarks[0][1];
      var middleFingerX=landmarks[9][0];
      var middleFingerY=landmarks[9][1];
      var angle_in_radian=Math.atan((middleFingerY - wristY )/(middleFingerX- wristX ));
      /*if( (middleFingerX - wristX)<0 )
      {
        angle_in_radian=-angle_in_radian;
      }*/
      var angle_in_degree=(angle_in_radian*180/Math.PI);
      if(middleFingerX - wristX>0)
      {
        console.log(-angle_in_radian+"positive");
        angle_in_radian=-angle_in_radian;
      }
         
      else
      {
        console.log(Math.PI+angle_in_radian+"negative");
        angle_in_radian=1*Math.PI+(-angle_in_radian);
      }

      ctx.save();
      ctx.translate(landmarks[0][0],landmarks[0][1]);
     // ctx.rotate(-((Math.PI/2)-angle_in_radian));
      ctx.rotate((Math.PI/2 - angle_in_radian));
      ctx.drawImage(wrist,-wrist.width/2,-wrist.height/2+50);
      ctx.restore();
      // Loop through landmarks and draw em
      for (let i = 1; i < landmarks.length; i++) {
        // Get x point
        const x = landmarks[i][0];
        // Get y point
        const y = landmarks[i][1];
        // Start drawing
        console.log(landmarks[8][0]+"<---X---Y--->"+landmarks[8][1]);
        ctx.beginPath();
        ctx.arc(x, y, style[i]["size"], 0, 3 * Math.PI);
        // Set line color
        ctx.fillStyle = style[i]["color"];
       // ctx.fill();
      }
       /* let model = document.createElement('x-model');
        model.setAttribute('src','LeePerrySmith.obj');
        model.setAttribute('id','abc');

        model.style.width="200px";
        model.style.height="200px";
        model.style.position="absolute";
        model.style.trasform="translateZ(-200px) rotateZ(40deg)";*/

    });
  }
};
