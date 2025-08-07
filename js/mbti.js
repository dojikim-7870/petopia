// Pet MBTI Test JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeMBTITest();
    loadSavedResults();
});

// Test state
let currentQuestion = 0;
let answers = [];
let testData = {
    petName: '',
    petType: ''
};

// MBTI Questions
const mbtiQuestions = [
    {
        question: "When meeting new people or animals, your pet usually:",
        optionA: "Approaches eagerly and wants to interact",
        optionB: "Observes from a distance before deciding",
        dimension: "social" // Social vs Independent
    },
    {
        question: "During playtime, your pet prefers:",
        optionA: "High-energy, active games and running around",
        optionB: "Calm, gentle activities or quiet exploration",
        dimension: "active" // Active vs Calm
    },
    {
        question: "When you bring home something new, your pet:",
        optionA: "Immediately investigates and explores it",
        optionB: "Watches carefully before approaching",
        dimension: "curious" // Curious vs Cautious
    },
    {
        question: "Your pet's daily routine:",
        optionA: "They thrive on consistent schedules and patterns",
        optionB: "They adapt well to changes and surprises",
        dimension: "routine" // Routine vs Spontaneous
    },
    {
        question: "In social situations with other pets, your pet:",
        optionA: "Seeks out interaction and plays with others",
        optionB: "Prefers to do their own thing",
        dimension: "social"
    },
    {
        question: "Your pet's energy level throughout the day:",
        optionA: "High bursts of energy with active periods",
        optionB: "Steady, calm energy with peaceful moments",
        dimension: "active"
    },
    {
        question: "When exploring outdoors, your pet:",
        optionA: "Boldly ventures into new areas",
        optionB: "Stays close and checks familiar spots first",
        dimension: "curious"
    },
    {
        question: "Changes in the household (new furniture, schedule) make your pet:",
        optionA: "A bit stressed until they adjust to the routine",
        optionB: "Excited and interested in the novelty",
        dimension: "routine"
    },
    {
        question: "Your pet's preferred sleeping arrangement:",
        optionA: "Close to family members or other pets",
        optionB: "In their own quiet, private space",
        dimension: "social"
    },
    {
        question: "During training sessions, your pet:",
        optionA: "Gets excited and energetic about learning",
        optionB: "Focuses calmly and methodically",
        dimension: "active"
    },
    {
        question: "When hearing unfamiliar sounds, your pet:",
        optionA: "Goes to investigate what's making the noise",
        optionB: "Becomes alert but waits to assess the situation",
        dimension: "curious"
    },
    {
        question: "Your pet's feeding habits:",
        optionA: "They prefer eating at the same times each day",
        optionB: "They're flexible about meal times",
        dimension: "routine"
    },
    {
        question: "At the veterinarian's office, your pet:",
        optionA: "Is interested in meeting new people and animals",
        optionB: "Prefers to stay close to you for comfort",
        dimension: "social"
    },
    {
        question: "Your pet's play style is:",
        optionA: "Vigorous and physically demanding",
        optionB: "Gentle and mentally stimulating",
        dimension: "active"
    },
    {
        question: "When you rearrange furniture, your pet:",
        optionA: "Explores all the new configurations immediately",
        optionB: "Takes time to cautiously check out changes",
        dimension: "curious"
    },
    {
        question: "Your pet handles disruptions to their routine by:",
        optionA: "Seeming unsettled until things return to normal",
        optionB: "Rolling with the changes pretty easily",
        dimension: "routine"
    }
];

