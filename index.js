var firebaseConfig = {
  //buraya kendi projenizin bilgileri gelecek.
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

var page = document.querySelector("body").getAttribute("page");

//login sayfasondaki "kayıt ol" ve "giriş yap" butonlarını seçtik.
function loginMenu(){
  var signupMenu = document.getElementById("signup");
  var signinMenu = document.getElementById("signin");

  var signupbox = document.querySelector(".signup");
  var signinbox = document.querySelector(".signin");

  signinMenu.onclick = function(){
    signinbox.style.display = "block";
    signupbox.style.display = "none";
  }

  signupMenu.onclick = function(){
    signinbox.style.display = "none";
    signupbox.style.display = "block";
  }

}

//üyelik oluşturma işlemi
function signup(firebase) {
    //butonu seçtik.
    var signupBtn = document.getElementById("signupBtn");
    signupBtn.onclick = function(){
      //mail ve şifre bilgisini aldık.
      var mail = document.getElementById("signup-mail").value;
      var password = document.getElementById("signup-password").value;
      //aldığımız mail ve şifre ile kayıt olma fonksiyonunu çalıştırdık.
      firebase.auth().createUserWithEmailAndPassword(mail, password).then((res) => {
        //kayıt işlemini gerçekleştirdikten sonra aynı bilgiler ile giriş işlemini de yaptırıyoruz.
        firebase.auth().signInWithEmailAndPassword(mail, password).then((res) => {
          window.location.href = "index.html";
        })
      //oluşabilecek hataları yakaladık.
      }).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        if (errorCode == 'auth/email-already-in-use') {
          alert('already use');
        }
        else if (errorCode == 'auth/weak-password') {
          alert('invalid password');
        }
      });

    }
  }

//giriş işlemi
function signin(firebase) {
  //butonu seçtik.
  var signinBtn = document.getElementById("signinBtn");

  signinBtn.onclick = function(){
    //mail ve şifre bilgisini aldık.
    var mail = document.getElementById("signin-mail").value;
    var password = document.getElementById("signin-password").value;

    //aldığımız mail ve şifre bilgisi ile giriş yapma fonksiyonunu çalıştırdık.
    firebase.auth().signInWithEmailAndPassword(mail, password).then((res) => {
      window.location.href = "index.html";
    })

  }
}


//yazdığımız fonksiyonları bu bölümün içerisinde çalıştırdık.
firebase.auth().onAuthStateChanged(function(user) {
    if(user){
      if (page != "login") {

        var signoutBtn = document.getElementById("signoutBtn");
        signoutBtn.onclick = function(){
          firebase.auth().signOut().then(function() {
            window.location.href = "login.html";
          })
        }

      }
      else {
        window.location.href = "index.html";
      }
    }
    else {
      if (page != "login") {
        window.location.href = "login.html";
      }
      else {
        loginMenu();
        signup(firebase);
        signin(firebase);
      }
    }
});
