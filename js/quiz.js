// Pet Quiz JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeQuiz();
});

// Quiz state
let currentQuestion = 0;
let score = 0;
let userAnswers = [];
let quizQuestions = [];

// Quiz questions database
const questionDatabase = [
    {
        question: "How often should you feed an adult dog?",
        options: [
            "Once a day",
            "Twice a day",
            "Three times a day",
            "As often as they want"
        ],
        correct: 1,
        explanation: "Adult dogs should be fed twice a day - once in the morning and once in the evening. This helps maintain stable blood sugar levels and prevents overeating.",
        category: "nutrition",
        image: "https://pixabay.com/get/g44f1fa5b2418aee38f005370c289b483750e6fd92b754c2fff93bf93f0d12c60d836c4c9d9ac6f14975effcf9f8027f374372469dad38d7173c788c236ee9fe6_1280.jpg"
    },
    {
        question: "What temperature is considered a fever in dogs?",
        options: [
            "99°F (37.2°C)",
            "101°F (38.3°C)",
            "103°F (39.4°C) or higher",
            "105°F (40.6°C)"
        ],
        correct: 2,
        explanation: "A dog's normal body temperature ranges from 101-102.5°F (38.3-39.2°C). A temperature of 103°F (39.4°C) or higher indicates a fever and requires veterinary attention.",
        category: "health"
    },
    {
        question: "Which food is toxic to both dogs and cats?",
        options: [
            "Carrots",
            "Rice",
            "Chocolate",
            "Chicken"
        ],
        correct: 2,
        explanation: "Chocolate contains theobromine, which is toxic to both dogs and cats. Dark chocolate and baking chocolate are especially dangerous and can cause serious health problems.",
        category: "safety"
    },
    {
        question: "How many hours of sleep do cats typically need per day?",
        options: [
            "8-10 hours",
            "10-12 hours",
            "12-16 hours",
            "18-20 hours"
        ],
        correct: 2,
        explanation: "Cats sleep 12-16 hours per day on average. This extensive sleep helps them conserve energy for hunting and is completely normal behavior for felines.",
        category: "behavior"
    },
    {
        question: "What is the most important thing to do when introducing a new pet to your home?",
        options: [
            "Let them explore freely immediately",
            "Introduce them to all family members at once",
            "Create a quiet, safe space for them to adjust",
            "Give them lots of treats"
        ],
        correct: 2,
        explanation: "Creating a quiet, safe space allows new pets to adjust gradually to their new environment. This reduces stress and helps them feel secure while adapting to their new home.",
        category: "care"
    },
    {
        question: "How often should you brush your dog's teeth?",
        options: [
            "Once a month",
            "Once a week",
            "Daily",
            "Only when they have bad breath"
        ],
        correct: 2,
        explanation: "Daily brushing is ideal for maintaining good dental health in dogs. Regular dental care prevents plaque buildup, gum disease, and other serious health issues.",
        category: "health"
    },
    {
        question: "Which behavior indicates a happy, relaxed cat?",
        options: [
            "Hiding under furniture",
            "Purring and kneading",
            "Hissing at strangers",
            "Refusing to eat"
        ],
        correct: 1,
        explanation: "Purring and kneading are classic signs of a happy, relaxed cat. Kneading mimics the behavior kittens do with their mothers and indicates contentment and security.",
        category: "behavior"
    },
    {
        question: "What is the recommended minimum exercise time for most adult dogs daily?",
        options: [
            "15 minutes",
            "30 minutes",
            "1-2 hours",
            "3-4 hours"
        ],
        correct: 2,
        explanation: "Most adult dogs need 1-2 hours of exercise daily, which can be split into multiple walks and play sessions. Exercise needs vary by breed, age, and health status.",
        category: "exercise",
        image: "https://pixabay.com/get/g98bc01f68d0bc5fac449fea8c5fdcc3d0b3da16ae8e6242d436ae6a047f0af1e893e3e7bbb4f91a4e3a0ea54aab6b23d89e31d50b52403fbaf49eff4c0df74d7_1280.jpg"
    },
    {
        question: "At what age should puppies receive their first vaccinations?",
        options: [
            "2-3 weeks",
            "6-8 weeks",
            "12-14 weeks",
            "6 months"
        ],
        correct: 1,
        explanation: "Puppies should receive their first vaccinations at 6-8 weeks of age. This initial vaccination helps protect them from serious diseases during their vulnerable early months.",
        category: "health"
    },
    {
        question: "Which of these is NOT a sign of stress in pets?",
        options: [
            "Excessive panting",
            "Loss of appetite",
            "Playing with toys",
            "Hiding or withdrawal"
        ],
        correct: 2,
        explanation: "Playing with toys is a sign of a healthy, happy pet. The other behaviors can indicate stress, illness, or anxiety and should be monitored closely.",
        category: "behavior"
    },
    {
        question: "How often should you clean a cat's litter box?",
        options: [
            "Once a week",
            "Every few days",
            "Daily",
            "Only when it smells"
        ],
        correct: 2,
        explanation: "Cat litter boxes should be cleaned daily to maintain hygiene and prevent odors. Cats are very clean animals and may refuse to use a dirty litter box.",
        category: "care"
    },
    {
        question: "What is the safest way to introduce two dogs?",
        options: [
            "Let them meet face-to-face immediately",
            "Meet on neutral territory with both on leashes",
            "Put them together in a small space",
            "Feed them together right away"
        ],
        correct: 1,
        explanation: "Dogs should meet on neutral territory with both on leashes. This allows for controlled introduction and reduces territorial behavior that might occur in one dog's home space.",
        category: "behavior"
    },
    {
        question: "Which nutrient is most important for a pet's coat health?",
        options: [
            "Carbohydrates",
            "Protein",
            "Omega-3 fatty acids",
            "Fiber"
        ],
        correct: 2,
        explanation: "Omega-3 fatty acids are crucial for maintaining healthy skin and a shiny coat. These essential fats also support overall health and reduce inflammation.",
        category: "nutrition"
    },
    {
        question: "How can you tell if a rabbit is happy?",
        options: [
            "They thump their hind legs",
            "They binky (jump and twist in the air)",
            "They hide in corners",
            "They stop eating"
        ],
        correct: 1,
        explanation: "Binkying - jumping and twisting in the air - is a clear sign of a happy, playful rabbit. This behavior shows they feel safe and content in their environment.",
        category: "behavior"
    },
    {
        question: "What should you do if your pet accidentally ingests something toxic?",
        options: [
            "Wait and see if symptoms develop",
            "Give them milk to neutralize the toxin",
            "Contact your veterinarian or pet poison control immediately",
            "Make them vomit right away"
        ],
        correct: 2,
        explanation: "Contact your veterinarian or pet poison control immediately. Never induce vomiting unless specifically instructed by a professional, as some substances can cause more damage coming back up.",
        category: "safety"
    }
];

