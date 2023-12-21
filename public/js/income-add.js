const incomeFormHandler = async (event) => {
    // Stop the browser from submitting the form so we can do so with JavaScript
    event.preventDefault();

    const transaction_date = new Date();
    const user_id = document.getElementById('user-id').value;
    const category_id = document.getElementById('category-selection').value.trim();
    const description = document.getElementById('income-description').value.trim();
    const amount = document.getElementById('income-amount').value.trim();

    if (category_id && description && amount)  {
      const response = await fetch('/api/incomes/', {
        method: 'POST',
        body: JSON.stringify({ category_id, description, amount, transaction_date, user_id}),
        headers: { 'Content-Type': 'application/json' },
      });
      
      if (response.ok) {
        document.location.replace('/income');
      } else {
        alert('Failed to log in');
      }
    }
  };
  
  document
    .querySelector('.income-form')
    .addEventListener('submit', incomeFormHandler);

  