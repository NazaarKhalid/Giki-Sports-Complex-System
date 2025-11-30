document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname;
    const userIsCoach = false; 

    function injectDrawers() {
        const drawersHTML = `
            <div id="menuBackdrop" class="overlay-backdrop"></div>
            
            <!-- Left Menu Drawer (Hamburger) -->
            <div id="menuDrawer" class="drawer drawer-left">
                <div class="drawer-header">
                    <button id="closeMenuDrawer" class="drawer-back-btn">←</button>
                    <div class="drawer-user-info">
                        <div class="drawer-avatar">S</div>
                        <p class="drawer-username">Student Name</p>
                        <p class="drawer-email">u2023xxxx@giki.edu.pk</p>
                    </div>
                </div>
                <nav class="drawer-nav">
                    <a href="#" class="drawer-item">Settings</a>
                    <a href="#" class="drawer-item">Help & Support</a>
                    <a href="signin.html" class="drawer-item logout">Sign Out</a>
                </nav>
            </div>

            <!-- Right Profile Drawer (Profile Pic Click) -->
            <div id="profileDrawer" class="drawer drawer-right">
                 <div class="drawer-header">
                    <button id="closeProfileDrawer" class="drawer-back-btn" style="align-self: flex-end;">→</button>
                    <div class="drawer-user-info" style="align-items: flex-end; width: 100%;">
                        <div class="drawer-avatar" style="border: 2px solid white; margin-bottom: 5px;">S</div>
                        <p class="drawer-email" style="font-weight: bold; margin: 0;">u2023xxxx@giki.edu.pk</p>
                    </div>
                </div>
                <nav class="drawer-nav">
                    <a href="#" class="drawer-item">Edit Profile</a>
                    <a href="#" class="drawer-item">Change Password</a>
                    <a href="#" class="drawer-item">Notification Preferences</a>
                    <a href="#" class="drawer-item">Privacy & Security</a>
                    <a href="#" class="drawer-item">Linked Accounts</a>
                    <a href="#" class="drawer-item">App Theme</a>
                </nav>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', drawersHTML);
    }

    if (!currentPage.includes('signin.html') && !currentPage.includes('welcome.html')) {
        injectDrawers();
    }

    // --- DRAWER CONTROLS ---
    const backdrop = document.getElementById('menuBackdrop');
    const menuDrawer = document.getElementById('menuDrawer');
    const profileDrawer = document.getElementById('profileDrawer');

    function closeAllDrawers() {
        if(backdrop) backdrop.classList.remove('active');
        if(menuDrawer) menuDrawer.classList.remove('active');
        if(profileDrawer) profileDrawer.classList.remove('active');
    }

    document.querySelectorAll('#openMenu').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            if(backdrop) backdrop.classList.add('active');
            if(menuDrawer) menuDrawer.classList.add('active');
        });
    });

    document.querySelectorAll('.user-profile').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            if(backdrop) backdrop.classList.add('active');
            if(profileDrawer) profileDrawer.classList.add('active');
        });
    });

    document.getElementById('closeMenuDrawer')?.addEventListener('click', closeAllDrawers);
    document.getElementById('closeProfileDrawer')?.addEventListener('click', closeAllDrawers);
    
    if(backdrop) {
        backdrop.addEventListener('click', closeAllDrawers);
    }

    // --- STANDARD NAVIGATION ---

    document.getElementById('closeMenuBtn')?.addEventListener('click', function() {
        window.history.back(); 
    });

    document.querySelectorAll('#backBtn').forEach(button => {
        button.addEventListener('click', function() {
            window.history.back(); 
        });
    });

    document.querySelectorAll('.bottom-nav .nav-item').forEach(button => {
        button.addEventListener('click', function() {
            const pageName = this.textContent.trim().toLowerCase();
            let targetFile = '';
            
            if (pageName.includes('home')) targetFile = 'home.html';
            else if (pageName.includes('bookings')) targetFile = 'booking.html'; 
            else if (pageName.includes('events')) targetFile = 'events.html';
            else if (pageName.includes('inbox')) targetFile = 'announcements.html'; 
            else if (pageName.includes('team')) targetFile = 'team_management.html';
            
            if (targetFile) window.location.href = targetFile;
        });
    });

    if (currentPage.includes('welcome.html')) {
        document.getElementById('getStartedBtn').addEventListener('click', function() {
            window.location.href = 'signin.html';
        });
    }

    else if (currentPage.includes('signin.html')) {
        document.getElementById('signInForm').addEventListener('submit', function(e) {
            e.preventDefault();
            window.location.href = 'home.html';
        });
    }

    else if (currentPage.includes('home.html')) {
        document.querySelectorAll('.quick-actions .action-item').forEach(button => {
            button.addEventListener('click', function() {
                const action = this.textContent.trim().toLowerCase();
                if (action.includes('book')) window.location.href = 'booking.html';
                else if (action.includes('pay fee')) window.location.href = 'payment_input.html';
                else if (action.includes('events')) window.location.href = 'events.html';
                else if (action.includes('activity')) window.location.href = 'activity.html';
            });
        });
        document.querySelector('.renew-btn')?.addEventListener('click', function() {
            window.location.href = 'payment_input.html';
        });
    }

    else if (currentPage.includes('events.html')) {
        document.querySelectorAll('.apply-btn').forEach(button => {
            button.addEventListener('click', function() {
                window.location.href = 'confirmation_trial.html';
            });
        });
    }

    else if (currentPage.includes('booking.html')) {
        const personalBtn = document.getElementById('optionPersonal');
        const societyBtn = document.getElementById('optionSociety');
        const societyInput = document.getElementById('societyInputGroup');

        if (personalBtn && societyBtn) {
            personalBtn.addEventListener('click', function() {
                personalBtn.classList.add('active');
                societyBtn.classList.remove('active');
                societyInput.classList.add('hidden');
            });

            societyBtn.addEventListener('click', function() {
                societyBtn.classList.add('active');
                personalBtn.classList.remove('active');
                societyInput.classList.remove('hidden');
            });
        }

        document.getElementById('bookBtn').addEventListener('click', function() {
            window.location.href = 'confirmation_booking.html';
        });

        document.getElementById('saveDraftBtn').addEventListener('click', function() {
            alert("Draft saved!");
        });
    }

    else if (currentPage.includes('team_management.html')) {
        const unregisteredState = document.getElementById('unregisteredState');
        const coachState = document.getElementById('coachState');

        if (userIsCoach) {
            unregisteredState.classList.add('hidden');
            coachState.classList.remove('hidden');
        } else {
            unregisteredState.classList.remove('hidden');
            coachState.classList.add('hidden');
        }

        document.getElementById('requestAccessBtn')?.addEventListener('click', function() {
            this.textContent = "Request Pending...";
            this.style.backgroundColor = "#888";
            this.disabled = true;
            alert("Your request to become a Team Captain/Coach has been sent to the admin.");
        });

        document.getElementById('addMemberBtn')?.addEventListener('click', function() {
            alert("Ready to add a new team member.");
        });
        document.getElementById('saveTeamBtn')?.addEventListener('click', function() {
            alert("Team roster saved successfully.");
        });
    }

    else if (currentPage.includes('payment_input.html')) {
        document.getElementById('paymentForm')?.addEventListener('submit', function(e) {
            e.preventDefault();
            window.location.href = 'payment_success.html'; 
        });
        document.getElementById('cancelBtn')?.addEventListener('click', function() {
            window.history.back();
        });
    }
    
    else if (currentPage.includes('announcements.html')) {
        document.getElementById('openNotificationBtn')?.addEventListener('click', function() {
            alert("Opening the selected announcement.");
        });
        document.getElementById('clearNotificationBtn')?.addEventListener('click', function() {
            alert("All announcements cleared.");
        });
    }
});