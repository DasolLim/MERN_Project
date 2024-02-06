# Fullstack (MERN Stack) Website Development

## Overview:
*The goal? To blend server-side and client-side scripting, using Node.js for the backend and a front-end framework*

## Key Objectives:
1. Create a slick web app using a RESTful web API.
2. Secure things with an authentication protocol for different user levels.
3. Be mobile-friendly and browser-compatible.
4. Don't forget the security and privacy policies.

## Features to Knock Out:
- Account creation with local authentication (email, password, nickname).
- Limited perks for non-logged-in users.
- Hero search with soft-matching and nifty extras.
- Lists of public hero lists (with ratings) for everyone to see.
- Authenticated users can create and manage their hero lists.
- Admin superpowers to manage users, reviews, and copyright stuff.

## API and Tech Stack:
- Node.js for the backend.
- Front-end framework of choice: React
- Keep it clean, modular, and easily extensible.

## Security and Policies:
- Tight security policies and privacy terms (publicly accessible).
- DMCA notice & takedown policy (keep it accessible).
- Tools for the admin to handle copyright disputes like a superhero.

## Website Display:
Hey there! Here's the quick visual display of my Fullstack Website Project!

### Home Page:
*User home page (default page)*
![MERN1](https://github.com/DasolLim/MERN-Project/assets/92288227/3209801c-6e7b-4bd3-b424-1f7d9c3fc8b7)

### User Dashboard:
*User Dashboard after logging in or registering a new account*
![MERN4](https://github.com/DasolLim/MERN-Project/assets/92288227/cb8761cc-cdf2-48b9-83f0-7c604d239879)

### Creating New Lists:
*User can create, delete, and edit public or private lists*
![MERN5](https://github.com/DasolLim/MERN-Project/assets/92288227/885fe84d-03c6-4382-97bb-862eadc6bd28)

### Search Page:
*User Search page for displaying public lists and searching for superhero name, race, publisher, and power*
![MERN6](https://github.com/DasolLim/MERN-Project/assets/92288227/5edadce8-e3af-434e-96a3-1ae0dc7ee2c6)

### Search Results:
*Users have ability to search on DDG by clicking on "Search on DDG" button*
![MERN7](https://github.com/DasolLim/MERN-Project/assets/92288227/1f6dac76-6ddd-48f4-8212-02d667ee1d4c)

### Admin Page:
*Admin has ability to disable/enable users and delete all lists created by all users*
![MERN8](https://github.com/DasolLim/MERN-Project/assets/92288227/5d3ba4c8-8cc7-469b-a1bc-c0fd26bfc62b)

# Deploying My Website on AWS: A Step-by-Step
Greetings, fellow engineering pals! 👋 As a third-year student navigating the AWS landscape, let me share my journey on uploading my website to an AWS server. Here's a chill summary:

## One-time Setup:
1. **Getting AWS Academy Access:**
   - I hit the "Get Started" button in the email invitation.
   - Created or logged into my Canvas account.
   - Shot an email to the instructor when no invite arrived.
   - Set up my Canvas account.

## Logging into AWS Academy:
1. Headed to [AWS Academy](https://awsacademy.instructure.com).
2. Clicked on my course, hit up the "Modules" section.
3. Launched the AWS Academy Learner Lab.
4. Clicked "Start Lab," patiently waited for the green AWS light.
5. Downloaded the SSH key from "AWS Details."
6. Clicked "AWS 🟢" to open the AWS console.

## Web Server Setup on AWS:
### Step 1: Setting Up the Server (One-time setup)
1. Fired up the AWS Management Console.
2. Launched an instance, stuck with Amazon Linux.
3. Named my instance, kept things default, allowed SSH, HTTPS, and HTTP in the security group.
4. Clicked "Launch instance" and chilled till it turned "Running."
5. Copied the "Public IPv4 DNS" from the instance details.

### Step 2: My Journey In
1. Returned to AWS Academy, tapped into "Readme," and slid into the "SSH Access" link.

### Step 3: Rocking Updates and Nginx
1. After login, I went for the software update with `sudo yum update`.
2. Threw in Nginx with `sudo yum install nginx`.
3. Popped open the browser, tossed in the server name - got the expected timeout.
4. Sprinkled some magic - `sudo systemctl enable nginx` and `sudo systemctl start nginx`.
5. Refreshed the browser - Boom! "Welcome to nginx!"

### Step 4: My Website’s Grand Entrance
1. Dived into Nginx config with `sudo nano /etc/nginx/nginx.conf`.
2. Switched "root /usr/share/nginx/html;" to "root /var/www/webtech/html;".
3. Saved, crafted necessary folders.
4. Checked permissions, poured in my HTML, and hit Nginx with a restart.
