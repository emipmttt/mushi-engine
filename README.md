![218_1x_shots_so](https://github.com/user-attachments/assets/321cf28b-7995-4094-82a6-19c664c142f2)

# Mushi Engine

Mushi Engine is a simple visual game engine currently in development. It allows you to build your own worlds, set up characters, and program them using JavaScript. Designed to be user-friendly, Mushi Engine requires minimal knowledge to start creating your own games.

## Table of Contents

- [Introduction](#introduction)
- [Story](#story)
- [Features](#features)
- [Screenshots](#screenshots)
- [Installation](#installation)
- [Usage](#usage)
  - [Development](#development)
  - [Production Build](#production-build)
  - [Linting](#linting)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Introduction

Mushi Engine is designed to simplify the game development process by providing intuitive tools for world building, character creation, and scripting with JavaScript. Whether you're a beginner or an experienced developer, Mushi Engine offers a straightforward approach to crafting engaging games.

## Story

A few years ago, I embarked on a journey to learn game development with JavaScript. Despite the availability of existing JavaScript game engines, I found myself wanting a more streamlined and accessible tool. This led me to create Mushi Engine—a simple game engine that lowers the barrier to entry, allowing anyone to start building games without needing extensive knowledge. This project is a passion project, and I am committed to continuously enhancing it over time.

## Features

- **World Builder**: Create and design your own game scenarios effortlessly.
- **Character Builder**: Upload files to define sprites for different directions of your characters.
- **Code Editor**: Program the items and interactions within your world using JavaScript. (in progress)
- **Real-time Preview**: See changes in real-time as you build and script your game. (in progress)

## Screenshots

### Character Builder

Easily upload your sprite files to define the animations for your character in different directions.

![Character Builder](./screens/1.png)

### Code Editor

Program items and interactions within your world using a built-in JavaScript editor.

![Code Editor](./screens/2.png)

### World Builder

Design and create your own game scenarios with a straightforward interface.

![World Builder](./screens/3.png)

## Installation

### Prerequisites

Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Clone the Repository

```bash
git clone https://github.com/yourusername/mushi-engine.git
cd mushi-engine
```

### Install Dependencies

```bash
npm install
```

## Usage

### Development

To run the project in development mode with hot-reloading:

```bash
npm run serve
```

This command starts a local development server. Open your browser and navigate to `http://localhost:8080` to view the application. The server supports hot-reloading, so any changes you make to the code will automatically refresh the page.

### Production Build

To compile and minify the project for production:

```bash
npm run build
```

This command generates optimized and minified files suitable for deployment. The output will be located in the `dist` directory.

### Linting

To lint and fix files:

```bash
npm run lint
```

This command runs the linter to check for code style issues and automatically fixes them where possible.

## Configuration

You can customize the project configuration to suit your needs. Refer to the [Vue CLI Configuration Reference](https://cli.vuejs.org/config/) for detailed information on available options and settings.

## Contact

If you have any questions, suggestions, or feedback, feel free to reach out:

- **Email**: [emipmttt@gmail.com](mailto:emipmttt@gmail.com)
