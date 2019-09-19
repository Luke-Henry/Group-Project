  // Initialize Firebase
  var config = {          //temporary database for debugging - these should be replaced with our primary Firebase auth before being pushed live
	  apiKey: "AIzaSyBe6l8LXRqTdz55CX7fz0R1ohaonBSPpoU",
	  authDomain: "testproject-beb13.firebaseapp.com",
	  databaseURL: "https://testproject-beb13.firebaseio.com",
	  storageBucket: "testproject-beb13.appspot.com",
	  messagingSenderId: "492652354318"
  };
  firebase.initializeApp(config);
  
var email;
var emailNew;
var assignments = document.getElementById("assignments");
var counter = 0;
var dbRef;
var key; 
  
dbRef = firebase.database().ref().child("Users");


/*
=================================CHECK LOG IN AND GET EMAIL VARIABLE=================================================
*/
  
     firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser){
		 email = firebaseUser.email;
		 emailNew = encodeEmail(email);
		 console.log(emailNew);
} else
    {
    //alert("Not Logged In");
    console.log('not logged in ');
    window.location.href = 'index.html' ;
}

});

/*
===============================LOGOUT======================================================
*/
btnLogout.addEventListener('click', e => {



    alert("Signing Out");

    firebase.auth().signOut();

    window.location.href = 'index.html' ;

});




function addAssignment() {   //takes in user input, validates it and sends it to database

		var mCode = sanitizeInput(document.getElementById("mCode").value);     //removes special characters, see function below
		var assignmentName = sanitizeInput(document.getElementById("assignmentName").value);
		//var myDate = document.getElementById("date").value;
		var myDate = checkDate(document.getElementById("myDate").value);
		//alert(makeDate(myDate));

		if(myDate == null) {
			alert("Invalid Date - already passed!");
		}
		else if (mCode == null | mCode.length > 6 | mCode.length < 4 | mCode == "Code") {      //checking module code
			alert("Invalid Module Code");
		}
		else if (assignmentName == "Name" | assignmentName.length > 100) {   //checking module name, allowing NULL values here
			alert("Invalid Assignment Name (max 100 characters)");
		}
		else {
		
		
			
		
			key = firebase.database().ref("Users").child(emailNew).push({			//pushing module information into database under the JSON field 'Users'
				
				
				moduleCode:mCode,
				assignmentName:assignmentName,
				dueDate:myDate

			}).key;     //storing key in a variable just in case
			alert("Submitted Successfully!");   //debugging - all alerts to be replaced
			
			
		}
		
		}
		
		
		
	function encodeEmail(e){// Firebase doesn't allow full stops so I encode the users email and save that as one of the nodes.
	var i;
	for(i=0;i<e.length;i++)
	{
	if(e.charAt(i)=="."){
		e = e.replace(".","%");
	}
		
	}
	return e;
	}
	
	
	
	function sanitizeInput(s) {             //clears up user input
		return s.replace(/^[\W\s]/g, '');   //removes everything but letters, numbers and spaces
	}
	
	function makeDate(x) {					//converts string of form yyyy/mm/dd into a date object
		var y = new Date();
		y.setFullYear(parseInt(x.substring(0,4)),parseInt(x.substring(5,7))-1,parseInt(x.substring(8)));
		return y;
		}
	function checkDate(d) {					//ensures that due date has not already passed
		var x = new Date();
		var y = makeDate(d);
		if(y < x) {
			return null;
		}
		return d;
	}
	
	
	/*
	================================= SHOW ASSIGNMENTS ================================
	*/


function showAssignments(){


dbRef.child(emailNew).on("value", function (snapshot) {                 //opens the contents of Module in a 'snapshot'
		assignments.innerText = "";
		snapshot.forEach(function (childSnapShot) {         //opens each key contained in Module in order to access the module data in child snapshots
			assignmentLinks(childSnapShot.child("moduleCode").val(),childSnapShot.child("assignmentName").val(), childSnapShot.child("dueDate").val(),counter);   //pulls the module names and codes out of the child snapshots and passes them to assignmentLinks() to be displayed
			counter++;
		});
	});

  
  
  
  
  
  function assignmentLinks(moduleCode, assignmentName, dueDate, temp) {
		assignments.innerHTML += "<br><div class = 'assignments'>" + moduleCode + " - " + assignmentName + ",&nbsp&nbsp" + "Due: " + dueDate + "</div>";
	}
  
  
  }