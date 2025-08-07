// Pet Name Generator JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeNameGenerator();
    loadSavedNames();
});

// Name databases organized by categories
const nameDatabase = {
    classic: {
        male: ['Max', 'Charlie', 'Cooper', 'Buddy', 'Jack', 'Rocky', 'Duke', 'Bear', 'Zeus', 'Leo'],
        female: ['Bella', 'Luna', 'Lucy', 'Daisy', 'Lola', 'Sadie', 'Molly', 'Bailey', 'Stella', 'Zoe'],
        unisex: ['Alex', 'Casey', 'Riley', 'Sam', 'Taylor', 'Jordan', 'Morgan', 'Blake', 'Quinn', 'Sage']
    },
    modern: {
        male: ['Milo', 'Finn', 'Ollie', 'Jasper', 'Oscar', 'Archie', 'Theo', 'Felix', 'Hugo', 'Ryder'],
        female: ['Harper', 'Nova', 'Willow', 'Aria', 'Maya', 'Ivy', 'Zara', 'Nala', 'Kira', 'Mia'],
        unisex: ['River', 'Sky', 'Ocean', 'Storm', 'Phoenix', 'Scout', 'Sage', 'Rowan', 'Eden', 'Atlas']
    },
    unique: {
        male: ['Zephyr', 'Orion', 'Cosmo', 'Atlas', 'Phoenix', 'Kai', 'Aspen', 'Onyx', 'Jax', 'Knox'],
        female: ['Seraphina', 'Celestia', 'Aurora', 'Lyra', 'Freya', 'Iris', 'Ember', 'Luna', 'Sasha', 'Vera'],
        unisex: ['Indigo', 'Sage', 'Robin', 'Rowan', 'River', 'Sky', 'Storm', 'Vale', 'Wren', 'Zen']
    },
    funny: {
        male: ['Waffles', 'Pickles', 'Biscuit', 'Noodle', 'Taco', 'Meatball', 'Pancake', 'Cheeseburger', 'Nacho', 'Pretzel'],
        female: ['Cupcake', 'Cookie', 'Peaches', 'Peanut', 'Buttercup', 'Jellybean', 'Muffin', 'Sprinkles', 'Pudding', 'Honey'],
        unisex: ['Pickle', 'Peanut', 'Mango', 'Coconut', 'Pepper', 'Ginger', 'Cinnamon', 'Basil', 'Sage', 'Mint']
    },
    elegant: {
        male: ['Sebastian', 'Alexander', 'Theodore', 'Maximilian', 'Augustus', 'Reginald', 'Montgomery', 'Bartholomew', 'Cornelius', 'Fitzgerald'],
        female: ['Anastasia', 'Isabella', 'Evangeline', 'Persephone', 'Genevieve', 'Arabella', 'Seraphina', 'Cordelia', 'Guinevere', 'Ophelia'],
        unisex: ['Avery', 'Emery', 'Cameron', 'Finley', 'Hadley', 'Kendall', 'Peyton', 'Reese', 'Sidney', 'Tatum']
    },
    strong: {
        male: ['Thor', 'Titan', 'Rex', 'King', 'Chief', 'Boss', 'Tank', 'Ranger', 'Hunter', 'Maverick'],
        female: ['Xena', 'Athena', 'Raven', 'Storm', 'Justice', 'Rebel', 'Warrior', 'Phoenix', 'Valkyrie', 'Knight'],
        unisex: ['Blaze', 'Storm', 'Thunder', 'Lightning', 'Steel', 'Stone', 'Arrow', 'Blade', 'Shield', 'Crown']
    },
    cute: {
        male: ['Pumpkin', 'Teddy', 'Cuddles', 'Snuggles', 'Sweetie', 'Bubbles', 'Giggles', 'Wiggles', 'Fuzzy', 'Fluffy'],
        female: ['Princess', 'Sweetpea', 'Cupcake', 'Buttercup', 'Rosie', 'Poppy', 'Tulip', 'Daisy', 'Lily', 'Violet'],
        unisex: ['Sunny', 'Happy', 'Lucky', 'Joy', 'Love', 'Angel', 'Star', 'Dream', 'Hope', 'Peace']
    },
    mythical: {
        male: ['Apollo', 'Ares', 'Poseidon', 'Hermes', 'Loki', 'Odin', 'Gandalf', 'Merlin', 'Aragorn', 'Legolas'],
        female: ['Athena', 'Artemis', 'Hera', 'Freya', 'Diana', 'Luna', 'Galadriel', 'Arwen', 'Hermione', 'Katniss'],
        unisex: ['Phoenix', 'Dragon', 'Sage', 'Spirit', 'Magic', 'Mystic', 'Legend', 'Hero', 'Quest', 'Journey']
    }
};

