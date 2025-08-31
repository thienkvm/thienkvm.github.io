// Matcha Tracker Application
class MatchaTracker {
    constructor() {
        this.entries = this.loadEntries();
        this.currentPage = 'landing';
        this.currentEntryIndex = 0;
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.renderLandingPage();
        this.updateCarouselIndicators();
    }

    // Data Management
    loadEntries() {
        const stored = localStorage.getItem('matchaEntries');
        if (stored) {
            return JSON.parse(stored);
        }
        
        // Default sample entries
        return [
            {
                id: 1,
                name: "Ceremonial Grade Matcha",
                prefecture: "Uji, Kyoto",
                image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzdDQjM0MiIvPjx0ZXh0IHg9IjEwMCIgeT0iMTAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSIgZmlsbD0id2hpdGUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCI+TWF0Y2hhIDE8L3RleHQ+PC9zdmc+",
                flavors: ["grassy", "nutty"],
                taste: {
                    sweetness: 3,
                    bitterness: 7,
                    umami: 8,
                    astringency: 6,
                    aroma: 9
                },
                notes: "Rich and complex flavor with strong umami notes.",
                color: "#7CB342",
                favorite: false,
                createdAt: new Date('2024-01-01').toISOString()
            },
            {
                id: 2,
                name: "Premium Gyokuro",
                prefecture: "Fukuoka",
                image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzhCQzM0QSIvPjx0ZXh0IHg9IjEwMCIgeT0iMTAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSIgZmlsbD0id2hpdGUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCI+TWF0Y2hhIDI8L3RleHQ+PC9zdmc+",
                flavors: ["floral", "grassy"],
                taste: {
                    sweetness: 5,
                    bitterness: 4,
                    umami: 9,
                    astringency: 3,
                    aroma: 8
                },
                notes: "Delicate and sweet with floral undertones.",
                color: "#8BC34A",
                favorite: true,
                createdAt: new Date('2024-01-02').toISOString()
            },
            {
                id: 3,
                name: "Daily Drinking Matcha",
                prefecture: "Shizuoka",
                image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzlDQ0M2NSIvPjx0ZXh0IHg9IjEwMCIgeT0iMTAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSIgZmlsbD0id2hpdGUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCI+TWF0Y2hhIDM8L3RleHQ+PC9zdmc+",
                flavors: ["nutty"],
                taste: {
                    sweetness: 6,
                    bitterness: 5,
                    umami: 6,
                    astringency: 4,
                    aroma: 6
                },
                notes: "Well-balanced for everyday consumption.",
                color: "#9CCC65",
                favorite: false,
                createdAt: new Date('2024-01-03').toISOString()
            }
        ];
    }

    saveEntries() {
        localStorage.setItem('matchaEntries', JSON.stringify(this.entries));
    }

    // Navigation
    showPage(pageId) {
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        document.getElementById(pageId).classList.add('active');
        this.currentPage = pageId;

        if (pageId === 'notes-page') {
            this.renderNotesPage();
        } else if (pageId === 'grid-page') {
            this.currentFilter = 'all'; // Reset filter when switching to grid view
            this.renderGridView();
        } else if (pageId === 'list-page') {
            this.currentFilter = 'all'; // Reset filter when switching to list view
            this.renderListView();
        } else if (pageId === 'landing-page') {
            this.renderLandingPage();
        }
    }

    // Landing Page
    renderLandingPage() {
        const carousel = document.getElementById('matcha-carousel');
        carousel.innerHTML = '';

        // Add existing entries
        this.entries.forEach((entry, index) => {
            const item = this.createCarouselItem(entry, index);
            carousel.appendChild(item);
        });

        // Add "Add New" item
        const addNewItem = document.createElement('div');
        addNewItem.className = 'carousel-item add-new-item side';
        addNewItem.innerHTML = `
            <div class="plus-icon">+</div>
            <div>Add New Entry</div>
        `;
        addNewItem.addEventListener('click', () => this.addNewEntry());
        carousel.appendChild(addNewItem);

        this.updateCarouselPositions();
    }

