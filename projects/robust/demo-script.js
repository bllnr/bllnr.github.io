// script.js - Dedicated Demo Form Implementation
document.addEventListener('DOMContentLoaded', () => {
    console.log("Demo script initialized successfully!");
    initializeDemoForm();
});

function initializeDemoForm() {
    const form = document.querySelector('form') || document.getElementById('demo-form-wrapper');
    const reportTextarea = document.querySelector('textarea') || document.getElementById('whatHappened');
    
    if (!form || !reportTextarea) {
        console.warn("Could not find the demo form or textarea inside demo.html");
        return; 
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const reportContent = reportTextarea.value.trim();
        if (!reportContent) {
            alert('Please enter report details before submitting.');
            return;
        }

        try {
            showLoading(true);
            
            const response = await fetch('https://api.robust-team1.chalmers.it/categorize', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ report: reportContent })
            });

            if (!response.ok) throw new Error('Classification failed');
            
            const result = await response.json();
            console.log("Classification Results:", result);
            // If you have results elements inside demo.html, update them here

        } catch (error) {
            console.error('Error during categorization:', error);
        } finally {
            showLoading(false);
        }
    });
}

function showLoading(isLoading) {
    const submitBtn = document.querySelector('button[type="submit"]') || document.querySelector('button:contains("Submit")');
    if (!submitBtn) return;
    submitBtn.disabled = isLoading;
    submitBtn.textContent = isLoading ? 'Processing...' : 'Submit';
}