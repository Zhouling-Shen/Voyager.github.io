// gets level
// async and await makes it so that this is processed first before rest of code is processed
function getLevel(givenPromise, levelStore) {
    let doc = givenPromise.get();
    if (doc.exists) {  
        levelStore = doc.data().level;
        //alert("dbLevel in function " + levelStore );
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