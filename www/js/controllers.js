angular.module('app.controllers', ['firebase', 'ngCordova'])
  
/* Pit data not being collected in 2018
.controller('pitScoutingCtrl', ['$scope', '$stateParams', '$firebaseArray',
function ($scope, $stateParams, $firebaseArray) {

  $scope.loadTeamsIntoMemory = function() {
    var refTeams = firebase.database().ref().child("Events/0/Teams");
    $scope.teams = $firebaseArray(refTeams);
  };
  $scope.loadTeamsIntoMemory();


  
  $scope.areFieldsDisabled = function() {
    return $scope.fieldsDisabled;
  }


  
  $scope.disableFields = function() {
    $scope.fieldsDisabled = true;
  }



  $scope.enableFields = function() {
    $scope.fieldsDisabled = false;
  }
  
  
  
  $scope.teamSelected = function() {
    $scope.updateField('Team');
    
    console.log("Loading data from Events/0/Pit Scouting/" + $scope.team.number);
    var refTeams = firebase.database().ref().child("Events/0/Pit Scouting/" + $scope.team.number);
    var teams = $firebaseArray(refTeams);
    teams.$loaded().then(function() {
      angular.forEach(teams, function(interview) {
        if (interview["Team Number"] == $scope.team.number) {
          $scope.resetFields();
          
          $scope.PQ3 = interview.PQ3;
          $scope.PQ6 = interview.PQ6;
          $scope.PQ10 = interview.PQ10;
          $scope.PQ13 = interview.PQ13;
          $scope.PQ14A = interview.PQ14A;
          $scope.PQ14B = interview.PQ14B;
          $scope.PQ14C = interview.PQ14C;
          $scope.PQ15 = interview.PQ15;
          $scope.PQ27A = interview.PQ27A;
          $scope.PQ27B = interview.PQ27B;
          $scope.PQ27C = interview.PQ27C;
          $scope.PQ30 = interview.PQ30;
          $scope.PQ31 = interview.PQ31;
        }
      })
    })
  }  



  $scope.updateField = function(fieldName) {
    var refInterviews = firebase.database().ref().child("Events/0/Pit Scouting/" + $scope.team.number);
    var interviews = $firebaseArray(refInterviews);
    interviews.$loaded().then(function() {
      if (interviews.length < 1) {
        $scope.disableFields();
        interviews.$add({"Team Number" : $scope.team.number}).then(function() {
          $scope.enableFields();
        })
      }
      
      if (fieldName == "PQ3") {
        if ($scope.PQ3) interviews[0].PQ3 = $scope.PQ3;
      }
      if (fieldName == "PQ6") {
        if ($scope.PQ6) interviews[0].PQ6 = $scope.PQ6;
      }
      if (fieldName == "PQ10") {
        if ($scope.PQ10) interviews[0].PQ10 = $scope.PQ10;
      }
      if (fieldName == "PQ13") {
        if ($sopce.PQ13) interviews[0].PQ13 = $scope.PQ13;
      }
      if (fieldName == "PQ14A") {
        if ($scope.PQ14A) interviews[0].PQ14A = $scope.PQ14A;
      }
      if (fieldName == "PQ14B") {
        if ($scope.PQ14B) interviews[0].PQ14B = $scope.PQ14B;
      }
      if (fieldName == "PQ14C") {
        if ($scope.PQ14C) interviews[0].PQ14C = $scope.PQ14C;
      }
      if (fieldName == "PQ15") {
        if ($scope.PQ15) interviews[0].PQ15 = $scope.PQ15;
      }
      if (fieldName == "PQ27A") {
        if ($scope.PQ27A) interviews[0].PQ27A = $scope.PQ27A;
      }
      if (fieldName == "PQ27B") {
        if ($scope.PQ27B) interviews[0].PQ27B = $scope.PQ27B;
      }
      if (fieldName == "PQ27C") {
        if ($scope.PQ27C) interviews[0].PQ27C = $scope.PQ27C;
      }
      if (fieldName == "PQ30") {
        if ($scope.PQ30) interviews[0].PQ30 = $scope.PQ30;
      }
      if (fieldName == "PQ31") {
        if ($scope.PQ31) interviews[0].PQ31 = $scope.PQ31;
      }
      
      interviews.$save(0);
    })
  }



// Clear all fields and hide all of those except the team question after the 
// questioning is finished
  $scope.submitPit = function() {
    $scope.team = 0;
    $scope.resetFields();
   };
   
   
   
   $scope.resetFields = function() {
    $scope.PQ3 = 0;
    $scope.PQ6 = 0;
    $scope.PQ10 = 0;
    $scope.PQ13 = 0;
    $scope.PQ14A = "false";
    $scope.PQ14B = "false";
    $scope.PQ14C = "false";
    $scope.PQ15 = 0;
    $scope.PQ27A = "false";
    $scope.PQ27B = "false";
    $scope.PQ27C = "false";
    $scope.PQ30 = 0;
    $scope.PQ31 = 0;     
   }
}])
*/

   
.controller('matchScoutingCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$cordovaFile', 
function ($scope, $stateParams, $firebaseArray, $firebaseObject, $cordovaFile) {
  
  $scope.loadNumMatches = function() {
    var ref = firebase.database().ref().child("Events/0/");
    var obj = $firebaseObject(ref);
    obj.$loaded().then(function() {
      // actMatch's value must be between 2 and numMaches
      if ( (obj.actMatch > 1) && (obj.actMatch<=obj.numMatches) ) {
        $scope.actMatch = obj.actMatch;
      } else {
        if (obj.actMatch < 2) {
          $scope.actMatch = 2;
        } else {
          $scope.actMatch = obj.numMatches;
        }
      }
      
      $scope.numMatches = new Array(obj.numMatches-$scope.actMatch+2);
      for (i=0;i<$scope.numMatches.length;i++) {
        $scope.numMatches[i] = $scope.actMatch-1 + i;
      }

      var unwatch = obj.$watch(function() {
        $scope.loadNumMatches();
      })
    }).catch(function(error) {
      console.log("Error:", error);
    });
  }
  $scope.loadNumMatches();



  $scope.loadTeamsIntoMemory = function() {
    var refTeams = firebase.database().ref().child("Events/0/Teams/");
    $scope.teams = $firebaseArray(refTeams);
  };
  $scope.loadTeamsIntoMemory();
  
  
  
  $scope.loadScoutsIntoMemory = function() {
    var refScouts = firebase.database().ref().child("Events/0/Scouts/");
    $scope.scouts = $firebaseArray(refScouts);
  }
  $scope.loadScoutsIntoMemory();

  
  
  $scope.showIfButtonClicked = function(sectionName) {
    if (sectionName == $scope.buttonClicked) {
      if ($scope.allIdFieldsSelected()) {
        return true;
      }
    }
    return false;
  }
    
    
    
  $scope.buttonClick = function(buttonName) {
      $scope.buttonClicked = buttonName;
  }
  
  
  
  $scope.allIdFieldsSelected = function() {
    return (($scope.teamSelected == true) && ($scope.scoutSelected == true) && ($scope.matchNumSelected == true));
  }


  
  /* Updated for season 2018 */
  $scope.updateField = function(fieldName) {
    //Platform dependent path externalApplication
    //On Android: file:///storage/emulated/0/Android/data/io.ionic.devapp/
    var filePath = cordova.file.externalApplicationStorageDirectory;
    var fileName = "Match-" + $scope.matchNum + "-Team-" + $scope.team.number + "-Scout-" + $scope.scout.name + ".csv";
    var saveData = $scope.teamSelected + "\t" + $scope.matchNumSelected + "\t"; 
    saveData += $scope.scoutSelected + "\t" + $scope.AQ1 + "\t" + $scope.AQ2;
    saveData += "\t" + $scope.AQ3 + "\t"+ $scope.AQ4 + "\t" + $scope.AQ5;
    saveData += "\t" + $scope.TQ1 + "\t" + $scope.TQ2;
    saveData += "\t" + $scope.TQ3 + "\t" + $scope.EQ1 + "\t" + $scope.EQ2;
    saveData += "\t" + $scope.EQ3 + "\r\n";
    $cordovaFile.writeFile(filePath, fileName, saveData, true)
      .then(function (success) {
        console.log("Text successfully written to Match Scouting file: " +
                    filePath+fileName);
      }, function (error) {
        console.log("Problem writing text to Match file");
        console.log("Error message: " + JSON.stringify(error));
      });
      
    var refTeams = firebase.database().ref().child("Events/0/Matches/" + $scope.matchNum + "/Teams/" + $scope.team.number);
    var matches = $firebaseArray(refTeams);
    matches.$loaded().then(function() {
      if ((matches.length < 1) && $scope.allIdFieldsSelected() ) {
        if (fieldName == "AQ1") {
          matches.$add({"Student" : $scope.scout.name, "Team Number" : $scope.team.number, "Match Number" : $scope.matchNum, "AQ1" : $scope.AQ1});
        } else {
          matches.$add({"Student" : $scope.scout.name, "Team Number" : $scope.team.number, "Match Number" : $scope.matchNum});
        }
      } else {
        if (fieldName == "Scout" && $scope.allIdFieldsSelected()) matches[0].Student = $scope.scout.name;
        
        if (fieldName == "AQ1") {
          matches[0].AQ1 = $scope.AQ1;
          if (matches[0].AQ1 == 0) {
            //if the answer to AQ1 is no, then the same is true for AQ2-4. and AQ5 is zero
            matches[0].AQ2 = "0";
            matches[0].AQ3 = "0";
            matches[0].AQ4 = "0";
            matches[0].AQ5 = "0";
            $scope.AQ2 = "0";
            $scope.AQ3 = "0";
            $scope.AQ4 = "0";
            $scope.AQ5 = "0";
          }
        }
        
        if (fieldName == "AQ2") matches[0].AQ2 = $scope.AQ2;
        if (fieldName == "AQ3") matches[0].AQ3 = $scope.AQ3;
        if (fieldName == "AQ4") matches[0].AQ4 = $scope.AQ4;
        if (fieldName == "AQ5") matches[0].AQ5 = $scope.AQ5;
        if (fieldName == "TQ1") matches[0].TQ1 = $scope.TQ1;
        if (fieldName == "TQ2") matches[0].TQ2 = $scope.TQ2;
        if (fieldName == "TQ3") matches[0].TQ3 = $scope.TQ3;
        if (fieldName == "EQ1") matches[0].EQ1 = $scope.EQ1;
        if (fieldName == "EQ2") matches[0].EQ2 = $scope.EQ2;
        if (fieldName == "EQ3") matches[0].EQ3 = $scope.EQ3;
      }
      matches.$save(0);
    }).catch(function(error) {
      console.log("Error:", error);
    });
  }
  
  

  /* Updated for season 2018 */
  $scope.submitData = function() {
    //resends all of the data collected to ensure all adds/updates are captured
    $scope.updateField("Scout");
    $scope.updateField("Team");
    $scope.updateField("AQ1");
    $scope.updateField("AQ2");
    $scope.updateField("AQ3");
    $scope.updateField("AQ4");
    $scope.updateField("AQ5");
    $scope.updateField("TQ1");
    $scope.updateField("TQ2");
    $scope.updateField("TQ3");
    $scope.updateField("EQ1");
    $scope.updateField("EQ2");
    $scope.updateField("EQ3");

    // Refresh actual match number
    $scope.loadNumMatches();
  }
  
  
  
  $scope.selectTeamMatchScout = function() {
    //Do something about a team/match#/scout having been selected
    if ($scope.team) {
      $scope.teamSelected = true;
      $scope.loadNotes();
    } else {
      $scope.teamSelected = false;
    }
    
    if ($scope.scout) {
      $scope.scoutSelected = true;
      $scope.updateField('Scout');
    } else {
      $scope.scoutSelected = false;
    }
    
    if ($scope.matchNum) {
      $scope.matchNumSelected = true;
    } else {
      $scope.matchNumSelected = false;
    }
    
  }
   
  /*
    Clear all fields and hide all of those except the team and match after a match
    concludes
  */
  /* Updated for season 2018 */
  $scope.clearFields = function() {
    $scope.team = null;
    $scope.selectedRobot = null;
    $scope.matchNum = null;
    $scope.AQ1 = 0;
    $scope.AQ2 = 0;
    $scope.AQ3 = 0;
    $scope.AQ4 = 0;
    $scope.AQ5 = 0;
    $scope.TQ1 = 0;
    $scope.TQ2 = 0;
    $scope.TQ3 = 0;
    $scope.EQ1 = 0;
    $scope.EQ2 = 0;
    $scope.EQ3 = "";

    $scope.loadNumMatches();
  };
  
  
  
  $scope.incSwitchCount = function() {
    if (!$scope.TQ1) $scope.TQ1 = 0;
    $scope.TQ1 = $scope.TQ1 + 1;
    $scope.updateField('TQ1');
  }

  

  $scope.decSwitchCount = function() {
    if (!$scope.TQ1) $scope.TQ1 = 0;
    if ($scope.TQ1 > 0) $scope.TQ1 = $scope.TQ1 - 1;
    $scope.updateField('TQ1');
  }



  $scope.incScaleCount = function() {
    if (!$scope.TQ2) $scope.TQ2 = 0;
    $scope.TQ2 = $scope.TQ2 + 1;
    $scope.updateField('TQ2');
  }

  

  $scope.decScaleCount = function() {
    if (!$scope.TQ2) $scope.TQ2 = 0;
    if ($scope.TQ2 > 0) $scope.TQ2 = $scope.TQ2 - 1;
    $scope.updateField('TQ2');
  }



  $scope.incVaultCount = function() {
    if (!$scope.TQ3) $scope.TQ3 = 0;
    $scope.TQ3 = $scope.TQ3 + 1;
    $scope.updateField('TQ3');
  }

  

  $scope.decVaultCount = function() {
    if (!$scope.TQ3) $scope.TQ3 = 0;
    if ($scope.TQ3 > 0) $scope.TQ3 = $scope.TQ3 - 1;
    $scope.updateField('TQ3');
  }

  $scope.loadNotes = function() {
    var refMatches = firebase.database().ref().child("Events/0/Matches");
    var matches = $firebaseArray(refMatches);

    matches.$loaded().then(function(matches) {
      $scope.notes = [];
      
      if ($scope.team) {
        teamno = $scope.team.number;
      
        angular.forEach(matches, function(match) {
          var matchTeams = match["Teams"];
          if (teamno in matchTeams) {
            angular.forEach(matchTeams[teamno], function(scoutingData) {
              var noteRecord = {};
              noteRecord.MatchNo = match.$id;
              noteRecord.Scout = scoutingData.Student;
              if (("EQ3" in scoutingData) && (scoutingData.EQ3 != "")) {
                noteRecord.Note = scoutingData.EQ3;
                $scope.notes.push(noteRecord);
              }
            })
          
          
          }
        })
      }
    })
  }

}])
   
