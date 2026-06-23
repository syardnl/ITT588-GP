document.addEventListener("DOMContentLoaded", function () {
    
    const themeToggleBtn = document.getElementById("theme-toggle");
    const themeIcon = document.getElementById("theme-icon");
    const body = document.body;

    // 1. Check if the user has selected dark mode before
    const currentTheme = localStorage.getItem("theme");
    
    if (currentTheme === "dark") {
        body.classList.add("dark-mode");
        themeIcon.classList.remove("fa-moon");
        themeIcon.classList.add("fa-sun");
    }

    // 2. Theme change function when button is pressed
    themeToggleBtn.addEventListener("click", function () {
        body.classList.toggle("dark-mode");

        if (body.classList.contains("dark-mode")) {
            themeIcon.classList.remove("fa-moon");
            themeIcon.classList.add("fa-sun");
            localStorage.setItem("theme", "dark");
        } else {
            themeIcon.classList.remove("fa-sun");
            themeIcon.classList.add("fa-moon");
            localStorage.setItem("theme", "light");
        }
    });
});