// Prefixes and suffixes for combination names
const namePrefixes = ['Sir', 'Lady', 'Lord', 'Princess', 'Prince', 'Captain', 'Major', 'Little', 'Big', 'Sweet'];
const nameSuffixes = ['paws', 'tail', 'whiskers', 'nose', 'ears', 'fur', 'heart', 'soul', 'spirit', 'joy'];

// Size-based name modifiers
const sizeModifiers = {
    tiny: ['Tiny', 'Mini', 'Micro', 'Pocket', 'Pee-wee', 'Button', 'Pip', 'Dot', 'Bean', 'Chip'],
    small: ['Little', 'Small', 'Petite', 'Compact', 'Short', 'Cute', 'Sweet', 'Dainty', 'Delicate', 'Fine'],
    medium: [], // No modifiers for medium
    large: ['Big', 'Large', 'Great', 'Major', 'Grand', 'Mighty', 'Strong', 'Powerful', 'Bold', 'Brave'],
    giant: ['Giant', 'Huge', 'Massive', 'Enormous', 'Colossal', 'Titan', 'Mammoth', 'Jumbo', 'Super', 'Mega']
};

// Personality-based name elements
const personalityNames = {
    playful: ['Bounce', 'Skip', 'Hop', 'Jump', 'Dance', 'Wiggle', 'Giggle', 'Tickle', 'Frolic', 'Romp'],
    calm: ['Zen', 'Peace', 'Calm', 'Serene', 'Quiet', 'Still', 'Gentle', 'Soft', 'Mild', 'Tranquil'],
    energetic: ['Zoom', 'Dash', 'Bolt', 'Flash', 'Rocket', 'Turbo', 'Speedy', 'Quick', 'Fast', 'Swift'],
    gentle: ['Gentle', 'Tender', 'Kind', 'Sweet', 'Soft', 'Mild', 'Calm', 'Patient', 'Caring', 'Loving'],
    brave: ['Brave', 'Bold', 'Courage', 'Hero', 'Champion', 'Warrior', 'Knight', 'Guardian', 'Defender', 'Protector'],
    curious: ['Scout', 'Explorer', 'Quest', 'Wonder', 'Discover', 'Search', 'Find', 'Seek', 'Hunt', 'Track'],
    loyal: ['Faithful', 'True', 'Loyal', 'Devoted', 'Constant', 'Steady', 'Sure', 'Reliable', 'Trusty', 'Dependable'],
    independent: ['Solo', 'Free', 'Wild', 'Rebel', 'Rogue', 'Maverick', 'Independent', 'Lone', 'Single', 'Self']
};

function initializeNameGenerator() {
    const form = document.getElementById('nameGeneratorForm');
    const generateMoreBtn = document.getElementById('generateMore');
    const saveNamesBtn = document.getElementById('saveNames');
    
    form.addEventListener('submit', handleFormSubmit);
    
    if (generateMoreBtn) {
        generateMoreBtn.addEventListener('click', function() {
            const formData = new FormData(form);
            generateNames(Object.fromEntries(formData));
        });
    }
    
    if (saveNamesBtn) {
        saveNamesBtn.addEventListener('click', saveFavoriteNames);
    }
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const preferences = Object.fromEntries(formData);
    
    // Validate required fields
    if (!preferences.petType) {
        PetopiaUtils.showAlert('Please select a pet type to generate names.', 'warning');
        return;
    }
    
    generateNames(preferences);
}

function generateNames(preferences) {
    const button = document.querySelector('.btn-generate');
    const originalContent = PetopiaUtils.showLoading(button);
    
    // Simulate processing time for better UX
    setTimeout(() => {
        const names = createNameList(preferences);
        displayNames(names, preferences);
        PetopiaUtils.hideLoading(button, originalContent);
        
        // Scroll to results
        document.getElementById('namesResult').scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }, 1000);
}