function initializeQuiz() {
    // Shuffle questions for variety
    quizQuestions = [...questionDatabase].sort(() => Math.random() - 0.5);
    
    // Initialize event listeners
    document.getElementById('startQuizBtn').addEventListener('click', startQuiz);
    document.getElementById('nextQuestionBtn').addEventListener('click', nextQuestion);
    document.getElementById('retakeQuizBtn').addEventListener('click', resetQuiz);
    document.getElementById('reviewAnswersBtn').addEventListener('click', showAnswerReview);
    document.getElementById('backToResultsBtn').addEventListener('click', showResults);
    document.getElementById('shareResultsBtn').addEventListener('click', shareResults);
}

function startQuiz() {
    document.getElementById('quizStart').style.display = 'none';
    document.getElementById('quizQuestion').style.display = 'block';
    
    currentQuestion = 0;
    score = 0;
    userAnswers = [];
    
    displayQuestion();
}

function displayQuestion() {
    const question = quizQuestions[currentQuestion];
    
    // Update progress
    const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
    document.getElementById('questionCounter').textContent = `Question ${currentQuestion + 1} of ${quizQuestions.length}`;
    
    // Display question
    document.getElementById('questionText').textContent = question.question;
    
    // Display image if available
    const questionImageDiv = document.getElementById('questionImage');
    const questionImg = document.getElementById('questionImg');
    if (question.image) {
        questionImg.src = question.image;
        questionImg.alt = `Illustration for: ${question.question}`;
        questionImageDiv.style.display = 'block';
    } else {
        questionImageDiv.style.display = 'none';
    }
    
    // Display options
    const optionsList = document.getElementById('optionsList');
    optionsList.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const li = document.createElement('li');
        li.className = 'option-item';
        li.innerHTML = `
            <button class="option-button" onclick="selectOption(${index})">
                <span class="option-letter">${String.fromCharCode(65 + index)}.</span>
                <span class="option-text">${option}</span>
            </button>
        `;
        optionsList.appendChild(li);
    });
    
    // Disable next button
    document.getElementById('nextQuestionBtn').disabled = true;
}

