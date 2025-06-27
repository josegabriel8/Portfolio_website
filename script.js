// Enhanced Portfolio JavaScript with Modern Animations and Interactions

// Toggle mobile menu
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// Scroll Progress Indicator
function updateScrollProgress() {
  const scrollIndicator = document.getElementById('scrollIndicator');
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrollProgress = (scrollTop / scrollHeight) * 100;
  
  if (scrollIndicator) {
    scrollIndicator.style.width = scrollProgress + '%';
  }
}

// Navbar scroll effect
window.addEventListener('scroll', function() {
  const nav = document.querySelector('nav');
  if (window.scrollY > 100) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
  
  // Update scroll progress
  updateScrollProgress();
});

// Smooth scroll reveal animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Add fade-in class to sections for animation
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
  });

  // Add floating animation to profile picture
  const profilePic = document.querySelector('.section__pic-container');
  if (profilePic) {
    profilePic.classList.add('floating');
  }

  // Add staggered animation to project cards
  const projectCards = document.querySelectorAll('.color-container');
  projectCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`;
    card.classList.add('fade-in');
    observer.observe(card);
  });

  // Add animation to experience articles
  const articles = document.querySelectorAll('article');
  articles.forEach((article, index) => {
    article.style.animationDelay = `${index * 0.1}s`;
    article.classList.add('fade-in');
    observer.observe(article);
  });

  // Enhanced button hover effects
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-3px) scale(1.05)';
    });
    
    button.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Enhanced icon hover effects
  const icons = document.querySelectorAll('.icon');
  icons.forEach(icon => {
    icon.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-5px) scale(1.1) rotate(5deg)';
    });
    
    icon.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1) rotate(0deg)';
    });
  });

  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80; // Account for fixed nav
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        const menu = document.querySelector(".menu-links");
        const icon = document.querySelector(".hamburger-icon");
        if (menu.classList.contains('open')) {
          menu.classList.remove('open');
          icon.classList.remove('open');
        }
      }
    });
  });

  // Add loading animation
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
  }, 100);

  // Parallax effect for hero section
  window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('#profile');
    if (heroSection) {
      heroSection.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
  });

  // Dynamic typing effect for motto (optional enhancement)
  const mottoText = document.querySelector('.motto p');
  if (mottoText) {
    const originalText = mottoText.textContent;
    mottoText.textContent = '';
    let i = 0;
    
    function typeWriter() {
      if (i < originalText.length) {
        mottoText.textContent += originalText.charAt(i);
        i++;
        setTimeout(typeWriter, 30);
      }
    }
    
    // Start typing effect when motto comes into view
    const mottoObserver = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(typeWriter, 500);
          mottoObserver.unobserve(entry.target);
        }
      });
    });
    
    mottoObserver.observe(mottoText);
  }
});

// Add custom cursor effect for interactive elements
document.addEventListener('mousemove', function(e) {
  const cursor = document.querySelector('.custom-cursor');
  if (cursor) {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  }
});

// Form validation and enhancement (if contact form is added later)
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Print-friendly styles toggle
function togglePrintMode() {
  document.body.classList.toggle('print-mode');
}

// Accessibility improvements
document.addEventListener('keydown', function(e) {
  // Skip to main content with Tab key
  if (e.key === 'Tab' && e.target === document.body) {
    const mainContent = document.querySelector('main') || document.querySelector('#profile');
    if (mainContent) {
      mainContent.focus();
    }
  }
  
  // ESC key closes mobile menu
  if (e.key === 'Escape') {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    if (menu.classList.contains('open')) {
      menu.classList.remove('open');
      icon.classList.remove('open');
    }
  }
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(function() {
  // Additional scroll-based animations can be added here
}, 10);