    createCarouselItem(entry, index) {
        const item = document.createElement('div');
        item.className = `carousel-item ${index === this.currentEntryIndex ? 'center' : 'side'}`;
        item.dataset.index = index;
        
        item.innerHTML = `
            <img src="${entry.image}" alt="${entry.name}">
            <div class="item-info">
                <div class="item-name">${entry.name}</div>
                <div class="item-prefecture">${entry.prefecture}</div>
            </div>
        `;

        item.addEventListener('click', () => {
            if (index !== this.currentEntryIndex) {
                this.currentEntryIndex = index;
                this.updateCarouselPositions();
                this.updateCarouselIndicators();
            } else {
                // Open notes page for current entry
                this.showPage('notes-page');
            }
        });

        return item;
    }

    updateCarouselPositions() {
        const carousel = document.getElementById('matcha-carousel');
        const items = document.querySelectorAll('.carousel-item:not(.add-new-item)');
        
        items.forEach((item, index) => {
            item.className = `carousel-item ${index === this.currentEntryIndex ? 'center' : 'side'}`;
        });

        // Center the carousel on the current item
        const containerWidth = carousel.parentElement.offsetWidth;
        const itemWidth = 300; // center item width
        const offset = (containerWidth / 2) - (itemWidth / 2) - (this.currentEntryIndex * (itemWidth + 20));
        carousel.style.transform = `translateX(${Math.max(Math.min(offset, 0), -(items.length * (itemWidth + 20) - containerWidth))}px)`;
    }

    updateCarouselIndicators() {
        document.getElementById('current-position').textContent = this.currentEntryIndex + 1;
        document.getElementById('total-entries').textContent = this.entries.length;
    }

    addNewEntry() {
        const newEntry = {
            id: Date.now(),
            name: "New Matcha Entry",
            prefecture: "",
            image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2Y4ZmFmYyIgc3Ryb2tlPSIjY2JkNWUwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1kYXNoYXJyYXk9IjUsMTAiLz48dGV4dCB4PSIxMDAiIHk9IjEwMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iIGZpbGw9IiM2NDc0OGIiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMiI+Tm8gSW1hZ2U8L3RleHQ+PC9zdmc+",
            flavors: [],
            taste: {
                sweetness: 5,
                bitterness: 5,
                umami: 5,
                astringency: 5,
                aroma: 5
            },
            notes: "",
            color: "#7CB342",
            favorite: false,
            createdAt: new Date().toISOString()
        };

        this.entries.push(newEntry);
        this.currentEntryIndex = this.entries.length - 1;
        this.saveEntries();
        this.renderLandingPage();
        this.updateCarouselIndicators();
        this.showMessage('New entry added!', 'success');
    }

    // Notes Page
    renderNotesPage() {
        const currentEntry = this.entries[this.currentEntryIndex];
        if (!currentEntry) return;

        // Update image
        document.getElementById('notes-matcha-image').src = currentEntry.image;

        // Update form fields
        document.getElementById('matcha-name').value = currentEntry.name;
        document.getElementById('prefecture').value = currentEntry.prefecture;
        document.getElementById('notes').value = currentEntry.notes;
        document.getElementById('custom-color').value = currentEntry.color;

        // Update flavor tags
        document.querySelectorAll('.flavor-tag').forEach(tag => {
            const flavor = tag.dataset.flavor;
            tag.classList.toggle('active', currentEntry.flavors.includes(flavor));
        });

        // Update taste sliders
        Object.keys(currentEntry.taste).forEach(key => {
            const slider = document.getElementById(key);
            if (slider) {
                slider.value = currentEntry.taste[key];
            }
        });

        this.updateRadarChart();
    }

