// content.js

var toggle = 'ON';
var runs = 1;
var saved_keys = [];
var hide_list = [];
var movie_list = document.querySelectorAll('div[aria-label]');
var timtam;
var tamtim;
var color;
//var btn;
chrome.storage.local.get(null,function(items){
  var allkeys = Object.keys(items);
  allkeys.forEach(function(key){
    var selec = 'div[aria-label = "' + key +'"]';
    try{
      document.querySelector(selec).parentNode.parentNode.style.display = 'none';

      //console.log(key + ' hid!');
    }
    catch(e){
      //console.log(key + ' not on front page!');
    }
    finally{
      saved_keys.push(key);
    }
  });
});
timtam = setInterval(timit,1000);

function timit(){
  // saved_keys.splice(saved_keys.indexOf("name"),1);
  // saved_keys.splice(saved_keys.indexOf("namestring"),1);
  for (var i =0; i< saved_keys.length; i++){
    var movie = 'div[aria-label = "' + saved_keys[i] +'"]';
    try{
      var m = document.querySelectorAll(movie);
      // document.querySelector(movie).parentNode.parentNode.style.display = 'none'
      for (var j=0;j<m.length;j++){
        m[j].parentNode.parentNode.style.display = 'none';
      }
      //console.log('All '+  saved_keys[i]+ ' hid!');
    }

    catch(e){
      //console.log(saved_keys[i]+' not on front page!');

    }
  }
}

function kilt(interval){
  clearInterval(interval)
}

function runt(puup){
  tamtim = setInterval(puup,1000);
}
function button_vis(){
  var movie_list = document.querySelectorAll('div[aria-label]');

  for(var i = 1;i< movie_list.length; i++){
    //var movie = 'div[aria-label = "' + saved_keys[i] +'"]';
    var title = movie_list[i].getAttribute('aria-label');

    //This grabs first element with a button if multiple exist on the page. Need to check if the current movie has a button
    if(movie_list[i].parentNode.parentNode.getElementsByTagName('input')[0] ){
      var jlength = document.getElementsByClassName(title);
      for(var j = 0; j < jlength.length; j++){
        jlength[j].style.display = 'block';

      }

    }else{
      if (saved_keys.indexOf(movie_list[i].getAttribute('aria-label')) != -1){
        color = "#FF0000";
        var value = "Hidden!"
      }
      else { color ="#141414";var value = "Visible"}
      button(movie_list[i],color,value);
      but = document.getElementById(movie_list[i].getAttribute('aria-label'));
      but.style.display = 'block';
    }


  }

}

function button(movie,color,value){
  var mov = movie;
  var name = movie.getAttribute('aria-label');
  var btn = document.createElement("input");
  var val = value;
  //Assign different attributes to the element.
  var clr= color;
  btn.type = "button";
  btn.id = name;
  btn.name = name;
  btn.className = name;
  btn.style.display = 'block'
  btn.style.backgroundColor = clr;
  btn.value = val;


  btn.addEventListener("click", function(){
    var namestring = String(name);
    var obj ={};
    obj[namestring]=name;
    if (btn.style.backgroundColor === 'rgb(20, 20, 20)'){
      clr = "#FF0000";

      btn.style.backgroundColor = clr;
      saved_keys.push(name);
      chrome.storage.local.set(obj, function(){
        btn.value = 'Hidden!';
        //alert(name+' hid!!');
      });
    }
    else if (btn.style.backgroundColor === 'rgb(255, 0, 0)'){
      clr = "#141414";
      btn.style.backgroundColor = clr;
      saved_keys.splice(saved_keys.indexOf(name),1);
      chrome.storage.local.remove(namestring, function(){
        btn.value = 'Visible';
        //alert(name+' unhid!');
      });
    }
  });
  btn.addEventListener("mouseover", function(){
    if(btn.value== 'Visible'){
      btn.value = 'Hide?';
    }
    else if(btn.value == 'Hidden!'){
      btn.value = "Unhide?";
    }
  });
  btn.addEventListener("mouseout", function(){
    if(btn.value== 'Hide?'){
      btn.value = 'Visible';
    }
    else if(btn.value == "Unhide?"){
      btn.value = 'Hidden!';
    }
  });
  mov.parentNode.parentNode.appendChild(btn);
}


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    //saved_keys.splice(saved_keys.indexOf("name"),1);
    //saved_keys.splice(saved_keys.indexOf("namestring"),1);
    movie_list = document.querySelectorAll('div[aria-label]');

    // console.log(saved_keys);
    if( request.message === "clicked_browser_action" && toggle ==='ON' ) {
      kilt(timtam);
      toggle = 'OFF';
      if(runs === 1){
        for (var i =1; i< movie_list.length; i++){
          //var n = saved_keys.indexOf(movie_list[i].getAttribute('aria-label'));
          if (saved_keys.indexOf(movie_list[i].getAttribute('aria-label')) != -1){
            movie_list[i].parentNode.parentNode.style.display = 'inline-block';
            color = "#FF0000";
            var value = 'Hidden!'
            }else { color ="#141414"; var value = "Visible";}
          //This just has to be here or shit gets wild
          button(movie_list[i],color,value);
        }
        runt(button_vis);
      }else{
        runt(button_vis);
        setTimeout(wait,1000)
        function wait(){
          for (var i = 0; i<saved_keys.length; i++){
            var hide = 'div[aria-label = "' + saved_keys[i] +'"]';
            try{
              // document.querySelector(hide).parentNode.parentNode.style.display = 'none';
              var night = document.querySelectorAll(hide);
              for (j=0; j<night.length;j++){
                night[j].parentNode.parentNode.style.display = 'inline-block';
              }
            }
            catch(e){
              // console.log(hide+ ' not on front page!');
            }
          }
        }

      }
      // runt(button_vis);


    } else if (request.message === "clicked_browser_action" && toggle ==='OFF') {
      kilt(tamtim);

      movie_list = document.querySelectorAll('div[aria-label]');
      toggle = 'ON';
      for (var i =1; i< movie_list.length; i++){
        var n = document.getElementsByClassName(movie_list[i].getAttribute('aria-label'));
        for(j = 0; j< n.length; j++){
          n[j].style.display = 'none'
        }
        // var berten = document.getElementById(movie_list[i].getAttribute('aria-label'));
        // berten.style.display = 'none';
      }
      for (var i = 0; i<saved_keys.length; i++){
        var hide = 'div[aria-label = "' + saved_keys[i] +'"]';
        try{
          // document.querySelector(hide).parentNode.parentNode.style.display = 'none';
          var night = document.querySelectorAll(hide);
          for (j=0; j<night.length;j++){
            night[j].parentNode.parentNode.style.display = 'none';
          }
        }
        catch(e){
          // console.log(hide+ ' not on front page!');
        }

      }
      timtam = setInterval(timit,1000);

    }
    movie_list = document.querySelectorAll('div[aria-label]');
    runs = 69;

   }

);
