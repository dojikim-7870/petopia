// Virtual Pet Game JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeVirtualPet();
});

// Game state
let pet = null;
let gameInterval = null;
let activityLog = [];

// Pet types configuration
const petTypes = {
    dog: {
        emoji: '🐕',
        name: 'Dog',
        moods: {
            happy: '😊',
            excited: '😃',
            content: '😌',
            tired: '😴',
            hungry: '🤤',
            sick: '🤒',
            playful: '😋'
        },
        preferences: {
            food: 20,
            play: 25,
            exercise: 30,
            sleep: 15,
            clean: 10,
            treat: 15
        }
    },
    cat: {
        emoji: '🐱',
        name: 'Cat',
        moods: {
            happy: '😊',
            content: '😌',
            sleepy: '😴',
            curious: '🤔',
            hungry: '🤤',
            sick: '🤒',
            playful: '😸'
        },
        preferences: {
            food: 18,
            play: 20,
            exercise: 15,
            sleep: 25,
            clean: 22,
            treat: 12
        }
    },
    rabbit: {
        emoji: '🐰',
        name: 'Rabbit',
        moods: {
            happy: '😊',
            content: '😌',
            excited: '😃',
            calm: '😇',
            hungry: '🤤',
            sick: '🤒',
            curious: '🤔'
        },
        preferences: {
            food: 25,
            play: 18,
            exercise: 20,
            sleep: 20,
            clean: 17,
            treat: 10
        }
    },
    bird: {
        emoji: '🐦',
        name: 'Bird',
        moods: {
            happy: '😊',
            singing: '🎵',
            content: '😌',
            tired: '😴',
            hungry: '🤤',
            sick: '🤒',
            excited: '😃'
        },
        preferences: {
            food: 20,
            play: 30,
            exercise: 25,
            sleep: 15,
            clean: 15,
            treat: 8
        }
    }
};

// Achievement definitions
const achievements = [
    { id: 'first_feed', name: 'First Meal', description: 'Fed your pet for the first time', icon: '🍎', requirement: 'feed', count: 1 },
    { id: 'good_parent', name: 'Good Parent', description: 'Fed your pet 10 times', icon: '👨‍👩‍👧‍👦', requirement: 'feed', count: 10 },
    { id: 'first_play', name: 'Playmate', description: 'Played with your pet for the first time', icon: '🎾', requirement: 'play', count: 1 },
    { id: 'active_owner', name: 'Active Owner', description: 'Played with your pet 15 times', icon: '🏃‍♂️', requirement: 'play', count: 15 },
    { id: 'clean_freak', name: 'Clean Freak', description: 'Cleaned your pet 5 times', icon: '🧽', requirement: 'clean', count: 5 },
    { id: 'early_riser', name: 'Early Riser', description: 'Put your pet to sleep 5 times', icon: '🌅', requirement: 'sleep', count: 5 },
    { id: 'fitness_guru', name: 'Fitness Guru', description: 'Exercised with your pet 8 times', icon: '💪', requirement: 'exercise', count: 8 },
    { id: 'treat_master', name: 'Treat Master', description: 'Gave treats 20 times', icon: '🍪', requirement: 'treat', count: 20 },
    { id: 'week_old', name: 'One Week Old', description: 'Your pet is 7 days old', icon: '📅', requirement: 'age', count: 7 },
    { id: 'level_master', name: 'Level Master', description: 'Reached level 10', icon: '🌟', requirement: 'level', count: 10 }
];

function initializeVirtualPet() {
    // Load existing pet or show selection screen
    const savedPet = PetopiaUtils.loadFromLocalStorage('virtualPet');
    
    if (savedPet) {
        pet = savedPet;
        showPetCare();
        startGameLoop();
    } else {
        showPetSelection();
    }
    
    initializeEventListeners();
}

