# Baker's Square - Immersive 3D Website Specification

## Project Overview
- **Project Name**: Baker's Square Amritsar - 3D Immersive Experience
- **Type**: Scroll-driven interactive 3D website
- **Core Functionality**: A cinematic journey through the bakery with scroll-controlled 3D scenes, showcasing ice creams, cakes, ambiance, and contact information
- **Target Users**: Local customers in Amritsar, online visitors seeking bakery services

---

## Client Information (Exact from Site)

### Business Details
- **Name**: Baker's Square
- **Address**: Ghala Mala Chowk, Main, Majitha Rd, Punjab 143001
- **Phone**: 078377 19506
- **Tagline**: "Indulge in heavenly delights at Baker's Square, where every treat is a masterpiece. Savor the sweet moments with our delectable pastries, cakes, and confections. Pure bliss in every bite!"

### Ice Cream Flavors (13 total)
1. Vanilla - "Timeless classic with velvety creaminess"
2. Strawberry - "Sweet berries in creamy perfection"
3. Mango - "Tropical summer in every scoop"
4. Tutty Fruity - "Carnival of candied fruits"
5. Butterscotch - "Golden toffee crunch"
6. Mix Fruit - "Garden of fresh fruits"
7. Kaju Kishmish - "Royal cashew & raisin blend"
8. Black Currant - "Rich berry medley"
9. Almond - "Nutty elegance"
10. Frenzy Fudge - "Fudge meets berries"
11. Chocochips - "Chocolate delight with crunch"
12. Dry Fruit - "Wholesome nutty indulgence"
13. Pan Masala - "Indian classic fusion"

### Food & Drink Items
- Burgers & Snacks
- Pizza
- Manchurian
- Various Beverages

---

## Site Structure

### 1. Hero Section - "Entering Baker's Square"
- Fullscreen Three.js scene with floating cake/pastry island
- Scroll-controlled camera parallax
- Brand name: "Baker's Square"
- Tagline: "Indulge in heavenly delights at Baker's Square, where every treat is a masterpiece."
- Subline: "Amritsar's Premier Bakery & Dessert Destination"
- CTAs: "Order a Cake" | "Visit Our Bakery"

### 2. Ice Cream Flavors Carousel
- Horizontal scroll with pinned viewport
- Each flavor as 3D card with tilt effect
- Color-coded backgrounds per flavor
- 1-2 line descriptions

### 3. Vibes / Ambience Section
- Layered parallax cards (gallery corridor)
- Ambient audio toggle (optional)
- Interior atmosphere showcase

### 4. Signature Cakes / Birthday Cakes
- Scroll-pinned section
- 4 key cakes with descriptions
- Focus on customization & celebrations

### 5. Food & Drinks Highlights
- Split layout: Image stack left, menu items right
- Scroll-reveal animations
- Key items: Burgers, Pizza, Manchurian, Drinks

### 6. Story / Emotion Section
- Timeline based on blog content
- 4 milestones: "Born in Amritsar", "Crafted with Love", "Celebration Central", "Your Story, Our Cake"
- Floating 3D decorative elements

### 7. Location & Visit
- Stylized 3D map with pin
- Full address display
- "Get Directions" Google Maps link
- Opening hours & contact info

### 8. Final CTA / Contact
- Contact form: Name, Phone, Message, Date
- "Call Now" and "WhatsApp Us" buttons
- Parallax background

---

## UI/UX Specification

### Color Palette
- **Primary**: #D4A574 (Warm Copper/Bakery Brown)
- **Secondary**: #8B4513 (Saddle Brown)
- **Accent**: #FF6B6B (Warm Coral)
- **Background**: #FFF8F0 (Cream White)
- **Text Primary**: #2D1810 (Dark Brown)
- **Text Secondary**: #6B4423 (Medium Brown)
- **Highlight**: #FFD93D (Golden Yellow)

### Typography
- **Display Font**: "Playfair Display" (headings)
- **Body Font**: "DM Sans" (body text)
- **Accent Font**: "Caveat" (decorative/callouts)

### Responsive Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

### Animation Specifications
- Smooth scroll: Lenis with inertia
- Scroll triggers: GSAP ScrollTrigger
- 3D scenes: React Three Fiber
- Transitions: 0.6s cubic-bezier(0.4, 0, 0.2, 1)

---

## Technical Stack
- **Framework**: Next.js 14 + React
- **3D**: React Three Fiber + Drei
- **Animation**: GSAP + ScrollTrigger
- **Smooth Scroll**: Lenis
- **Styling**: CSS Modules + CSS Variables
- **State**: React hooks (useState, useRef)

---

## Acceptance Criteria
1. Hero loads with 3D cake scene and scroll parallax
2. All 13 ice cream flavors display in carousel
3. Vibes section has parallax depth effect
4. Cake section pins and animates on scroll
5. Location shows address and map link
6. Contact form has all required fields
7. All CTAs functional with proper links
8. Mobile responsive with reduced 3D complexity
9. Smooth scroll throughout experience
10. Page loads under 3 seconds on 3G

---

## File Structure
```
bakers-square/
├── app/
│   ├── layout.js
│   ├── page.js
│   └── globals.css
├── components/
│   ├── Hero/
│   │   ├── HeroScene.jsx
│   │   ├── HeroOverlay.jsx
│   │   └── Hero.module.css
│   ├── Flavors/
│   │   ├── FlavorsCarousel.jsx
│   │   └── Flavors.module.css
│   ├── Vibes/
│   │   ├── VibesSection.jsx
│   │   └── Vibes.module.css
│   ├── Cakes/
│   │   ├── CakesSection.jsx
│   │   └── Cakes.module.css
│   ├── Food/
│   │   ├── FoodSection.jsx
│   │   └── Food.module.css
│   ├── Story/
│   │   ├── StorySection.jsx
│   │   └── Story.module.css
│   ├── Location/
│   │   ├── LocationSection.jsx
│   │   └── Location.module.css
│   ├── Contact/
│   │   ├── ContactSection.jsx
│   │   └── Contact.module.css
│   └── ui/
│       ├── Navigation.jsx
│       └── Button.jsx
├── public/
│   └── textures/
├── data/
│   └── content.js
├── hooks/
│   └── useSmoothScroll.js
├── lib/
│   └── three-utils.js
├── package.json
└── next.config.js
```
