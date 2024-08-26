Weather Dashboard
Overview
This project is a weather dashboard application that provides users with current weather conditions for different cities. The app dynamically updates based on the selected city, displaying details such as temperature, humidity, wind speed, and weather conditions. Users can switch between metric and imperial units, and the app features a responsive design to ensure a seamless experience across various devices.

Features
Current Weather Display: View the current weather conditions including temperature, humidity, wind speed, and description.
Dynamic Backgrounds: Background images change dynamically based on the current weather conditions.
Unit Toggle: Switch between Celsius and Fahrenheit to display temperature in your preferred unit.
Search Functionality: Search for weather information by entering the city name in the search bar.
Responsive Design: The application is optimized for all devices, ensuring a user-friendly experience on desktops, tablets, and smartphones.
Prerequisites
Node.js (LTS version recommended)
npm or yarn (included in the project)


Installation
Clone the Repository:

git clone https://github.com/your-username/Weather-app.git
Navigate to the Project Directory:



cd weather-dashboard

Install Dependencies:

npm install

Start the Development Server:
npm start



Usage

Open your browser and navigate to http://localhost:3000 to view the app.
Use the search bar to find weather information for any city.
Toggle between Celsius and Fahrenheit by clicking the unit switch.
The background will automatically adjust to reflect the weather conditions.

Project Structure
/src/components: Contains React components such as the search bar, unit toggle, and weather card.
/src/assets: Contains images used for dynamic backgrounds based on weather conditions.
/src/utils: Utility functions used across the application.

Technologies Used
React.js: A JavaScript library for building user interfaces.
Tailwind CSS: A utility-first CSS framework for styling.
Weather API: Used to fetch current weather data.