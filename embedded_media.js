'use strict';

// Wrap everything in an anonymous function to avoid polluting the global namespace
(function () {
  // Use the jQuery document ready signal to know when everything has been initialized
  $(document).ready(function () {
    // Tell Tableau we'd like to initialize our extension
    tableau.extensions.initializeAsync().then(function () {
      // Once the extension is initialized, ask the user to choose a sheet
      showChooseSheetDialog();

      initializeButtons();
    });
  });

  /**
   * Shows the choose sheet UI. Once a sheet is selected, the data table for the sheet is shown
   */
  function showChooseSheetDialog () {
    // Clear out the existing list of sheets
    $('#choose_sheet_buttons').empty();

    // Set the dashboard's name in the title
    const dashboardName = tableau.extensions.dashboardContent.dashboard.name;
    $('#choose_sheet_title').text(dashboardName);

    // The first step in choosing a sheet will be asking Tableau what sheets are available
    const worksheets = tableau.extensions.dashboardContent.dashboard.worksheets;

    // Next, we loop through all of these worksheets add add buttons for each one
    worksheets.forEach(function (worksheet) {
      // Declare our new button which contains the sheet name
      const button = createButton(worksheet.name);

      // Create an event handler for when this button is clicked
      button.click(function () {
        // Get the worksheet name which was selected
        const worksheetName = worksheet.name;

        // Close the dialog and show the data table for this worksheet
        $('#choose_sheet_dialog').modal('toggle');
        loadSelectedMarks(worksheetName);
      });

      // Add our button to the list of worksheets to choose from
      $('#choose_sheet_buttons').append(button);
    });

    // Show the dialog
    $('#choose_sheet_dialog').modal('toggle');
  }

  function createButton (buttonTitle) {
    const button =
    $(`<button type='button' class='btn btn-default btn-block'>
      ${buttonTitle}
    </button>`);

    return button;
  }

  function listenToMarksSelection() {  
    viz.addEventListener(tableau.TableauEventName.MARKS_SELECTION, onMarksSelection);  
}  

function onMarksSelection(marksEvent) {  
    return marksEvent.getMarksAsync().then(reportSelectedMarks);  
}  

function reportSelectedMarks(marks) {  
    var html = "";   
      
    for (var markIndex = 0; markIndex < marks.length; markIndex++) {  
        var pairs = marks[markIndex].getPairs();  
        html += "<b>Mark " + markIndex + ":</b><ul>";  

        for (var pairIndex = 0; pairIndex < pairs.length; pairIndex++) {  
            var pair = pairs[pairIndex];  
            html += "<li><b>Field Name:</b> " + pair.fieldName;  
            html += "<br/><b>Value:</b> " + pair.formattedValue + "</li>";  
        }  
        html += "</ul>";  
    }  

    var infoDiv = document.getElementById('markDetails');  
    infoDiv.innerHTML = html;  
}  
  function initializeButtons () {
    $('#show_choose_sheet_button').click(showChooseSheetDialog);
  }

  function getSelectedSheet (worksheetName) {
    // Go through all the worksheets in the dashboard and find the one we want
    return tableau.extensions.dashboardContent.dashboard.worksheets.find(function (sheet) {
      return sheet.name === worksheetName;
    });
  }
})();

