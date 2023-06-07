
/*
  class Skydiver {
    constructor(name, velocity, acceleration, isSkydiving,position,dragForce,angle,parachutMass,skydiverMass) {
      this.name = name;
      this.velocity = velocity;
      this.acceleration = acceleration;
      this.isSkydiving = isSkydiving;
      this.position = position;
      this.dragForce = dragForce;
      this.angle = angle;
      this.parachutMass = parachutMass;
      this.skydiverMass = skydiverMass;
    }
  
    calculateForces() {
     // const velocity=50;
      const gravityForce = 9.8;
      const airResistance = 0.5;
      const netForce = gravityForce - (airResistance * this.velocity * this.velocity);
      this.acceleration = netForce;
      this.velocity = this.acceleration;
      return netForce;
    }
  
    updatePosition() {
      if (this.isSkydiving) {
        this.calculateForces();
        console.log(`Time: ${new Date().toLocaleTimeString()}`);
        console.log(`${this.name} - Velocity: ${this.velocity.toFixed(2)} m/s, Acceleration: ${this.acceleration.toFixed(2)} m/s^2`);
        setTimeout(() => {
          this.updatePosition();
        }, 2000); // Update every 2 seconds (2000 milliseconds)
      } else {
        console.log(`${this.name} is not skydiving.`);
      }
    }
  }
  */
