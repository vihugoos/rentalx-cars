## RentX Cars - Requirements Documentation. 

Application developed for car rental. 


### Cars Registration 

**RF** (<i>Functional Requirements</i>)
- It must be possible registration a new car.

**RN** (<i>Business Rules</i>)
- It must not be possible to register a car with an existing license plate.
- It must not be possible change an already registered license plate.
- The car must be registered, by default, with availability.
- The user responsible for the registration must be an administrator user. 

---


### Car Listing 

**RF** (<i>Functional Requirements</i>)
- It must be possible to list **available** cars. 
- It must be possible to list all available cars by category name.
- It must be possible to list all available cars by brand.
- It must be possible to list all available cars by car name.

**RN** (<i>Business Rules</i>)
- The user does not need to be logged into the system.

---


### Car Specification Registration 

**RF** (<i>Functional Requirements</i>)
- It must be possible to register a specification for a car.

**RN** (<i>Business Rules</i>)
- It must not be possible to register a specification for an unregistered car. 
- It must not be possible to register an existing specification for the same car. 
- The user responsible for the registration must be an administrator user.

---


### Car Image Registration

**RF** (<i>Functional Requirements</i>)
- It must be possible to register car image. 

**RNF** (<i>Non-functional requirements</i>)
- Use the multer library to upload the files. 

**RN** (<i>Business Rules</i>)
- The user must able to register more than one image for the same car. 
- The user responsible for the registration must be an administrator user. 

---


### Car Rental 

**RF** (<i>Functional Requirements</i>
- It must be possible to register a rental. 

**RN** (<i>Business Rules</i>)
- The rental must have a minimum duration of 24 hours. 
- It must not be possible to register a new rental if it's already open for the same user. 
- It must not be possible to register a new rental if it's already open for the same car. 

