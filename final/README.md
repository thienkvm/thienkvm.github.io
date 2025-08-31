# Matcha Tracker

A comprehensive web application for tracking and managing matcha tea entries with an intuitive carousel-based interface.

## Features

### 🎠 Landing Page (Carousel View)
- **Interactive Carousel**: Horizontal carousel with center-focused design
- **Smart Navigation**: Click side images to bring them to center, or use keyboard arrows
- **Touch Support**: Swipe gestures for mobile devices
- **Visual Indicators**: Circular indicators showing current position and total entries
- **Quick Save**: Save button for current entry modifications

### 📝 Notes Page (Detailed Entry Form)
- **Rich Form Fields**: Name, prefecture, flavor profiles, and notes
- **Interactive Radar Chart**: Visual taste analysis with 5 dimensions
- **Image Upload**: Upload and auto-parse matcha images
- **Translation Support**: Convert Japanese text to English
- **Color Picker**: Custom and suggested matcha color selection
- **Flavor Tags**: Toggle between Grassy, Nutty, and Floral profiles

### 🔲 Grid View
- **Card Layout**: Clean grid display of all entries
- **Drag & Drop**: Reorder entries by dragging cards
- **Filtering**: Filter by flavor profiles (All, Grassy, Nutty, Floral)
- **Quick Actions**: Favorite toggle and taste intensity bars
- **Add New**: Dedicated "Add New Entry" card

### 📋 List View
- **Compact Display**: Vertical list with essential information
- **Inline Editing**: Edit names and prefectures directly in the list
- **Filtering**: Same flavor profile filtering as Grid View
- **Favorites**: Quick favorite toggle for each entry
- **Mobile Optimized**: Responsive design for mobile devices

## Technical Features

- **Local Storage**: All data persists in browser localStorage
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Smooth Animations**: CSS transitions and animations throughout
- **Accessibility**: Keyboard navigation and screen reader support
- **Modern UI**: Clean, modern interface with intuitive interactions

## Usage

1. **Browse Entries**: Use the landing page carousel to browse through your matcha collection
2. **Add New Entry**: Click the "+" button to add a new matcha entry
3. **Edit Details**: Click on any entry to open the detailed notes page
4. **Upload Images**: Use the camera button to upload matcha photos
5. **Organize**: Use Grid or List views to manage your collection
6. **Filter**: Use flavor profile filters to find specific types of matcha
7. **Favorites**: Mark your favorite matcha entries with the heart button

## Getting Started

1. Open `index.html` in a web browser
2. Start adding your matcha entries
3. Explore different views and features
4. Your data will be automatically saved to your browser

## Browser Compatibility

- Chrome/Chromium (recommended)
- Firefox
- Safari
- Edge

## File Structure

```
final/
├── index.html          # Main HTML structure
├── styles.css          # Complete styling and responsive design
├── script.js           # Application logic and interactivity
└── README.md          # This documentation
```

## Data Structure

Each matcha entry contains:
- **Basic Info**: Name, prefecture, creation date
- **Visual**: Uploaded image and custom color
- **Taste Profile**: 5-dimension radar chart (sweetness, bitterness, umami, astringency, aroma)
- **Flavor Tags**: Grassy, nutty, floral classifications
- **Personal**: Notes and favorite status

All data is stored locally in your browser and persists between sessions.