.controller('synchronizeCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$cordovaFile', '$cordovaToast', 
  function ($scope, $stateParams, $firebaseArray, $firebaseObject, $cordovaFile, $cordovaToast) {
  
  
    
  $scope.importScouts = function() {
    alert("The scout-importing function is not available, yet");
  }
  
  
  
  $scope.importTeams = function() {
    alert("The team-importing function is not available, yet");
  }
  
  
  
  /* Updated for season 2018 */
  $scope.exportData = function() {

    
    /* Pit data not being collected in 2018
    var exportPitData = "Team #\tPQ3\tPQ6\tPQ10\tPQ13\tPQ14A\tPQ14B\tPQ14C\t";
    exportPitData += "PQ15\tPQ27A\tPQ27B\tPQ27C\tPQ30\tPQ31\r\n";
    
    var refPitScouting = firebase.database().ref().child("Events/0/Pit Scouting");
    var pitScouting = $firebaseArray(refPitScouting);
    pitScouting.$loaded().then(function(pitScouting) {
      angular.forEach(pitScouting, function(interviews) {
        angular.forEach(interviews, function(interview) {
          if (interview) {
            if (interview["Team Number"]) exportPitData += interview["Team Number"];
            exportPitData += "\t";
            if (interview.PQ3) exportPitData += interview.PQ3 + "\t";
            if (interview.PQ6) exportPitData += interview.PQ6;
            exportPitData += "\t";
            if (interview.PQ10) exportPitData += interview.PQ10;
            exportPitData += "\t";
            if (interview.PQ13) exportPitData += interview.PQ13;
            exportPitData += "\t";
            if (interview.PQ14A) {
              exportPitData += "1";
            } else {
              exportPitData += "0";
            }
            exportPitData += "\t";
            if (interview.PQ14B) {
              exportPitData += "1";
            } else {
              exportPitData += "0";
            }
            exportPitData += "\t";
            if (interview.PQ14C) {
              exportPitData += "1";
            } else {
              exportPitData += "0";
            }
            exportPitData += "\t";
            if (interview.PQ15) exportPitData += interview.PQ15;
            exportPitData += "\t";
            if (interview.PQ27A) {
              exportPitData += "1";
            } else {
              exportPitData += "0";
            }
            exportPitData += "\t";
            if (interview.PQ27B) {
              exportPitData += "1";
            } else {
              exportPitData += "0";
            }
            exportPitData += "\t";
            if (interview.PQ27C) {
              exportPitData += "1";
            } else {
              exportPitData += "0";
            }
            exportPitData += "\t";
            if (interview.PQ30) exportPitData += interview.PQ30;
            exportPitData += "\t";
            if (interview.PQ31) exportPitData += interview.PQ31;
            exportPitData += "\r\n";
          }
        });
      })
    }).then(function() {
      $cordovaFile.writeFile(filePath, "PitScouting.csv", exportPitData, true)
        .then(function (success) {
          console.log("Text successfully written to Pit Scouting file");
        }, function (error) {
          console.log("Problem writing text to Pit file");
          console.log("Error message: " + JSON.stringify(error));
        });  
    });
    */
    
    
    var exportMatchData = "Team #\tMatch #\tScout\tAQ1\tAQ2\tAQ3\tAQ4\tAQ5\t";
    exportMatchData += "TQ1\tTQ2\tTQ3\tEQ1\tEQ2\tEQ3\r\n";

    var refMatches = firebase.database().ref().child("Events/0/Matches");
    var matches = $firebaseArray(refMatches);
    matches.$loaded().then(function(matches) {
      angular.forEach(matches, function(match) {
        var robotMatches = match["Teams"];
        angular.forEach(robotMatches, function(robotMatchWrapper) {
          angular.forEach(robotMatchWrapper, function(robotMatch) {
          
            if (robotMatch["Team Number"]) exportMatchData += robotMatch["Team Number"];
            exportMatchData += "\t";
            if (robotMatch["Match Number"]) exportMatchData += robotMatch["Match Number"];
            exportMatchData += "\t";
            if (robotMatch["Student"]) exportMatchData += robotMatch["Student"];
            exportMatchData += "\t";
            if (robotMatch["AQ1"]) {
              exportMatchData += robotMatch["AQ1"];
            } else {
              exportMatchData += "0"
            }
            exportMatchData += "\t";
            if (robotMatch["AQ2"]) {
              exportMatchData += robotMatch["AQ2"];
            } else {
              exportMatchData += "0";
            }
            exportMatchData += "\t";
            if (robotMatch["AQ3"]) {
              exportMatchData += robotMatch["AQ3"];
            } else {
              exportMatchData += "0";
            }
            exportMatchData += "\t";
            if (robotMatch["AQ4"]) {
              exportMatchData += robotMatch["AQ4"];
            } else {
              exportMatchData += "0";
            }
            exportMatchData += "\t";
            if (robotMatch["AQ5"]) {
              exportMatchData += robotMatch["AQ5"];
            } else {
              exportMatchData += "0";
            }
            exportMatchData += "\t";
            if (robotMatch["TQ1"]) {
              exportMatchData += robotMatch["TQ1"];
            }
            exportMatchData += "\t";
            if (robotMatch["TQ2"]) {
              exportMatchData += robotMatch["TQ2"];
            }
            exportMatchData += "\t";
            if (robotMatch["TQ3"]) {
              exportMatchData += robotMatch["TQ3"];
            }
            exportMatchData += "\t";
            if (robotMatch["EQ1"]) {
              exportMatchData += robotMatch["EQ1"];
            } else {
              exportMatchData += "0";
            }
            exportMatchData += "\t";
            if (robotMatch["EQ2"]) {
              exportMatchData += robotMatch["EQ2"];
            } else {
              exportMatchData += "0";
            }
            exportMatchData += "\t";
            if (robotMatch["EQ3"]) {
              exportMatchData += "\"" + robotMatch["EQ3"].replace(/[\n\r]+/g, ' ') + "\"";
            }

            // End of line
            exportMatchData += "\r\n";
          })  
        })
      })
    })
    .then(function() {
      //load the export data into the text field\
      /* Pit data not being collected in 2018
      $scope.exportPitData = exportPitData;
      */
      $scope.exportMatchData = exportMatchData;
    })
    .catch(function(error) {
      console.log("Error:", error);
    });
  }
  
  $scope.exportToFile = function() {
    //Platform dependent path externalApplication
    //On Android: file:///storage/emulated/0/Android/data/io.ionic.devapp/
    var filePath = cordova.file.externalApplicationStorageDirectory;
    $cordovaFile.writeFile(filePath, "MatchScouting.csv", $scope.exportMatchData, true)
        .then(function (success) {
          console.log("Text successfully written to Match Scouting file");
        }, function (error) {
          console.log("Problem writing text to Match file");
          console.log("Error message: " + JSON.stringify(error));
        });  

  }

  $scope.loadNumMatches = function() {
    var ref = firebase.database().ref().child("Events/0/");
    var obj = $firebaseObject(ref);
    obj.$loaded().then(function() {
      $scope.numMatches = obj.numMatches;
    }).catch(function(error) {
      console.log("Error:", error);
    });
  }
  $scope.loadNumMatches();

  $scope.setNumMatches = function() {
    var refMatchNum = firebase.database().ref().child("Events/0");
    refMatchNum.update({"numMatches" : $scope.numMatches});
  }
  
}])

