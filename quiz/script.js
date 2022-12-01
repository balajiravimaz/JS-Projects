const quizData = [
    {
        question: "Which language runs in a web browser?",
        a: "Java",
        b: "C",
        c: "Python",
        d: "JavaScript",
        correct: "d",
    },
    {
        question: "What does CSS stand for?",
        a: "Central Style Sheets",
        b: "Cascading Style Sheets",
        c: "Cascading Simple Sheets",
        d: "Cars SUVs Sailboats",
        correct: "b",
    },
    {
        question: "What does HTML stand for?",
        a: "Hypertext Markup Language",
        b: "Hypertext Markdown Language",
        c: "Hyperloop Machine Language",
        d: "Helicopters Terminals Motorboats Lamborginis",
        correct: "a",
    },
    {
        question: "What year was JavaScript launched?",
        a: "1996",
        b: "1995",
        c: "1994",
        d: "none of the above",
        correct: "b",
    },
];

class Quiz {
    constructor() {
        this.quiz = document.querySelector(".quiz");
        this.question = document.querySelector(".question");
        this.answer = document.querySelectorAll(".answer");

        this.a_text = document.getElementById("a_text");
        this.b_text = document.getElementById("b_text");
        this.c_text = document.getElementById("c_text");
        this.d_text = document.getElementById("d_text");
        this.btn = document.querySelector(".btn");
        this.maxScore = localStorage.getItem("score");
        this.ldx = 0;
        this.score = 0;
    }
    loadQuiz() {

        let current = quizData[this.ldx];
        this.deselect();

        this.question.textContent = current.question;
        this.a_text.innerText = current.a;
        this.b_text.innerText = current.b;
        this.c_text.innerText = current.c;
        this.d_text.innerText = current.d;
        // console.log(this.getSelect());
    }
    deselect() {
        this.answer.forEach(lis => lis.checked = false);
    }
    getSelect() {
        let answerLi;

        this.answer.forEach(lis => {
            if (lis.checked) {
                answerLi = lis.id;
            }
        })
        return answerLi;
    }
    calculate() {
        let res = this.getSelect();
        if (res) {
            if (res === quizData[this.ldx].correct) {
                this.score++;
            }
            this.ldx++;
            if (this.ldx < quizData.length) {
                this.loadQuiz();
            } else {
                this.quiz.innerHTML = `
                <h2>You Got ${this.score} out of ${quizData.length} Questions</h2>                
                <p id="maxScore">High Score: ${this.maxScore ? this.maxScore:0}</p>
                <button onclick ="window.location.reload();" class="btn">Reload</button>                
                `;
                if (this.maxScore) {
                    if (this.score > this.maxScore) {
                        localStorage.setItem("score", this.score);
                        document.getElementById("maxScore").textContent = `New High Score:${this.score}`;
                    }
                } else {
                    localStorage.setItem("score", this.score);
                }
            }
        }
    }
}


const data = new Quiz();

data.loadQuiz();

data.btn.addEventListener("click", function () {
    data.calculate();
});