function createNameList(preferences) {
    const names = [];
    const {
        petType,
        petGender,
        petSize,
        petPersonality,
        nameStyle,
        nameLength
    } = preferences;
    
    // Get base names from the selected style
    const style = nameStyle === 'any' ? getRandomStyle() : nameStyle;
    const genderKey = petGender || 'unisex';
    
    let baseNames = [];
    
    // Get names from the selected style
    if (nameDatabase[style] && nameDatabase[style][genderKey]) {
        baseNames = [...nameDatabase[style][genderKey]];
    }
    
    // Add unisex names if specific gender is selected
    if (genderKey !== 'unisex' && nameDatabase[style] && nameDatabase[style].unisex) {
        baseNames.push(...nameDatabase[style].unisex);
    }
    
    // If not enough names, add from other styles
    if (baseNames.length < 10) {
        Object.keys(nameDatabase).forEach(styleKey => {
            if (styleKey !== style && nameDatabase[styleKey][genderKey]) {
                baseNames.push(...nameDatabase[styleKey][genderKey].slice(0, 3));
            }
        });
    }
    
    // Create variations and combinations
    const generatedNames = new Set();
    
    // Add base names
    baseNames.forEach(name => {
        if (matchesLengthPreference(name, nameLength)) {
            generatedNames.add(name);
        }
    });
    
    // Add size-modified names
    if (petSize && petSize !== 'medium' && sizeModifiers[petSize]) {
        const modifiers = sizeModifiers[petSize];
        baseNames.forEach(name => {
            modifiers.slice(0, 3).forEach(modifier => {
                const combinedName = `${modifier} ${name}`;
                if (matchesLengthPreference(combinedName, nameLength)) {
                    generatedNames.add(combinedName);
                }
            });
        });
    }
    
    // Add personality-based names
    if (petPersonality && personalityNames[petPersonality]) {
        personalityNames[petPersonality].forEach(name => {
            if (matchesLengthPreference(name, nameLength)) {
                generatedNames.add(name);
            }
        });
    }
    
    // Add prefix/suffix combinations
    baseNames.slice(0, 5).forEach(name => {
        // Add prefixes
        const randomPrefix = namePrefixes[Math.floor(Math.random() * namePrefixes.length)];
        const prefixedName = `${randomPrefix} ${name}`;
        if (matchesLengthPreference(prefixedName, nameLength)) {
            generatedNames.add(prefixedName);
        }
        
        // Add suffixes (for shorter base names)
        if (name.length <= 5) {
            const randomSuffix = nameSuffixes[Math.floor(Math.random() * nameSuffixes.length)];
            const suffixedName = `${name}${randomSuffix}`;
            if (matchesLengthPreference(suffixedName, nameLength)) {
                generatedNames.add(suffixedName);
            }
        }
    });
    
    // Convert to array and shuffle
    const finalNames = Array.from(generatedNames);
    shuffleArray(finalNames);
    
    // Return up to 12 names
    return finalNames.slice(0, 12);
}

function matchesLengthPreference(name, lengthPref) {
    if (!lengthPref || lengthPref === 'any') return true;
    
    const nameLength = name.replace(/\s/g, '').length; // Remove spaces for length calculation
    
    switch (lengthPref) {
        case 'short': return nameLength <= 4;
        case 'medium': return nameLength >= 5 && nameLength <= 7;
        case 'long': return nameLength >= 8;
        default: return true;
    }
}

