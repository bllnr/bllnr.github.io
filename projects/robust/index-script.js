document.addEventListener('DOMContentLoaded', () => {
        const demoButton = document.getElementById('demo-btn');
        
        if (demoButton) {
            demoButton.addEventListener('click', (e) => {
                console.log("Demo button clicked")
                e.preventDefault();
                
                const width = 1200;
                const height = 850;
                const left = (window.innerWidth / 2) - (width / 2);
                const top = (window.innerHeight / 2) - (height / 2);
                
                window.open(
                    'demo.html', 
                    'InteractiveDemo', 
                    `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes`
                );
            });
        }
    });