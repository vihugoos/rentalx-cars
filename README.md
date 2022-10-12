# RentX Cars - Requirements Documentation. 

Application developed for car rental. 

<h2> Cars Registration </h2>

**RF** (<i>Functional Requirements</i>)
- It must be possible registration a new car.
- It must be possible to list all categories. 

**RN** (<i>Business Rules</i>)
- It must not be possible to register a car with an existing license plate.
- It must not be possible change an already registered license plate.
- The car must be registered, by default, with availability.
- The user responsible for the registration must be an administrator user. 


<h2> Car Listing </h2>

**RF** (<i>Functional Requirements</i>)
- It must be possible to list <strong>available</strong> cars. 
- It must be possible to list all available cars by category name.
- It must be possible to list all available cars by brand.
- It must be possible to list all available cars by car name.

**RN** (<i>Business Rules</i>)
- The user does not need to be logged into the system.


<h2> Car Specification Record </h2> 

**RF** (<i>Functional Requirements</i>)
- It must be possible to register a specification for a car.
- It must be possible to list all specifications. 
- It must be possible to list all cars. 
- The user responsible for the registration must be an administrator user.

**RN** (<i>Business Rules</i>)
- It must not be possible to register a specification for an unregistered car. 
- It must not be possible to register an existing specification for the same car. 

