// Utility Functions
const $ = (selector) => document.querySelector(selector)
const $$ = (selector) => document.querySelectorAll(selector)

// Enhanced Mobile Navigation Toggle
const hamburger = $("#hamburger")
const navMenu = $("#nav-menu")

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  navMenu.classList.toggle("active")

  // Animate hamburger bars
  const bars = hamburger.querySelectorAll(".bar")
  bars.forEach((bar, index) => {
    if (hamburger.classList.contains("active")) {
      if (index === 0) bar.style.transform = "rotate(45deg) translate(5px, 5px)"
      if (index === 1) bar.style.opacity = "0"
      if (index === 2) bar.style.transform = "rotate(-45deg) translate(7px, -6px)"
    } else {
      bar.style.transform = "none"
      bar.style.opacity = "1"
    }
  })
})

// Close mobile menu when clicking on a link
const navLinks = $$(".nav-link")
navLinks.forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")

    // Reset hamburger bars
    const bars = hamburger.querySelectorAll(".bar")
    bars.forEach((bar) => {
      bar.style.transform = "none"
      bar.style.opacity = "1"
    })
  }),
)

// Enhanced Navbar scroll effect
let lastScrollTop = 0
const navbar = $("#navbar")
window.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop

  if (scrollTop > 100) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }

  // Hide/show navbar on scroll
  if (scrollTop > lastScrollTop && scrollTop > 100) {
    navbar.style.transform = "translateY(-100%)"
  } else {
    navbar.style.transform = "translateY(0)"
  }
  lastScrollTop = scrollTop
})

// Smooth scrolling for navigation links
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault()
    const targetId = link.getAttribute("href")
    const targetSection = $(targetId)

    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Enhanced Active navigation link highlighting
const sections = $$("section")
window.addEventListener("scroll", () => {
  let current = ""
  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href").slice(1) === current) {
      link.classList.add("active")
    }
  })
})

// Enhanced Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in-up")

      // Add staggered animation for grid items
      if (
        entry.target.classList.contains("skill-item") ||
        entry.target.classList.contains("project-card") ||
        entry.target.classList.contains("stat-item") ||
        entry.target.classList.contains("cert-card")
      ) {
        const siblings = Array.from(entry.target.parentNode.children)
        const index = siblings.indexOf(entry.target)
        entry.target.style.animationDelay = `${index * 0.1}s`
      }
    }
  })
}, observerOptions)

// Observe all sections and cards
$$("section, .project-card, .skill-category, .stat-item, .cert-item, .contact-item, .timeline-item").forEach((el) => {
  observer.observe(el)
})

// Enhanced Typing animation for hero title
const typingText = $("#typingText")
const texts = ["Full Stack Developer", "Frontend Developer", "Backend Developer", "Web Developer", "Software Engineer"]
let textIndex = 0
let charIndex = 0
let isDeleting = false

function typeWriter() {
  const currentText = texts[textIndex]

  if (isDeleting) {
    typingText.textContent = currentText.substring(0, charIndex - 1)
    charIndex--
  } else {
    typingText.textContent = currentText.substring(0, charIndex + 1)
    charIndex++
  }

  let typeSpeed = isDeleting ? 50 : 100

  if (!isDeleting && charIndex === currentText.length) {
    typeSpeed = 2000
    isDeleting = true
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false
    textIndex = (textIndex + 1) % texts.length
    typeSpeed = 500
  }

  setTimeout(typeWriter, typeSpeed)
}

// Start typing animation
setTimeout(typeWriter, 1000)

// Enhanced Stats counter animation
const statNumbers = $$(".stat-number")
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = entry.target
        const finalNumber = Number.parseInt(target.getAttribute("data-target"))
        let currentNumber = 0
        const increment = finalNumber / 60
        const duration = 2000
        const stepTime = duration / 60

        const updateCounter = () => {
          if (currentNumber < finalNumber) {
            currentNumber += increment
            target.textContent = Math.ceil(currentNumber)
            setTimeout(updateCounter, stepTime)
          } else {
            target.textContent = finalNumber
          }
        }

        updateCounter()
      }
    })
  },
  { threshold: 0.7 },
)

statNumbers.forEach((stat) => {
  statsObserver.observe(stat)
})

