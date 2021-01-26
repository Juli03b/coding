class Vehicle{
    constructor(make, model, year){
        // const {make, model, year} = this;
        this.make = make;
        this.model = model;
        this.year = year;
    }

    honk(){
        return 'Beep!'
    }

    toString() {
        return `This vehicle is a ${this.make} ${this.model} from ${this.year}`
    }
    
}

class Car extends Vehicle {
    constructor(make, model, year){

        super(make, model, year);
        
    }

    numWheels(){
        return 4;
    }
}

class Motorcycle extends Vehicle {
    constructor(make, model, year){

        super(make, model, year);

    }

    numWheels(){
        return 2;
    }

    revEngine(){
        return 'VROOM!'
    }
}

class Garage {
    constructor(capacity){

        if(capacity < 1) throw new Error('Must be a number greater than one');

        this.capacity = capacity;
        this.vehicles  = [];

    }
    
    add(vehicle){

        if(this.vehicles.length !== this.capacity){
            [vehicle.make, vehicle.model, vehicle.year].forEach((val) => {

                if(typeof val !== String || !val) return 'Only vehicles can be here!';

            })
            if(typeof vehicle === "object"){

               this.vehicles.push([vehicle.make, vehicle.model, vehicle.year]);
                return 'Parked!' 
                
             }else{

                return 'Only vehicles allowed!!!!';

             }

        }else{

            return 'Garage is FULL!'
        }

    }
}