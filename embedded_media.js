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
      $("#SheetName").html("Da sheet is called " +sheetname)

      // Display the name of dashboard in the UI
      $("#resultBox").html("This dashboard is called " + dashboard.name+". The sheet is called" +sheetname);
    }, function(err) {

      // something went wrong in initialization
      $("#resultBox").html("Error while Initializing: " + err.toString());
    });
  });
});
