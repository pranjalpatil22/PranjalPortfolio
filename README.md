# Pranjal Patil - Professional Portfolio Website

A modern, fully responsive portfolio website showcasing skills, projects, and experience as a Software Developer.

## 🎨 Features

- **Modern Dark Theme**: Deep navy background with electric blue/violet accents
- **Fully Responsive**: Optimized for mobile, tablet, and desktop
- **Smooth Animations**: Fade-in effects, scroll animations, and hover interactions
- **Interactive Sections**:
  - Home with profile and CTA buttons
  - About Me
  - Skills categorized by type
  - Professional Experience
  - Featured Projects with image galleries
  - Certifications
  - Creative Corner (Rangoli & Paintings)
  - Achievements & Memories
  - Leadership & Volunteering
  - Contact Form

## 📁 File Structure

```
portfolio/
│
├── index.html          # Main HTML file
├── styles.css          # All CSS styles
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## 🚀 Getting Started

### 1. Open the Website
Simply open `index.html` in your web browser to view the portfolio.

### 2. Customize Your Content

#### Replace Placeholder Images
Replace the placeholder images with your actual photos:

**Profile Photo** (Home section):
```html
<!-- Line ~80 in index.html -->
<img src="path/to/your/profile-photo.jpg" alt="Pranjal Patil" class="profile-photo">
```

**Project Images**:
```html
<!-- Lines ~300+ in index.html -->
<img src="path/to/project1-image.jpg" alt="PhD Scholar Portal">
<img src="path/to/project2-image.jpg" alt="Placement Cell">
```

**Certification Images**:
```html
<!-- Lines ~400+ in index.html -->
<img src="path/to/cert1-image.jpg" alt="C Programming Certificate">
<img src="path/to/cert2-image.jpg" alt="NPTEL Certificate">
<img src="path/to/cert3-image.jpg" alt="Coursera Certificate">
```

**Creative Gallery Images**:
```html
<!-- Lines ~450+ in index.html -->
<!-- Rangoli Gallery -->
<img src="path/to/rangoli1.jpg" alt="Rangoli Design 1">
<!-- Add more rangoli images -->

<!-- Paintings Gallery -->
<img src="path/to/painting1.jpg" alt="Painting 1">
<!-- Add more painting images -->
```

**Achievement Images**:
```html
<!-- Lines ~500+ in index.html -->
<img src="path/to/achievement1.jpg" alt="Childhood Achievement 1">
<img src="path/to/achievement2.jpg" alt="Childhood Achievement 2">
<img src="path/to/achievement3.jpg" alt="Childhood Achievement 3">
```

**Leadership Photo**:
```html
<!-- Line ~550+ in index.html -->
<img src="path/to/tedx-photo.jpg" alt="TEDx CHARUSAT">
```

#### Update Resume Download Link
```javascript
// In script.js, line ~100+
downloadResumeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.open('path/to/your/resume.pdf', '_blank');
});
```

Or update the href in index.html:
```html
<a href="path/to/your/resume.pdf" class="btn btn-outline" download>
    <span>Download Resume</span>
    <i class="fas fa-download"></i>
</a>
```

#### Update Project Links
Replace the GitHub and Live Demo links with actual URLs:
```html
<!-- Lines ~300+ in index.html -->
<a href="https://github.com/yourusername/project-repo" target="_blank" class="project-btn">
    <i class="fab fa-github"></i> GitHub
</a>
<a href="https://your-project-demo.com" class="project-btn">
    <i class="fas fa-external-link-alt"></i> Live Demo
</a>
```

## 🎨 Customization

### Change Colors
Edit CSS variables in `styles.css` (lines 1-20):
```css
:root {
    --bg-primary: #0F172A;        /* Main background */
    --accent-primary: #6366F1;    /* Primary accent color */
    --accent-secondary: #3B82F6;  /* Secondary accent */
    --accent-warm: #F97316;       /* Warm accent (Creative section) */
    /* ... more colors ... */
}
```

### Change Fonts
Update Google Fonts link in `index.html` (line ~10):
```html
<link href="https://fonts.googleapis.com/css2?family=YourFont:wght@400;700&display=swap" rel="stylesheet">
```

Then update CSS variables:
```css
:root {
    --font-heading: 'YourHeadingFont', sans-serif;
    --font-body: 'YourBodyFont', monospace;
}
```

### Add More Projects/Certifications
Copy and paste the project/certification card structure and update content:
```html
<div class="project-card">
    <!-- Update image, title, description, tech stack -->
</div>
```

## 📧 Contact Form Setup

The contact form currently shows an alert. To make it functional:

1. **Using Email Service (EmailJS, Formspree, etc.)**:
```javascript
// In script.js, replace the form submit handler
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    
    // Send to EmailJS or Formspree
    // Example with Formspree:
    const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    });
    
    if (response.ok) {
        alert('Message sent successfully!');
        contactForm.reset();
    }
});
```

2. **Using Backend API**:
Update the fetch URL to your backend endpoint.

## 🌐 Deployment

### Deploy to GitHub Pages
1. Create a new repository on GitHub
2. Push your code:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/portfolio.git
git push -u origin main
```
3. Go to Settings → Pages → Select main branch → Save
4. Your site will be live at `https://yourusername.github.io/portfolio/`

### Deploy to Netlify
1. Drag and drop the folder to Netlify
2. Or connect your GitHub repository
3. Your site will be live instantly

### Deploy to Vercel
1. Import your GitHub repository
2. Deploy with one click
3. Get your custom domain

## 📱 Browser Compatibility

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers

## 🛠️ Technologies Used

- HTML5
- CSS3 (with CSS Variables)
- Vanilla JavaScript (ES6+)
- Font Awesome Icons
- Google Fonts (Poppins, Space Mono)

## 📄 License

Feel free to use this template for your own portfolio. Attribution is appreciated but not required.

## 🤝 Credits

Designed and developed by Pranjal Patil
- GitHub: [@pranjalpatil22](https://github.com/pranjalpatil22)
- LinkedIn: [Pranjal Patil](https://www.linkedin.com/in/pranjal-patil-851111285/)
- Email: pranjalpatilk22@gmail.com

---

**Note**: Remember to replace all placeholder images and links with your actual content before deploying!

## 🎯 Quick Checklist Before Launch

- [ ] Replace profile photo
- [ ] Replace all project images
- [ ] Update project GitHub links
- [ ] Update project live demo links
- [ ] Replace certification images
- [ ] Add rangoli gallery images
- [ ] Add paintings gallery images
- [ ] Add achievement/memory photos
- [ ] Add leadership/TEDx photo
- [ ] Update resume download link
- [ ] Set up contact form with email service
- [ ] Test on mobile devices
- [ ] Test all links
- [ ] Optimize images for web (compress)
- [ ] Add favicon
- [ ] Update meta tags for SEO
- [ ] Test in different browsers

Enjoy your new portfolio! 🚀
