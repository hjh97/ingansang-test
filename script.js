const questions = [
  {
    question: "질문1: 나는 목가적 분위기의 한적한 삶을 살고 싶다",
    options: ["아니오", "보통", "예"]
  },
  {
    question: "질문2: 시험 성적이 잘 안 나왔을 때 스스로를 위로할 수 있다",
    options: ["아니오", "보통", "예"]
  },
  {
    question: "질문3: 나는 별 생각이 없다",
    options: ["아니오", "보통", "예"]
  },
  {
    question: "질문4: 나는 니체를 모른다",
    options: ["아니오(안다)", "보통", "예"]
  },
  {
    question: "질문5: 성소수자에 대해 별 생각이 없다",
    options: ["아니오", "보통", "예"]
  },
  {
    question: "질문6: 나는 능력을 가치판단의 첫번째에 두는 것을",
    options: ["좋다고 본다", "필요하다고 생각한다", "생각을 안 해봤지만.. 좋진 않다"]
  },
  {
    question: "질문7: 인간을 관찰한 적이 있다",
    options: ["아랫 것들에 대해서만", "ㄴㄴ", "취미다"]
  },
  {
    question: "질문8: 영화 취미",
    options: ["사회비판물", "히어로물", "작가주의 영화"]
  },
  {
    question: "질문9: 수집이 취미다",
    options: ["나는 뭘 모은다", "모았는데 엄마가 버려서 단념(할 때도 안 할 때도 있다)", "뭘 모은 적 없다"]
  },
  {
    question: "질문10: 가끔 왜 사는지 의문이 드는지?",
    options: ["이자식들이 능력이 없고 불성실할 때 그들이 왜 사는지 궁금", "일이 힘들 때 의문이 든다", "반복에서 권태의 감정을 느낄 때"]
  },
];

let currentQuestionIndex = 0;
let selectedOptions = [];

function showQuestion() {
  const questionText = document.getElementById('questionText');
  const optionsContainer = document.getElementById('options');

  const currentQuestion = questions[currentQuestionIndex];

  questionText.textContent = currentQuestion.question;

  optionsContainer.innerHTML = '';

  for (let i = 0; i < currentQuestion.options.length; i++) {
    const option = currentQuestion.options[i];

    const optionButton = document.createElement('button');
    optionButton.textContent = option;
    optionButton.classList.add('bg-indigo-500', 'hover:bg-indigo-700', 'text-white', 'font-bold', 'py-2', 'px-4', 'rounded', 'mr-4', 'mt-2');
    optionButton.dataset.index = i;

    optionButton.addEventListener('click', selectOption);

    optionsContainer.appendChild(optionButton);
  }
}

function selectOption(event) {
  const selectedOptionIndex = parseInt(event.target.dataset.index);
  selectedOptions[currentQuestionIndex] = selectedOptionIndex;

  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    showQuestion();
  } else {
    showResult();
  }
}


function showResult() {
  const resultText = document.getElementById('resultText');
  const resultPage = document.getElementById('resultPage');

  const counts = [0, 0, 0];

  for (let i = 0; i < selectedOptions.length; i++) {
    counts[selectedOptions[i]]++;
  }

  let result = '';
  

  if (counts[0] > counts[1] && counts[0] > counts[2]) {
    result = '당신은 지배자 유형입니다.\n 글에서는 "가만히 의자에 앉아서 몸은 안 움직이고, 타인에게 이것저것 명령이나 하면서도 내 백배나 되는 급료를 받는 것"이라고 나와 있습니다. 능력을 중요시하며, 급을 나눕니다.';
  } else if (counts[1] > counts[0] && counts[1] > counts[2]) {
    result = '당신은 프롤레타리아입니다. \n 글에서는 "열심히 이마에 땀을 흘리면서 노동하는 인간이라고 나와있습니다. 사실 유형이 한 가지 더 있는데, 그것은 "개"입니다. "주구", 앞잡이라고도 불리는데 이는 자본가들 아래서 시키는 대로 행동하는 인간입니다. 소설에서는 "조니 워커"의 "개"로 형상화되어 있습니다.';
  } else if (counts[2] > counts[0] && counts[2] > counts[1]) {
    result = '당신은 고양이입니다. \n 나카타는 고양이 님이라 부릅니다. 제 주관으로는 나카타는 고양이 유형입니다. 고양이와 대화할 수 있기 때문입니다. 초연하며 본능에 충실하고 가장 행복함. 현실을 사는 인간임.';
  } else if (counts[0] === counts[1] && counts[0] > counts[2]) {
    result = '지배자와 프롤레타리아 사이';
  } else if (counts[0] === counts[2] && counts[0] > counts[1]) {
    result = '지배자와 고양이 사이';
  } else if (counts[1] === counts[2] && counts[1] > counts[0]) {
    result = '프롤레타리아와 고양이 사이';
  }
  resultText.textContent = result;
  resultPage.classList.remove('hidden');
}

function restartSurvey() {
  currentQuestionIndex = 0;
  selectedOptions = [];
  showQuestion();

  const startPage = document.getElementById('startPage');
  const questionPage = document.getElementById('questionPage');
  const resultPage = document.getElementById('resultPage');

  startPage.classList.remove('hidden');
  questionPage.classList.add('hidden');
  resultPage.classList.add('hidden');
}

function startSurvey() {
  const startPage = document.getElementById('startPage');
  const questionPage = document.getElementById('questionPage');

  startPage.classList.add('hidden');
  questionPage.classList.remove('hidden');

  showQuestion();
}

document.getElementById('startBtn').addEventListener('click', startSurvey);
document.getElementById('nextBtn').addEventListener('click', selectOption);
document.getElementById('restartBtn').addEventListener('click', restartSurvey);
