<div id="top"> </div>

[![CI/CD](https://github.com/vihugoos/rentx-cars/actions/workflows/main.yml/badge.svg)](https://github.com/vihugoos/rentx-cars/actions/workflows/main.yml)
[![codecov](https://codecov.io/gh/vihugoos/rentx-cars/branch/main/graph/badge.svg?token=NXUK7PXBKV)](https://codecov.io/gh/vihugoos/rentx-cars)


<!---- PROJECT LOGO ----> 
<div align="center">
  <img src="https://user-images.githubusercontent.com/44311634/206886221-17f1987d-717b-4729-8d53-efed02f33135.png" alt="Logo" height="175" />
    
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
    <li>
      <a href="#requirements-documentation"> Requirements Documentation </a>
      <ul>
        <li><a href="#cars-registration"> Cars Registration </a></li>
        <li><a href="#car-listing"> Car Listing </a></li>
        <li><a href="#car-category"> Car Category </a></li>
        <li><a href="#car-specifications"> Car Specifications </a></li>
        <li><a href="#car-images"> Car Images </a></li>
        <li><a href="#car-rental-registration"> Car Rental Registration </a></li>
        <li><a href="#car-devolution"> Car Devolution </a></li>
        <li><a href="#users"> Users </a></li>
        <li><a href="#user-password-recovery"> User Password Recovery </a></li>
        <li><a href="#user-rentals-listing"> User Rentals Listing </a></li>
      </ul>
    </li>
    <li><a href="#usage"> Usage </a></li>
    <li><a href="#tests"> Tests </a></li>
    <li><a href="#contributing"> Contributing </a></li>
    <li><a href="#contact"> Contact </a></li>
  </ol>
</details>


<!---- THE PROJECT ---->
## About The Project 

<img src="https://user-images.githubusercontent.com/44311634/206552225-a6c4db19-a7d1-46d2-8b4d-f38eb14d2fab.png" align="center" alt="Project Home Page">
A complete RESTful API for car rentals, following SOLID principles and Clean Architecture, to be maintainable and scalable. As far as possible, concepts of high cohesion (function) and low coupling (data coupling) were applied, in addition to dependency injections, providers, database using docker and unit and integration tests using Jest. User avatar and car images stored in an AWS S3 bucket.


### Built With 

<div style="display: inline_block">
    <!-- Icon Node.js --> 
    <a href="https://nodejs.org/en/"> 
      <img align="center" alt="Icon-Node.js" height="33" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"> 
    </a> &nbsp;
    <!-- Icon Yarn --> 
    <a href="https://yarnpkg.com/"> 
      <img align="center" alt="Icon-Yarn" height="33" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/yarn/yarn-original.svg"> 
    </a> &nbsp;
    <!-- Icon TypeScript --> 
    <a href="https://www.typescriptlang.org/"> 
      <img align="center" alt="Icon-TypeScript" height="33" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"> 
    </a> &nbsp;
    <!-- Icon Docker -->
    <a href="https://www.docker.com/"> 
      <img align="center" alt="Icon-Docker" height="53" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg"> 
    </a> &nbsp;
    <!-- Icon PostgreSQL --> 
    <a href="https://www.postgresql.org/"> 
      <img align="center" alt="Icon-PostgreSQL" height="35" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-plain.svg"> 
    </a> &nbsp;
    <!-- Icon TypeORM --> 
    <a href="https://typeorm.io/"> 
      <img align="center" alt="Icon-TypeORM" height="46" src="https://user-images.githubusercontent.com/44311634/206829885-5dc2e3bc-7598-4a85-bebc-7b80a8136c60.png"> 
    </a> &nbsp;
    <!-- Icon Express --> 
    <a href="https://expressjs.com/"> 
      <img align="center" alt="Icon-Express" height="33" src="https://user-images.githubusercontent.com/44311634/178337147-61b1e696-b4ef-4f78-8151-c3fb2597050a.png"> 
    </a> &nbsp;
    <!-- Icon Jest --> 
    <a href="https://jestjs.io/"> 
      <img align="center" alt="Icon-Jest" height="31" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg"> 
    </a> &nbsp;
    <!-- Icon Babel --> 
    <a href="https://babeljs.io/"> 
      <img align="center" alt="Icon-Jest" height="58" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/babel/babel-original.svg"> 
    </a> &nbsp;
    <!-- Icon Ubuntu --> 
    <a href="https://ubuntu.com/"> 
      <img align="center" alt="Icon-Ubuntu" height="36" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ubuntu/ubuntu-plain.svg"> 
    </a> &nbsp;
    <!-- Icon AWS --> 
    <a href="https://aws.amazon.com/"> 
      <img align="center" alt="Icon-Jest" height="38" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg"> 
    </a> 
</div>

<br/>
<br/>


<!---- GETTING STARTED ----> 
## Getting Started

To get started, you need to have <strong>Node.js 18+</strong> installed on your machine, for more information visit <a href="https://nodejs.org/en/download/"> Node.js Downloads</a>. You will also need to have <strong>Docker</strong> and <strong>Docker Compose</strong> installed, for more information visit <a href="https://docs.docker.com/engine/install/">Docker Engine Install</a> and <a href="https://docs.docker.com/compose/install/linux/"> Docker Compose Plugin Install </a>. 

<strong>Obs:</strong> This guide will only serve to run the project locally (development environment), initially based on linux systems.


### Prerequisites 

Other than node.js and docker installed, no prerequisites are needed to install the application.


### Installation 

1. Clone the repo 
   ```bash
   git clone https://github.com/vihugoos/rentx-cars.git
   ```
2. Inside the project root directory install all project dependencies 
   ```cmd
   yarn install
   ```
3. Create an `.env` file with environment variables for development 
   
   <strong>WARNING:</strong> Credentials are for testing purposes only, please change them in the future.
   
   ```bash
   cat > .env << EOF
   API_BASE_URL='http://localhost:3333' 
   DISK_STORAGE=local 
   MAIL_PROVIDER=ethereal 
   ENVIRONMENT=dev 

   DATABASE=rentx
   DATABASE_USERNAME=user_test 
   DATABASE_PASSWORD=12345 
   DATABASE_PORT=6443

   REDIS_HOST=localhost 
   REDIS_PORT=5385 

   JWT_SECRET_TOKEN=ec9bb4116d5a4c0023a690343c7e64a1 
   JWT_SECRET_REFRESH_TOKEN=056104641cb83398798c3f188a548040 
   EOF
   ```
4. Create avatar and cars folder
   ```cmd
   mkdir tmp/avatar | mkdir tmp/cars 
   ```
4. Create database services in docker containers 
   ```cmd
   docker compose up -d
   ```
5. Run the migrate 
   ```cmd
   yarn typeorm migration:run 
   ```


<!---- USAGE EXAMPLES ----> 
## Usage

With the installation complete, we can start the project.

* Starting the project 
   ```bash
   yarn run dev  
   ```


<!---- TESTS SETUP ----> 
## Tests

To be able to run all the tests, follow the commands below:

1. Install PostgreSQL Client
   ```bash
   sudo apt-get install -y postgresql-client
   ```
1. Open and connect terminal-based front-end for PostgreSQL (password: 12345)
   ```cmd
   psql -h localhost -p 6443 -U user_test -W rentx
   ```
2. Run the query (create a database just for testing) 
   ```sql
   CREATE DATABASE rentx_test;
   ```
3. Quit psql
   ```cmd
   \q
   ```
4. Run all test
   ```cmd
   yarn test 
   ```

<br/> <br/>


<!---- API Documentation  ----> 
## API Documentation

A complete and detailed documentation of the application in swagger. To view, visit [`api-rentx.com/api-docs/`](https://api-rentx.com/api-docs/)

<img src="https://user-images.githubusercontent.com/44311634/207956929-efe777a6-02a1-410e-8fbd-2eed71224084.jpg" align="center" alt="Swagger DOC">

<br/> <br/>


## Requirements Documentation 

A complete application specification, with all functional and non-functional requirements and business rules.

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

<br/> <br/> 


<!---- CONTRIBUTING ---->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<br/> 


<!---- CONTACT ---->
## Contact

Developer @vihugoos - victorhugoos@live.com  

<p align="right"><a href="#top"> &#129045; back to top </a></p> 
