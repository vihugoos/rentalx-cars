<div id="top"> </div>

[![CI/CD](https://github.com/vihugoos/rentx-cars/actions/workflows/main.yml/badge.svg)](https://github.com/vihugoos/rentx-cars/actions/workflows/main.yml)
[![codecov](https://codecov.io/gh/vihugoos/rentx-cars/branch/main/graph/badge.svg?token=NXUK7PXBKV)](https://codecov.io/gh/vihugoos/rentx-cars)


<!---- PROJECT LOGO ----> 
<div align="center">
    
  <h2 align="center"> 
    Rentx Cars - Server API 
  </h2>
  
  <p align="center">
    A complete RESTful API for car rentals, developed with Node.js <br/>
    Explore <a href="https://nodejs.org/en/docs/">Node.js</a> docs &#187; <br/> <br/>
    <a href="https://api-rentx.com/"> Deployment URL </a> &nbsp;•&nbsp;
    <a href="https://github.com/vihugoos/rentx-cars/issues"> Report Bug </a> &nbsp;•&nbsp;
    <a href="https://github.com/vihugoos/rentx-cars/issues"> Request Feature </a>
  </p>
</div>


<!---- TABLE OF CONTENTS ----> 
<details>
  <summary> Table of Contents </summary>
  <ol>
    <li>
      <a href="#about-the-project"> About The Project </a>
      <ul>
        <li><a href="#built-with"> Built With </a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started"> Getting Started </a>
      <ul>
        <li><a href="#prerequisites"> Prerequisites </a></li>
        <li><a href="#installation"> Installation </a></li>
      </ul>
    </li>
    <li><a href="#usage"> Usage </a></li>
    <li><a href="#contributing"> Contributing </a></li>
    <li><a href="#contact"> Contact </a></li>
  </ol>
</details>


<!---- THE PROJECT ---->
## About The Project 

<img src="https://user-images.githubusercontent.com/44311634/206552225-a6c4db19-a7d1-46d2-8b4d-f38eb14d2fab.png" align="center" alt="Project Home Page">
A complete RESTful API for car rentals, following SOLID principles and Clean Architecture, to be maintainable and scalable. As far as possible, concepts of high cohesion (function) and low coupling (data coupling) were applied, in addition to dependency injections, database using docker and unit and integration tests using Jest. 


## Rentx Cars - Requirements Documentation. 

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
- It must be possible to list all cars.

**RN** (<i>Business Rules</i>)
- To list available cars, the user does not need to be logged into the system.
- To list all cars, the user must be an administrator.

---


### Car Category 

**RF** (<i>Functional Requirements</i>)
- It must be possible to register a new category.
- It must be possible to import a CSV with many categories to create.
- It must be possible to list all categories.

**RN** (<i>Business Rules</i>)
- It must not be possible to register a new category for an existing category (with same name).
- The user responsible for the registration must be an administrator user.
- To list all categories, the user does not need to be logged into the system.

---


### Car Specifications 

**RF** (<i>Functional Requirements</i>)
- It must be possible to register a new specification for a car.
- It must be possible to list all specifications.

**RN** (<i>Business Rules</i>)
- It must not be possible to register a new specification for an existing specification (with same name).
- It must not be possible to register a specification for an unregistered car. 
- The user responsible for the registration must be an administrator user.
- To list all specifications, the user must be an administrator. 

---


### Car Images 

**RF** (<i>Functional Requirements</i>)
- It must be possible to register car image. 
- It must be able to list all car images.

**RNF** (<i>Non-functional requirements</i>)
- Use the multer library to upload the files. 

**RN** (<i>Business Rules</i>)
- The user must able to register more than one image for the same car. 
- The user responsible for the registration must be an administrator user. 
- To list all car images, the user must be an administrator.

---


### Car Rental Registration 

**RF** (<i>Functional Requirements</i>)
- It must be possible to register a new rental. 

**RN** (<i>Business Rules</i>)
- The rental must have a minimum duration of 24 hours. 
- It must not to be possible to register a new rental for a non-existent car.
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
- It must not be possible to return a non-existent rental.
- After the return, the car must be released for another rental.
- After the return, the user must be released for another rental.
- After the return, the rent total must be calculated.
- If the time of return is later than the estimated time of delivery, a fine will be charged proportional to the days of delay.
- If there are fines, they must be added to the total rent.
- The user must be logged into the application.

--- 


### Users

**RF** (<i>Functional Requirements</i>)
- It must be possible to create a new user.
- It must be possible to authenticate a user to the application.
- It must be possible to upload a new profile picture for the user (avatar).
- It must be possible to show all information about the user.
- It must to possible to list all users.

**RN** (<i>Business Rules</i>)
- It must not be possible to create a new user with an existing email.
- To create a new user, the user must not be logged into the application. 
- To list all users, the user must be an administrator.

---


### User Password Recovery

**RF** (<i>Functional Requirements</i>)
- It must be possible for the user to recover the password by informing the email.
- The user should received an e-mail with step-by-step for password recovery.
- The user should be able to get a new password.

**RN** (<i>Business Rules</i>)
- The user must enter a new password.
- The link sent for password recovery must expire in 24 hours.

---


### User Rentals Listing

**RF** (<i>Functional Requirements</i>)
- It must be possible to search all rentals made by user. 

**RN** (<i>Business Rules</i>)
- The user must be logged into the application.

<p align="right"><a href="#top"> &#129045; back to top </a></p>
