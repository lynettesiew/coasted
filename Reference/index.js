 // Page Navigation
        function showOnboarding() {
            document.getElementById('onboardingModal').classList.add('active');
        }

        function hideOnboarding() {
            document.getElementById('onboardingModal').classList.remove('active');
        }

        function showManualEntry() {
            document.getElementById('onboardingModal').classList.remove('active');
            document.getElementById('manualEntryModal').classList.add('active');
        }

        function hideManualEntry() {
            document.getElementById('manualEntryModal').classList.remove('active');
            document.getElementById('onboardingModal').classList.add('active');
        }

        function connectPlaid() {
            // In production, this would open Plaid Link
            alert('Plaid integration would open here. This is a Pro feature.');
        }

        function addCard() {
            document.getElementById('manualEntryModal').classList.remove('active');
            showDashboard();
        }

        function showDemo() {
            showDashboard();
        }

        function showDashboard() {
            document.getElementById('landing').classList.add('hidden');
            document.getElementById('app').classList.add('active');
        }

        function showLanding() {
            document.getElementById('landing').classList.remove('hidden');
            document.getElementById('app').classList.remove('active');
        }

        // Close modals on overlay click
        document.querySelectorAll('.modal-overlay').forEach(overlay => {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    overlay.classList.remove('active');
                }
            });
        });

        // Animate utilization bar on load
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.querySelector('.preview-bar-fill').style.width = '47%';
            }, 500);
        });