    updateRadarChart() {
        const canvas = document.getElementById('radar-chart');
        const ctx = canvas.getContext('2d');
        const currentEntry = this.entries[this.currentEntryIndex];
        
        if (!currentEntry) return;

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = 80;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw grid
        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 1;
        
        for (let i = 1; i <= 5; i++) {
            ctx.beginPath();
            ctx.arc(centerX, centerY, (radius / 5) * i, 0, 2 * Math.PI);
            ctx.stroke();
        }

        // Draw axes
        const labels = ['Sweetness', 'Bitterness', 'Umami', 'Astringency', 'Aroma'];
        const values = [
            currentEntry.taste.sweetness,
            currentEntry.taste.bitterness,
            currentEntry.taste.umami,
            currentEntry.taste.astringency,
            currentEntry.taste.aroma
        ];

        const angleStep = (2 * Math.PI) / 5;
        
        // Draw axis lines
        for (let i = 0; i < 5; i++) {
            const angle = i * angleStep - Math.PI / 2;
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;
            
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(x, y);
            ctx.stroke();
            
            // Draw labels
            ctx.fillStyle = '#64748b';
            ctx.font = '12px Inter';
            ctx.textAlign = 'center';
            const labelX = centerX + Math.cos(angle) * (radius + 20);
            const labelY = centerY + Math.sin(angle) * (radius + 20);
            ctx.fillText(labels[i], labelX, labelY);
        }

        // Draw data polygon
        ctx.beginPath();
        ctx.fillStyle = 'rgba(124, 179, 66, 0.3)';
        ctx.strokeStyle = '#7CB342';
        ctx.lineWidth = 2;

        for (let i = 0; i < 5; i++) {
            const angle = i * angleStep - Math.PI / 2;
            const value = values[i] / 10; // Normalize to 0-1
            const x = centerX + Math.cos(angle) * radius * value;
            const y = centerY + Math.sin(angle) * radius * value;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Draw data points
        ctx.fillStyle = '#7CB342';
        for (let i = 0; i < 5; i++) {
            const angle = i * angleStep - Math.PI / 2;
            const value = values[i] / 10;
            const x = centerX + Math.cos(angle) * radius * value;
            const y = centerY + Math.sin(angle) * radius * value;
            
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, 2 * Math.PI);
            ctx.fill();
        }
    }

    // Grid View
    renderGridView() {
        const container = document.getElementById('grid-container');
        container.innerHTML = '';

        // Add "New Entry" button
        const addNewItem = document.createElement('div');
        addNewItem.className = 'grid-item add-new';
        addNewItem.innerHTML = `
            <div class="plus-icon" style="font-size: 2rem; margin-bottom: 10px;">+</div>
            <div>Add New Entry</div>
        `;
        addNewItem.addEventListener('click', () => this.addNewEntry());
        container.appendChild(addNewItem);

        // Filter entries
        const filteredEntries = this.getFilteredEntries();

        // Add existing entries
        filteredEntries.forEach((entry, index) => {
            const item = this.createGridItem(entry, index);
            container.appendChild(item);
        });
    }

