
function addTeacherCode(){

    var addClassModal = document.getElementById("addClassModal");

    var span = document.getElementsByClassName("close")[0];
    span.onclick = function() {
        addClassModal.style.display = "none";
    }

    addClassModal.style.display = "block";

}

function updateClasses() {

    const teacher = db.collection("teachers").doc(localStorage.getItem("teacherEmail"));

    var input = document.getElementById("code").value;

    var paragraph = document.getElementsByClassName("realCode")[0];


    var newSignUpCode = generateClassCode();
    paragraph.innerHTML = newSignUpCode;

    teacher.update({ 
        classCode: firebase.firestore.FieldValue.arrayUnion(newSignUpCode),
        className: firebase.firestore.FieldValue.arrayUnion(input)
    });

}