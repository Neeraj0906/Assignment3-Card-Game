const emojis = [
    "🍎", "🍎",
    "🍌", "🍌",
    "🍇", "🍇",
    "🍓", "🍓",
    "🍒", "🍒",
    "🍉", "🍉",
    "🥝", "🥝",
    "🍋", "🍋",
];

// Shuffle the emojis array
const shuf_emojis = emojis.sort(() => Math.random() - 0.5);

// Select the game container
const gameContainer = document.querySelector(".game");

// Create and append emoji boxes to the game container
shuf_emojis.forEach(emoji => {
    const box = document.createElement("div");
    box.className = "item";
    box.innerHTML = emoji;
    
    // Add click event to each box
    box.onclick = function() {
        // Only allow clicking on boxes that are not already matched or open
        if (!this.classList.contains("boxOpen") && !this.classList.contains("boxMatch")) {
            this.classList.add("boxOpen");

            // Check for matches after a short delay
            setTimeout(checkForMatch, 500);
        }
    }

    gameContainer.appendChild(box);
});

// Function to check for matches
function checkForMatch() {
    const openBoxes = document.querySelectorAll(".boxOpen");
    
    if (openBoxes.length > 1) {
        const firstEmoji = openBoxes[0].innerHTML;
        let match = true;

        // Check if all open boxes have the same emoji
        for (let i = 1; i < openBoxes.length; i++) {
            if (openBoxes[i].innerHTML !== firstEmoji) {
                match = false;
                break;
            }
        }

        // If they match, keep them open and mark as matched
        if (match) {
            openBoxes[0].classList.add("boxMatch");
            openBoxes[1].classList.add("boxMatch");
            
            // Check for win condition
            if (document.querySelectorAll(".boxMatch").length === emojis.length) {
                alert("You win!");
            }
        } else {
            // If they don't match, close them after a delay
            setTimeout(() => {
                openBoxes[0].classList.remove("boxOpen");
                openBoxes[1].classList.remove("boxOpen");
            }, 1000); // Close unmatched boxes after a delay
        }
        
        // Remove boxOpen class from unmatched boxes only after checking for matches
        openBoxes.forEach(box => box.classList.remove("boxOpen"));
    }
}