function selectOption(selectedIndex) {
    // Remove previous selection
    document.querySelectorAll('.option-button').forEach(btn => {
        btn.classList.remove('selected', 'correct', 'incorrect');
    });
    
    // Mark selected option
    const selectedButton = document.querySelectorAll('.option-button')[selectedIndex];
    selectedButton.classList.add('selected');
    
    // Store answer
    const question = quizQuestions[currentQuestion];
    const isCorrect = selectedIndex === question.correct;
    
    userAnswers[currentQuestion] = {
        selected: selectedIndex,
        correct: question.correct,
        isCorrect: isCorrect
    };
    
    if (isCorrect) {
        score++;
        selectedButton.classList.add('correct');
    } else {
        selectedButton.classList.add('incorrect');
        // Show correct answer
        document.querySelectorAll('.option-button')[question.correct].classList.add('correct');
    }
    
    // Disable all options
    document.querySelectorAll('.option-button').forEach(btn => {
        btn.disabled = true;
    });
    
    // Enable next button
    document.getElementById('nextQuestionBtn').disabled = false;
    
    // Show explanation
    setTimeout(() => {
        showExplanation(question.explanation);
    }, 1000);
}

function showExplanation(explanation) {
    const explanationDiv = document.createElement('div');
    explanationDiv.className = 'question-explanation';
    explanationDiv.innerHTML = `
        <div class="explanation-content">
            <h4><i class="fas fa-lightbulb"></i> Explanation</h4>
            <p>${explanation}</p>
        </div>
    `;
    
    const questionContent = document.querySelector('.question-content');
    questionContent.appendChild(explanationDiv);
}

