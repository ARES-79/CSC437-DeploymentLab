import { toHtmlElement } from "./toHtmlElement.mjs";

// HTML string for the <nav> element
const navHtml = `
    <nav> 
        <a href="/index.html">Home</a>
        <a href="/papers.html">My Papers</a>
    </nav>
`;

// Use the function to convert the HTML string to an Element
const navElement = toHtmlElement(navHtml);

window.addEventListener("load", () => { // Create a function on the fly
    // Append the <nav> element as the last child of <header>
    const header = document.querySelector('header');
    if (header) {
        header.appendChild(navElement);
    } else {
        console.error('No <header> element found in the document!');
    }

    //navbar indicate active page
    const navLinks = document.querySelectorAll('nav a'); // Select all <a> elements inside the <nav>
    const currentUrl = window.location.pathname; // Get the current URL path (e.g., "/index.html")
    console.log(currentUrl);

    navLinks.forEach(link => {
        // Compare the href attribute (relative path) with the current URL
        if (link.getAttribute('href') === currentUrl) {
            link.classList.add('active'); // Add the 'active' class to the matching link
        }
    });
});