    createGridItem(entry, index) {
        const item = document.createElement('div');
        item.className = 'grid-item';
        item.draggable = true;
        item.dataset.entryId = entry.id;

        const tasteAverage = Object.values(entry.taste).reduce((a, b) => a + b, 0) / 5;
        const tastePercentage = (tasteAverage / 10) * 100;

        item.innerHTML = `
            <img src="${entry.image}" alt="${entry.name}">
            <div class="grid-item-content">
                <div class="grid-item-name">${entry.name}</div>
                <div class="grid-item-prefecture">${entry.prefecture}</div>
                <div class="grid-item-tags">
                    ${entry.flavors.map(flavor => `<span class="tag ${flavor}">${flavor}</span>`).join('')}
                </div>
                <div class="taste-bar">
                    <div class="taste-bar-fill" style="width: ${tastePercentage}%"></div>
                </div>
            </div>
            <button class="favorite-btn ${entry.favorite ? 'favorited' : ''}" data-entry-id="${entry.id}">
                ${entry.favorite ? '❤️' : '🤍'}
            </button>
        `;

        // Add event listeners
        item.addEventListener('click', (e) => {
            if (!e.target.classList.contains('favorite-btn')) {
                this.currentEntryIndex = this.entries.findIndex(e => e.id === entry.id);
                this.showPage('notes-page');
            }
        });

        const favoriteBtn = item.querySelector('.favorite-btn');
        favoriteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleFavorite(entry.id);
        });

        // Add drag and drop
        this.addDragAndDrop(item);

        return item;
    }

    // List View
    renderListView() {
        const container = document.getElementById('list-container');
        container.innerHTML = '';

        // Add "New Entry" button
        const addNewItem = document.createElement('div');
        addNewItem.className = 'list-item add-new';
        addNewItem.innerHTML = `
            <div style="font-size: 1.5rem;">+ Add New Entry</div>
        `;
        addNewItem.addEventListener('click', () => this.addNewEntry());
        container.appendChild(addNewItem);

        // Filter entries
        const filteredEntries = this.getFilteredEntries();

        // Add existing entries
        filteredEntries.forEach(entry => {
            const item = this.createListItem(entry);
            container.appendChild(item);
        });
    }

    createListItem(entry) {
        const item = document.createElement('div');
        item.className = 'list-item';
        item.dataset.entryId = entry.id;

        item.innerHTML = `
            <img src="${entry.image}" alt="${entry.name}">
            <div class="list-item-content">
                <div class="list-item-name" contenteditable="true" data-field="name">${entry.name}</div>
                <div class="list-item-prefecture" contenteditable="true" data-field="prefecture">${entry.prefecture}</div>
                <div class="list-item-tags">
                    ${entry.flavors.map(flavor => `<span class="tag ${flavor}">${flavor}</span>`).join('')}
                </div>
            </div>
            <button class="list-favorite-btn ${entry.favorite ? 'favorited' : ''}" data-entry-id="${entry.id}">
                ${entry.favorite ? '❤️' : '🤍'}
            </button>
        `;

        // Add inline editing
        const editableElements = item.querySelectorAll('[contenteditable="true"]');
        editableElements.forEach(element => {
            element.addEventListener('blur', (e) => {
                const field = e.target.dataset.field;
                const newValue = e.target.textContent.trim();
                this.updateEntryField(entry.id, field, newValue);
            });

            element.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    e.target.blur();
                }
            });
        });

        // Add favorite toggle
        const favoriteBtn = item.querySelector('.list-favorite-btn');
        favoriteBtn.addEventListener('click', () => {
            this.toggleFavorite(entry.id);
        });

        return item;
    }

    // Utility Methods
    getFilteredEntries() {
        if (this.currentFilter === 'all') {
            return this.entries;
        }
        return this.entries.filter(entry => entry.flavors.includes(this.currentFilter));
    }

    toggleFavorite(entryId) {
        const entry = this.entries.find(e => e.id === entryId);
        if (entry) {
            entry.favorite = !entry.favorite;
            this.saveEntries();
            
            // Update all views
            this.renderLandingPage();
            if (this.currentPage === 'grid-page') {
                this.renderGridView();
            } else if (this.currentPage === 'list-page') {
                this.renderListView();
            }
            
            this.showMessage(entry.favorite ? 'Added to favorites!' : 'Removed from favorites!', 'success');
        }
    }

    updateEntryField(entryId, field, value) {
        const entry = this.entries.find(e => e.id === entryId);
        if (entry) {
            entry[field] = value;
            this.saveEntries();
            this.showMessage('Entry updated!', 'success');
        }
    }

    saveCurrentEntry() {
        const currentEntry = this.entries[this.currentEntryIndex];
        if (!currentEntry) return;

        // Update from form fields
        currentEntry.name = document.getElementById('matcha-name').value;
        currentEntry.prefecture = document.getElementById('prefecture').value;
        currentEntry.notes = document.getElementById('notes').value;
        currentEntry.color = document.getElementById('custom-color').value;

        // Update flavors
        currentEntry.flavors = [];
        document.querySelectorAll('.flavor-tag.active').forEach(tag => {
            currentEntry.flavors.push(tag.dataset.flavor);
        });

        // Update taste values
        Object.keys(currentEntry.taste).forEach(key => {
            const slider = document.getElementById(key);
            if (slider) {
                currentEntry.taste[key] = parseInt(slider.value);
            }
        });

        this.saveEntries();
        this.renderLandingPage();
        this.showMessage('Entry saved successfully!', 'success');
    }

    // Image Upload
    handleImageUpload(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const currentEntry = this.entries[this.currentEntryIndex];
            if (currentEntry) {
                currentEntry.image = e.target.result;
                document.getElementById('notes-matcha-image').src = e.target.result;
                this.saveEntries();
                this.renderLandingPage();
                this.showMessage('Image uploaded successfully!', 'success');
                
                // Simulate auto-parsing (placeholder)
                this.simulateImageParsing(currentEntry);
            }
        };
        reader.readAsDataURL(file);
    }

    simulateImageParsing(entry) {
        // Simulate parsing matcha information from image
        setTimeout(() => {
            const sampleNames = ["宇治抹茶", "京都抹茶", "静岡抹茶"];
            const samplePrefectures = ["Uji, Kyoto", "Shizuoka", "Kagoshima"];
            
            const randomName = sampleNames[Math.floor(Math.random() * sampleNames.length)];
            const randomPrefecture = samplePrefectures[Math.floor(Math.random() * samplePrefectures.length)];
            
            document.getElementById('matcha-name').value = randomName;
            document.getElementById('prefecture').value = randomPrefecture;
            
            this.showMessage('Auto-filled information from image!', 'success');
        }, 1000);
    }

    // Translation (simulated)
    translateText(text) {
        const translations = {
            "宇治抹茶": "Uji Matcha",
            "京都抹茶": "Kyoto Matcha",
            "静岡抹茶": "Shizuoka Matcha"
        };
        
        return translations[text] || text;
    }

    // Drag and Drop
    addDragAndDrop(item) {
        item.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', item.dataset.entryId);
            item.classList.add('dragging');
        });

        item.addEventListener('dragend', () => {
            item.classList.remove('dragging');
        });

        item.addEventListener('dragover', (e) => {
            e.preventDefault();
            item.classList.add('drag-over');
        });

        item.addEventListener('dragleave', () => {
            item.classList.remove('drag-over');
        });

        item.addEventListener('drop', (e) => {
            e.preventDefault();
            item.classList.remove('drag-over');
            
            const draggedId = e.dataTransfer.getData('text/plain');
            const targetId = item.dataset.entryId;
            
            if (draggedId !== targetId) {
                this.reorderEntries(draggedId, targetId);
            }
        });
    }

    reorderEntries(draggedId, targetId) {
        const draggedIndex = this.entries.findIndex(e => e.id == draggedId);
        const targetIndex = this.entries.findIndex(e => e.id == targetId);
        
        if (draggedIndex !== -1 && targetIndex !== -1) {
            const [draggedEntry] = this.entries.splice(draggedIndex, 1);
            this.entries.splice(targetIndex, 0, draggedEntry);
            
            this.saveEntries();
            this.renderGridView();
            this.showMessage('Entries reordered!', 'success');
        }
    }

    // Filtering
    setFilter(filter) {
        this.currentFilter = filter;
        
        // Update filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });

        // Re-render current view
        if (this.currentPage === 'grid-page') {
            this.renderGridView();
        } else if (this.currentPage === 'list-page') {
            this.renderListView();
        }
    }

    // UI Helpers
    showMessage(text, type = 'success') {
        const message = document.createElement('div');
        message.className = `message ${type}`;
        message.textContent = text;
        document.body.appendChild(message);

        setTimeout(() => {
            message.remove();
        }, 3000);
    }

    // Event Listeners
    setupEventListeners() {
        // Navigation
        document.getElementById('grid-view-btn').addEventListener('click', () => this.showPage('grid-page'));
        document.getElementById('list-view-btn').addEventListener('click', () => this.showPage('list-page'));
        document.getElementById('grid-view-btn-notes').addEventListener('click', () => this.showPage('grid-page'));
        document.getElementById('list-view-btn-notes').addEventListener('click', () => this.showPage('list-page'));
        document.getElementById('back-to-landing').addEventListener('click', () => this.showPage('landing-page'));
        document.getElementById('back-to-notes').addEventListener('click', () => this.showPage('notes-page'));
        document.getElementById('back-to-notes-from-list').addEventListener('click', () => this.showPage('notes-page'));

        // Save buttons
        document.getElementById('save-entry-btn').addEventListener('click', () => this.saveCurrentEntry());
        document.getElementById('save-notes-btn').addEventListener('click', () => this.saveCurrentEntry());

        // Image upload
        document.getElementById('upload-image-btn').addEventListener('click', () => {
            document.getElementById('image-upload').click();
        });

        document.getElementById('image-upload').addEventListener('change', (e) => {
            if (e.target.files[0]) {
                this.handleImageUpload(e.target.files[0]);
            }
        });

        // Translation
        document.getElementById('translate-btn').addEventListener('click', () => {
            const nameInput = document.getElementById('matcha-name');
            const translated = this.translateText(nameInput.value);
            nameInput.value = translated;
            this.showMessage('Text translated!', 'success');
        });

        // Flavor tags
        document.querySelectorAll('.flavor-tag').forEach(tag => {
            tag.addEventListener('click', () => {
                tag.classList.toggle('active');
            });
        });

        // Taste sliders
        ['sweetness', 'bitterness', 'umami', 'astringency', 'aroma'].forEach(taste => {
            const slider = document.getElementById(taste);
            if (slider) {
                slider.addEventListener('input', () => {
                    this.updateRadarChart();
                });
            }
        });

        // Color picker
        document.getElementById('custom-color').addEventListener('change', (e) => {
            const currentEntry = this.entries[this.currentEntryIndex];
            if (currentEntry) {
                currentEntry.color = e.target.value;
            }
        });

        document.querySelectorAll('.color-option').forEach(option => {
            option.addEventListener('click', () => {
                const color = option.dataset.color;
                document.getElementById('custom-color').value = color;
                const currentEntry = this.entries[this.currentEntryIndex];
                if (currentEntry) {
                    currentEntry.color = color;
                }
            });
        });

        // Filter buttons (need to be set up for each page)
        this.setupFilterButtons();

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (this.currentPage === 'landing-page') {
                if (e.key === 'ArrowLeft' && this.currentEntryIndex > 0) {
                    this.currentEntryIndex--;
                    this.updateCarouselPositions();
                    this.updateCarouselIndicators();
                } else if (e.key === 'ArrowRight' && this.currentEntryIndex < this.entries.length - 1) {
                    this.currentEntryIndex++;
                    this.updateCarouselPositions();
                    this.updateCarouselIndicators();
                }
            }
        });

        // Touch/swipe support for mobile
        this.setupTouchEvents();
    }

    setupFilterButtons() {
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.setFilter(btn.dataset.filter);
            });
        });
    }

    setupTouchEvents() {
        const carousel = document.getElementById('matcha-carousel');
        let startX = 0;
        let startY = 0;

        carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });

        carousel.addEventListener('touchend', (e) => {
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            const diffX = startX - endX;
            const diffY = startY - endY;

            // Only handle horizontal swipes
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                if (diffX > 0 && this.currentEntryIndex < this.entries.length - 1) {
                    // Swipe left - next entry
                    this.currentEntryIndex++;
                } else if (diffX < 0 && this.currentEntryIndex > 0) {
                    // Swipe right - previous entry
                    this.currentEntryIndex--;
                }
                this.updateCarouselPositions();
                this.updateCarouselIndicators();
            }
        });
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    window.matchaTracker = new MatchaTracker();
});