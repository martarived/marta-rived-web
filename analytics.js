// Vercel Web Analytics initialization
// This script initializes Vercel Web Analytics for the static site
// Documentation: https://vercel.com/docs/analytics

(function() {
  // Initialize the Vercel Analytics queue
  window.va = window.va || function () { 
    (window.vaq = window.vaq || []).push(arguments); 
  };
  
  // Load the analytics script
  var script = document.createElement('script');
  script.defer = true;
  script.src = '/_vercel/insights/script.js';
  document.head.appendChild(script);
})();
