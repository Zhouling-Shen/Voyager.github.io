const teacherEmail = document.getElementById("teacherEmail");
const teacherPassword = document.getElementById("teacherPassword");   
const teacherId = document.getElementById("teacherId");
var teacher;

var classCode = "";

// generate a random class code
function generateClassCode() {
    var length = 8;
    var code  = Math.random().toString(16).substr(2, length);
    return code;
}

function signUp(){
        
    const promise = auth.createUserWithEmailAndPassword(teacherEmail.value, teacherPassword.value);
    promise.catch(e => alert(e.message));

    alert("Signed Up");

    var signUpCode = generateClassCode();

    // BROKEN
    // query to determine if there are codes that match this one
    // db.collection("teachers").where("classCode", "==" , signUpCode.value).get().then(snapshot => {
    //     if(snapshot.exists){
    //         signUpCode = generateClassCode();
    //     }
    // });

    teacher  = db.collection("teachers").doc(teacherEmail.value);

    // store teacher with class code
    teacher.set({ 
        teacherId: teacherId.value,
        email: teacherEmail.value,
        classCode: null,
        className: null 
    });

}


function signIn(){
        
    const promise = auth.signInWithEmailAndPassword(teacherEmail.value, teacherPassword.value)
    .then(() => {
        localStorage.setItem("teacherEmail", teacherEmail.value);
        window.location.href = 'teacherHome.html'; 
    }) ;


    promise.catch(e => alert(e.message));

    alert("You have signed in, " + teacherEmail.value + ". Welcome back!");
}


function signOut(){

    auth.signOut().then(() => {
        window.location.href = 'teacherFirebase.html';
    });
        
}

// determines if a user has signed in or up on teacherFirebase
// also determines if a user has logged out successfully back to teacherFirebase
auth.onAuthStateChanged(function(user) {
    if(user) {
        var email = user.email;
        alert("Active User " + email);
    }

    else{
        alert("No Active User");
    }
});