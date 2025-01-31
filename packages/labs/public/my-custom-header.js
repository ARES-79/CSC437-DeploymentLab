import { attachShadow } from "./utils.mjs";

const homeFile = '/index.html';
const paperFile = '/papers.html';

const TEMPLATE = document.createElement("template");
TEMPLATE.innerHTML = `
    <style> 
    
        header {
            background-color: var(--color-background-header);
            padding: 1em 1.5em;
            display: flex;
            align-items: flex-start;
            margin-bottom: 1.25em;
            flex-direction: column;
            row-gap: 1em;
        }

        h1 {
            font-family: var(--font-heading);
            color: var(--color-text-heading);
        }

        a {
            color: var(--color-link);
        }

        .h1-and-btn {
            display: flex;
            align-items: center;
            justify-content: space-between;
            min-width: 100%;
            max-height: 3rem
        }

        header nav {
            display: flex;
            flex-direction: column;
            row-gap: 1em;
        }

        nav {
            display: flex;
            column-gap: 1em;
        }

        nav a.active {
            font-weight: bold;
        }

        #buttons {
            display: flex;
            column-gap: 1rem;
            align-items: center;
            justify-items: center;
        }

        #menu-btn {
            display: initial;
            padding: 0.5em 1em;
            border-radius: 0.5rem;
        }

        @media only screen and (min-width:800px) { 

            #buttons {
                display: none;
            }
            
            .h1-and-btn {
                min-width: auto;
            }

            header {
                flex-direction: row;
                align-items: center;
                column-gap: 1.5rem;
            }

            header nav {
                flex-direction: row;
                align-items: center;
            }

            header nav {
                display: flex;
                flex-direction: row;
                align-items: center;
            }
        }
    </style>
    <header>
        <div class="h1-and-btn">
            <h1> Andrew Estrada</h1>
            <div id="buttons">
                <label>
                    <input id="dm-checkBox" type="checkbox" autocomplete="off" />
                    Dark mode
                </label>
                <button id="menu-btn"> Menu </button>
            </div>
        </div>
        <nav> 
            <a href="/index.html">Home</a>
            <a href="/papers.html">My Papers</a>
        </nav>
    </header>
`;

class MyCustomHeader extends HTMLElement {
    connectedCallback() {
        const shadowRoot = attachShadow(this, TEMPLATE);
        const menuBtn = this.shadowRoot.querySelector("#menu-btn");
        const nav = this.shadowRoot.querySelector("nav");
        const checkBox = this.shadowRoot.querySelector("#dm-checkBox");
        const header = document.querySelector("my-custom-header")

        menuBtn.addEventListener("click", () => {
            nav.style.display = (nav.style.display === "flex" || nav.style.display === "") ? "none" : "flex";
        });

        checkBox.addEventListener("change", () => {
            if (checkBox.checked) {
                console.log("Dark Mode!");
                document.body.classList.add("dark-mode");
                localStorage.setItem("darkMode", "enabled");
            } else {
                console.log("Light Mode!");
                document.body.classList.remove("dark-mode");
                localStorage.setItem("darkMode", "disabled");
            }
        });

        document.addEventListener("click", (event) => {
            // console.log('clicked document');
            // console.log(event.target);
            // console.log(event.currentTarget);
            if (event.target === header) {
                console.log("header was clicked!");
            }
            if ( event.target !== header ) { 
                console.log('clicked outside nav');
                console.log(nav.style.display);
                if (nav.style.display === "flex" || nav.style.display === "") {
                    nav.style.display = "none";
                }
            }
        });

        const darkMode = localStorage.getItem("darkMode");
        if (darkMode === "enabled") {
            checkBox.checked = true; // Check the checkbox
            document.body.classList.add("dark-mode"); // Apply dark mode class
        }
    
    }
}

customElements.define("my-custom-header", MyCustomHeader);



window.addEventListener("load", () => { // Create a function on the fly
    //navbar indicate active page
    const headerElement = document.querySelector("my-custom-header");
    const navLinks = headerElement.shadowRoot.querySelectorAll('nav a'); // Select all <a> elements inside the <nav>
    const currentUrl = window.location.pathname; // Get the current URL path (e.g., "/index.html")
    console.log(currentUrl);

    navLinks.forEach(link => {
        // Compare the href attribute (relative path) with the current URL
        if (link.getAttribute('href') === currentUrl) {
            console.log('href:', currentUrl);
            console.log("currentURL:", currentUrl);
            console.log(link);
            link.classList.add('active'); // Add the 'active' class to the matching link
        }
    });
});