// Personality type definitions
const personalityTypes = {
    'SCAR': {
        name: 'The Gentle Guardian',
        description: 'Social, Calm, Active in exploration, Routine-loving. Your pet is a peaceful protector who enjoys gentle social interaction and thrives on predictable routines.',
        traits: ['Gentle with children', 'Protective but not aggressive', 'Enjoys routine walks', 'Calm in social situations'],
        play: ['Gentle fetch games', 'Supervised playdates', 'Puzzle toys', 'Short, regular walks'],
        training: ['Consistent, gentle approach', 'Positive reinforcement', 'Short, regular sessions', 'Patient repetition'],
        care: ['Maintain consistent routines', 'Gradual introduction to new things', 'Regular, gentle grooming', 'Calm, quiet environment'],
        environment: ['Predictable daily schedule', 'Quiet, comfortable spaces', 'Gentle background noise', 'Regular social interaction']
    },
    'SCAS': {
        name: 'The Flexible Friend',
        description: 'Social, Calm, Active in exploration, Spontaneous. Your pet is an adaptable companion who enjoys meeting others while staying relaxed about changes.',
        traits: ['Adaptable to change', 'Friendly with strangers', 'Calm demeanor', 'Flexible schedule'],
        play: ['Varied activities', 'Social play sessions', 'New games regularly', 'Interactive toys'],
        training: ['Flexible training schedule', 'Variety in training methods', 'Social training classes', 'Reward-based learning'],
        care: ['Flexible feeding times', 'Regular social exposure', 'Variety in daily activities', 'Gentle handling'],
        environment: ['Changing scenery welcomed', 'Social environments', 'Flexible routines', 'Calm but stimulating']
    },
    'SCCR': {
        name: 'The Loyal Companion',
        description: 'Social, Calm, Cautious, Routine-loving. Your pet is a devoted friend who prefers familiar faces and predictable patterns.',
        traits: ['Deeply loyal', 'Prefers familiar people', 'Cautious with new things', 'Routine-oriented'],
        play: ['Familiar games', 'Play with known companions', 'Gentle, predictable activities', 'Comfort-zone play'],
        training: ['Consistent trainer', 'Familiar environment', 'Gentle, patient approach', 'Regular schedule'],
        care: ['Strong bonding time', 'Consistent caregivers', 'Gradual introductions', 'Routine maintenance'],
        environment: ['Stable home environment', 'Familiar surroundings', 'Regular family time', 'Quiet, secure spaces']
    },
    'SCCS': {
        name: 'The Easy-Going Buddy',
        description: 'Social, Calm, Cautious, Spontaneous. Your pet is relaxed and social but takes their time with new experiences.',
        traits: ['Calm and patient', 'Socially adaptable', 'Thoughtful approach', 'Flexible timing'],
        play: ['Relaxed social play', 'Thoughtful exploration', 'Gentle interactive games', 'Patient learning activities'],
        training: ['Patient, calm sessions', 'Social but not overwhelming', 'Flexible timing', 'Gentle encouragement'],
        care: ['Patient bonding', 'Calm social exposure', 'Flexible care routine', 'Gentle encouragement'],
        environment: ['Calm social settings', 'Flexible but not chaotic', 'Patient introduction to new things', 'Relaxed atmosphere']
    },
    'SAER': {
        name: 'The Adventure Buddy',
        description: 'Social, Active, Eager explorer, Routine-loving. Your pet loves active adventures with others but appreciates a predictable schedule.',
        traits: ['High energy', 'Loves group activities', 'Bold explorer', 'Routine for recovery'],
        play: ['High-energy group play', 'Adventure walks', 'Active sports', 'Regular play schedule'],
        training: ['Active training sessions', 'Group classes', 'Adventure-based rewards', 'Consistent schedule'],
        care: ['High exercise needs', 'Social exercise time', 'Regular adventure outings', 'Consistent rest periods'],
        environment: ['Active household', 'Regular exercise schedule', 'Group activities', 'Adventure opportunities']
    },
    'SAES': {
        name: 'The Social Dynamo',
        description: 'Social, Active, Eager explorer, Spontaneous. Your pet is a high-energy explorer who thrives on social adventures and variety.',
        traits: ['Very high energy', 'Loves variety', 'Social butterfly', 'Adventure seeker'],
        play: ['Varied high-energy activities', 'Group adventures', 'New challenges regularly', 'Interactive social games'],
        training: ['Dynamic training methods', 'Group activities', 'Varied challenges', 'High-energy rewards'],
        care: ['Lots of exercise variety', 'Social stimulation', 'Adventure time', 'Mental challenges'],
        environment: ['Stimulating, active environment', 'Social opportunities', 'Varied daily activities', 'Adventure access']
    },
    'SACR': {
        name: 'The Thoughtful Explorer',
        description: 'Social, Active, Cautious explorer, Routine-loving. Your pet enjoys active social time but approaches new things thoughtfully.',
        traits: ['Active but thoughtful', 'Social but selective', 'Measured exploration', 'Routine for security'],
        play: ['Active but familiar games', 'Social play with known friends', 'Structured exploration', 'Regular play times'],
        training: ['Active but patient training', 'Familiar training environment', 'Social but structured', 'Consistent methods'],
        care: ['Active but predictable exercise', 'Familiar social groups', 'Gradual new experiences', 'Regular routines'],
        environment: ['Active but structured', 'Familiar social settings', 'Predictable adventure times', 'Safe exploration zones']
    },
    'SACS': {
        name: 'The Adaptable Athlete',
        description: 'Social, Active, Cautious explorer, Spontaneous. Your pet is energetic and social but takes time to warm up to completely new experiences.',
        traits: ['High energy', 'Socially flexible', 'Thoughtful about new things', 'Adaptable timing'],
        play: ['High-energy social play', 'Flexible activities', 'Gradual new challenges', 'Active group games'],
        training: ['Energetic but patient training', 'Social training environment', 'Flexible scheduling', 'Active learning methods'],
        care: ['High activity needs', 'Social exercise', 'Patient introduction to new things', 'Flexible routine'],
        environment: ['Active social environment', 'Flexible but not overwhelming', 'Gradual new experiences', 'High stimulation']
    },
    'ICAR': {
        name: 'The Independent Guardian',
        description: 'Independent, Calm, Active explorer, Routine-loving. Your pet is self-reliant and calm but enjoys exploring within familiar routines.',
        traits: ['Self-sufficient', 'Calm confidence', 'Methodical explorer', 'Routine-oriented'],
        play: ['Solo exploration games', 'Calm puzzle activities', 'Independent play', 'Regular play schedule'],
        training: ['One-on-one sessions', 'Calm, patient approach', 'Independent learning', 'Consistent schedule'],
        care: ['Independent but regular care', 'Calm, gentle handling', 'Predictable routine', 'Respect for space'],
        environment: ['Quiet, predictable environment', 'Independent space', 'Calm atmosphere', 'Regular but not overwhelming interaction']
    },
    'ICAS': {
        name: 'The Free Spirit',
        description: 'Independent, Calm, Active explorer, Spontaneous. Your pet is a calm, independent soul who enjoys exploring on their own terms.',
        traits: ['Highly independent', 'Calm demeanor', 'Self-directed exploration', 'Flexible about timing'],
        play: ['Independent exploration', 'Self-directed activities', 'Calm, solo games', 'Flexible play times'],
        training: ['Independent learning style', 'Calm, patient sessions', 'Self-paced progress', 'Flexible timing'],
        care: ['Respect independence', 'Calm, gentle approach', 'Flexible care routine', 'Self-directed activities'],
        environment: ['Independent living space', 'Calm, quiet environment', 'Flexible routines', 'Self-exploration opportunities']
    },
    'ICCR': {
        name: 'The Peaceful Homebody',
        description: 'Independent, Calm, Cautious, Routine-loving. Your pet is a gentle, independent soul who loves predictability and familiar comforts.',
        traits: ['Highly routine-oriented', 'Gentle independence', 'Cautious nature', 'Peaceful demeanor'],
        play: ['Quiet, gentle activities', 'Familiar games', 'Solo play', 'Regular, calm play times'],
        training: ['Gentle, consistent approach', 'Familiar environment', 'Patient, slow progress', 'Predictable sessions'],
        care: ['Gentle, predictable care', 'Respect for independence', 'Familiar routines', 'Calm handling'],
        environment: ['Very predictable environment', 'Quiet, calm spaces', 'Familiar surroundings', 'Peaceful atmosphere']
    },
    'ICCS': {
        name: 'The Gentle Observer',
        description: 'Independent, Calm, Cautious, Spontaneous. Your pet is peacefully independent, thoughtful about new experiences, but adaptable to change.',
        traits: ['Thoughtfully independent', 'Calm observer', 'Cautious but adaptable', 'Peaceful flexibility'],
        play: ['Calm, observational activities', 'Independent exploration', 'Gentle, flexible games', 'Solo activities'],
        training: ['Patient, gentle approach', 'Independent learning', 'Flexible but calm sessions', 'Respectful methods'],
        care: ['Gentle, patient care', 'Respect independence', 'Flexible but calm routine', 'Thoughtful handling'],
        environment: ['Calm, flexible environment', 'Independent space', 'Gentle changes', 'Peaceful atmosphere']
    },
    'IAER': {
        name: 'The Solo Adventurer',
        description: 'Independent, Active, Eager explorer, Routine-loving. Your pet is a confident explorer who loves adventure but prefers to tackle it on their own schedule.',
        traits: ['Independent adventurer', 'High energy', 'Bold explorer', 'Structured adventure'],
        play: ['Solo adventure activities', 'Independent exploration', 'High-energy solo games', 'Regular adventure time'],
        training: ['Independent, active training', 'Self-directed learning', 'Adventure-based rewards', 'Consistent schedule'],
        care: ['High independent exercise', 'Solo adventure time', 'Self-directed activities', 'Regular but independent routine'],
        environment: ['Independent adventure space', 'High stimulation environment', 'Solo exploration opportunities', 'Structured but exciting']
    },
    'IAES': {
        name: 'The Wild Explorer',
        description: 'Independent, Active, Eager explorer, Spontaneous. Your pet is a high-energy, independent adventurer who loves variety and self-directed exploration.',
        traits: ['Highly independent', 'Very high energy', 'Loves variety', 'Self-directed adventure'],
        play: ['High-energy solo activities', 'Varied exploration games', 'Independent challenges', 'Flexible adventure time'],
        training: ['Independent, varied training', 'Self-paced learning', 'High-energy methods', 'Flexible sessions'],
        care: ['High-energy independent exercise', 'Varied solo activities', 'Self-directed exploration', 'Flexible care routine'],
        environment: ['Highly stimulating environment', 'Independent exploration space', 'Varied daily activities', 'Flexible but exciting']
    },
    'IACR': {
        name: 'The Steady Explorer',
        description: 'Independent, Active, Cautious explorer, Routine-loving. Your pet is energetic and independent but approaches new adventures thoughtfully within a routine.',
        traits: ['Independent but cautious', 'Active within comfort zone', 'Methodical explorer', 'Routine-based adventure'],
        play: ['Independent but familiar activities', 'Cautious exploration games', 'Solo active play', 'Regular, structured play'],
        training: ['Independent, patient training', 'Familiar training environment', 'Gradual challenges', 'Consistent schedule'],
        care: ['Independent but predictable exercise', 'Gradual new experiences', 'Solo activities', 'Regular routine'],
        environment: ['Predictable but stimulating', 'Independent exploration within limits', 'Structured environment', 'Safe adventure zones']
    },
    'IACS': {
        name: 'The Flexible Athlete',
        description: 'Independent, Active, Cautious explorer, Spontaneous. Your pet is energetic and independent, thoughtful about new experiences but adaptable to change.',
        traits: ['Active independence', 'Thoughtful approach', 'Flexible energy', 'Adaptable caution'],
        play: ['Independent high-energy activities', 'Flexible exploration', 'Solo but varied games', 'Adaptable play style'],
        training: ['Independent, flexible training', 'Patient but active approach', 'Adaptable methods', 'Self-paced progress'],
        care: ['High-energy independent care', 'Flexible but thoughtful routine', 'Solo exercise variety', 'Patient new experiences'],
        environment: ['Stimulating but independent', 'Flexible high-energy environment', 'Solo exploration opportunities', 'Adaptable but exciting']
    }
};

