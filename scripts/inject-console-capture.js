const fs = require('fs');
const path = require('path');

function injectConsoleCapture() {
  const buildDir = '.next';
  
  if (!fs.existsSync(buildDir)) {
    console.log('Build directory not found. Skipping console capture injection.');
    return;
  }
  
  const scriptTag = '<script src="/dashboard-console-capture.js"></script>';
  
  function processHtmlFiles(dir) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        processHtmlFiles(filePath);
      } else if (file.endsWith('.html')) {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Skip if script is already injected
        if (content.includes('dashboard-console-capture.js')) {
          return;
        }
        
        // Inject script tag before closing head tag
        if (content.includes('</head>')) {
          content = content.replace('</head>', `${scriptTag}</head>`);
          fs.writeFileSync(filePath, content);
          console.log(`Injected console capture script into ${filePath}`);
        }
      }
    });
  }
  
  try {
    processHtmlFiles(buildDir);
    console.log('Console capture script injection completed.');
  } catch (error) {
    console.error('Error injecting console capture script:', error);
  }
}

injectConsoleCapture();