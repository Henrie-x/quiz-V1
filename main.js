    const themeToggle = document.getElementById("themeToggle");

    const questionCount = document.getElementById("questionCount");
    const scoreValue = document.getElementById("scoreValue");
    
    const progressFill = document.getElementById("progressFill");
    
    const questionText = document.getElementById("questionText");
    const options = document.getElementById("options");
    
    const nextBtn = document.getElementById("nextBtn");
    const restartBtn = document.getElementById("restartBtn")
    
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
        },
        {
            question: "Which keyword is used to create a constant in JavaScript?",
            options: ["let", "const", "var"],
            answer: "const"
        },
        {
            question: "Which method removes the last element from an array?",
            options: ["shift()", "pop()", "slice()"],
            answer: "pop()"
        },
        {
            question: "What does DOM stand for?",
            options: [
                "Document Object Model",
                "Data Object Management",
                "Digital Ordinance Model"
            ],
            answer: "Document Object Model"
        },
        {
            question: "Which operator checks both value and type?",
            options: ["==", "===", "!="],
            answer: "==="
        },
        {
            question: "Which CSS property controls the space outside an element's border?",
            options: ["padding", "margin", "border-spacing"],
            answer: "margin"
        },
        {
            question: "Which method converts a JavaScript object into a JSON string?",
            options: [
                "JSON.parse()",
                "JSON.stringify()",
                "JSON.object()"
            ],
            answer: "JSON.stringify()"
        },
        {
            question: "What does addEventListener() do?",
            options: [
                "Creates an HTML element",
                "Listens for an event",
                "Removes an event"
            ],
            answer: "Listens for an event"
        },
        {
            question: "Which HTML attribute provides alternative text for an image?",
            options: ["src", "title", "alt"],
            answer: "alt"
        },
        {
            question: "Which array method returns the first element that passes a test?",
            options: ["find()", "filter()", "map()"],
            answer: "find()"
        },
        {
            question: "What does the flex-direction property control?",
            options: [
                "Element transparency",
                "Direction of flex items",
                "Text alignment"
            ],
            answer: "Direction of flex items"
        }
    ]   
    
    let currentIndex = 0;
    let score = 0;
    let selectedOption = null;
    let currentQuestion;
    
    function showQuestion() {
        currentQuestion = questions[currentIndex]
        questionText.textContent = currentQuestion.question;
        questionCount.textContent = `Question ${currentIndex + 1 } of ${questions.length}`
        options.innerHTML = ""
        const shuffledOptions = [...currentQuestion.options];
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
            restartBtn.hidden = false
        }
    }
    
    themeToggle.addEventListener("click",(e) => {
        const coX = e.clientX
        const coY = e.clientY
        
        document.documentElement.style.setProperty("--reveal-x",`${coX}px`)
        document.documentElement.style.setProperty("--reveal-y",`${coY}px`)
        
        const currentTheme = document.body.dataset.theme
        
        const newTheme = currentTheme === "dark" ? "light" : "dark"
        
        document.startViewTransition(() => {
            document.body.dataset.theme = newTheme
        })
    })
    
    restartBtn.addEventListener("click",() => {
        restartBtn.hidden = true
        currentIndex = 0
        score = 0
        scoreValue.textContent = `Score: ${score}`;
        selectedOption = null
        //currentQuestion = questions[currentIndex]
        showQuestion()
        nextBtn.disabled = true;
        updateProgress()
        nextBtn.style.display = "block"
    })
    
    showQuestion()
    updateProgress()
    scoreValue.textContent = `Score: ${score}`;
    nextBtn.addEventListener("click",handleNextBtn)