// gets level
// async and await makes it so that this is processed first before rest of code is processed
async function getLevel(givenPromise, levelStore) {
    let doc = await givenPromise.get();
    if (doc.exists) {  
        levelStore = doc.data().level;
        alert("dbLevel in function " + levelStore );
        return levelStore;
    }
    throw new Error("No such document");
};

// gets score
// async and await makes it so that this is processed first before rest of code is processed
async function getScore(givenPromise, scoreStore) {
    let doc = await givenPromise.get();
    if (doc.exists) {
        scoreStore = doc.data().score;
        return scoreStore;
    }
    throw new Error("No such document");
};


// TESTING; DON'T WORK
// async function getLevel(givenPromise, levelStore) {
//     return givenPromise.get().then((doc) => { 
//         if (doc.exists) {  
//             levelStore = doc.data().level;
//             // alert("dbLevel in function " + levelStore );
//         }
//         throw new Error("No such document");
//     })
// };

// async function getScore(givenPromise, scoreStore) {
//     return givenPromise.get().then((doc) => { 
//         if (doc.exists) {  
//             scoreStore = doc.data().score;
//             // alert("dbLevel in function " + scoreStore );
//         }
//         throw new Error("No such document");
//     })
// };

async function getScoreAndLevel(givenPromise, levelStore, scoreStore) {
    return Promise.all (
        getLevel(givenPromise, levelStore),
        getScore(givenPromise, scoreStore)
    )

};

function addClass() {
    // alert("clicked")
    // const studentInGame = db.collection("students").doc(localStorage.getItem("studentEmail"));

    var addClassModal = document.getElementById("addClassModal");

    var span3 = document.getElementsByClassName("close")[3];
    span3.onclick = function() {
        addClassModal.style.display = "none";
    }

    addClassModal.style.display = "block";


}

function updateClass() {

    const studentInGame = db.collection("students").doc(localStorage.getItem("studentEmail"));

    var input = document.getElementById("code").value;
    // alert(input);

    studentInGame.update({ 
        classCode: input
    });

    addClassModal.style.display = "none";
   
}



// update data
async function save(){

    const studentInGame = db.collection("students").doc(localStorage.getItem("studentEmail"));
    
    // qRight found in addSubtractTest
    var saveRight = qRight;
    var dbScore = 0;
    var updateScore = 0;

    var saveLevel = qLevel;
     var dbLevel = 0;
    var updateLevel = 0;
    

    if (studentInGame == null) {
        alert("Not saved.");
    }
    else {
        //var yuh = getScoreAndLevel(studentInGame, dbLevel, dbScore);
        
        if (saveRight == 2) {
            
            getLevel(studentInGame, dbLevel);
            updateLevel = dbLevel + saveLevel;
            
            studentInGame.update({ 
                level: updateLevel,
                score: 0
            });
        }
        else if(saveRight <= 1) {

            getScore(studentInGame, dbScore);
            updateScore = dbScore + saveRight;

            studentInGame.update({ 
                score: updateScore
            });
        }
        alert("Progress saved! Ahoy matey.");
    }
}