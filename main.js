const weeksData = [
  {
    title: "Week 1: Python Refresher",
    description:
      "Learn Python fundamentals, data types, loops, and essential libraries like NumPy & Pandas.",
    image:
      "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=800&q=80",
    icon: "fa-brands fa-python",
  },
  {
    title: "Week 2: Data Cleaning & EDA",
    description:
      "Handle missing data, visualize trends, and use SQL for data querying.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    icon: "fa-solid fa-database",
  },
  {
    title: "Week 3: Statistics & Probability",
    description:
      "Understand distributions, hypothesis testing, and correlation vs. causation.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    icon: "fa-solid fa-chart-line",
  },
  {
    title: "Week 4: Introduction to ML",
    description:
      "Learn supervised vs. unsupervised learning, linear regression, and model evaluation.",
    image:
      "https://images.unsplash.com/photo-1527474305487-b87b222841cc?auto=format&fit=crop&w=800&q=80",
    icon: "fa-solid fa-brain",
  },
  {
    title: "Week 5: Advanced ML Algorithms",
    description:
      "Explore decision trees, random forests, SVM, and clustering techniques.",
    image:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=80",
    icon: "fa-solid fa-microchip",
  },
  {
    title: "Week 6: Time Series & ARIMA",
    description:
      "Analyze time series data, moving averages, and use ARIMA models for forecasting.",
    image:
      "https://images.unsplash.com/photo-1642790106117-e829e14a795f?auto=format&fit=crop&w=800&q=80",
    icon: "fa-solid fa-chart-area",
  },
  {
    title: "Week 7: Data Business Fundamentals",
    description:
      "Learn data-driven decision-making and real-world AI case studies.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    icon: "fa-solid fa-briefcase",
  },
  {
    title: "Week 8: Final Project",
    description: "Work on a real dataset, conduct EDA, and present findings.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
    icon: "fa-solid fa-graduation-cap",
  },
];

function createWeekCard(weekData) {
  const card = document.createElement("div");
  card.className = "week-card";

  card.innerHTML = `
      <img src="${weekData.image}" alt="${weekData.title}" loading="lazy">
      <h2><i class="${weekData.icon}"></i> ${weekData.title}</h2>
      <p>${weekData.description}</p>
    `;

  return card;
}

function handleLogin(event) {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;

  // Store user data
  localStorage.setItem("username", username);
  localStorage.setItem("email", email);

  // Show welcome message
  const welcomeMessage = document.getElementById("welcome-message");
  welcomeMessage.innerHTML = `<i class="fas fa-hand-wave"></i> Welcome, ${username}!`;

  // Hide login, show main content
  document.getElementById("login-container").classList.add("hidden");
  document.getElementById("main-content").classList.remove("hidden");

  // Initialize the main content
  initMainContent();
}

function sendRoadmapPDF() {
  const email = localStorage.getItem("email");
  const username = localStorage.getItem("username");

  // Make an API call to send the PDF
  fetch("http://localhost:3000/send-pdf", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, username }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);

      // Show Valentine's message
      const valentineMessage = document.getElementById("valentine-message");
      valentineMessage.classList.remove("hidden");

      // Disable the button to prevent multiple clicks
      const downloadButton = document.getElementById("download-pdf");
      downloadButton.disabled = true;
      downloadButton.innerHTML = '<i class="fas fa-check"></i> Roadmap Sent!';
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function sendValentineMessage() {
  // Show Valentine's message
  const valentineMessage = document.getElementById("valentine-message");
  valentineMessage.classList.remove("hidden");

  // Trigger color explosion animation
  const colorExplosion = document.createElement("div");
  colorExplosion.className = "color-explosion";
  document.body.appendChild(colorExplosion);

  setTimeout(() => {
    colorExplosion.remove();
  }, 1000); // Remove the explosion after 1 second
}

function initMainContent() {
  const container = document.querySelector(".weeks-container");
  weeksData.forEach((weekData) => {
    container.appendChild(createWeekCard(weekData));
  });

  // Add 3D tilt effect to cards
  const cards = document.querySelectorAll(".week-card");
  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform =
        "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)";
    });
  });

  // Add Valentine's message button listener
  const valentineButton = document.getElementById("valentine-button");
  valentineButton.addEventListener("click", sendValentineMessage);
}

document.addEventListener("DOMContentLoaded", () => {
  const username = localStorage.getItem("username");
  const email = localStorage.getItem("email");

  if (username && email) {
    document.getElementById(
      "welcome-message"
    ).innerHTML = `<i class="fas fa-hand-wave"></i> Welcome back, ${username}!`;
    document.getElementById("login-container").classList.add("hidden");
    document.getElementById("main-content").classList.remove("hidden");
    initMainContent();
  } else {
    document
      .getElementById("login-form")
      .addEventListener("submit", handleLogin);
  }
});
function sendValentineMessage() {
  // Show Valentine's message
  const valentineMessage = document.getElementById("valentine-message");
  valentineMessage.classList.remove("hidden");

  // Trigger color explosion animation
  const colorExplosion = document.createElement("div");
  colorExplosion.className = "color-explosion";
  document.body.appendChild(colorExplosion);

  setTimeout(() => {
    colorExplosion.remove();
  }, 1000); // Remove the explosion after 1 second
}

function initMainContent() {
  const container = document.querySelector(".weeks-container");
  weeksData.forEach((weekData) => {
    container.appendChild(createWeekCard(weekData));
  });

  // Add 3D tilt effect to cards
  const cards = document.querySelectorAll(".week-card");
  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform =
        "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)";
    });
  });

  // Add Valentine's message button listener
  const valentineButton = document.getElementById("valentine-button");
  valentineButton.addEventListener("click", sendValentineMessage);
}

document.addEventListener("DOMContentLoaded", () => {
  const username = localStorage.getItem("username");
  const email = localStorage.getItem("email");

  if (username && email) {
    document.getElementById(
      "welcome-message"
    ).innerHTML = `<i class="fas fa-hand-wave"></i> Welcome back, ${username}!`;
    document.getElementById("login-container").classList.add("hidden");
    document.getElementById("main-content").classList.remove("hidden");
    initMainContent();
  } else {
    document
      .getElementById("login-form")
      .addEventListener("submit", handleLogin);
  }
});
