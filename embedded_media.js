$(document).ready(function() {

  // Hook up an event handler for the load button click.
  // Wait to initialize until the button is clicked.
  $("#initializeButton").click(function() {

    // Disable the button after it's been clicked
    $("#initializeButton").prop('disabled', true);
    var sheetname="Highlight Table"

    tableau.extensions.initializeAsync().then(function() {

      // Initialization succeeded! Get the dashboard
      var dashboard = tableau.extensions.dashboardContent.dashboard;
      $("#SheetName").text(sheetname)

      function listenToMarksSelection() {
        sheetname.addEventListener(tableau.TableauEventName.MARKS_SELECTION, onMarksSelection);
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

      // Display the name of dashboard in the UI
      $("#resultBox").html("This dashboard is called " + dashboard.name+". The sheet is called" +sheetname + markDetails);
    }, function(err) {

      // something went wrong in initialization
      $("#resultBox").html("Error while Initializing: " + err.toString());
      $("#AllMarks").html(markDetails);

    });

  });
});
