var firebaseConfig = {
    apiKey: "AIzaSyCjYvZ25XBI-iU4MGlkY6E5C3gfL1Lt8nY",
    authDomain: "voyagergame-d0974.firebaseapp.com",
    projectId: "voyagergame-d0974",
    storageBucket: "voyagergame-d0974.appspot.com",
    messagingSenderId: "1006797880129",
    appId: "1:1006797880129:web:d7d93ff0f4854be14fbfc0"
};
    
    // initialize Firebase
    firebase.initializeApp(firebaseConfig);
    
    // make auth & firestore references
    const auth = firebase.auth();
    const db = firebase.database();
    
    // update firestore settings
    db.settings({timestampsInSnapshots: true});

    // set firestore persistence
    // user continues to be logged in until explicitly signed out
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)