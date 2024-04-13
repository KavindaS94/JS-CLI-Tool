#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const process = require('process');

const defaultStructure = {
  'src': ['index.js'],
  'public': ['index.html', 'styles.css'],
};

// Helper function to create a directory
function createDirectory(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Directory created: ${dir}`);
  } else {
    console.log(`Directory already exists: ${dir}`);
  }
}

// Helper function to create a file with a basic template
function createFile(filePath) {
  if (!fs.existsSync(filePath)) {
    const extension = path.extname(filePath);
    let content = '';
    switch (extension) {
      case '.html':
        content = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Title</title></head><body></body></html>';
        break;
      case '.css':
        content = '/* CSS file */';
        break;
      case '.js':
        content = '// JavaScript file';
        break;
    }
    fs.writeFileSync(filePath, content);
    console.log(`File created: ${filePath}`);
  } else {
    console.log(`File already exists: ${filePath}`);
  }
}

// Function to initialize project structure
function initProjectStructure(structure) {
  try {
    Object.entries(structure).forEach(([dir, files]) => {
      const fullDirPath = path.join(process.cwd(), dir);
      createDirectory(fullDirPath);
      files.forEach(file => {
        const filePath = path.join(fullDirPath, file);
        createFile(filePath);
      });
    });
    console.log("Project structure created successfully!");
  } catch (error) {
    console.error(`Error creating project structure: ${error}`);
  }
}

// Process command line arguments to customize project structure
const args = process.argv.slice(2);
let projectStructure = defaultStructure;
if (args.length) {
  try {
    projectStructure = JSON.parse(args[0]);
  } catch {
    console.log("Invalid JSON structure, using default structure.");
  }
}

initProjectStructure(projectStructure);