function nextQuestion() {
    currentQuestion++;
    
    if (currentQuestion < quizQuestions.length) {
        // Remove explanation
        const explanation = document.querySelector('.question-explanation');
        if (explanation) {
            explanation.remove();
        }
        
        // Re-enable options
        document.querySelectorAll('.option-button').forEach(btn => {
            btn.disabled = false;
        });
        
        displayQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    document.getElementById('quizQuestion').style.display = 'none';
    document.getElementById('answerReview').style.display = 'none';
    document.getElementById('quizResults').style.display = 'block';
    
    const percentage = Math.round((score / quizQuestions.length) * 100);
    
    // Animate score
    animateScore(percentage);
    
    // Show performance message and badge
    const performanceData = getPerformanceData(percentage);
    document.getElementById('correctAnswers').textContent = score;
    document.getElementById('performanceMessage').textContent = performanceData.message;
    
    // Show badge
    const badgeDiv = document.getElementById('badge');
    if (performanceData.badge) {
        document.getElementById('badgeIcon').innerHTML = performanceData.badge.icon;
        document.getElementById('badgeTitle').textContent = performanceData.badge.title;
        document.getElementById('badgeDescription').textContent = performanceData.badge.description;
        badgeDiv.style.display = 'block';
    } else {
        badgeDiv.style.display = 'none';
    }
    
    // Save score to localStorage
    saveQuizResult(percentage, score, quizQuestions.length);
}

function animateScore(targetPercentage) {
    const scoreElement = document.getElementById('scorePercentage');
    const circle = document.getElementById('scoreCircle');
    
    let currentPercentage = 0;
    const increment = targetPercentage / 50; // Animation duration
    
    const timer = setInterval(() => {
        currentPercentage += increment;
        if (currentPercentage >= targetPercentage) {
            currentPercentage = targetPercentage;
            clearInterval(timer);
        }
        
        scoreElement.textContent = Math.round(currentPercentage) + '%';
        
        // Update circle color based on score
        if (currentPercentage >= 80) {
            circle.style.background = 'linear-gradient(135deg, #28a745, #20c997)';
        } else if (currentPercentage >= 60) {
            circle.style.background = 'linear-gradient(135deg, #ffc107, #fd7e14)';
        } else {
            circle.style.background = 'linear-gradient(135deg, #dc3545, #e83e8c)';
        }
    }, 20);
}

function getPerformanceData(percentage) {
    if (percentage >= 90) {
        return {
            message: "Outstanding! You're a true pet expert! 🌟",
            badge: {
                icon: "🏆",
                title: "Pet Expert",
                description: "You know your pets inside and out!"
            }
        };
    } else if (percentage >= 80) {
        return {
            message: "Excellent work! You really know your pet care! 🎉",
            badge: {
                icon: "🥇",
                title: "Pet Guru",
                description: "Your knowledge is impressive!"
            }
        };
    } else if (percentage >= 70) {
        return {
            message: "Great job! You have solid pet knowledge! 👏",
            badge: {
                icon: "🥈",
                title: "Pet Enthusiast",
                description: "You're on the right track!"
            }
        };
    } else if (percentage >= 60) {
        return {
            message: "Good effort! Keep learning about pet care! 📚",
            badge: {
                icon: "🥉",
                title: "Pet Learner",
                description: "Every expert started somewhere!"
            }
        };
    } else {
        return {
            message: "Don't worry! There's always room to learn more about pets! 🤗",
            badge: null
        };
    }
}

function showAnswerReview() {
    document.getElementById('quizResults').style.display = 'none';
    document.getElementById('answerReview').style.display = 'block';
    
    const reviewContent = document.getElementById('reviewContent');
    reviewContent.innerHTML = '';
    
    quizQuestions.forEach((question, index) => {
        const userAnswer = userAnswers[index];
        const reviewItem = document.createElement('div');
        reviewItem.className = `review-item ${userAnswer.isCorrect ? 'correct' : 'incorrect'}`;
        
        reviewItem.innerHTML = `
            <div class="review-header">
                <h4>Question ${index + 1}</h4>
                <span class="review-status">
                    ${userAnswer.isCorrect ? 
                        '<i class="fas fa-check"></i> Correct' : 
                        '<i class="fas fa-times"></i> Incorrect'
                    }
                </span>
            </div>
            <p class="review-question">${question.question}</p>
            <div class="review-answers">
                <p class="user-answer">
                    <strong>Your answer:</strong> ${question.options[userAnswer.selected]}
                </p>
                ${!userAnswer.isCorrect ? 
                    `<p class="correct-answer">
                        <strong>Correct answer:</strong> ${question.options[question.correct]}
                    </p>` : ''
                }
            </div>
            <div class="review-explanation">
                <h5>Explanation:</h5>
                <p>${question.explanation}</p>
            </div>
        `;
        
        reviewContent.appendChild(reviewItem);
    });
}

function shareResults() {
    const percentage = Math.round((score / quizQuestions.length) * 100);
    const shareText = `I just scored ${percentage}% on the Pet Common Sense Quiz at Petopia! Test your pet knowledge too! 🐾`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Pet Quiz Results - Petopia',
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

function resetQuiz() {
    document.getElementById('quizResults').style.display = 'none';
    document.getElementById('answerReview').style.display = 'none';
    document.getElementById('quizStart').style.display = 'block';
    
    // Shuffle questions again
    quizQuestions = [...questionDatabase].sort(() => Math.random() - 0.5);
}

function saveQuizResult(percentage, score, totalQuestions) {
    const result = {
        date: new Date().toISOString(),
        percentage: percentage,
        score: score,
        totalQuestions: totalQuestions
    };
    
    const history = PetopiaUtils.loadFromLocalStorage('quizHistory') || [];
    history.unshift(result);
    
    // Keep only last 10 results
    if (history.length > 10) {
        history.splice(10);
    }
    
    PetopiaUtils.saveToLocalStorage('quizHistory', history);
}

// Add CSS for quiz-specific styles
const quizStyles = `
<style>
.quiz-container {
    max-width: 900px;
    margin: 0 auto;
}

.quiz-start .info-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    margin: 2rem 0;
}

.info-item {
    text-align: center;
    padding: 1rem;
}

.info-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
}

.info-item h3 {
    color: var(--gray-dark);
    margin-bottom: 0.5rem;
    font-weight: 600;
}

.info-item p {
    color: var(--gray-medium);
    font-size: 0.9rem;
}

.quiz-categories {
    margin: 2rem 0;
    text-align: center;
}

.quiz-categories h3 {
    color: var(--gray-dark);
    margin-bottom: 1rem;
}

.categories-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    justify-content: center;
}

.category-tag {
    background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
    color: var(--white);
    padding: 0.5rem 1rem;
    border-radius: 25px;
    font-size: 0.9rem;
    font-weight: 600;
}

.btn-start {
    font-size: 1.2rem;
    padding: 1rem 2rem;
    margin-top: 2rem;
}

.question-header {
    margin-bottom: 2rem;
}

.progress-bar {
    background: #e9ecef;
    height: 8px;
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 1rem;
}

.progress-fill {
    height: 100%;
    background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
    transition: width 0.3s ease;
}

.question-counter {
    color: var(--gray-medium);
    font-weight: 600;
}

.question-text {
    font-size: 1.3rem;
    font-weight: 600;
    color: var(--gray-dark);
    margin-bottom: 1.5rem;
    line-height: 1.4;
}

.question-image {
    text-align: center;
    margin-bottom: 1.5rem;
}

.question-image img {
    max-width: 400px;
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: var(--border-radius);
    box-shadow: var(--shadow);
}

.option-button {
    width: 100%;
    text-align: left;
    padding: 1rem 1.5rem;
    border: 2px solid #e9ecef;
    border-radius: var(--border-radius);
    background: var(--white);
    color: var(--gray-dark);
    font-size: 1rem;
    cursor: pointer;
    transition: var(--transition);
    display: flex;
    align-items: center;
    gap: 1rem;
}

.option-button:hover:not(:disabled) {
    border-color: var(--primary-color);
    background: rgba(255, 107, 157, 0.05);
}

.option-button.selected {
    border-color: var(--primary-color);
    background: rgba(255, 107, 157, 0.1);
}

.option-button.correct {
    border-color: #28a745;
    background: rgba(40, 167, 69, 0.1);
    color: #155724;
}

.option-button.incorrect {
    border-color: #dc3545;
    background: rgba(220, 53, 69, 0.1);
    color: #721c24;
}

.option-letter {
    font-weight: 700;
    color: var(--primary-color);
    min-width: 1.5rem;
}

.question-actions {
    text-align: center;
    margin-top: 2rem;
}

.question-explanation {
    background: var(--gray-light);
    border-left: 4px solid var(--accent-color);
    border-radius: var(--border-radius);
    padding: 1.5rem;
    margin-top: 1.5rem;
}

.explanation-content h4 {
    color: var(--accent-color);
    margin-bottom: 0.5rem;
    font-weight: 600;
}

.explanation-content p {
    color: var(--gray-dark);
    line-height: 1.6;
}

.results-summary {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    align-items: center;
    margin: 2rem 0;
}

.score-display {
    text-align: center;
}

.score-circle {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1rem;
    color: var(--white);
    font-weight: bold;
    box-shadow: var(--shadow);
}

.score-percentage {
    font-size: 2.5rem;
    font-weight: 800;
}

.score-label {
    font-size: 1rem;
    opacity: 0.9;
}

.score-details p {
    margin-bottom: 0.5rem;
    color: var(--gray-dark);
}

.performance-message {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--primary-color);
}

.quiz-badge {
    text-align: center;
    background: linear-gradient(135deg, var(--warm-orange), var(--primary-color));
    color: var(--white);
    padding: 2rem;
    border-radius: var(--border-radius);
}

.badge-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
}

.badge-title {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
}

.badge-description {
    opacity: 0.9;
}

.results-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
}

.review-item {
    background: var(--white);
    border-radius: var(--border-radius);
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    box-shadow: var(--shadow);
    border-left: 4px solid;
}

.review-item.correct {
    border-left-color: #28a745;
}

.review-item.incorrect {
    border-left-color: #dc3545;
}

.review-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
}

.review-header h4 {
    color: var(--gray-dark);
    font-weight: 600;
}

.review-status {
    font-weight: 600;
    padding: 0.25rem 0.5rem;
    border-radius: 15px;
    font-size: 0.9rem;
}

.review-item.correct .review-status {
    background: rgba(40, 167, 69, 0.1);
    color: #155724;
}

.review-item.incorrect .review-status {
    background: rgba(220, 53, 69, 0.1);
    color: #721c24;
}

.review-question {
    font-weight: 600;
    color: var(--gray-dark);
    margin-bottom: 1rem;
}

.review-answers p {
    margin-bottom: 0.5rem;
}

.user-answer {
    color: var(--gray-dark);
}

.correct-answer {
    color: #155724;
}

.review-explanation {
    background: var(--gray-light);
    padding: 1rem;
    border-radius: var(--border-radius);
    margin-top: 1rem;
}

.review-explanation h5 {
    color: var(--accent-color);
    margin-bottom: 0.5rem;
    font-weight: 600;
}

.review-actions {
    text-align: center;
    margin-top: 2rem;
}

.fun-facts {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
}

.fact-item {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    padding: 1rem;
    background: var(--gray-light);
    border-radius: var(--border-radius);
}

.fact-icon {
    font-size: 1.5rem;
    margin-top: 0.25rem;
}

.fact-item p {
    color: var(--gray-dark);
    line-height: 1.5;
    margin: 0;
}

@media (max-width: 768px) {
    .results-summary {
        grid-template-columns: 1fr;
    }
    
    .results-actions {
        flex-direction: column;
        align-items: stretch;
    }
    
    .review-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
    }
    
    .categories-grid {
        justify-content: flex-start;
    }
    
    .info-grid {
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    }
}
</style>
`;

// Add styles to document head
document.head.insertAdjacentHTML('beforeend', quizStyles);
