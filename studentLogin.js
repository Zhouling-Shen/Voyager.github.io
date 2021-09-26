
// email, password, studentId, & the student in the game
const email = document.getElementById("email");
const password = document.getElementById("password");
const studentId = document.getElementById("studentId");
var student;
var userScore;

function signUp(){

    // figure out if query for studentId

    const promise = auth.createUserWithEmailAndPassword(email.value, password.value);
    promise.catch(e => alert(e.message));

    alert("Signed Up");

    student = db.collection("students").doc(email.value);
    studentInfo = db.collection("studentInfo").doc(studentId.value);

    student.set({ 
        studentId: studentId.value,
    });

    studentInfo.set({
        score: 0,
        level: 1
    });

}

function findUser(givenPromise, userId){
    let doc = givenPromise.get();

    if(doc.exists) {
        userId = doc.data().studentId;
        return userId;
    }
}

function signIn(){

    var userId;

    const promise = auth.signInWithEmailAndPassword(email.value, password.value)
    .then(() => {
        //alert("You have signed in, " + email.value + ". Welcome back!");

        signInStudent = db.collection("students").doc(email.value);
        findUser(signInStudent, userId);

        alert(userId);
        localStorage.setItem("studentIdLocal", userId);
        localStorage.setItem("studentEmail", email.value);

        window.location.href = 'addSubtract.html'; 
    }) ;


    promise.catch(e => alert(e.message));
}




function signOut(){

    auth.signOut().then(() => {
        window.location.href = 'studentFirebase.html';
    });
        
}

// determines if a user has signed in or up on teacherFirebase
// also determines if a user has logged out successfully back to teacherFirebase
auth.onAuthStateChanged(function(user) {
    if(user) {
        var userEmail = user.email;
        alert("Active User " + userEmail);
    }

    else{
        alert("No Active User");
    }
});