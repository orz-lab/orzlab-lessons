function checkAnswer(questionName, correctAnswer) {
  const selectedAnswer = document.querySelector(`input[name="${questionName}"]:checked`);
  const resultDiv = document.getElementById(`${questionName}-result`);
  
  if (!selectedAnswer) {
    alert('Vui lòng chọn một đáp án!');
    return;
  }
  
  resultDiv.style.display = 'block';
  
  if (selectedAnswer.value === correctAnswer) {
    // Correct answer - show the correct result
    resultDiv.className = 'answer-result correct';
    // Keep the original content (correct answer + explanation)
  } else {
    // Incorrect answer - change styling but keep explanation
    resultDiv.className = 'answer-result incorrect';
    
    // Get the original content and modify only the first part
    const resultContent = resultDiv.querySelector('.result-content');
    const originalStrong = resultContent.querySelector('strong');
    const originalExplanation = resultContent.innerHTML.substring(resultContent.innerHTML.indexOf('</strong>') + 9);
    
    resultContent.innerHTML = 
      `Đáp án sai! ${originalExplanation}`;
  }
  
  // Disable the button after answering
  const button = document.querySelector(`button[onclick*="${questionName}"]`);
  if (button) {
    button.disabled = true;
    button.textContent = 'Đã trả lời';
  }
}

// Optional: Function to reset quiz
function resetQuiz(questionName) {
  const resultDiv = document.getElementById(`${questionName}-result`);
  const button = document.querySelector(`button[onclick*="${questionName}"]`);
  const radioButtons = document.querySelectorAll(`input[name="${questionName}"]`);
  
  // Hide result
  resultDiv.style.display = 'none';
  
  // Re-enable button
  if (button) {
    button.disabled = false;
    button.textContent = 'Kiểm tra đáp án';
  }
  
  // Uncheck all radio buttons
  radioButtons.forEach(radio => radio.checked = false);
}