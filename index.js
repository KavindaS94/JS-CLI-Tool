#!/usr/bin/env node

const fs = require('fs'); // File System module to handle file operations

// Define the project structure: directories and their respective files

const projectStructure = {
  'src': ['index.js'],
  'public': ['index.html', 'styles.css'],
};

// Iterate over the structure, creating directories and files

Object.entries(projectStructure).forEach(([dir, files]) => {
  fs.mkdirSync(dir, { recursive: true }); // Create directories
  files.forEach(file => fs.writeFileSync(`${dir}/${file}`, '')); // Create files
});

console.log("Project structure created successfully!");