function initializeEventListeners() {
    // Pet selection
    document.querySelectorAll('.pet-option').forEach(option => {
        option.addEventListener('click', function() {
            selectPetType(this.dataset.pet);
        });
    });
    
    // Pet adoption
    document.getElementById('adoptPetBtn').addEventListener('click', adoptPet);
    
    // Pet care actions
    document.getElementById('feedBtn').addEventListener('click', () => performAction('feed'));
    document.getElementById('playBtn').addEventListener('click', () => performAction('play'));
    document.getElementById('sleepBtn').addEventListener('click', () => performAction('sleep'));
    document.getElementById('cleanBtn').addEventListener('click', () => performAction('clean'));
    document.getElementById('exerciseBtn').addEventListener('click', () => performAction('exercise'));
    document.getElementById('treatBtn').addEventListener('click', () => performAction('treat'));
    
    // Info tabs
    document.querySelectorAll('.info-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            switchTab(this.dataset.tab);
        });
    });
    
    // Reset pet
    document.getElementById('resetPetBtn').addEventListener('click', resetPet);
    
    // Clear log
    document.getElementById('clearLogBtn').addEventListener('click', clearActivityLog);
}

function showPetSelection() {
    document.getElementById('petSelection').style.display = 'block';
    document.getElementById('petCare').style.display = 'none';
    document.getElementById('activityLog').style.display = 'none';
}

function showPetCare() {
    document.getElementById('petSelection').style.display = 'none';
    document.getElementById('petCare').style.display = 'block';
    document.getElementById('activityLog').style.display = 'block';
    
    updatePetDisplay();
    loadActivityLog();
}

function selectPetType(petType) {
    // Highlight selected pet
    document.querySelectorAll('.pet-option').forEach(option => {
        option.classList.remove('selected');
    });
    document.querySelector(`[data-pet="${petType}"]`).classList.add('selected');
    
    // Show name input
    document.getElementById('nameInput').style.display = 'block';
    document.getElementById('petName').value = '';
    document.getElementById('petName').dataset.petType = petType;
}

function adoptPet() {
    const petName = document.getElementById('petName').value.trim();
    const petType = document.getElementById('petName').dataset.petType;
    
    if (!petName) {
        PetopiaUtils.showAlert('Please enter a name for your pet!', 'warning');
        return;
    }
    
    if (petName.length < 2) {
        PetopiaUtils.showAlert('Pet name must be at least 2 characters long!', 'warning');
        return;
    }
    
    // Create new pet
    pet = {
        name: petName,
        type: petType,
        avatar: petTypes[petType].emoji,
        level: 1,
        experience: 0,
        age: 0, // in days
        created: new Date().toISOString(),
        stats: {
            hunger: 100,
            happiness: 100,
            energy: 100,
            health: 100
        },
        activities: {
            feed: 0,
            play: 0,
            sleep: 0,
            clean: 0,
            exercise: 0,
            treat: 0
        },
        achievements: [],
        lastUpdate: Date.now()
    };
    
    // Save pet and show care screen
    PetopiaUtils.saveToLocalStorage('virtualPet', pet);
    showPetCare();
    startGameLoop();
    
    // Welcome message
    addToLog(`🎉 Welcome ${petName} the ${petTypes[petType].name} to your new home!`);
    PetopiaUtils.showAlert(`${petName} has been adopted! Take good care of your new friend.`, 'success');
}

function startGameLoop() {
    // Update pet stats every 30 seconds
    gameInterval = setInterval(() => {
        updatePetStats();
        updatePetDisplay();
        checkAchievements();
        savePetData();
    }, 30000);
    
    // Initial display update
    updatePetDisplay();
}

function updatePetStats() {
    if (!pet) return;
    
    const now = Date.now();
    const timeDiff = now - pet.lastUpdate;
    const minutesPassed = Math.floor(timeDiff / (1000 * 60));
    
    if (minutesPassed > 0) {
        // Decrease stats over time
        pet.stats.hunger = Math.max(0, pet.stats.hunger - (minutesPassed * 0.5));
        pet.stats.happiness = Math.max(0, pet.stats.happiness - (minutesPassed * 0.3));
        pet.stats.energy = Math.max(0, pet.stats.energy - (minutesPassed * 0.4));
        
        // Health depends on other stats
        const avgStats = (pet.stats.hunger + pet.stats.happiness + pet.stats.energy) / 3;
        if (avgStats < 30) {
            pet.stats.health = Math.max(0, pet.stats.health - (minutesPassed * 0.2));
        } else if (avgStats > 70) {
            pet.stats.health = Math.min(100, pet.stats.health + (minutesPassed * 0.1));
        }
        
        // Update age (1 real hour = 1 pet day)
        const daysPassed = Math.floor(timeDiff / (1000 * 60 * 60));
        if (daysPassed > 0) {
            pet.age += daysPassed;
        }
        
        pet.lastUpdate = now;
    }
}