.controller('scoutManagerCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$cordovaFile', '$cordovaToast', '$interval', 'CommonData',
  function ($scope, $stateParams, $firebaseArray, $firebaseObject, $cordovaFile, $cordovaToast, $interval, CommonData) {
    
  /* This method will pull together an overview for each match, including the
   * match number, team number, scout name, and the % of the following questions
   * that have been answered: AQ1, AQ2, AQ3, AQ4, AQ5, EQ1, EQ2, and EQ3
   */
   
  $scope.adminMode=CommonData.getAdminMode();
  $scope.actMatch=1;

  $scope.loadNumMatches = function() {
    var ref = firebase.database().ref().child("Events/0/");
    var obj = $firebaseObject(ref);
    obj.$loaded().then(function() {
      $scope.numMatches = obj.numMatches;
      $scope.actMatch   = obj.actMatch;
    }).catch(function(error) {
      console.log("Error:", error);
    });
  }
  $scope.loadNumMatches();

  $scope.setActMatches = function() {
    var refMatchNum = firebase.database().ref().child("Events/0");
    refMatchNum.update({"actMatch" : $scope.actMatch});
  }
  

  $scope.enableAdmin = function() {
    if ($scope.adminPassword == "Hardcore") {
      $scope.adminMode = true;
      CommonData.setAdminMode($scope.adminMode);
    }
  }

  $scope.disableAdmin = function() {
    $scope.adminMode = false;
    CommonData.setAdminMode($scope.adminMode);
    $scope.adminPassword = "";
  }

  $scope.actMatchInc = function() {
    if ($scope.actMatch < $scope.numMatches) {
      $scope.actMatch += 1;
      $scope.setActMatches();
    }
  }

  $scope.actMatchDec = function() {
    if ($scope.actMatch > 1) {
      $scope.actMatch -= 1;
      $scope.setActMatches();
    }
  }

  $scope.refresh = function() {
    var refMatches = firebase.database().ref().child("Events/0/Matches");
    var matches = $firebaseArray(refMatches);
    $scope.matchOverviews = [];
    var thisMatchOverview = {};
    
    matches.$loaded().then(function(matches) { 
      angular.forEach(matches, function(match) { 
        var robotMatches = match["Teams"];
        angular.forEach(robotMatches, function(robotMatchWrapper) { 
          angular.forEach(robotMatchWrapper, function(robotMatch) { 
            if (robotMatch["Match Number"]) {
              thisMatchOverview = {};
              if (!$scope.matchOverviews[robotMatch["Match Number"]]) {
                $scope.matchOverviews[robotMatch["Match Number"]] = {'scouts': []};
              }
              thisMatchOverview = $scope.matchOverviews[robotMatch["Match Number"]];
              thisMatchOverview.matchNum = robotMatch["Match Number"];
              var scoutRecord = {};
              scoutRecord.name = robotMatch['Student'];
              scoutRecord.teamNum = robotMatch['Team Number'];
              
              /* determine the % of critical questions answered
               * removed this section in 2018 but might add it back in in later 
               * years
              var unanswered = ["AQ1", "AQ2", "AQ3", "EQ1", "EQ2"];
              if (robotMatch.AQ1 != null) {
                var index = unanswered.indexOf("AQ1");
                if (index > -1) {
                  unanswered.splice(index, 1);
                }
              }
              if (robotMatch.AQ2 != null) {
                var index = unanswered.indexOf("AQ2");
                if (index > -1) {
                  unanswered.splice(index, 1);
                }
              }
              if (robotMatch.AQ3 != null) {
                var index = unanswered.indexOf("AQ3");
                if (index > -1) {
                  unanswered.splice(index, 1);
                }
              }
              if (robotMatch.TQ1 != null) {
                var index = unanswered.indexOf("TQ1");
                if (index > -1) {
                  unanswered.splice(index, 1);
                }
              }
              if (robotMatch.TQ2 != null) {
                var index = unanswered.indexOf("TQ2");
                if (index > -1) {
                  unanswered.splice(index, 1);
                }
              }
              if (robotMatch.TQ3 != null) {
                var index = unanswered.indexOf("TQ3");
                if (index > -1) {
                  unanswered.splice(index, 1);
                }
              }
              if (robotMatch.EQ1 != null) {
                var index = unanswered.indexOf("EQ1");
                if (index > -1) {
                  unanswered.splice(index, 1);
                }
              }
              if (robotMatch.EQ2 != null) {
                var index = unanswered.indexOf("EQ2");
                if (index > -1) {
                  unanswered.splice(index, 1);
                }
              }
              if (unanswered.length == 0) {
                unanswered.push("None");
              }
              scoutRecord.unanswered = unanswered;
              */
              thisMatchOverview['scouts'].push(scoutRecord);
            }
          })
        })
        //console.log("8. matchOverviews after match added: " + JSON.stringify($scope.matchOverviews));
      })
    }).then(function() {
      //remove null values from the array
      $scope.matchOverviews = $scope.matchOverviews.filter(function(n){ return n != undefined }); 
    })
  }
  
  $scope.refresh();
  $interval($scope.refresh, 5000);
  
  $scope.deleteMatch = function(matchNo) {
    console.log("Delete match #" + matchNo);
    var ref = firebase.database().ref();
    ref.child("Events/0/Matches/" + matchNo).remove(function (error) {
      if (!error) {
        // No error - removed
        console.log("match #" + matchNo + " deleted.");
      } else {
        console.log("Remove error: " + error)
      }
    })
  }

  $scope.deleteMatchTeam = function(matchNo, teamNo) {
    console.log("Delete team " + teamNo + " in match #" + matchNo);
    var ref = firebase.database().ref();
    ref.child("Events/0/Matches/" + matchNo + "/Teams/" + teamNo).remove(function (error) {
      if (!error) {
        // No error - removed
        console.log("Team " + teamNo + " in match #" + matchNo + " deleted.");
      } else {
        console.log("Remove error: " + error)
      }
    })
  }

}])

