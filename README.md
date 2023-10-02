![logo.jpg](frontend%2Fimg%2Flogo.jpg)
# JustTickIt - Task tracking web application.

> JustTickIt is a user-friendly and versatile task tracking app designed to help individuals
> streamline their work and boost productivity. With its intuitive interface and powerful features, 
> JustTickIt makes it easy to manage tasks, set priorities, and stay organized, whether you're a 
> busy professional, a student, or anyone looking to make the most out of their day.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Usage](#usage)

## Features

The application supports the following functionalities:

### Backend

- Basic CRUD operations for tasks, priorities, categories following REST style.
- Getting tasks by search values.
- Updating overall statistics.

### Frontend

- Display a list of all tasks and the ability to add/remove/update them.
- Display a list of tasks by category and the ability to add/remove/update them.
- Display a list of all priorities and the ability to add/remove/edit them.
- Display statistics.
- Task searching.
- Implements smart-dumb components architecture.

Both client-side and server-side operations are validated.

## Technologies Used

The application utilizes the following technologies:

### Backend

- Java 17
- Maven
- Lombok
- JPA
- MySQL
- Spring Boot

### Frontend

- Angular 16.2.0
- Angular Material

## Project Structure

The project follows a standard architecture:

- **Backend**:
    - Controllers: Handle incoming HTTP requests.
    - Services: Implement business logic.
    - Repositories: Manage database interactions.

- **Frontend**:
    - Components: Define UI components and interactions.
    - Services: Communicate with the backend.

## Getting Started

### Backend

1. Clone the repository.
2. Navigate to the backend directory.
3. Set up the database configuration in `application.properties`.
4. Build and run the Spring Boot application.

### Frontend

1. Navigate to the frontend directory.
2. Install Angular CLI if not already installed: `npm install -g @angular/cli`.
3. Install dependencies: `npm install`.
4. Start the Angular development server: `ng serve`.

## Usage

- Access the frontend application by navigating to `http://localhost:4200` in your web browser.
- Explore all the functionalities as described in the features.
