        // Sample data for areas in each region
        const regionAreas = {
            accra: ["Accra Central", "East Legon", "Osu", "Dansoman", "Madina", "Tema", "Labone", "Airport Residential"],
            kumasi: ["Adum", "Asokwa", "Bantama", "Ahodwo", "Tafo", "Suame", "KNUST Area", "Asafo"],
            takoradi: ["Takoradi Central", "Sekondi", "Effiakuma", "Kwesimintsim", "Apowa", "Airport Ridge", "Windy Ridge"],
            tamale: ["Tamale Central", "Kalpohin", "Lamashegu", "Sabonjida", "Kanvili", "Nyohini", "Changli"],
            "cape-coast": ["Cape Coast Central", "Abura", "University Area", "Kakumdo", "Pedu", "Amissano", "Ekon"],
            ho: ["Ho Central", "Ho Bankoe", "Ho Ahoe", "Ho Dome", "Ho Hliha", "Ho Fiave", "Ho Heve"],
            sunyani: ["Sunyani Central", "Area 1", "Area 2", "Area 3", "New Town", "Penkwase", "Nkwabeng"],
            bolga: ["Bolga Central", "Zuarungu", "Soe", "Tindonsobligo", "Zongo", "Sakote", "Kumbosgo"]
        };

        // Sample power status data for areas
        const areaStatusData = {
            "Accra Central": { status: "available", nextOutage: "6:00 PM - 8:00 PM", lastUpdate: "10 minutes ago" },
            "East Legon": { status: "shedding", nextOutage: "None", lastUpdate: "5 minutes ago" },
            "Osu": { status: "available", nextOutage: "9:00 PM - 11:00 PM", lastUpdate: "15 minutes ago" },
            "Dansoman": { status: "available", nextOutage: "No scheduled outage", lastUpdate: "Just now" },
            "Madina": { status: "shedding", nextOutage: "4:00 PM - 6:00 PM", lastUpdate: "20 minutes ago" },
            "Tema": { status: "available", nextOutage: "No scheduled outage", lastUpdate: "Just now" },
            "Labone": { status: "shedding", nextOutage: "7:00 PM - 9:00 PM", lastUpdate: "8 minutes ago" },
            "Airport Residential": { status: "available", nextOutage: "No scheduled outage", lastUpdate: "Just now" }
        };

        // Initialize with Accra areas
        let currentRegion = "accra";
        let currentArea = null;

        // DOM Elements
        const regionButtons = document.querySelectorAll('.region-btn');
        const areaSection = document.getElementById('areaSection');
        const areaGrid = document.getElementById('areaGrid');
        const selectedRegionSpan = document.getElementById('selectedRegion');
        const areaStatusDiv = document.getElementById('areaStatus');
        const selectedAreaSpan = document.getElementById('selectedArea');
        const currentPowerStatus = document.getElementById('currentPowerStatus');
        const nextOutage = document.getElementById('nextOutage');
        const lastUpdate = document.getElementById('lastUpdate');
        const powerIndicator = document.getElementById('powerIndicator');
        const powerStatusText = document.getElementById('powerStatusText');
        const statusTitle = document.getElementById('statusTitle');
        const statusTime = document.getElementById('statusTime');

        // Initialize region buttons
        regionButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                regionButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get the selected region
                currentRegion = this.getAttribute('data-region');
                selectedRegionSpan.textContent = this.textContent;
                
                // Show area section
                areaSection.style.display = 'block';
                
                // Populate areas for the selected region
                populateAreas(currentRegion);
                
                // Reset area status display
                areaStatusDiv.style.display = 'none';
                currentArea = null;
                
                // Update main status display
                updateMainStatusDisplay();
            });
        });

        // Function to populate areas for a region
        function populateAreas(region) {
            // Clear previous areas
            areaGrid.innerHTML = '';
            
            // Get areas for the region
            const areas = regionAreas[region];
            
            // Create area buttons
            areas.forEach(area => {
                const areaButton = document.createElement('button');
                areaButton.className = 'area-btn';
                areaButton.textContent = area;
                areaButton.setAttribute('data-area', area);
                
                areaButton.addEventListener('click', function() {
                    // Remove active class from all area buttons
                    document.querySelectorAll('.area-btn').forEach(btn => btn.classList.remove('active'));
                    // Add active class to clicked button
                    this.classList.add('active');
                    
                    // Set current area
                    currentArea = area;
                    
                    // Show area status
                    showAreaStatus(area);
                });
                
                areaGrid.appendChild(areaButton);
            });
        }

        // Function to show area status
        function showAreaStatus(area) {
            // Get status data for the area
            const statusData = areaStatusData[area] || { 
                status: "unknown", 
                nextOutage: "Information not available", 
                lastUpdate: "Unknown" 
            };
            
            // Update area status display
            selectedAreaSpan.textContent = area;
            currentPowerStatus.textContent = statusData.status === "available" ? "Available" : 
                                           statusData.status === "shedding" ? "Load Shedding" : "Unknown";
            nextOutage.textContent = statusData.nextOutage;
            lastUpdate.textContent = statusData.lastUpdate;
            
            // Show area status div
            areaStatusDiv.style.display = 'block';
            
            // Update main status display
            updateMainStatusDisplay();
        }

        // Function to update main status display
        function updateMainStatusDisplay() {
            if (currentArea) {
                const statusData = areaStatusData[currentArea] || { status: "unknown" };
                
                if (statusData.status === "available") {
                    statusTitle.textContent = "Power Currently Available";
                    statusTime.textContent = "Next outage: " + (statusData.nextOutage || "No scheduled outage");
                    powerIndicator.className = "power-indicator power-on";
                    powerStatusText.textContent = "Power On";
                } else if (statusData.status === "shedding") {
                    statusTitle.textContent = "Load Shedding in Progress";
                    statusTime.textContent = "Next availability: " + (statusData.nextOutage || "Unknown");
                    powerIndicator.className = "power-indicator power-off";
                    powerStatusText.textContent = "Power Off";
                } else {
                    statusTitle.textContent = "Status Unknown";
                    statusTime.textContent = "Select an area to see power status";
                    powerIndicator.className = "power-indicator power-off";
                    powerStatusText.textContent = "Status Unknown";
                }
            } else {
                statusTitle.textContent = "Select a Region and Area";
                statusTime.textContent = "Choose your location to see power status";
                powerIndicator.className = "power-indicator power-on";
                powerStatusText.textContent = "Power On";
            }
        }

        // Initialize with Accra areas
        populateAreas(currentRegion);

        // Calendar functionality (simplified for this example)
        const calendarGrid = document.getElementById('calendarGrid');
        const calendarMonth = document.getElementById('calendarMonth');
        const prevMonthBtn = document.getElementById('prevMonth');
        const nextMonthBtn = document.getElementById('nextMonth');
        
        let currentDate = new Date();
        
        function generateCalendar() {
            // Clear previous calendar
            calendarGrid.innerHTML = '';
            
            // Add day headers
            const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            days.forEach(day => {
                const dayElement = document.createElement('div');
                dayElement.className = 'calendar-day header';
                dayElement.textContent = day;
                calendarGrid.appendChild(dayElement);
            });
            
            // Get first day of month and number of days
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth();
            const firstDay = new Date(year, month, 1);
            const lastDay = new Date(year, month + 1, 0);
            const daysInMonth = lastDay.getDate();
            
            // Add empty cells for days before the first day of the month
            for (let i = 0; i < firstDay.getDay(); i++) {
                const emptyDay = document.createElement('div');
                emptyDay.className = 'calendar-day';
                calendarGrid.appendChild(emptyDay);
            }
            
            // Add days of the month
            for (let day = 1; day <= daysInMonth; day++) {
                const dayElement = document.createElement('div');
                dayElement.className = 'calendar-day';
                
                // Randomly assign power status for demonstration
                const status = Math.random() > 0.7 ? 'shedding' : 'available';
                if (status === 'shedding') {
                    dayElement.classList.add('shedding');
                } else {
                    dayElement.classList.add('available');
                }
                
                // Check if this is today
                const today = new Date();
                if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                    dayElement.classList.add('today');
                }
                
                const dayNumber = document.createElement('div');
                dayNumber.className = 'day-number';
                dayNumber.textContent = day;
                dayElement.appendChild(dayNumber);
                
                const dayStatus = document.createElement('div');
                dayStatus.className = 'day-status';
                dayStatus.textContent = status === 'shedding' ? 'Shedding' : 'Available';
                dayElement.appendChild(dayStatus);
                
                calendarGrid.appendChild(dayElement);
            }
            
            // Update month display
            const monthNames = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"];
            calendarMonth.textContent = `${monthNames[month]} ${year}`;
        }
        
        prevMonthBtn.addEventListener('click', function() {
            currentDate.setMonth(currentDate.getMonth() - 1);
            generateCalendar();
        });
        
        nextMonthBtn.addEventListener('click', function() {
            currentDate.setMonth(currentDate.getMonth() + 1);
            generateCalendar();
        });
        
        // Initialize calendar
        generateCalendar();

        // Schedule list functionality (simplified for this example)
        const scheduleList = document.getElementById('scheduleList');
        
        function generateSchedule() {
            scheduleList.innerHTML = '';
            
            // Sample schedule data
            const scheduleData = [
                { time: "6:00 AM - 8:00 AM", status: "available" },
                { time: "8:00 AM - 10:00 AM", status: "shedding" },
                { time: "10:00 AM - 12:00 PM", status: "available" },
                { time: "12:00 PM - 2:00 PM", status: "available" },
                { time: "2:00 PM - 4:00 PM", status: "shedding" },
                { time: "4:00 PM - 6:00 PM", status: "available" },
                { time: "6:00 PM - 8:00 PM", status: "shedding" },
                { time: "8:00 PM - 10:00 PM", status: "available" },
                { time: "10:00 PM - 12:00 AM", status: "available" }
            ];
            
            scheduleData.forEach(item => {
                const scheduleItem = document.createElement('div');
                scheduleItem.className = `schedule-item ${item.status === 'shedding' ? 'shedding' : ''}`;
                scheduleItem.innerHTML = `
                    <strong>${item.time}</strong>: ${item.status === 'shedding' ? 'Load Shedding' : 'Power Available'}
                `;
                scheduleList.appendChild(scheduleItem);
            });
        }
        
        generateSchedule();