function updatePetDisplay() {
    if (!pet) return;
    
    // Update basic info
    document.getElementById('petNameTitle').textContent = `${pet.name} the ${petTypes[pet.type].name}`;
    document.getElementById('petAvatar').textContent = pet.avatar;
    document.getElementById('petAge').textContent = `Age: ${pet.age} days`;
    
    // Update mood and status
    const mood = calculateMood();
    document.getElementById('petMood').textContent = petTypes[pet.type].moods[mood] || '😊';
    document.getElementById('petStatus').textContent = generateStatusMessage(mood);
    
    // Update stat bars
    updateStatBar('hunger', pet.stats.hunger);
    updateStatBar('happiness', pet.stats.happiness);
    updateStatBar('energy', pet.stats.energy);
    updateStatBar('health', pet.stats.health);
    
    // Update detailed stats
    document.getElementById('petLevel').textContent = pet.level;
    document.getElementById('petExp').textContent = `${pet.experience} XP`;
    document.getElementById('timesFed').textContent = pet.activities.feed;
    document.getElementById('timesPlayed').textContent = pet.activities.play;
    document.getElementById('currentMood').textContent = capitalizeFirst(mood);
    document.getElementById('createdDate').textContent = PetopiaUtils.formatDate(pet.created);
    
    // Update action button states
    updateActionButtons();
}

function updateStatBar(statName, value) {
    const fill = document.getElementById(statName + 'Fill');
    const valueDisplay = document.getElementById(statName + 'Value');
    
    if (fill && valueDisplay) {
        fill.style.width = value + '%';
        valueDisplay.textContent = Math.round(value) + '%';
    }
}

function calculateMood() {
    const stats = pet.stats;
    
    if (stats.health < 30) return 'sick';
    if (stats.energy < 20) return 'tired';
    if (stats.hunger < 30) return 'hungry';
    if (stats.happiness > 80 && stats.energy > 70) return 'playful';
    if (stats.happiness > 90) return 'excited';
    if (stats.energy < 50) return 'sleepy';
    if (stats.happiness > 70) return 'happy';
    
    return 'content';
}

function generateStatusMessage(mood) {
    const messages = {
        happy: `${pet.name} is feeling wonderful!`,
        excited: `${pet.name} is super excited and full of energy!`,
        content: `${pet.name} is feeling peaceful and content.`,
        tired: `${pet.name} looks tired and needs some rest.`,
        hungry: `${pet.name} is getting hungry and could use some food.`,
        sick: `${pet.name} isn't feeling well and needs care.`,
        playful: `${pet.name} is in a playful mood and wants to have fun!`,
        sleepy: `${pet.name} is feeling drowsy.`,
        curious: `${pet.name} is curious about their surroundings.`
    };
    
    return messages[mood] || `${pet.name} is doing okay.`;
}

function updateActionButtons() {
    // Disable buttons based on current state
    const buttons = {
        feedBtn: pet.stats.hunger > 90,
        playBtn: pet.stats.energy < 20 || pet.stats.happiness > 95,
        sleepBtn: pet.stats.energy > 90,
        cleanBtn: pet.stats.health > 95,
        exerciseBtn: pet.stats.energy < 30,
        treatBtn: pet.stats.happiness > 95
    };
    
    Object.keys(buttons).forEach(buttonId => {
        const button = document.getElementById(buttonId);
        if (button) {
            button.disabled = buttons[buttonId];
        }
    });
}

function performAction(action) {
    if (!pet) return;
    
    const button = document.getElementById(action + 'Btn');
    const originalContent = PetopiaUtils.showLoading(button);
    
    setTimeout(() => {
        const results = executeAction(action);
        
        // Update pet stats
        Object.keys(results.stats).forEach(stat => {
            pet.stats[stat] = Math.max(0, Math.min(100, pet.stats[stat] + results.stats[stat]));
        });
        
        // Update activity count and experience
        pet.activities[action]++;
        pet.experience += results.exp;
        
        // Check for level up
        checkLevelUp();
        
        // Add to activity log
        addToLog(results.message);
        
        // Update display
        updatePetDisplay();
        checkAchievements();
        savePetData();
        
        PetopiaUtils.hideLoading(button, originalContent);
        PetopiaUtils.showAlert(results.message, 'success');
    }, 1000);
}

