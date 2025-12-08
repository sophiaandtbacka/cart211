// ----------------------------------
// 10 QUESTIONS WITH ARCHETYPES
// ----------------------------------
const all_questions = [
    { question_string: "Question 1", choices: { archetype1: "Answer 1", archetype2: "Answer 2", archetype3: "Answer 3", archetype4: "Answer 4", archetype5: "Answer 5" } },
    { question_string: "Question 2", choices: { archetype1: "Answer 1", archetype2: "Answer 2", archetype3: "Answer 3", archetype4: "Answer 4", archetype5: "Answer 5" } },
    { question_string: "Question 3", choices: { archetype1: "Answer 1", archetype2: "Answer 2", archetype3: "Answer 3", archetype4: "Answer 4", archetype5: "Answer 5" } },
    { question_string: "Question 4", choices: { archetype1: "Answer 1", archetype2: "Answer 2", archetype3: "Answer 3", archetype4: "Answer 4", archetype5: "Answer 5" } },
    { question_string: "Question 5", choices: { archetype1: "Answer 1", archetype2: "Answer 2", archetype3: "Answer 3", archetype4: "Answer 4", archetype5: "Answer 5" } },
    { question_string: "Question 6", choices: { archetype1: "Answer 1", archetype2: "Answer 2", archetype3: "Answer 3", archetype4: "Answer 4", archetype5: "Answer 5" } },
    { question_string: "Question 7", choices: { archetype1: "Answer 1", archetype2: "Answer 2", archetype3: "Answer 3", archetype4: "Answer 4", archetype5: "Answer 5" } },
    { question_string: "Question 8", choices: { archetype1: "Answer 1", archetype2: "Answer 2", archetype3: "Answer 3", archetype4: "Answer 4", archetype5: "Answer 5" } },
    { question_string: "Question 9", choices: { archetype1: "Answer 1", archetype2: "Answer 2", archetype3: "Answer 3", archetype4: "Answer 4", archetype5: "Answer 5" } },
    { question_string: "Question 10", choices: { archetype1: "Answer 1", archetype2: "Answer 2", archetype3: "Answer 3", archetype4: "Answer 4", archetype5: "Answer 5" } }
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
