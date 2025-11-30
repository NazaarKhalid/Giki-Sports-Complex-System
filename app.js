// app.js - Consolidated logic for ALL GIKI Pulse prototype pages (Final Corrected Version)

document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname;

    // --- GLOBAL HANDLERS ---
    
    // 1. Menu Open/Close Logic
    document.querySelectorAll('#openMenu').forEach(button => {
        button.addEventListener('click', function() {
            window.location.href = 'menu.html';
        });
    });

    // 2. Close Menu Button
    document.getElementById('closeMenuBtn')?.addEventListener('click', function() {
        window.history.back(); 
    });

    // 3. Back Button Logic
    document.querySelectorAll('#backBtn').forEach(button => {
        button.addEventListener('click', function() {
            window.history.back(); 
        });
    });

    // 4. Bottom Navigation Logic (Links active pages)
    document.querySelectorAll('.bottom-nav .nav-item').forEach(button => {
        button.addEventListener('click', function() {
            // Simple active state toggle (for prototype visuals)
            document.querySelectorAll('.bottom-nav .nav-item').forEach(item => item.classList.remove('active'));
            this.classList.add('active');

            const pageName = this.textContent.trim().replace(/[^a-zA-Z]/g, ''); 
            let targetFile = '';
            
            // Map the navigation text to the correct HTML file
            if (pageName.includes('Home')) targetFile = 'home.html';
            else if (pageName.includes('Bookings')) targetFile = 'booking.html'; 
            else if (pageName.includes('Events')) targetFile = 'events.html';
            else if (pageName.includes('Announcements')) targetFile = 'announcements.html'; 
            
            if (targetFile) {
                console.log(`Navigating to ${targetFile}`);
                window.location.href = targetFile;
            }
        });
    });

    // --- PAGE SPECIFIC LOGIC ---

    // WELCOME PAGE (welcome.html)
    if (currentPage.includes('welcome.html')) {
        document.getElementById('getStartedBtn').addEventListener('click', function() {
            window.location.href = 'signin.html';
        });
    }

    // SIGN IN PAGE (signin.html)
    else if (currentPage.includes('signin.html')) {
        document.getElementById('signInForm').addEventListener('submit', function(e) {
            e.preventDefault();
            console.log("Sign In attempted. Redirecting to Home.");
            window.location.href = 'home.html';
        });

        document.querySelectorAll('.btn-quick-login').forEach(button => {
            button.addEventListener('click', function() {
                console.log(`Quick login as: ${this.textContent}. Redirecting to Home.`);
                window.location.href = 'home.html';
            });
        });
    }

    // HOME PAGE (home.html) - UPDATED RENEW/PAY FEE LINKS
    else if (currentPage.includes('home.html')) {
        // Quick Action navigation
        document.querySelectorAll('.quick-actions .action-item').forEach(button => {
            button.addEventListener('click', function() {
                const action = this.textContent.trim().toLowerCase();
                if (action.includes('book')) window.location.href = 'booking.html';
                else if (action.includes('pay fee')) window.location.href = 'payment_input.html'; // Link Pay Fee
                else if (action.includes('events')) window.location.href = 'events.html';
                else if (action.includes('activity')) window.location.href = 'activity.html';
            });
        });
        
        // Renew button
        document.querySelector('.renew-btn')?.addEventListener('click', function() {
            window.location.href = 'payment_input.html'; // Link Renew
        });
    }
    
    // EVENTS PAGE (events.html)
    else if (currentPage.includes('events.html')) {
        document.querySelectorAll('.apply-btn').forEach(button => {
            button.addEventListener('click', function() {
                console.log(`Applying for trial. Redirecting to confirmation.`);
                window.location.href = 'confirmation_trial.html';
            });
        });
    }

    // BOOKING PAGE (booking.html)
    else if (currentPage.includes('booking.html')) {
        document.getElementById('bookBtn').addEventListener('click', function() {
            console.log("Booking attempted. Redirecting to Confirmation.");
            window.location.href = 'confirmation_booking.html';
        });

        document.getElementById('saveDraftBtn').addEventListener('click', function() {
            alert("Draft saved!");
        });
    }

    // BOOKING CONFIRMATION PAGE (confirmation_booking.html) - CORRECTED LOGIC
    else if (currentPage.includes('confirmation_booking.html')) {
        // This targets the button with id="viewBookingBtn" and links to activity.html
        document.getElementById('viewBookingBtn')?.addEventListener('click', function() { 
            console.log("Viewing booking. Redirecting to Activity.");
            window.location.href = 'activity.html'; 
        });
    }

    // TEAM MANAGEMENT PAGE (team_management.html)
    else if (currentPage.includes('team_management.html')) {
        document.getElementById('addMemberBtn')?.addEventListener('click', function() {
            alert("Ready to add a new team member.");
        });
        document.getElementById('saveTeamBtn')?.addEventListener('click', function() {
            alert("Team roster saved successfully.");
        });
    }

    // PAYMENT INPUT PAGE (payment_input.html)
    else if (currentPage.includes('payment_input.html')) {
        document.getElementById('paymentForm')?.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log("Processing payment...");
            window.location.href = 'payment_success.html'; 
        });

        document.getElementById('cancelBtn')?.addEventListener('click', function() {
            window.history.back();
        });
    }
    
    // ANNOUNCEMENTS PAGE (announcements.html) - ADDED LOGIC
    else if (currentPage.includes('announcements.html')) {
        document.getElementById('openNotificationBtn')?.addEventListener('click', function() {
            alert("Opening the selected announcement.");
        });
        
        document.getElementById('clearNotificationBtn')?.addEventListener('click', function() {
            alert("All announcements cleared.");
        });
    }
    
    // Note: activity.html, confirmation_trial.html, and payment_success.html use only global handlers (back/nav).
});