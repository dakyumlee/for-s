document.getElementById('toggle-keywords').addEventListener('click', function() {
    document.querySelector('.keyword-tags').classList.toggle('show');
  });

  var modal = document.getElementById("basic-info-modal");
  var img = document.getElementById("profile-photo");
  var span = document.getElementsByClassName("close")[0];
  
  img.onclick = function() {
    modal.style.display = "block";
  }
  
  span.onclick = function() {
    modal.style.display = "none";
  }
  
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
  