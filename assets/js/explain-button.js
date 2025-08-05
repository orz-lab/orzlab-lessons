document.addEventListener('DOMContentLoaded', function() {
  // Handle expandable terms
  const termButtons = document.querySelectorAll('.term-button');
  
  termButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      const expandableTerm = this.closest('.expandable-term');
      const termName = expandableTerm.getAttribute('data-term');
      const explanation = document.getElementById(termName + '-explanation');
      
      if (explanation) {
        // Close all other explanations
        document.querySelectorAll('.term-explanation.show').forEach(exp => {
          if (exp !== explanation) {
            exp.classList.remove('show');
          }
        });
        
        // Reset all other buttons
        document.querySelectorAll('.term-button').forEach(btn => {
          if (btn !== this) {
            btn.textContent = '?';
          }
        });
        
        // Toggle current explanation
        explanation.classList.toggle('show');
        
        // Update button text
        this.textContent = explanation.classList.contains('show') ? '×' : '?';
      }
    });
  });
  
  // Close explanations when clicking outside
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.expandable-term') && !e.target.closest('.term-explanation')) {
      document.querySelectorAll('.term-explanation.show').forEach(exp => {
        exp.classList.remove('show');
      });
      document.querySelectorAll('.term-button').forEach(btn => {
        btn.textContent = '?';
      });
    }
  });
});