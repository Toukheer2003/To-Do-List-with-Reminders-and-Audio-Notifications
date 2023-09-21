var input = document.querySelector("#input_box");
var list = document.querySelector("#list");
var audio = new Audio("./music.wav");

input.addEventListener("keyup", function (event) {
  if (event.key == "Enter") {
    addItem(this.value);
    this.value = "";
  }
});

let addItem = (inputText) => {
  if (inputText.length > 0) {
    let item = document.createElement("li");
    item.innerHTML = `<span>${inputText}</span><i></i><label for="time_val">Set the Reminder</label><input class="time_val" type="time"><button class="button">SET</button>`;
    let spanEle = item.querySelector("span");
    let timeInput=item.querySelector(".time_val");
    let label = item.querySelector("label");
    let but = item.querySelector(".button");

    spanEle.addEventListener("click", function () {
      if(!audio.paused){
        audio.pause();
      }
      this.classList.toggle('done');
      if(this.classList.contains('done')){
        timeInput.style.display = 'none';
        label.style.display = 'none';
        but.style.display = 'none';
        spanEle.classList.remove('blink-background');
      }
      else{
        timeInput.style.display = 'inline-block';
        label.style.display = 'inline-block';
        but.style.display = 'inline-block';
      }
    });

    item.querySelector("i").addEventListener("click", function () {
      item.remove();
    });

    var flag = 0;
    var intervalID;
    but.addEventListener("click", function () {
      if(flag == 0) {
        this.innerHTML = 'EDIT';
        this.style.background = 'rgb(92, 74, 173)';
        this.style.color = 'white';
        flag = 1;

        timeInput.readOnly = true;
        var time = timeInput.value;
        intervalID = setInterval(checkAndPlayAudio, 1000);

        function checkAndPlayAudio() {
          const currentTime = new Date();
          const hours = currentTime.getHours();
          const minutes = currentTime.getMinutes();
          const currentTimeFormatted = `${hours}:${minutes.toString().padStart(2, '0')}`;

          if (currentTimeFormatted === time && !spanEle.classList.contains('done')) {
            audio.play();

            clearInterval(intervalID);
            spanEle.classList.add("blink-background");

            audio.addEventListener("ended", function () {
                spanEle.classList.remove("blink-background");
            });
          }
        }
      } else {
        this.innerHTML = 'SET';
        this.style.background = 'white';
        this.style.color = 'black';
        flag = 0;
        timeInput.readOnly = false;
      }
    });
    list.appendChild(item);
  }
}


