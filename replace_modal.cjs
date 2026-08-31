const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const oldModalFormStart = `<form onSubmit={(e) => { 
              e.preventDefault(); 
              
              const formData = new FormData(e.currentTarget);`;
              
// This isn't matching perfectly. Let's just do an indexOf substring replacement.
const startStr = `<form onSubmit={(e) => { 
              e.preventDefault(); 
              
              const formData = new FormData(e.currentTarget);`.trim();

// Wait, the file actually says:
// <form onSubmit={(e) => { 
//               e.preventDefault(); 
//               
//               const formData = new FormData(e.currentTarget);

const actualStartStr = `<form onSubmit={(e) => { 
              e.preventDefault(); 
              
              const formData = new FormData(e.currentTarget);`.replace(/ \n/g, '\n').trim().substring(0,25);

// Let's use Regex.