/* const skydiver1 = new Skydiver("John", 0, 0, true,true,20,90,300,75);
  skydiver1.calculateForces();
  skydiver1.updatePosition();
 
  

const skydiver = new Skydiver({ x: 0, y: 0 }, 5, 70, 25, 45, 0, 9.8);

// Access the instance properties
console.log(skydiver1.position);
console.log(skydiver1.parachutMass);
console.log(skydiver1.skydiverMass);
console.log(skydiver1.dragForce);
console.log(skydiver1.angle);
console.log(skydiver1.velocity);
console.log(skydiver1.acceleration);
*/
/*
class Skydiver {
  constructor(height, velocity, mass) {
    this.height = height;
    this.velocity = velocity;
    this.position = 0;
    this.mass = mass;

    // Define constants
    this.g = 9.81; // Acceleration due to gravity in m/s^2
    this.rho = 1.2; // Density of air in kg/m^3
    this.cd = 0.75; // Drag coefficient

    // Define wind conditions
    this.windSpeed = 5; // Wind speed in m/s
    this.windAngle = 45; // Wind angle in degrees

    // Define time step
    this.dt = 0.01; // Time step in seconds
    
    // Define simulation loop
    this.interval = setInterval(() => {
      // Calculate forces
      const weight = this.mass * this.g;
      const drag = 0.5 * this.rho * this.cd * Math.pow(this.velocity, 2);
      const windForce = this.windSpeed * Math.sin(this.windAngle * Math.PI / 180);
      const netForce = weight - drag + windForce;

      // Calculate acceleration
      const acceleration = netForce / this.mass;

      // Update velocity and position
      this.velocity += acceleration * this.dt;
      this.position+= this.velocity * this.dt;
      // Log the current position and velocity to the console
      console.log(`Position: ${this.position.toFixed(2)} m, Velocity: ${this.velocity.toFixed(2)} m/s`);

      // Check if the skydiver has landed
      if (this.position <= 0) {
        clearInterval(this.interval);
        console.log('The skydiver has landed safely!');
         
      }
    }, this.dt * 1000);
  }

  setWindConditions(speed, angle) {
    this.windSpeed = speed;
    this.windAngle = angle;
  }

  setInitialConditions(height, velocity) {
    this.height = height;
    this.velocity = velocity;
  }

  stopSimulation() {
    clearInterval(this.interval);
  }
}// Example usage
const skydiver = new Skydiver(1000, 0, 75);
skydiver.setWindConditions(10, 90);
skydiver.setInitialConditions(1500, 10);
skydiver.stopSimulation();

*/
//import "./physics/vector.js" ;
class Skydiver {
  constructor(height, velocity, mass) {
    if (mass <= 40) {
      console.log('The skydiver cannot fly with a mass less than 40!');
      return; // Exit the constructor if the mass is less than 40
    }
    this.height = height;
    this.velocity = velocity;
    this.position = height;
    this.mass = mass;
    this.initialVelocity = velocity; // Store initial velocity for shock calculation
     
     // Define parachute properties
    this.parachuteArea = 25; // Parachute surface area in m^2
    this.parachuteCd = 1.5; // Parachute drag coefficient
    this.parachuteDeployed = false;
  

    // Define constants
    this.g = 9.81; // Acceleration due to gravity in m/s^2
    this.rho = 1.2; // Density of air in kg/m^3
    this.cd = 0.75; // Drag coefficient

    // Define wind conditions
    this.windSpeed = 5; // Wind speed in m/s
    this.windAngle = 45;

    // Define time step
    this.dt = 0.01; // Time step in seconds // Wind angle in degrees

    // Define simulation loop
    this.interval = setInterval(() => {
      // Calculate forces
      const weight = this.mass * this.g;
      const drag = 0.5 * this.rho * this.cd * Math.pow(this.velocity, 2);
      const parachuteDrag = 0.5 * this.rho * this.parachuteCd * this.parachuteArea * Math.pow(this.velocity, 2);
      const windForce = this.windSpeed * Math.sin(this.windAngle * Math.PI / 180);
      const netForce = weight - drag + windForce;
     
      // Calculate acceleration
      const acceleration = netForce / this.mass;

      // Update velocity and position
      this.velocity += acceleration * this.dt;
      this.position -= this.velocity * this.dt;
      
      
      // Log the current position and velocity to the console
      console.log(`Time: ${new Date().toLocaleTimeString()}, Position: ${this.position.toFixed(2)} m, Velocity: ${this.velocity.toFixed(2)} m/s,
      `);

  
    
       // Check if the skydiver has reached the desired height to open the parachute
        if (this.position <= 1000 && !this.parachuteOpened) {
        console.log('Opening the parachute!');
        this.parachuteOpened = true;
        // Adjust the parachute drag coefficient and area here if needed
      }

    // Apply additional drag force when the parachute is deployed
    if (this.parachuteDeployed) {
      const parachuteDrag = 0.5 * this.rho * this.parachuteDragCoefficient * Math.pow(this.velocity, 2);
      const netForceWithParachute = weight - drag + windForce - parachuteDrag;
      const accelerationWithParachute = netForceWithParachute / this.mass;
      this.velocity += accelerationWithParachute * this.dt;
    }


      // Check if the skydiver has landed
      if (this.position <=0 ) {
        clearInterval(this.interval);
        console.log('The skydiver has landed safely!');
         // Calculate the shock
         const shock = this.initialVelocity - this.velocity;
         console.log(`Shock upon landing: ${shock.toFixed(2)} m/s`);
      /*  const finalVelocity = this.velocity;
        const shock = this.initialVelocity - finalVelocity;
        console.log(`The skydiver has landed with a shock of ${shock.toFixed(2)} m/s.`);*/
      
      }

    }, this.dt * 1000);
  }
  /*
  gravity_force(gravity) {
    return vector.create(0, -gravity *this.total_mass, 0);
    }
    //drag
    drag_force(rho) {
      let velocitySquere = this.velocity.squere();
      let normalize = this.velocity.normalize();
      let drag = vector.create(
        ((velocitySquere * -1) / 2) *
          this.drag_coeff *
          rho *
          1 *
          normalize.getX(),
        ((velocitySquere * -1) / 2) *
          this.drag_coeff *
          rho *
          1 *
          normalize.getY(),
        ((velocitySquere * -1) / 2) *
          this.drag_coeff *
          rho *
          1 *
          normalize.getZ()
      );
      return drag;
      }
  Update(time, gravity, air_rho){
    let gravityForce = this.gravity_force(gravity);
    let dragForce = this.drag_force(air_rho);
    let totalForce = vector.create(
      dragForce.getX()+gravityForce.getX(),
      gravityForce.getY() + dragForce.getY(),
      dragForce.getZ());
    }*/
  setWindConditions(speed, angle) {
    this.windSpeed = speed;
    this.windAngle = angle;
  }
  setInitialConditions(height, velocity) {
    this.height = height;
    this.velocity = velocity;
    this.initialVelocity = velocity; // Track initial velocity
  }
  stopSimulation() {
    clearInterval(this.interval);
  }
}
const skydiver = new Skydiver(1500, 0, 50);// shrout awliye 3nd insha2 la3eb kfzmzli
skydiver.setWindConditions(5, 90);
//skydiver.setInitialConditions(1000, 0);   //3nd mou7akat
//skydiver.Update(1000,9.8,60)

