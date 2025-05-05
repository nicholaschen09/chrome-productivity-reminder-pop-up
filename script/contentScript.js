// Configuration for distracting websites
const distractingSites = {
  "tiktok.com": "TikTok",
  "youtube.com": "YouTube",
  "instagram.com": "Instagram",
  "facebook.com": "Facebook",
  "twitter.com": "Twitter",
  "reddit.com": "Reddit",
};

// Class to handle the productivity reminder functionality
class ProductivityReminder {
  constructor() {
    this.currentSite = this.getCurrentSite();
    this.startTime = Date.now();
    this.timerInterval = null;
    this.hasShownModal = false;

    // Wait for the page to fully load
    if (document.readyState === "complete") {
      this.init();
    } else {
      window.addEventListener("load", () => this.init());
    }
  }

  // Initialize the reminder
  init() {
    // Only proceed if we're on a distracting site
    if (this.currentSite) {
      // Check if we've already shown a modal for this site in this session
      const sessionKey = `productivity_reminder_shown_${window.location.hostname}`;
      this.hasShownModal = sessionStorage.getItem(sessionKey) === "true";

      if (!this.hasShownModal) {
        // Show the modal after a short delay
        setTimeout(() => {
          this.createModal();
          sessionStorage.setItem(sessionKey, "true");
          this.hasShownModal = true;
        }, 1500);
      }

      // Start tracking time spent
      this.startTimeTracking();
    }
  }

  // Determine which distracting site we're on, if any
  getCurrentSite() {
    const hostname = window.location.hostname;
    for (const site in distractingSites) {
      if (hostname.includes(site)) {
        return distractingSites[site];
      }
    }
    return null;
  }

  // Create and inject the modal into the page
  createModal() {
    // Create overlay container
    const overlay = document.createElement("div");
    overlay.className = "productivity-reminder-overlay";

    // Create modal container
    const modal = document.createElement("div");
    modal.className = "productivity-reminder-modal";

    // Create header
    const header = document.createElement("h2");
    header.textContent = `Hold on! ${this.currentSite} is a distraction.`;

    // Create message
    const message = document.createElement("p");
    message.textContent = `You're about to spend time on ${this.currentSite} instead of focusing on your goals. Is this really how you want to spend your time?`;

    // Create time counter
    const timeCounter = document.createElement("div");
    timeCounter.className = "time-counter";
    timeCounter.textContent = "Time spent here: 0 seconds";

    // Create buttons container
    const buttonsContainer = document.createElement("div");
    buttonsContainer.className = "button-container";

    // Continue anyway button
    const continueButton = document.createElement("button");
    continueButton.className = "continue-btn";
    continueButton.textContent = "Continue anyway";
    continueButton.addEventListener("click", () => this.dismissModal(overlay));

    // Back to work button
    const backToWorkButton = document.createElement("button");
    backToWorkButton.className = "back-to-work-btn";
    backToWorkButton.textContent = "Back to work";
    backToWorkButton.addEventListener("click", () => this.backToWork());

    // Add all elements to the DOM
    buttonsContainer.appendChild(backToWorkButton);
    buttonsContainer.appendChild(continueButton);

    modal.appendChild(header);
    modal.appendChild(message);
    modal.appendChild(timeCounter);
    modal.appendChild(buttonsContainer);

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    // Update the reference to the time counter for the interval
    this.timeCounterElement = timeCounter;

    // Update time display immediately
    this.updateTimeDisplay();
  }

  // Start tracking time spent on the distracting site
  startTimeTracking() {
    this.timerInterval = setInterval(() => {
      if (this.timeCounterElement) {
        this.updateTimeDisplay();
      }
    }, 1000);
  }

  // Update the time display in the modal
  updateTimeDisplay() {
    const timeSpent = Math.floor((Date.now() - this.startTime) / 1000);
    let timeText = "";

    if (timeSpent < 60) {
      timeText = `${timeSpent} second${timeSpent !== 1 ? "s" : ""}`;
    } else if (timeSpent < 3600) {
      const minutes = Math.floor(timeSpent / 60);
      const seconds = timeSpent % 60;
      timeText = `${minutes} minute${
        minutes !== 1 ? "s" : ""
      } ${seconds} second${seconds !== 1 ? "s" : ""}`;
    } else {
      const hours = Math.floor(timeSpent / 3600);
      const minutes = Math.floor((timeSpent % 3600) / 60);
      timeText = `${hours} hour${hours !== 1 ? "s" : ""} ${minutes} minute${
        minutes !== 1 ? "s" : ""
      }`;
    }

    this.timeCounterElement.textContent = `Time wasted here: ${timeText}`;
  }

  // Remove the modal from the page
  dismissModal(overlay) {
    document.body.removeChild(overlay);
  }

  // Redirect to a productivity site
  backToWork() {
    // List of productive sites to redirect to
    const productiveSites = [
      "https://www.karanpratapsingh.com/courses/system-design",
      "https://www.google.com",
      "https://learn.uwaterloo.ca",
      "https://github.com",
    ];

    // Redirect to a random productive site from the list
    window.location.href =
      productiveSites[Math.floor(Math.random() * productiveSites.length)];
  }
}

// Initialize the productivity reminder
new ProductivityReminder();
