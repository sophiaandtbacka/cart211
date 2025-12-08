// ----------------------------------
// 10 QUESTIONS WITH ARCHETYPES
// ----------------------------------
const all_questions = [
    { question_string: "What is your gender?", choices: { archetype1: "Male", archetype2: "Female", archetype3: "Non-Binary" } },
    { question_string: "When you are overwhelmed what do you instinctively reach for?", choices: { archetype1: "A game or familiar digital world", archetype4: "A deep-dive video or long commentary", archetype3: "Social apps or messaging someone", archetype2: "Something creative to make or improve my life" } },
    { question_string: "How do you usually decide what content to click on?", choices: { archetype1: "Whatever helps me escape for a bit", archetype4: "Something that explains a bigger pattern", archetype3: "Anything new that people are talking about", archetype2: "Things that match my aesthetic or interests" } },
    { question_string: "What kind of online spaces feel most like home to you?", choices: { archetype1: "Small Discords, niche servers, or gaming groups", archetype4: "Forums or channels that question or analyze", archetype3: "Fast-moving feeds with constant updates", archetype2: "Visual platforms with inspiration and style" } },
    { question_string: "Which feeling describes your relationship with the internet?", choices: { archetype1: "It is where I can be myself without pressure", archetype4: "It is a toolbox for finding truth and clarity", archetype3: "It is how I stay connected and in the loop", archetype2: "It is a place to express identity and taste" } },
    { question_string: "When you watch people online, what catches your attention first?", choices: { archetype1: "Skill or mastery", archetype4: "Confidence or influence", archetype3: "Humor or personality", archetype2: "Style, vibe, or creativity" } },
];

// ----------------------------------
// QUIZ CLASS
// ----------------------------------
class Quiz {
    constructor(name) {
        this.quiz_name = name;
        this.questions = [];
    }

    add_question(question) {
        this.questions.push(question);
    }

    render(container) {
        let current_question_index = 0;

        const quizNameEl = document.getElementById("quiz-name");
        quizNameEl.textContent = this.quiz_name;

        const questionContainer = document.getElementById("question");

        const resultsDiv = document.getElementById("quiz-results");
        const resultsMsg = document.getElementById("quiz-results-message");
        const resultsScore = document.getElementById("quiz-results-score");
        resultsDiv.style.display = "none";

        const prevBtn = document.getElementById("prev-question-button");
        const nextBtn = document.getElementById("next-question-button");
        const submitBtn = document.getElementById("submit-button");

        const updateButtons = () => {
            prevBtn.disabled = current_question_index === 0;
            nextBtn.disabled = current_question_index === this.questions.length - 1;
            const allAnswered = this.questions.every(q => q.user_archetype !== null);
            submitBtn.disabled = !allAnswered;
        };

        const change_question = () => {
            this.questions[current_question_index].render(questionContainer);
            updateButtons();
        };

        prevBtn.onclick = () => {
            if (current_question_index > 0) {
                current_question_index--;
                change_question();
            }
        };

        nextBtn.onclick = () => {
            if (current_question_index < this.questions.length - 1) {
                current_question_index++;
                change_question();
            }
        };

        submitBtn.onclick = () => {
            let archetypeScores = {
                archetype1: 0,
                archetype2: 0,
                archetype3: 0,
                archetype4: 0,
                archetype5: 0
            };

            this.questions.forEach(q => {
                if (q.user_archetype) {
                    archetypeScores[q.user_archetype]++;
                }
            });

            const highestArchetype = Object.keys(archetypeScores)
                .reduce((a, b) => archetypeScores[a] > archetypeScores[b] ? a : b);

            const redirectPages = {
                archetype1: "results-archetype1.html",
                archetype2: "results-archetype2.html",
                archetype3: "results-archetype3.html",
                archetype4: "results-archetype4.html",
                archetype5: "results-archetype5.html"
            };

            window.location.href = redirectPages[highestArchetype];
        };

        change_question();
    }
}

// ----------------------------------
// QUESTION CLASS
// ----------------------------------
class Question {
    constructor(question_string, choices) {
        this.question_string = question_string;
        this.choices = choices;
        this.user_archetype = null;
    }

    render(container) {
        container.innerHTML = "";

        const h2 = document.createElement("h2");
        h2.textContent = this.question_string;
        container.appendChild(h2);

        Object.entries(this.choices).forEach(([archetype, text], index) => {
            const id = `choice-${this.question_string}-${index}`;
            const input = document.createElement("input");
            input.type = "radio";
            input.name = `choices-${this.question_string}`;
            input.id = id;
            input.checked = this.user_archetype === archetype;

            input.onchange = () => {
                this.user_archetype = archetype;
            };

            const label = document.createElement("label");
            label.setAttribute("for", id);
            label.textContent = text;

            container.appendChild(input);
            container.appendChild(label);
            container.appendChild(document.createElement("br"));
        });
    }
}

// ----------------------------------
// MAIN
// ----------------------------------
document.addEventListener("DOMContentLoaded", () => {
    const quiz = new Quiz("My Archetype Quiz");

    all_questions.forEach(q => {
        quiz.add_question(new Question(q.question_string, q.choices));
    });

    const quiz_container = document.getElementById("quiz");
    quiz.render(quiz_container);
});
