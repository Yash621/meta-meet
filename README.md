<div align="center" id="top"> 
  <img src="./frontend/public/title-logo.png" alt="meta-meet" width=80 />
</div>

<h1 align="center">MetaMeet.io</h1>

<p align="center">
  <img alt="Github top language" src="https://img.shields.io/github/languages/top/Yash621/meta-meet?style=flat-square">
  <img alt="Github stars" src="https://img.shields.io/github/stars/Yash621/meta-meet?style=flat-square" />
</p>

<br>

## :sparkles: Features

- **One to One and Room Group Messaging**
  - Instant text messaging
  - **Read receipts**
  - Instant user and room search by name
  - *Voice Recognition*
- **Video conferencing**
  - One to One and group calls
  - In Meet messaging
  - Screen Sharing
- **Gesture Control (X-factor / Flagship)**
  - **Physically thumbs up** (palm) in front of camera to turn **MIc off**
  - Thumbs down to **Mic on**
  - **Raise hand** to cut the call.
- **Offensive Text Detection**
  - **Flags and prompts** in case of offensive text messages to help create a safer in-app environment.
  - Prompts both in both in-meet and outside-meet chats.
- **Authentication**
  - Auth using secure **JWT** authentication.
  - Auth check in meet to **prevent unauthorized** users from entering.
<br></br>
## :eyes: [Preview](https://meta-meet.vercel.app)
![meta meet preview](./frontend/public/meta-meet-demo.gif)

## :fire: TechStack

1. Front End / Client Side
   - NextJS
   - TensorFlowJS - Gesture Detection
   - Redux - App state management
   - WebSockets - Real time data sharing
   - WebRTC - real time audio and video peer connections
2. BackEnd Server:
   - NodeJs
   - Express 
   - WebSockets - Real time data sharing
   - JWT - Authenication
3. Data Management (Databases): 
    - MongoDb - Data management and storage
    - Mongoose - Data modelling
4. Deployment
    - Heroku NodeJs environment - backend
    - Vercel - frontend

## :tada: Local setup

Before starting :checkered_flag:, you need to have [Git](https://git-scm.com) and [Node](https://nodejs.org/en/) installed.

```bash
# Clone this project
$ https://github.com/Yash621/meta-meet.git

$ cd meta-meet

# Install all the dependencies
$ npm install

# Run server for frontend
$ npm run dev

# The server will start at <http://localhost:3000>

# Run server for backend
$ npm run start

# The server will start at <http://localhost:9000>
```
Made with :heart: by <a href="https://github.com/Yash621" target="_blank">Yash Goel</a>

&#xa0;

<a href="#top">Back to top</a>


