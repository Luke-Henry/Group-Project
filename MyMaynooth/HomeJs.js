/**
 * Created by Bmcc on 07/10/2016.
 */

(function() {


    const config = {          //temporary database for debugging - these should be replaced with our primary Firebase auth before being pushed live
        apiKey: "AIzaSyBe6l8LXRqTdz55CX7fz0R1ohaonBSPpoU",
        authDomain: "testproject-beb13.firebaseapp.com",
        databaseURL: "https://testproject-beb13.firebaseio.com",
        storageBucket: "testproject-beb13.appspot.com",
        messagingSenderId: "492652354318"
    };
  firebase.initializeApp(config);


     var ref = firebase.database().ref();


   // Get all elements______________________________________________________________________


    const txtEmail = document.getElementById('txtEmail');
    const txtPassword = document.getElementById('txtPassword');
    const btnLogin = document.getElementById('btnLogin');

   /* console.log(btnLogin);

    console.log(txtPassword);
    console.log(txtEmail);
    console.log(btnLogin); */


    const btnSignUp = document.getElementById('btnSignUp');




    const btnLogout = document.getElementById('btnLogout');

//______________________________firebase ________________________________________________

// Add login event

    btnLogin.addEventListener('click', e => {

        const email = txtEmail.value;
        const pass = txtPassword.value;
        const auth = firebase.auth();

        alert('Logging In');

        //Sign in



        const promise = auth.signInWithEmailAndPassword(email, pass);


        //alert(promise);


        promise.catch(e => console.log(e.message));







    });





//Add signup____________________________________________________________________________________


    btnSignUp.addEventListener('click', e => {



        alert("Creating Account");

    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();

        console.log(email);
        console.log(pass);



    const promise = auth.createUserWithEmailAndPassword(email, pass);

        //alert(promise);

       //console.log(promise);

   promise.catch(e => { alert("Account Creation Failed");console.log(e.message)});

});

//Add a logout_____________________________________________________________________________________

btnLogout.addEventListener('click', e => {



    //alert("Signing Out");

    firebase.auth().signOut();

    window.location.href = 'index.html' ;

});




//Add a realtime listener


    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser){



            console.log(firebaseUser);

            window.location.href = 'home.html' ;


            
            

} else
    {

    console.log('not logged in ');
    
}


    });



}());