// Enhanced Skills animation
const skillProgress = $$(".skill-progress")
const skillsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const progressBar = entry.target
        const width = progressBar.getAttribute("data-width")
        setTimeout(() => {
          progressBar.style.width = width + "%"
        }, 500)
      }
    })
  },
  { threshold: 0.5 },
)

skillProgress.forEach((progress) => {
  skillsObserver.observe(progress)
})

// Enhanced Project cards hover effect
$$(".project-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-15px) rotateX(5deg)"
  })

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0) rotateX(0deg)"
  })

  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = (y - centerY) / 10
    const rotateY = (centerX - x) / 10

    card.style.transform = `translateY(-15px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
  })
})

// Enhanced Parallax effect
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const parallaxElements = $$(".floating-shapes, .hero-bg")

  parallaxElements.forEach((element, index) => {
    const speed = 0.5 + index * 0.1
    element.style.transform = `translateY(${scrolled * speed}px)`
  })
})

// Enhanced Skills animation
const skillItems = $$(".skill-item")
const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0) scale(1)"
        }, index * 150)
      }
    })
  },
  { threshold: 0.3 },
)

skillItems.forEach((item) => {
  item.style.opacity = "0"
  item.style.transform = "translateY(30px) scale(0.9)"
  item.style.transition = "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
  skillObserver.observe(item)
})

// Enhanced Contact Form
const contactForm = $("#contactForm")
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Get form data
    const formData = new FormData(contactForm)
    const name = formData.get("name")
    const email = formData.get("email")
    const subject = formData.get("subject")
    const message = formData.get("message")

    // Simple validation
    if (!name || !email || !subject || !message) {
      alert("Please fill in all fields")
      return
    }

    // Simulate form submission
    const submitBtn = contactForm.querySelector('button[type="submit"]')
    const originalText = submitBtn.innerHTML
    submitBtn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>'
    submitBtn.disabled = true

    setTimeout(() => {
      alert("Thank you for your message! I'll get back to you soon.")
      contactForm.reset()
      submitBtn.innerHTML = originalText
      submitBtn.disabled = false
    }, 2000)
  })
}

// Particles.js initialization
const particlesJS = window.particlesJS // Declare particlesJS variable
if (typeof particlesJS !== "undefined") {
  particlesJS("particles-js", {
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          value_area: 800,
        },
      },
      color: {
        value: "#ffffff",
      },
      shape: {
        type: "circle",
        stroke: {
          width: 0,
          color: "#000000",
        },
      },
      opacity: {
        value: 0.5,
        random: false,
        anim: {
          enable: false,
          speed: 1,
          opacity_min: 0.1,
          sync: false,
        },
      },
      size: {
        value: 3,
        random: true,
        anim: {
          enable: false,
          speed: 40,
          size_min: 0.1,
          sync: false,
        },
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#ffffff",
        opacity: 0.4,
        width: 1,
      },
      move: {
        enable: true,
        speed: 6,
        direction: "none",
        random: false,
        straight: false,
        out_mode: "out",
        bounce: false,
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200,
        },
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: true,
          mode: "repulse",
        },
        onclick: {
          enable: true,
          mode: "push",
        },
        resize: true,
      },
      modes: {
        grab: {
          distance: 400,
          line_linked: {
            opacity: 1,
          },
        },
        bubble: {
          distance: 400,
          size: 40,
          duration: 2,
          opacity: 8,
          speed: 3,
        },
        repulse: {
          distance: 200,
          duration: 0.4,
        },
        push: {
          particles_nb: 4,
        },
        remove: {
          particles_nb: 2,
        },
      },
    },
    retina_detect: true,
  })
}

// Enhanced cursor trail effect
let mouseX = 0
let mouseY = 0
const cursor = $("#cursor")
const cursorFollower = $("#cursorFollower")

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX
  mouseY = e.clientY

  cursor.style.left = mouseX + "px"
  cursor.style.top = mouseY + "px"

  setTimeout(() => {
    cursorFollower.style.left = mouseX + "px"
    cursorFollower.style.top = mouseY + "px"
  }, 100)
})

// Hide cursor on mobile
if (window.innerWidth <= 768) {
  cursor.style.display = "none"
  cursorFollower.style.display = "none"
}

// Enhanced CSS for cursor trail
const enhancedStyle = document.createElement("style")
enhancedStyle.textContent = `
    .cursor-trail {
        position: fixed;
        width: 8px;
        height: 8px;
        background: radial-gradient(circle, rgba(102, 126, 234, 0.8) 0%, rgba(240, 147, 251, 0.6) 50%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        animation: cursorFade 1s ease-out forwards;
        box-shadow: 0 0 10px rgba(102, 126, 234, 0.5);
    }
    
    @keyframes cursorFade {
        0% {
            opacity: 1;
            transform: scale(1);
        }
        100% {
            opacity: 0;
            transform: scale(0);
        }
    }
    
    .cursor {
        animation: blink 1s infinite;
    }
    
    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
`
document.head.appendChild(enhancedStyle)

// Loading screen
window.addEventListener("load", () => {
  const loadingScreen = $("#loadingScreen")
  setTimeout(() => {
    loadingScreen.classList.add("hidden")
    setTimeout(() => {
      loadingScreen.remove()
    }, 500)
  }, 2000)
})

// Preload images
const preloadImages = () => {
  const images = ["/placeholder.svg?height=400&width=400"]
  images.forEach((src) => {
    const img = new Image()
    img.src = src
  })
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  preloadImages()

  // Add smooth page transitions
  document.body.style.opacity = "0"
  document.body.style.transition = "opacity 0.5s ease-in-out"

  setTimeout(() => {
    document.body.style.opacity = "1"
  }, 100)
})

// Enhanced button hover effects
$$(".btn").forEach((btn) => {
  btn.addEventListener("mouseenter", () => {
    btn.style.transform = "translateY(-3px) scale(1.05)"
  })

  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "translateY(0) scale(1)"
  })
})

// Add ripple effect to buttons
$$(".btn, .social-link").forEach((element) => {
  element.addEventListener("click", function (e) {
    const ripple = document.createElement("span")
    const rect = this.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2

    ripple.style.width = ripple.style.height = size + "px"
    ripple.style.left = x + "px"
    ripple.style.top = y + "px"
    ripple.classList.add("ripple")

    this.appendChild(ripple)

    setTimeout(() => {
      ripple.remove()
    }, 600)
  })
})

// Add ripple CSS
const rippleStyle = document.createElement("style")
rippleStyle.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`
document.head.appendChild(rippleStyle)

// Easter egg - Konami code
const konamiCode = []
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]