function getRandomStyle() {
    const styles = Object.keys(nameDatabase);
    return styles[Math.floor(Math.random() * styles.length)];
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function displayNames(names, preferences) {
    const resultDiv = document.getElementById('namesResult');
    const namesList = document.getElementById('namesList');
    
    if (names.length === 0) {
        namesList.innerHTML = '<p class="no-results">No names found matching your criteria. Try adjusting your preferences!</p>';
    } else {
        namesList.innerHTML = names.map(name => `
            <div class="name-card">
                <div class="name-text">${name}</div>
                <button class="name-favorite" onclick="toggleFavorite('${name}', this)">
                    <i class="far fa-heart"></i>
                </button>
            </div>
        `).join('');
    }
    
    resultDiv.style.display = 'block';
    
    // Update favorites display
    updateFavoriteButtons();
}

function toggleFavorite(name, button) {
    const favorites = PetopiaUtils.loadFromLocalStorage('favoriteNames') || [];
    const index = favorites.indexOf(name);
    
    if (index === -1) {
        // Add to favorites
        favorites.push(name);
        button.innerHTML = '<i class="fas fa-heart"></i>';
        button.classList.add('favorited');
        PetopiaUtils.showAlert(`"${name}" added to favorites!`, 'success');
    } else {
        // Remove from favorites
        favorites.splice(index, 1);
        button.innerHTML = '<i class="far fa-heart"></i>';
        button.classList.remove('favorited');
        PetopiaUtils.showAlert(`"${name}" removed from favorites.`, 'info');
    }
    
    PetopiaUtils.saveToLocalStorage('favoriteNames', favorites);
    loadSavedNames();
}

function updateFavoriteButtons() {
    const favorites = PetopiaUtils.loadFromLocalStorage('favoriteNames') || [];
    const buttons = document.querySelectorAll('.name-favorite');
    
    buttons.forEach(button => {
        const name = button.parentElement.querySelector('.name-text').textContent;
        if (favorites.includes(name)) {
            button.innerHTML = '<i class="fas fa-heart"></i>';
            button.classList.add('favorited');
        } else {
            button.innerHTML = '<i class="far fa-heart"></i>';
            button.classList.remove('favorited');
        }
    });
}

function saveFavoriteNames() {
    const favoriteButtons = document.querySelectorAll('.name-favorite.favorited');
    if (favoriteButtons.length === 0) {
        PetopiaUtils.showAlert('Please select some names as favorites first!', 'warning');
        return;
    }
    
    PetopiaUtils.showAlert(`${favoriteButtons.length} names saved to your favorites!`, 'success');
    loadSavedNames();
}

function loadSavedNames() {
    const favorites = PetopiaUtils.loadFromLocalStorage('favoriteNames') || [];
    const savedNamesDiv = document.getElementById('savedNames');
    const savedNamesList = document.getElementById('savedNamesList');
    
    if (favorites.length > 0) {
        savedNamesList.innerHTML = favorites.map(name => `
            <div class="name-card saved">
                <div class="name-text">${name}</div>
                <button class="name-remove" onclick="removeFavorite('${name}', this)">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `).join('');
        savedNamesDiv.style.display = 'block';
    } else {
        savedNamesDiv.style.display = 'none';
    }
}

function removeFavorite(name, button) {
    const favorites = PetopiaUtils.loadFromLocalStorage('favoriteNames') || [];
    const index = favorites.indexOf(name);
    
    if (index !== -1) {
        favorites.splice(index, 1);
        PetopiaUtils.saveToLocalStorage('favoriteNames', favorites);
        PetopiaUtils.showAlert(`"${name}" removed from favorites.`, 'info');
        loadSavedNames();
        updateFavoriteButtons();
    }
}

// Add CSS for name cards
const nameGeneratorStyles = `
<style>
.name-generator-container {
    max-width: 800px;
    margin: 0 auto;
}

.form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
}

.names-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin-bottom: 2rem;
}

.name-card {
    background: var(--gray-light);
    border: 2px solid #e9ecef;
    border-radius: var(--border-radius);
    padding: 1rem;
    text-align: center;
    position: relative;
    transition: var(--transition);
}

.name-card:hover {
    border-color: var(--primary-color);
    transform: translateY(-2px);
    box-shadow: var(--shadow);
}

.name-card.saved {
    background: linear-gradient(135deg, var(--light-pink), var(--cream));
    border-color: var(--primary-color);
}

.name-text {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--gray-dark);
    margin-bottom: 0.5rem;
}

.name-favorite,
.name-remove {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    background: none;
    border: none;
    color: var(--gray-medium);
    font-size: 1.2rem;
    cursor: pointer;
    transition: var(--transition);
}

.name-favorite:hover,
.name-remove:hover {
    color: var(--primary-color);
}

.name-favorite.favorited {
    color: var(--primary-color);
}

.result-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
}

.tips-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
}

.tip-item {
    text-align: center;
    padding: 1rem;
}

.tip-icon {
    font-size: 2rem;
    margin-bottom: 1rem;
}

.tip-item h4 {
    color: var(--gray-dark);
    margin-bottom: 0.5rem;
    font-weight: 600;
}

.tip-item p {
    color: var(--gray-medium);
    font-size: 0.9rem;
    line-height: 1.5;
}

.no-results {
    text-align: center;
    color: var(--gray-medium);
    font-style: italic;
    padding: 2rem;
}

@media (max-width: 768px) {
    .form-row {
        grid-template-columns: 1fr;
    }
    
    .names-grid {
        grid-template-columns: 1fr 1fr;
    }
    
    .result-actions {
        flex-direction: column;
        align-items: stretch;
    }
}

@media (max-width: 480px) {
    .names-grid {
        grid-template-columns: 1fr;
    }
}
</style>
`;

// Add styles to document head
document.head.insertAdjacentHTML('beforeend', nameGeneratorStyles);
