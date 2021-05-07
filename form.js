// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAmYG9orV0qdDsP-scArcqb_JXIaQ89E7s",
    authDomain: "hc-contactform.firebaseapp.com",
    projectId: "hc-contactform",
    storageBucket: "hc-contactform.appspot.com",
    messagingSenderId: "783048277886",
    appId: "1:783048277886:web:e6189cb7c4ff2eb293fd2f"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

// Reference messages collection
var messagesRef = firebase.database().ref('messages');


//Listen for form submit
document.getElementById('contactForm').addEventListener('submit', submitForm);

// Submit form
function submitForm(event) {
    event.preventDefault();

    
    // Get values
    var firstName = getInputValue('firstName');
    var lastName = getInputValue('lastName');
    var email = getInputValue('email');
    var phone = getInputValue('phone');
    var message = getInputValue('message');
    
    
    // Save message
    saveMessage(firstName, lastName, email, phone, message);
    
    // Clear information after submission
    document.getElementById('contactForm').reset();

    sendEmail(firstName, lastName, email, phone, message);
}

//function to get form values
function getInputValue(id) {
    return document.getElementById(id).value;
}


// Save message to firebase
function saveMessage(firstName, lastName, email, phone, message) {
    var newMessageRef = messagesRef.push();
    newMessageRef.set({
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        message: message
    });
    
    retrieveMessage(); 
}


//Retrieve message from firebase
function retrieveMessage() {
    let ref = firebase.database().ref('messages');
    ref.on("value", gotData);
}

function gotData(data) {
    let info = data.val();
    let keys = Object.keys(info);

    for (let i = 0; i < keys.length; i++) {
        let infoData = keys[i];
        let firstName = info[infoData].firstName;
        let lastName = info[infoData].lastName;
        let email =info[infoData].email;
        let phone = info[infoData].phone;
        let message = info[infoData].message;

        console.log(firstName, lastName, email, phone, message);
    }
}

// Send Email message 
function sendEmail(firstName, lastName, email, phone, message) {
    Email.send({
        Host : "smtp.yourisp.com",
        Username : "tagoedev@gmail.com",
        Password : "clemsdev123",
        To : 'handmadecosmeticsgh@gmail.com',
        From : "tagoedev@gmail.com",
        Subject : `Customer Enquiry: ${firstName} sent you a message`,
        Body : `Name: ${firstName} ${lastName} <br> Email: ${email} <br> Phone Number${phone} <br> Message: ${message}`
    }).then(
      message => alert("mail sent successfully")
    );
}