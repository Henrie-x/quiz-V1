    const themeToggle = document.getElementById("themeToggle");

    const questionCount = document.getElementById("questionCount");
    const scoreValue = document.getElementById("scoreValue");
    
    const progressFill = document.getElementById("progressFill");
    
    const questionText = document.getElementById("questionText");
    const options = document.getElementById("options");
    
    const nextBtn = document.getElementById("nextBtn");
    
    const questions = [
        {
            question: "Which language runs directly in the browser?",
            options: ["Python", "JavaScript", "C++"],
            answer: "JavaScript"
        },
        {
            question: "Which HTML tag is used to create a hyperlink?",
            options: ["<link>", "<a>", "<href>"],
            answer: "<a>"
        },
        {
            question: "Which method adds an item to the end of an array?",
            options: ["pop()", "shift()", "push()"],
            answer: "push()"
        },
        {
            question: "What does CSS stand for?",
            options: [
              "Cascading Style Sheets",
              "Computer Style System",
              "Creative Styling Syntax"
            ],
            answer: "Cascading Style Sheets"
        },
        {
            question: "Which keyword declares a block-scoped variable?",
            options: ["var", "let", "define"],
            answer: "let"
        },
        {
            question: "Which method creates a new array by transforming elements?",
            options: ["map()", "forEach()", "find()"],
            answer: "map()"
        },
        {
            question: "What is the result of typeof null?",
            options: ["null", "undefined", "object"],
            answer: "object"
        },
        {
            question: "Which symbol is used for strict equality?",
            options: ["==", "===", "="],
            answer: "==="
        },
        {
            question: "Which method converts JSON text into a JavaScript value?",
            options: [
              "JSON.stringify()",
              "JSON.parse()",
              "JSON.convert()"
            ],
            answer: "JSON.parse()"
        },
        {
            question: "Which array method checks whether at least one element passes a test?",
            options: ["every()", "some()", "filter()"],
            answer: "some()"
        }
    ]   
    
    let currentIndex = 0;
    let score = 0;
    let selectedOption = null;
    
    function showQuestion() {
        const currentQuestion = questions[currentIndex]
        questionText.textContent = currentQuestion.question;
        questionCount.textContent = `Question ${currentIndex + 1 } of ${questions.length}`
        options.innerHTML = ""
        currentQuestion.options.forEach((option,index) => {
            const btn = document.createElement("button")
            btn.className = "option-btn"
            
            const span = document.createElement("span")
            span.className = "option-letter"
            span.textContent = String.fromCharCode(65 + index)
            
            const text = document.createElement("strong")
            text.textContent = option
            
            btn.appendChild(span)
            btn.appendChild(text)
            options.appendChild(btn)
        })
        addOptionListener()
    }
    
    function addOptionListener() {
        const optionBtns = document.querySelectorAll(".option-btn")
        
        optionBtns.forEach(btn => {
            btn.addEventListener("click",() => {
                selectedOption = btn.querySelector("strong").textContent.trim()
                console.log(selectedOption)
                nextBtn.disabled = false;
                optionBtns.forEach(b => b.classList.remove("selected"))
                btn.classList.add("selected")
            })
        })
    }
    
    function updateProgress() {
        const progress = ((currentIndex + 1) / questions.length) * 100;
        
        progressFill.style.width = `${progress}%`;
    }
    
    function handleNextBtn() {
        if(selectedOption === questions[currentIndex].answer) {
            score++
        }
        
        scoreValue.textContent = `Score: ${score}`;
        currentIndex++
        selectedOption = null
        nextBtn.disabled = true;
        
        if(currentIndex < questions.length) {
            showQuestion()
            updateProgress()
        }else {
            questionText.textContent = ` Quiz finished! Score: ${score}/${questions.length}`
            options.innerHTML = ""
            nextBtn.style.display = "none"
        }
    }
    
    let newTheme = null;
    
    themeToggle.addEventListener("click",(e) => {
        const coX = e.clientX
        const coY = e.clientY
        
        document.documentElement.style.setProperty("--reveal-x",`${coX}px`)
        document.documentElement.style.setProperty("--reveal-y",`${coY}px`)
        
        const currentTheme = document.body.dataset.theme
        
        newTheme = currentTheme === "dark" ? "light" : "dark"
        
        document.startViewTransition(() => {
            document.body.dataset.theme = newTheme
        })
    })
    
    showQuestion()
    updateProgress()
    scoreValue.textContent = `Score: ${score}`;
    nextBtn.addEventListener("click",handleNextBtn)