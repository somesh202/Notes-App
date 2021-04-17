
    showNote();
    

    let addBtn = document.getElementById('addBtn');
    addBtn.addEventListener("click", function (e) {
       
        let addTxt = document.getElementById("addTxt");
        let addTitle = document.getElementById("addTitle");
        let notes = localStorage.getItem("notes");
       
        if (notes == null) {
            notesObj = [];
           
        }
        else {
            notesObj = JSON.parse(notes);
        
        }
       let  date = new Date();
        let dateTime = `Date|Time : ${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()} | ${date.getHours()}:${date.getMinutes()}`;
        let myObj = {
            title: addTitle.value,
            text: addTxt.value,
            time: dateTime
        };
        notesObj.push(myObj);
       
        localStorage.setItem("notes", JSON.stringify(notesObj));
      
        addTxt.value = "";
        addTitle.value = "";

        

        showNote();


    });

    function showNote() {
        
        let notes = localStorage.getItem("notes");
        if (notes == null) {
            notesObj = [];
            
        }
        else {
            notesObj = JSON.parse(notes);
           
        }

        let html = "";
       
        notesObj.forEach(function (element, index) {
            html += `<div class="noteCard" style="width: 18rem;">

        <div class="card-body">
            <h5 class="card-title">${element.title}</h5>
            <h6 class="dt">${element.time}</h6>
            <i class="fas fa-sticky-note"></i>
            <p class="card-text"> ${element.text}</p>
            <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
        </div>
    </div>`;
        });

        let notesElm = document.getElementById('notes');
        if (notesObj.length == 0) {
            notesElm.innerHTML = `Your Notes Cart is empty! Add a Note To view. `
        }
        else {
            notesElm.innerHTML = html;
        }

    }



function deleteNote(index) {
   
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNote();
}

let search = document.getElementById('searchTxt');
search.addEventListener("input", function(){

    let inputVal = search.value.toLowerCase();
  
    let noteCards = document.getElementsByClassName('noteCard');
   Array.from(noteCards).forEach(function(element){
       let cardTxt = element.getElementsByTagName("p")[0].innerText;
      
       if(cardTxt.includes(inputVal)){
           element.style.display = "block";
       }
       else{
        element.style.display = "none";
        noteCards.innerHTML = `No searches mathced. `
       }
   });
});