function executeAction(action) {
    const petType = petTypes[pet.type];
    const baseValue = petType.preferences[action];
    
    const actions = {
        feed: {
            stats: { hunger: baseValue, health: 5 },
            exp: 10,
            message: `🍎 You fed ${pet.name}! They're feeling satisfied and healthy.`
        },
        play: {
            stats: { happiness: baseValue, energy: -10 },
            exp: 15,
            message: `🎾 You played with ${pet.name}! They had so much fun and feel happier.`
        },
        sleep: {
            stats: { energy: baseValue, health: 8 },
            exp: 8,
            message: `😴 ${pet.name} took a nice nap and feels refreshed!`
        },
        clean: {
            stats: { health: baseValue, happiness: 10 },
            exp: 12,
            message: `🧼 You cleaned ${pet.name}! They feel fresh and comfortable.`
        },
        exercise: {
            stats: { health: baseValue, happiness: 15, energy: -15 },
            exp: 18,
            message: `🏃‍♂️ ${pet.name} got some great exercise and feels stronger!`
        },
        treat: {
            stats: { happiness: baseValue, hunger: 5 },
            exp: 5,
            message: `🍪 You gave ${pet.name} a special treat! They're delighted!`
        }
    };
    
    return actions[action];
}

function checkLevelUp() {
    const expRequired = pet.level * 100;
    
    if (pet.experience >= expRequired) {
        pet.level++;
        pet.experience -= expRequired;
        
        // Bonus stats for leveling up
        Object.keys(pet.stats).forEach(stat => {
            pet.stats[stat] = Math.min(100, pet.stats[stat] + 10);
        });
        
        addToLog(`🌟 ${pet.name} leveled up to Level ${pet.level}! All stats increased!`);
        PetopiaUtils.showAlert(`Congratulations! ${pet.name} reached Level ${pet.level}!`, 'success');
    }
}

function checkAchievements() {
    achievements.forEach(achievement => {
        if (pet.achievements.includes(achievement.id)) return;
        
        let currentValue = 0;
        
        switch (achievement.requirement) {
            case 'feed':
            case 'play':
            case 'sleep':
            case 'clean':
            case 'exercise':
            case 'treat':
                currentValue = pet.activities[achievement.requirement];
                break;
            case 'age':
                currentValue = pet.age;
                break;
            case 'level':
                currentValue = pet.level;
                break;
        }
        
        if (currentValue >= achievement.count) {
            pet.achievements.push(achievement.id);
            addToLog(`🏆 Achievement Unlocked: ${achievement.name} - ${achievement.description}`);
            PetopiaUtils.showAlert(`Achievement Unlocked: ${achievement.name}!`, 'success');
            updateAchievementDisplay();
        }
    });
}

function updateAchievementDisplay() {
    const achievementsList = document.getElementById('achievementsList');
    
    if (pet.achievements.length === 0) {
        achievementsList.innerHTML = '<p class="no-achievements">Complete care activities to earn achievements!</p>';
        return;
    }
    
    const earnedAchievements = achievements.filter(a => pet.achievements.includes(a.id));
    
    achievementsList.innerHTML = earnedAchievements.map(achievement => `
        <div class="achievement-item">
            <div class="achievement-icon">${achievement.icon}</div>
            <div class="achievement-details">
                <h4>${achievement.name}</h4>
                <p>${achievement.description}</p>
            </div>
        </div>
    `).join('');
}

function addToLog(message) {
    const timestamp = new Date().toLocaleTimeString();
    activityLog.unshift(`[${timestamp}] ${message}`);
    
    // Keep only last 20 entries
    if (activityLog.length > 20) {
        activityLog.splice(20);
    }
    
    PetopiaUtils.saveToLocalStorage('petActivityLog', activityLog);
    updateLogDisplay();
}

function updateLogDisplay() {
    const logContent = document.getElementById('logContent');
    
    if (activityLog.length === 0) {
        logContent.innerHTML = '<p class="no-activities">No activities yet. Start taking care of your pet!</p>';
        return;
    }
    
    logContent.innerHTML = activityLog.map(entry => `
        <div class="log-entry">${entry}</div>
    `).join('');
}

function loadActivityLog() {
    activityLog = PetopiaUtils.loadFromLocalStorage('petActivityLog') || [];
    updateLogDisplay();
}