function initializeMBTITest() {
    document.getElementById('startTestBtn').addEventListener('click', startTest);
    document.getElementById('optionA').addEventListener('click', () => answerQuestion('A'));
    document.getElementById('optionB').addEventListener('click', () => answerQuestion('B'));
    document.getElementById('saveResultBtn').addEventListener('click', saveResult);
    document.getElementById('shareResultBtn').addEventListener('click', shareResult);
    document.getElementById('retakeTestBtn').addEventListener('click', retakeTest);
    
    // Recommendation tabs
    document.querySelectorAll('.rec-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            switchRecommendationTab(this.dataset.tab);
        });
    });
}

function startTest() {
    const petName = document.getElementById('petName').value.trim();
    const petType = document.getElementById('petType').value;
    
    if (!petName) {
        PetopiaUtils.showAlert('Please enter your pet\'s name!', 'warning');
        return;
    }
    
    if (!petType) {
        PetopiaUtils.showAlert('Please select your pet type!', 'warning');
        return;
    }
    
    testData.petName = petName;
    testData.petType = petType;
    
    currentQuestion = 0;
    answers = [];
    
    document.getElementById('testIntro').style.display = 'none';
    document.getElementById('testQuestions').style.display = 'block';
    
    displayQuestion();
}

function displayQuestion() {
    const question = mbtiQuestions[currentQuestion];
    
    // Update progress
    const progress = ((currentQuestion + 1) / mbtiQuestions.length) * 100;
    document.getElementById('questionProgress').style.width = progress + '%';
    document.getElementById('questionCounter').textContent = `Question ${currentQuestion + 1} of ${mbtiQuestions.length}`;
    
    // Display question and options
    document.getElementById('questionText').textContent = question.question;
    document.getElementById('optionAText').textContent = question.optionA;
    document.getElementById('optionBText').textContent = question.optionB;
    
    // Reset button states
    document.getElementById('optionA').classList.remove('selected');
    document.getElementById('optionB').classList.remove('selected');
}

