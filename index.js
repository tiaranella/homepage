document.addEventListener("DOMContentLoaded", () => {
    const overlay = document.getElementById("cloud-overlay");
    const totalClouds = 60; 
    const clearThreshold = Math.floor(totalClouds * 0.35); 
    let clearedCount = 0;
    let isRevealing = false;

    for (let i = 0; i < totalClouds; i++) {
        const cloud = document.createElement("div");
        cloud.className = "cloud";
        
        const scale = Math.random() * 0.8 + 0.3; 
        const posX = Math.random() * 110 - 5;    
        const posY = Math.random() * 110 - 5;
        const delay = Math.random() * -30;       
        const duration = Math.random() * 15 + 15; 
        const opacity = Math.random() * 0.5 + 0.5; 
        
        cloud.style.setProperty('--scale', scale);
        cloud.style.transform = `scale(${scale})`;
        cloud.style.left = `${posX}%`;
        cloud.style.top = `${posY}%`;
        cloud.style.opacity = opacity;
        cloud.style.animation = `float ${duration}s infinite ease-in-out ${delay}s`;
        
        cloud.addEventListener("mouseenter", function() {
        if (isRevealing || this.classList.contains("cleared")) return;
        
        this.classList.add("cleared");
        clearedCount++;

        if (clearedCount >= clearThreshold) {
            isRevealing = true;
            
            const allClouds = document.querySelectorAll(".cloud:not(.cleared)");
            allClouds.forEach((c, index) => {
            setTimeout(() => {
                c.classList.add("cleared");
            }, index * 10); 
            });

            setTimeout(() => {
            overlay.style.opacity = "0";
            overlay.style.pointerEvents = "none";
            document.getElementById('main-content').style.opacity = '1';
            setTimeout(() => overlay.remove(), 1000);
            }, 800); 
        }
        });

        overlay.appendChild(cloud);
    }
});