function clearActivityLog() {
    activityLog = [];
    PetopiaUtils.saveToLocalStorage('petActivityLog', activityLog);
    updateLogDisplay();
    PetopiaUtils.showAlert('Activity log cleared!', 'info');
}

function switchTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.info-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    
    // Show/hide tab content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.style.display = 'none';
    });
    document.getElementById(tabName + 'Tab').style.display = 'block';
    
    // Update achievements display if needed
    if (tabName === 'achievements') {
        updateAchievementDisplay();
    }
}

function resetPet() {
    if (confirm(`Are you sure you want to reset ${pet.name}? This action cannot be undone.`)) {
        clearInterval(gameInterval);
        localStorage.removeItem('virtualPet');
        localStorage.removeItem('petActivityLog');
        pet = null;
        activityLog = [];
        
        PetopiaUtils.showAlert('Pet has been reset. You can now adopt a new pet!', 'info');
        showPetSelection();
    }
}

function savePetData() {
    if (pet) {
        PetopiaUtils.saveToLocalStorage('virtualPet', pet);
    }
}

function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Add CSS for virtual pet specific styles
const virtualPetStyles = `
<style>
.pet-container {
    max-width: 900px;
    margin: 0 auto;
}

.pet-options {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
}

.pet-option {
    background: var(--white);
    border: 2px solid #e9ecef;
    border-radius: var(--border-radius);
    padding: 1.5rem;
    text-align: center;
    cursor: pointer;
    transition: var(--transition);
}

.pet-option:hover,
.pet-option.selected {
    border-color: var(--primary-color);
    background: rgba(255, 107, 157, 0.05);
    transform: translateY(-5px);
    box-shadow: var(--shadow);
}

.pet-option .pet-avatar {
    font-size: 4rem;
    margin-bottom: 1rem;
}

.pet-option h3 {
    color: var(--gray-dark);
    margin-bottom: 0.5rem;
    font-weight: 600;
}

.pet-option p {
    color: var(--gray-medium);
    margin-bottom: 1rem;
    line-height: 1.5;
}

.pet-traits {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    justify-content: center;
}

.trait {
    background: var(--gray-light);
    color: var(--gray-dark);
    padding: 0.25rem 0.75rem;
    border-radius: 15px;
    font-size: 0.8rem;
    font-weight: 600;
}

.name-input {
    text-align: center;
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 2px solid var(--gray-light);
}

.pet-display {
    text-align: center;
    background: var(--gray-light);
    border-radius: var(--border-radius);
    padding: 2rem;
    margin-bottom: 2rem;
}

.pet-display .pet-avatar {
    font-size: 6rem;
    margin-bottom: 1rem;
}

.pet-mood {
    font-size: 2rem;
    margin-bottom: 0.5rem;
}

.pet-status {
    font-size: 1.1rem;
    color: var(--gray-dark);
    font-weight: 600;
    margin-bottom: 0.5rem;
}

.pet-age {
    color: var(--gray-medium);
    font-weight: 600;
}

.pet-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin-bottom: 2rem;
}

.stat-item {
    background: var(--white);
    padding: 1rem;
    border-radius: var(--border-radius);
    box-shadow: var(--shadow);
}

.stat-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 600;
    color: var(--gray-dark);
    margin-bottom: 0.5rem;
}

.stat-bar {
    background: #e9ecef;
    height: 12px;
    border-radius: 6px;
    overflow: hidden;
    margin-bottom: 0.5rem;
}

.stat-fill {
    height: 100%;
    transition: width 0.3s ease;
}

.stat-value {
    font-weight: 600;
    color: var(--gray-medium);
    font-size: 0.9rem;
}

.pet-actions {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 1rem;
    margin-bottom: 2rem;
}

.action-btn {
    background: var(--white);
    border: 2px solid var(--gray-light);
    border-radius: var(--border-radius);
    padding: 1rem;
    text-align: center;
    cursor: pointer;
    transition: var(--transition);
    color: var(--gray-dark);
    font-weight: 600;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
}

.action-btn:hover:not(:disabled) {
    border-color: var(--primary-color);
    background: rgba(255, 107, 157, 0.05);
    transform: translateY(-2px);
}

.action-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.action-btn i {
    font-size: 1.5rem;
}

.feed-btn:hover:not(:disabled) { border-color: var(--warm-orange); background: rgba(255, 190, 11, 0.1); }
.play-btn:hover:not(:disabled) { border-color: var(--primary-color); background: rgba(255, 107, 157, 0.1); }
.sleep-btn:hover:not(:disabled) { border-color: var(--soft-purple); background: rgba(157, 78, 221, 0.1); }
.clean-btn:hover:not(:disabled) { border-color: var(--secondary-color); background: rgba(78, 205, 196, 0.1); }
.exercise-btn:hover:not(:disabled) { border-color: var(--accent-color); background: rgba(69, 183, 209, 0.1); }
.treat-btn:hover:not(:disabled) { border-color: var(--mint-green); background: rgba(6, 255, 165, 0.1); }

.pet-info {
    background: var(--white);
    border-radius: var(--border-radius);
    overflow: hidden;
    box-shadow: var(--shadow);
    margin-bottom: 2rem;
}

.info-tabs {
    display: flex;
    background: var(--gray-light);
    border-bottom: 2px solid #e9ecef;
}

.info-tab {
    flex: 1;
    padding: 1rem;
    background: none;
    border: none;
    cursor: pointer;
    font-weight: 600;
    color: var(--gray-medium);
    transition: var(--transition);
}

.info-tab.active,
.info-tab:hover {
    background: var(--white);
    color: var(--primary-color);
}

.tab-content {
    padding: 2rem;
}

.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1.5rem;
}

.stat-detail {
    text-align: center;
}

.stat-detail h4 {
    color: var(--gray-medium);
    font-weight: 600;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
}

.stat-detail p {
    color: var(--gray-dark);
    font-weight: 700;
    font-size: 1.2rem;
}

.achievements-list {
    max-height: 300px;
    overflow-y: auto;
}

.achievement-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background: var(--gray-light);
    border-radius: var(--border-radius);
    margin-bottom: 1rem;
}

.achievement-icon {
    font-size: 2rem;
    min-width: 50px;
    text-align: center;
}

.achievement-details h4 {
    color: var(--gray-dark);
    margin-bottom: 0.25rem;
    font-weight: 600;
}

.achievement-details p {
    color: var(--gray-medium);
    font-size: 0.9rem;
    margin: 0;
}

.care-tips {
    display: grid;
    gap: 1rem;
}

.tip-item {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    padding: 1rem;
    background: var(--gray-light);
    border-radius: var(--border-radius);
}

.tip-item h4 {
    color: var(--gray-dark);
    margin-bottom: 0.5rem;
    font-weight: 600;
}

.tip-item p {
    color: var(--gray-medium);
    line-height: 1.5;
    margin: 0;
}

.activity-log {
    margin-top: 2rem;
}

.log-content {
    max-height: 200px;
    overflow-y: auto;
    background: var(--gray-light);
    border-radius: var(--border-radius);
    padding: 1rem;
}

.log-entry {
    padding: 0.5rem 0;
    border-bottom: 1px solid #e9ecef;
    color: var(--gray-dark);
    font-size: 0.9rem;
}

.log-entry:last-child {
    border-bottom: none;
}

.no-activities,
.no-achievements {
    text-align: center;
    color: var(--gray-medium);
    font-style: italic;
    padding: 2rem;
}

.reset-section {
    text-align: center;
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 2px solid var(--gray-light);
}

.btn-small {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
}

.instructions-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
}

.instruction-item {
    text-align: center;
    padding: 1rem;
}

.instruction-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
}

.instruction-item h4 {
    color: var(--gray-dark);
    margin-bottom: 0.5rem;
    font-weight: 600;
}

.instruction-item p {
    color: var(--gray-medium);
    font-size: 0.9rem;
    line-height: 1.5;
}

@media (max-width: 768px) {
    .pet-options {
        grid-template-columns: 1fr 1fr;
    }
    
    .pet-stats {
        grid-template-columns: 1fr;
    }
    
    .pet-actions {
        grid-template-columns: repeat(2, 1fr);
    }
    
    .stats-grid {
        grid-template-columns: repeat(2, 1fr);
    }
    
    .instructions-grid {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 480px) {
    .pet-options {
        grid-template-columns: 1fr;
    }
    
    .pet-actions {
        grid-template-columns: 1fr;
    }
    
    .stats-grid {
        grid-template-columns: 1fr;
    }
    
    .info-tabs {
        flex-direction: column;
    }
}
</style>
`;

// Add styles to document head
document.head.insertAdjacentHTML('beforeend', virtualPetStyles);
