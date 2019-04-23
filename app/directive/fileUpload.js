app.directive('fileReader', function() {
    return {
      scope: {
        fileReader:"=",
        headingName:"=",
        notCsvfile:"="
      },
      link: function(scope, element) {
        $(element).on('change', function(changeEvent) {
          var files = changeEvent.target.files;
          var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv)$/;
          if(regex.test(files[0].name)){
            if (files.length) {
              var r = new FileReader();
              r.onload = function(e) {
                  var csvFileRecords = new Array();
                  var contents = e.target.result.split("\r\n");
                  for (var i = 0; i < contents.length; i++) {
                      var cells = contents[i].split(",");
                      if (cells.length > 1) {
                          if(i === 0){
                              var heading = {};
                              heading.heading1 = cells[0].replace(/\\/g, "|").replace(/['"]+/g, '');
                              heading.heading2 = cells[1].replace(/\\/g, "|").replace(/['"]+/g, '');
                              heading.heading3 = cells[2].replace(/\\/g, "|").replace(/['"]+/g, '');
                              heading.heading4 = cells[3].replace(/\\/g, "|").replace(/['"]+/g, '');
                          }else{
                              var record = {};
                              record.firstName = cells[0].replace(/\\/g, "|").replace(/['"]+/g, '');
                              record.surName = cells[1].replace(/\\/g, "|").replace(/['"]+/g, '');
                              record.issueCount = cells[2];
                              record.dateofBirth = cells[3].replace(/\\/g, "|").replace(/['"]+/g, '');
                              csvFileRecords.push(record);
                          }
                      }
                  }
                  scope.$apply(function () {
                    scope.fileReader = csvFileRecords;
                    scope.headingName = heading;
                    scope.notCsvfile = false;
                  });
              };
              r.readAsText(files[0]);
            }
          }else{
            scope.$apply(function () {
                scope.notCsvfile = true;
            });
          }
        });
      }
    };
});