function answerQuestion(choice) {
    const question = mbtiQuestions[currentQuestion];
    
    // Store answer
    answers[currentQuestion] = {
        dimension: question.dimension,
        choice: choice
    };
    
    // Visual feedback
    document.getElementById('optionA').classList.remove('selected');
    document.getElementById('optionB').classList.remove('selected');
    document.getElementById('option' + choice).classList.add('selected');
    
    // Move to next question after a brief delay
    setTimeout(() => {
        currentQuestion++;
        
        if (currentQuestion < mbtiQuestions.length) {
            displayQuestion();
        } else {
            calculateResults();
        }
    }, 500);
}

function calculateResults() {
    // Count scores for each dimension
    const scores = {
        social: 0,      // A = Social, B = Independent
        active: 0,      // A = Active, B = Calm
        curious: 0,     // A = Curious, B = Cautious
        routine: 0      // A = Routine, B = Spontaneous
    };
    
    answers.forEach(answer => {
        if (answer.choice === 'A') {
            scores[answer.dimension]++;
        }
    });
    
    // Convert to percentages and determine type
    const totalQuestions = mbtiQuestions.length / 4; // 4 questions per dimension
    const percentages = {
        social: (scores.social / totalQuestions) * 100,
        active: (scores.active / totalQuestions) * 100,
        curious: (scores.curious / totalQuestions) * 100,
        routine: (scores.routine / totalQuestions) * 100
    };
    
    // Determine personality type
    const type = (percentages.social >= 50 ? 'S' : 'I') +
                 (percentages.active >= 50 ? 'A' : 'C') +
                 (percentages.curious >= 50 ? 'E' : 'C') +
                 (percentages.routine >= 50 ? 'R' : 'S');
    
    displayResults(type, percentages);
}

