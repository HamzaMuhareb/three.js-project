import vector from "./physics/vector.js";

class Skydiver {
  constructor(height, velocity, mass) {
    if (mass <= 40) {
      console.log('The skydiver cannot fly with a mass less than 40!');
      return; // Exit the constructor if the mass is less than 40
    }
    this.height = height;
    this.velocity = vector.create(0, velocity, 0); // Use vector for velocity
    this.position = vector.create(0, height, 0); // Use vector for position
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
    this.windAngle = 45; // Wind angle in degrees

    // Define time step
    this.dt = 0.01; // Time step in seconds

    this.time=0;
    // Define simulation loop
    this.interval = setInterval(() => {
      // Calculate forces
      const weight = vector.create(0, -this.mass * this.g, 0);
      const drag = this.velocity.multiply(-0.5 * this.rho * this.cd * this.velocity.getLength());
      const windForce = vector.create(this.windSpeed * Math.sin(this.windAngle * Math.PI / 180), 0, 0);
      const netForce = weight.add(drag).add(windForce);

      // Calculate acceleration
      const acceleration = netForce.multiply(1/this.mass);

      // Update velocity and position
      this.velocity.addTo(acceleration, this.dt);
      this.position.addTo(this.velocity, this.dt);

      this.time += this.dt;
      // Log the current position and velocity to the console
      console.log(`Time: ${this.time.toFixed(2)}, Position: (${this.position.getX().toFixed(2)}, ${this.position.getY().toFixed(2)}, ${this.position.getZ().toFixed(2)}), Velocity: (${this.velocity.getX().toFixed(2)}, ${-this.velocity.getY().toFixed(2)}, ${this.velocity.getZ().toFixed(2)})`);

      // Check if the skydiver has reached the desired height to open the parachute
      if (this.position.getY() <= 500 && !this.parachuteDeployed) {
        console.log('Opening the parachute!');
        this.parachuteDeployed = true;
        // Adjust the parachute drag coefficient and area here if needed
      }

      // Apply additional drag force when the parachute is deployed
      if (this.parachuteDeployed) {
        const parachuteDrag = this.velocity.multiply(-0.5 * this.rho * this.parachuteCd * this.parachuteArea * this.velocity.getLength());
        const netForceWithParachute = weight.add(drag).add(windForce).add(parachuteDrag);
        const accelerationWithParachute = netForceWithParachute.multiply(1/this.mass);
        this.velocity.addTo(accelerationWithParachute,this.dt);
      }
      
      // Check if the skydiver has landed
      if (this.position.getY() <= 0) {
        clearInterval(this.interval);
        console.log('The skydiver has landed safely!');
        // Calculate the shock
        const shock = this.initialVelocity - this.velocity.getY();
        console.log(`Shock upon landing: ${shock.toFixed(2)} m/s`);
      }
    }, this.dt * 1000);
  }
  
  setWindConditions(speed, angle) {
    this.windSpeed = speed;
    this.windAngle = angle;
  }

  setInitialConditions(height, velocity) {
    this.height = height;
    this.velocity = vector.create(0, velocity, 0);
    this.position = vector.create(0, height, 0);
    this.initialVelocity = velocity; // Track initial velocity
  }

  stopSimulation() {
    clearInterval(this.interval);
  }
}
const skydiver = new Skydiver(1000, 0, 50);
skydiver.setWindConditions(50, 90);
