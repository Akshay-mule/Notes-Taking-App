const addBtn = document.querySelector("#addBtn")
const main = document.querySelector("#main")

// to add notes
addBtn.addEventListener(
    "click",
    function () {
        addNote()
    }
)

// notes saving logic
const saveNotes = () => {
    const notes = document.querySelectorAll(".note textarea");
    console.log(notes);
    const data = [];
    notes.forEach(
        (note) => {
            data.push(note.value)        // pushing notes data into array(data)
        }
    )
    // console.log(data)
    if (data.length === 0) {
        localStorage.removeItem("notes")  // removing notes
    } else {
        localStorage.setItem("notes", JSON.stringify(data))       // converting data into string using stringify to store @ localStorage
    }
}


const addNote = (text = "") => {
    const note = document.createElement("div");
    note.classList.add("note")
    note.innerHTML = `
    <div class="tool">
         <i class="save fas fa-save"></i>
         <i class="trash fas fa-trash"></i> 
    </div>
    <textarea>${text}</textarea>
    `;

    // to delete note
    note.querySelector(".trash").addEventListener(
        "click",
        function () {
            note.remove()
            saveNotes()
        }
    )

    // to save notes
    note.querySelector(".save").addEventListener(
        "click",
        function () {
            saveNotes()
        }
    )

    // autosaves notes
    note.querySelector("textarea").addEventListener(
        "focusout",
        function () {
            saveNotes()
        }
    )
    main.appendChild(note);
    saveNotes()
}



//whenver page loads diplay save data
// lsNotes --> local storage notes
(
    function () {
        const lsNotes = JSON.parse(localStorage.getItem("notes"));
        // kuch bhi nahi hai to ek empty note add karlo
        if (lsNotes === null) {
            addNote()           // adding empty notes whwnever page refresh
        }
        // agar null nahi hai  matlab local storage mai kuch pada hai to usko add karo.
        else {
            lsNotes.forEach(
                (lsNote) => {
                    addNote(lsNote)
                }
            )
        }

    }
)()