    // Tab switching
    function switchTab(tabId) {
        // Hide all content sections
        const contentSections = document.querySelectorAll('.content-section');
        contentSections.forEach(section => {
          section.classList.remove('active');
        });
        
        // Show the selected content section
        document.getElementById(tabId).classList.add('active');
        
        // Update tab styling
        const tabs = document.querySelectorAll('.tab');
        tabs.forEach(tab => {
          tab.classList.remove('active');
          tab.classList.add('inactive');
        });
        
        // Highlight the clicked tab
        if (tabId === 'all-games') {
          tabs[0].classList.remove('inactive');
          tabs[0].classList.add('active');
        } else {
          tabs[1].classList.remove('inactive');
          tabs[1].classList.add('active');
        }
        
        // Close any open dropdowns
        closeDropdowns();
      }
      
      // Category dropdown
      function toggleCategoryDropdown() {
        const activeSection = document.querySelector('.content-section.active');
        if (activeSection.id === 'all-games') {
          document.getElementById("categoryDropdown").classList.toggle("show");
        } else {
          document.getElementById("categoryDropdownRented").classList.toggle("show");
        }
      }
      
      // Filter menu
      function toggleFilterMenu() {
        document.getElementById("filterMenu").classList.toggle("show");
      }
      
      function toggleFilterMenuRented() {
        document.getElementById("filterMenuRented").classList.toggle("show");
      }
      
      // Set results limit
      function setResultsLimit(limit) {
        let message = limit === 0 ? "แสดงทั้งหมด" : `แสดง ${limit} รายการ`;
        alert(`${message} สำหรับเกมทั้งหมด`);
        closeDropdowns();
      }
      
      function setResultsLimitRented(limit) {
        let message = limit === 0 ? "แสดงทั้งหมด" : `แสดง ${limit} รายการ`;
        alert(`${message} สำหรับเกมเช่า`);
        closeDropdowns();
      }
      
      // Close the dropdown if the user clicks outside of it
      window.onclick = function(event) {
        if (!event.target.matches('.dropdown-btn') && !event.target.matches('.filter-icon')) {
          closeDropdowns();
        }
      }
      
      function closeDropdowns() {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        for (var i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
          }
        }
        
        var filterMenus = document.getElementsByClassName("filter-menu");
        for (var i = 0; i < filterMenus.length; i++) {
          var openMenu = filterMenus[i];
          if (openMenu.classList.contains('show')) {
            openMenu.classList.remove('show');
          }
        }
      }