.controller('teamManagerCtrl', ['$scope', '$stateParams', '$firebaseArray', '$interval',
  function ($scope, $stateParams, $firebaseArray, $interval) {

    $scope.loadTeamList = function() {
      var ref = firebase.database().ref().child("Events/0/Teams");
      var teams = $firebaseArray(ref);
      teams.$loaded().then(function() {
        $scope.teamList = teams;
      }).catch(function(error) {
        console.log("Error:", error);
      });
    }

    $scope.loadTeamList();

    $scope.deleteTeam = function(teamNo) {
      console.log("Delete team #" + teamNo);
      var ref = firebase.database().ref();
      ref.child("Events/0/Teams/" + teamNo).remove(function (error) {
        if (!error) {
          // No error - removed
          console.log("team #" + teamNo + " deleted.");
        } else {
          console.log("Remove error: " + error)
        }
      }).then(function(){
        $scope.loadTeamList();
        return true;
      });
    }
    
    $scope.saveTeam = function(teamNo, teamName) {
      var ref = firebase.database().ref().child("Events/0/Teams");
      var teamArray = $firebaseArray(ref);
      teamArray.$loaded().then(function() {
        // Check if teamnumber exists
        var teamExists = false;
        var teamIndex = -1;
        angular.forEach(teamArray, function(value, key) {
          if (value.number == teamNo) {
            teamExists = true;
            teamIndex = key;
          }
        });

        if (teamExists) {
          // Team exists -> update name
          teamArray[teamIndex].name = teamName;
          teamArray.$save(teamIndex);
        } else {
          // Team not exists -> add new
          ref.child(teamNo).set({ name: teamName, number: teamNo })/*.then(function(){
            $scope.inTeamName="";
            $scope.inTeamNumber="";
            console.log("Team added"); 
          })*/;
          $scope.inTeamName="";
          $scope.inTeamNumber="";
        }
      })
    }

    $scope.modifyTeam = function(teamIndex) {
      $scope.inTeamNumber = $scope.teamList[teamIndex].number;
      $scope.inTeamName   = $scope.teamList[teamIndex].name;
    }

}])
   
.controller('menuCtrl', ['$scope', '$stateParams', function ($scope, $stateParams) { }]);