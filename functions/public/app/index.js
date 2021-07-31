const config = {
        apiKey: "AIzaSyDoKk9_JGlH3nryJ3_9G8tkIZ7QYfQNhMc",
        authDomain: "iot-pms3003.firebaseapp.com",
        databaseURL: "https://iot-pms3003.firebaseio.com",
        storageBucket: "iot-pms3003.appspot.com",
    };
    firebase.initializeApp(config);
    const dbRefObject = firebase.database().ref().child('Arduino')
    dbRefObject.on('value', snap => jsonfirebasedata(snap.val()));
    
    const dbRefObject2 = firebase.database().ref().child('Pmscroll')
    dbRefObject2.on('value', snap => jsonpmscroll(snap.val()));

    const dbRefObject3 = firebase.database().ref().child('MaxAverage')
    dbRefObject3.on('value', snap => jsonfirebasemaxaverage(snap.val()));

function jsonfirebasemaxaverage(snap){
    $("#Maxoneday").text(snap.Maxday);
    $("#Averageday").text(snap.Average.toFixed(2));
}

var datascroll
var Datafirebasescroll = ""
var datatype = ""
var datatypecheck = "9"
function jsonpmscroll(snap){
    datascroll = snap.Scroll
    if(datascroll > 50){
        $( "#addclassinfo" ).removeClass( "bg-info" ).addClass("button bg-danger");
        $( "#addclasssuccess" ).removeClass( "bg-success" ).addClass("button bg-danger");
    }else{
        $( "#addclassinfo" ).removeClass( "button bg-danger" ).addClass("bg-info");
        $( "#addclasssuccess" ).removeClass( "button bg-danger" ).addClass("bg-success");
    }
    $("#pm25realtime").html(datascroll+'<sup style="font-size: 20px"> µg./m3</sup>');
    $("#persenrealtime").text(((datascroll*100)/51).toFixed()+"%");
        if(dataonone == "1"){
            $("#statuspm").text(" Is working ");
        }else if(dataonone == "0"){
            $("#statuspm").text(" Not working ");
        }else if(dataonone == "4"){
            if(datascroll >= "51"){ 
                datatype = "8"
            }else{
                datatype = "9"
            }
            if(datatype != datatypecheck){
                console.log(datatype)
                console.log(datatypecheck)

                if(datascroll > "50"){
                    var statuc = " Is working"
                    console.log(" Is working")
                    $("#statuspm").text(" Auto -> " + statuc);
                }else{
                    var statuc = "Not working"
                    console.log("Not working")
                    $("#statuspm").text(" Auto -> " + statuc);
                }
                datatypecheck = datatype
            }else{
                datatypecheck = datatype
            }
        }
}

function datascrool(){
    console.log("test")
}

var dataonone
var Datafirebase = "";
var statuc = "";
    function jsonfirebasedata(snap){
        dataonone = snap.onone
    if(dataonone != Datafirebase){
        if(dataonone == "1"){
            $("#dataonwork" ).addClass("button1");
            $("#dataoffwork" ).removeClass("button2");
            $("#dataautowork" ).removeClass("button3");
            $("#statuspm").text(" Is working ");
        }else if(dataonone == "0"){
            $("#dataoffwork" ).addClass("button2");
            $("#dataonwork" ).removeClass("button1");
            $("#dataautowork" ).removeClass("button3");
            $("#statuspm").text(" Not working ");
        }else if(dataonone == "4"){
            $("#dataautowork" ).addClass("button3");
            $("#dataonwork" ).removeClass("button1");
            $("#dataoffwork" ).removeClass("button2");
            if(datascroll >= "51"){
                statuc = " Is working"
            }else{
                statuc = " Not working"
            }
            $("#statuspm").text(" Auto -> " + statuc);
        }
        Datafirebase = dataonone
    }else{
        Datafirebase = dataonone
    }
}


function ononework(){
    var onone = "1"
    updateData(onone)
}

function offonework(){
    var offone = "0"
    updateData(offone)
}

function onauto(){
    var onauto = "4"
    updateData(onauto)
}

function updateData(onauto){
    var firebaseRef = firebase.database().ref().child('Arduino')
        firebaseRef.update({onone: onauto})
        console.log("Success!!!!!");
    }