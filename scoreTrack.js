// // gets level
// // async and await makes it so that this is processed first before rest of code is processed
// async function getLevel(givenPromise, levelStore) {
//     let doc = await givenPromise.get();
//     if (doc.exists) {  
//         levelStore = doc.data().level;
//         alert("dbLevel in function " + levelStore );
//         return levelStore;
//     }
//     throw new Error("No such document");
// };

// // gets score
// // async and await makes it so that this is processed first before rest of code is processed
// async function getScore(givenPromise, scoreStore) {
//     let doc = await givenPromise.get();
//     if (doc.exists) {
//         scoreStore = doc.data().score;
//         return scoreStore;
//     }
//     throw new Error("No such document");
// };

// async function getScoreAndLevel(givenPromise, levelStore, scoreStore) {
//     return Promise.all (
//         getLevel(givenPromise, levelStore),
//         getScore(givenPromise, scoreStore)
//     )

// };


// update data
async function save(){

    const studentInGame = db.ref("students/" + localStorage.getItem("studentEmail"));

    // qRight and qLevel found in addSubtractTest
    var saveRight = qRight;
    var dbScore = 0;
    var updateScore = 0;

    var saveLevel = qLevel;
    // var dbLevel = 0;
    var updateLevel = 0;

    //await getLevel(studentInGame, dbLevel);
    // await Promise.all ([
    //     getLevel(studentInGame, dbLevel),
    //     getScore(studentInGame, dbScore)]
    // );

    if (studentInGame == null) {
        alert("Not saved.");
    }
    else {

        if (saveRight == 2) {
            
            // let dbLevel = await getLevel(studentInGame)
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