document.addEventListener("keydown", (e) => {
  konamiCode.push(e.keyCode)
  if (konamiCode.length > konamiSequence.length) {
    konamiCode.shift()
  }

  if (konamiCode.join(",") === konamiSequence.join(",")) {
    // Easter egg activated
    document.body.style.animation = "rainbow 2s infinite"
    setTimeout(() => {
      document.body.style.animation = ""
    }, 5000)

    // Show message
    const message = document.createElement("div")
    message.textContent = "🎉 Easter Egg Activated! 🎉"
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: var(--neon-gradient);
        color: white;
        padding: 2rem;
        border-radius: 20px;
        font-size: 2rem;
        font-weight: bold;
        z-index: 10000;
        animation: bounce 1s ease-in-out;
    `
    document.body.appendChild(message)

    setTimeout(() => {
      message.remove()
    }, 3000)
  }
})

// Add rainbow animation for easter egg
const easterEggStyle = document.createElement("style")
easterEggStyle.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`
document.head.appendChild(easterEggStyle)

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Apply throttling to scroll events
const throttledScrollHandler = throttle(() => {
  // Scroll handling code is already implemented above
}, 16) // ~60fps

console.log(`
🚀 Welcome to Vaibhav Yadav's Portfolio!
💻 Built with modern web technologies
✨ Featuring advanced CSS animations and effects
🎨 Premium design with beautiful gradients
📱 Fully responsive and optimized
🔥 Ready to make an impact!

Connect with me:
📧 vy4771223@gmail.com
📱 +91 6392368875
💼 LinkedIn: https://www.linkedin.com/in/vaibhav-yadav-23b2a4287/
🐙 GitHub: https://github.com/vaibhavyadav925
`)
