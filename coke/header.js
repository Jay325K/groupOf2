function header_file() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        document.getElementById("header").innerHTML =
        this.responseText;
      }
    };
    xhttp.open("GET", "/header.html");
    xhttp.send();
}
window.addEventListener('scroll',function(){
  let heiY= window.pageYOffset;
  console.log(heiY);
  if(heiY>130){
    document.querySelector('.move_gnb').style.top='0px';
  }else{
    document.querySelector('.move_gnb').style.top='-999999px';
  }
});