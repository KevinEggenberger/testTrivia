async function getTriviaQuestion() {
  try {
    const response = await fetch('http://localhost:3000/trivia', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    document.getElementById('trivia-question').innerText = data.question;
    document.getElementById('question-container').style.display = 'block';
    document.getElementById('answer-container').style.display = 'block';
    document.getElementById('evaluation-result').innerText = '';
    document.getElementById('answer-input').value = ''; // Clear the input field
  } catch (error) {
    console.error('Error fetching trivia question:', error);
  }
}

async function submitAnswer() {
  const question = document.getElementById('trivia-question').innerText;
  const answer = document.getElementById('answer-input').value;

  try {
    const response = await fetch('http://localhost:3000/evaluate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ question, answer })
    });

    const data = await response.json();
    document.getElementById('evaluation-result').innerText = data.evaluation;
    document.getElementById('answer-input').value = ''; // Clear the input field
  } catch (error) {
    console.error('Error submitting answer:', error);
  }
}