function displayResults(type, percentages) {
    document.getElementById('testQuestions').style.display = 'none';
    document.getElementById('testResults').style.display = 'block';
    
    const personality = personalityTypes[type];
    
    // Display basic results
    document.getElementById('resultPetName').textContent = testData.petName;
    document.getElementById('personalityType').textContent = type;
    document.getElementById('personalityName').textContent = personality.name;
    document.getElementById('personalityDescription').textContent = personality.description;
    
    // Animate trait bars
    animateTraitBar('social', percentages.social);
    animateTraitBar('active', percentages.active);
    animateTraitBar('curious', percentages.curious);
    animateTraitBar('routine', percentages.routine);
    
    // Display recommendations
    displayRecommendations(personality);
    
    // Store result data for saving
    testData.result = {
        type: type,
        percentages: percentages,
        personality: personality,
        date: new Date().toISOString()
    };
}

function animateTraitBar(trait, percentage) {
    const bar = document.getElementById(trait + 'Bar');
    const percentageDisplay = document.getElementById(trait + 'Percentage');
    
    let currentWidth = 0;
    const targetWidth = percentage;
    const increment = targetWidth / 50; // Animation duration
    
    const timer = setInterval(() => {
        currentWidth += increment;
        if (currentWidth >= targetWidth) {
            currentWidth = targetWidth;
            clearInterval(timer);
        }
        
        bar.style.width = currentWidth + '%';
        percentageDisplay.textContent = Math.round(currentWidth) + '%';
    }, 20);
}

function displayRecommendations(personality) {
    document.getElementById('playRecommendations').innerHTML = 
        personality.play.map(item => `<div class="recommendation-item"><i class="fas fa-play"></i> ${item}</div>`).join('');
    
    document.getElementById('trainingRecommendations').innerHTML = 
        personality.training.map(item => `<div class="recommendation-item"><i class="fas fa-graduation-cap"></i> ${item}</div>`).join('');
    
    document.getElementById('careRecommendations').innerHTML = 
        personality.care.map(item => `<div class="recommendation-item"><i class="fas fa-heart"></i> ${item}</div>`).join('');
    
    document.getElementById('environmentRecommendations').innerHTML = 
        personality.environment.map(item => `<div class="recommendation-item"><i class="fas fa-home"></i> ${item}</div>`).join('');
}

function switchRecommendationTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.rec-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    
    // Show/hide content
    document.querySelectorAll('.recommendation-content').forEach(content => {
        content.style.display = 'none';
    });
    document.getElementById(tabName + 'Tab').style.display = 'block';
}

function saveResult() {
    const savedResults = PetopiaUtils.loadFromLocalStorage('petMBTIResults') || [];
    
    // Add current result
    savedResults.unshift({
        petName: testData.petName,
        petType: testData.petType,
        type: testData.result.type,
        personalityName: testData.result.personality.name,
        date: testData.result.date,
        percentages: testData.result.percentages,
        personality: testData.result.personality
    });
    
    // Keep only last 10 results
    if (savedResults.length > 10) {
        savedResults.splice(10);
    }
    
    PetopiaUtils.saveToLocalStorage('petMBTIResults', savedResults);
    PetopiaUtils.showAlert(`${testData.petName}'s personality profile has been saved!`, 'success');
    
    loadSavedResults();
}

function shareResult() {
    const shareText = `🧠 My pet ${testData.petName} is a ${testData.result.personality.name} (${testData.result.type}) on the Pet MBTI test at Petopia! Discover your pet's personality too! 🐾`;
    
    if (navigator.share) {
        navigator.share({
            title: `${testData.petName}'s Pet MBTI Results - Petopia`,
            text: shareText,
            url: window.location.href
        });
    } else {
        // Fallback - copy to clipboard
        navigator.clipboard.writeText(shareText + ' ' + window.location.href)
            .then(() => {
                PetopiaUtils.showAlert('Results copied to clipboard! Share with your friends!', 'success');
            })
            .catch(() => {
                PetopiaUtils.showAlert('Share text: ' + shareText, 'info');
            });
    }
}

function retakeTest() {
    document.getElementById('testResults').style.display = 'none';
    document.getElementById('testIntro').style.display = 'block';
    
    // Reset form
    document.getElementById('petName').value = '';
    document.getElementById('petType').value = '';
    
    // Reset test data
    currentQuestion = 0;
    answers = [];
    testData = { petName: '', petType: '' };
}

function loadSavedResults() {
    const savedResults = PetopiaUtils.loadFromLocalStorage('petMBTIResults') || [];
    const savedResultsDiv = document.getElementById('savedResults');
    const savedResultsList = document.getElementById('savedResultsList');
    
    if (savedResults.length > 0) {
        savedResultsList.innerHTML = savedResults.map(result => `
            <div class="saved-result-item">
                <div class="result-info">
                    <div class="result-header">
                        <h4>${result.petName} (${result.petType.charAt(0).toUpperCase() + result.petType.slice(1)})</h4>
                        <span class="result-type">${result.type}</span>
                    </div>
                    <p class="result-personality">${result.personalityName}</p>
                    <p class="result-date">Tested on ${PetopiaUtils.formatDate(result.date)}</p>
                </div>
                <div class="result-actions">
                    <button class="btn btn-secondary btn-small" onclick="viewSavedResult('${result.petName}', '${result.date}')">
                        <i class="fas fa-eye"></i> View
                    </button>
                </div>
            </div>
        `).join('');
        
        savedResultsDiv.style.display = 'block';
    } else {
        savedResultsDiv.style.display = 'none';
    }
}

function viewSavedResult(petName, date) {
    const savedResults = PetopiaUtils.loadFromLocalStorage('petMBTIResults') || [];
    const result = savedResults.find(r => r.petName === petName && r.date === date);
    
    if (result) {
        // Set test data
        testData = {
            petName: result.petName,
            petType: result.petType,
            result: {
                type: result.type,
                percentages: result.percentages,
                personality: result.personality,
                date: result.date
            }
        };
        
        // Display results
        displayResults(result.type, result.percentages);
        
        // Scroll to results
        document.getElementById('testResults').scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }
}

