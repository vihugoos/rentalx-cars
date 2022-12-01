[![CI/CD](https://github.com/vihugoos/rentx-cars/actions/workflows/main.yml/badge.svg)](https://github.com/vihugoos/rentx-cars/actions/workflows/main.yml)
[![codecov](https://codecov.io/gh/vihugoos/rentx-cars/branch/main/graph/badge.svg?token=NXUK7PXBKV)](https://codecov.io/gh/vihugoos/rentx-cars)

## RentX Cars - Requirements Documentation. 

Application developed for car rental. 


### Cars Registration 

**RF** (<i>Functional Requirements</i>)
- It must be possible registration a new car.

**RN** (<i>Business Rules</i>)
- It must not be possible to register a car with an existing license plate.
- The car must be registered, by default, with availability.
- The user responsible for the registration must be an administrator user. 

---


### Car Listing 

**RF** (<i>Functional Requirements</i>)
- It must be possible to list **available** cars. 
- It must be possible to list all available cars by car name.
- It must be possible to list all available cars by brand.
- It must be possible to list all available cars by category id.

**RN** (<i>Business Rules</i>)
- The user does not need to be logged into the system.

---


### Car Specification Registration 

**RF** (<i>Functional Requirements</i>)
- It must be possible to register a specification for a car.

**RN** (<i>Business Rules</i>)
- It must not be possible to register a specification for an unregistered car. 
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

**RF** (<i>Functional Requirements</i>)
- It must be possible to register a rental. 

**RN** (<i>Business Rules</i>)
- The rental must have a minimum duration of 24 hours. 
- It must not be possible to register a new rental if it's already open for the same user. 
- It must not be possible to register a new rental if it's already open for the same car. 
- The user must be logged into the application.
- After making a rental, the status of the car must be changed to unavailable.

---

### Car Devolution

**RF** (<i>Functional Requirements</i>)
- It must be possible to return the car.

**RN** (<i>Business Rules</i>)
- If the car returns with less than 24 hours, it must be charged for the full day.
- After the return, the car must be released for another rental.
- After the return, the user must be released for another rental.
- After the return, the rent total must be calculated.
- If the time of return is later than the estimated time of delivery, a fine will be charged proportional to the days of delay.
- If there are fines, they must be added to the total rent.
- The user must be logged into the application.

--- 

### User Rental Listing

**RF** (<i>Functional Requirements</i>)
- It must be possible to search all rentals made by user. 

**RN** (<i>Business Rules</i>)
- The user must be logged into the application.

---

### Password recovery

**RF** (<i>Functional Requirements</i>)
- It must be possible for the user to recover the password by informing the email.
- The user should received an e-mail with step-by-step for password recovery.
- The user should be able to get a new password.

**RN** (<i>Business Rules</i>)
- The user must enter a new password.
- The link sent for password recovery must expire in 3 hours.