// Add CSS for MBTI-specific styles
const mbtiStyles = `
<style>
.mbti-container {
    max-width: 900px;
    margin: 0 auto;
}

.dimensions-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    margin: 1.5rem 0;
}

.dimension {
    background: var(--gray-light);
    padding: 1.5rem;
    border-radius: var(--border-radius);
    text-align: center;
}

.dimension h4 {
    color: var(--primary-color);
    margin-bottom: 0.5rem;
    font-weight: 600;
}

.dimension p {
    color: var(--gray-medium);
    font-size: 0.9rem;
    line-height: 1.5;
}

.info-points {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin: 2rem 0;
}

.info-point {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem;
    background: var(--gray-light);
    border-radius: var(--border-radius);
    font-weight: 600;
    color: var(--gray-dark);
}

.info-point i {
    color: var(--primary-color);
    font-size: 1.2rem;
}

.pet-selection {
    background: var(--white);
    padding: 2rem;
    border-radius: var(--border-radius);
    border: 2px solid var(--gray-light);
    margin: 2rem 0;
}

.pet-selection h3 {
    color: var(--gray-dark);
    margin-bottom: 1.5rem;
    text-align: center;
}

.btn-large {
    font-size: 1.2rem;
    padding: 1rem 2rem;
    margin-top: 2rem;
}

.question-header {
    margin-bottom: 2rem;
    text-align: center;
}

.progress-bar {
    background: #e9ecef;
    height: 8px;
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 1rem;
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
}

.progress-fill {
    height: 100%;
    background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
    transition: width 0.3s ease;
}

.question-counter {
    color: var(--gray-medium);
    font-weight: 600;
    font-size: 1rem;
}

.question-text {
    font-size: 1.3rem;
    font-weight: 600;
    color: var(--gray-dark);
    margin-bottom: 2rem;
    text-align: center;
    line-height: 1.4;
}

.answer-options {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 600px;
    margin: 0 auto;
}

.answer-option {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.5rem;
    background: var(--white);
    border: 2px solid #e9ecef;
    border-radius: var(--border-radius);
    cursor: pointer;
    transition: var(--transition);
    text-align: left;
    font-size: 1rem;
    color: var(--gray-dark);
}

.answer-option:hover {
    border-color: var(--primary-color);
    background: rgba(255, 107, 157, 0.05);
    transform: translateY(-2px);
    box-shadow: var(--shadow);
}

.answer-option.selected {
    border-color: var(--primary-color);
    background: rgba(255, 107, 157, 0.1);
    color: var(--primary-color);
}

.option-letter {
    background: var(--primary-color);
    color: var(--white);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 1.1rem;
    flex-shrink: 0;
}

.option-text {
    line-height: 1.5;
}

.mbti-result {
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    color: var(--white);
    padding: 3rem 2rem;
    border-radius: var(--border-radius);
    text-align: center;
    margin-bottom: 2rem;
}

.result-header h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
    font-weight: 700;
}

.personality-type {
    font-size: 4rem;
    font-weight: 900;
    letter-spacing: 0.5rem;
    margin: 1rem 0;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.personality-name {
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 1rem;
}

.personality-description {
    font-size: 1.1rem;
    line-height: 1.6;
    opacity: 0.95;
    max-width: 600px;
    margin: 0 auto;
}

.personality-details {
    display: grid;
    gap: 2rem;
}

.trait-breakdown {
    background: var(--white);
    padding: 2rem;
    border-radius: var(--border-radius);
    box-shadow: var(--shadow);
}

.trait-breakdown h3 {
    color: var(--gray-dark);
    margin-bottom: 2rem;
    text-align: center;
    font-weight: 700;
}

.trait-bars {
    display: grid;
    gap: 1.5rem;
}

.trait-bar {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    gap: 1rem;
}

.trait-labels {
    display: flex;
    justify-content: space-between;
    font-weight: 600;
    color: var(--gray-dark);
    margin-bottom: 0.5rem;
}

.bar-container {
    background: #e9ecef;
    height: 12px;
    border-radius: 6px;
    overflow: hidden;
    position: relative;
}

.trait-fill {
    height: 100%;
    background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
    transition: width 0.3s ease;
}

.trait-percentage {
    font-weight: 700;
    color: var(--primary-color);
    min-width: 45px;
    text-align: right;
}

.recommendations {
    background: var(--white);
    border-radius: var(--border-radius);
    box-shadow: var(--shadow);
    overflow: hidden;
}

.recommendation-tabs {
    display: flex;
    background: var(--gray-light);
    border-bottom: 2px solid #e9ecef;
}

.rec-tab {
    flex: 1;
    padding: 1rem;
    background: none;
    border: none;
    cursor: pointer;
    font-weight: 600;
    color: var(--gray-medium);
    transition: var(--transition);
    font-size: 0.9rem;
}

.rec-tab.active,
.rec-tab:hover {
    background: var(--white);
    color: var(--primary-color);
}

.recommendation-content {
    padding: 2rem;
}

.recommendation-content h4 {
    color: var(--gray-dark);
    margin-bottom: 1.5rem;
    font-weight: 600;
    font-size: 1.1rem;
}

.recommendation-list {
    display: grid;
    gap: 1rem;
}

.recommendation-item {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    padding: 1rem;
    background: var(--gray-light);
    border-radius: var(--border-radius);
    border-left: 4px solid var(--primary-color);
}

.recommendation-item i {
    color: var(--primary-color);
    font-size: 1.1rem;
    margin-top: 0.25rem;
}

.result-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 2rem;
}

.saved-results {
    margin-top: 2rem;
}

.saved-results-list {
    display: grid;
    gap: 1rem;
}

.saved-result-item {
    background: var(--white);
    border: 2px solid var(--gray-light);
    border-radius: var(--border-radius);
    padding: 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: var(--transition);
}

.saved-result-item:hover {
    border-color: var(--primary-color);
    box-shadow: var(--shadow);
}

.result-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 0.5rem;
}

.result-header h4 {
    color: var(--gray-dark);
    font-weight: 600;
    margin: 0;
}

.result-type {
    background: var(--primary-color);
    color: var(--white);
    padding: 0.25rem 0.75rem;
    border-radius: 15px;
    font-weight: 700;
    font-size: 0.9rem;
}

.result-personality {
    color: var(--gray-medium);
    font-weight: 600;
    margin-bottom: 0.5rem;
}

.result-date {
    color: var(--gray-medium);
    font-size: 0.9rem;
    margin: 0;
}

.educational-section {
    margin-top: 3rem;
}

.educational-content {
    display: grid;
    gap: 1.5rem;
}

.edu-item {
    display: flex;
    align-items: flex-start;
    gap: 1.5rem;
    padding: 1.5rem;
    background: var(--gray-light);
    border-radius: var(--border-radius);
}

.edu-icon {
    font-size: 2.5rem;
    min-width: 60px;
    text-align: center;
}

.edu-text h4 {
    color: var(--gray-dark);
    margin-bottom: 0.5rem;
    font-weight: 600;
}

.edu-text p {
    color: var(--gray-medium);
    line-height: 1.6;
    margin: 0;
}

.no-results {
    text-align: center;
    color: var(--gray-medium);
    font-style: italic;
    padding: 2rem;
}

@media (max-width: 768px) {
    .dimensions-grid {
        grid-template-columns: 1fr;
    }
    
    .info-points {
        grid-template-columns: 1fr;
    }
    
    .trait-bar {
        grid-template-columns: 1fr;
        gap: 0.5rem;
    }
    
    .trait-percentage {
        text-align: left;
    }
    
    .recommendation-tabs {
        flex-direction: column;
    }
    
    .rec-tab {
        text-align: center;
    }
    
    .result-actions {
        flex-direction: column;
        align-items: stretch;
    }
    
    .saved-result-item {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
    }
    
    .result-actions {
        width: 100%;
    }
    
    .personality-type {
        font-size: 3rem;
        letter-spacing: 0.25rem;
    }
}

@media (max-width: 480px) {
    .answer-options {
        gap: 0.75rem;
    }
    
    .answer-option {
        padding: 1rem;
        flex-direction: column;
        text-align: center;
        gap: 0.75rem;
    }
    
    .option-letter {
        width: 35px;
        height: 35px;
        font-size: 1rem;
    }
    
    .personality-type {
        font-size: 2.5rem;
        letter-spacing: 0.1rem;
    }
    
    .mbti-result {
        padding: 2rem 1rem;
    }
    
    .result-header h2 {
        font-size: 1.5rem;
    }
    
    .personality-name {
        font-size: 1.5rem;
    }
}
</style>
`;

// Add styles to document head
document.head.insertAdjacentHTML('beforeend', mbtiStyles);
