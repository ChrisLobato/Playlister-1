/**
 * PlaylistController.js
 * 
 * This class provides responses for all user interface interactions.
 * 
 * @author McKilla Gorilla
 * @author ?
 */
 import Song from "./Song.js"
export default class PlaylisterController {
    constructor() { }

    /*
        setModel 

        We are using an MVC-type approach, so this controller class
        will respond by updating the application data, which is managed
        by the model class. So, this function registers the model 
        object with this controller.
    */
    setModel(initModel) {
        this.model = initModel;
        this.initHandlers();
    }

    /*
        initHandlers

        This function defines the event handlers that will respond to interactions
        with all the static user interface controls, meaning the controls that
        exist in the original Web page. Note that additional handlers will need
        to be initialized for the dynamically loaded content, like for controls
        that are built as the user interface is interacted with.
    */
    initHandlers() {
        // SETUP THE TOOLBAR BUTTON HANDLERS
        this.initEditToolbarHandlers();

        // SETUP THE MODAL HANDLERS
        this.initModalHandlers();
    }

    /*
        initEditToolbarHandlers

        Specifies event handlers for buttons in the toolbar.
    */
    initEditToolbarHandlers() {
        // HANDLER FOR ADDING A NEW LIST BUTTON
        document.getElementById("add-list-button").onmousedown = (event) => {
            let newList = this.model.addNewList("Untitled", []);
            this.model.currentlyEditingsongs=true;
            this.model.loadList(newList.id);
            this.model.saveLists();
        }
        document.getElementById("add-song-button").onmousedown = (event) => {
            //this.model.addNewSong("Untitled","Unknown","dQw4w9WgXcQ");
            this.model.addAddSongTransaction();
            //this.model.to
            //this.model.loadList();
            //this.model.saveLists()
            
        }
        // HANDLER FOR UNDO BUTTON
        document.getElementById("undo-button").onmousedown = (event) => {
            this.model.undo();
        }
        // HANDLER FOR REDO BUTTON
        document.getElementById("redo-button").onmousedown = (event) => {
            this.model.redo();
        }
        // HANDLER FOR CLOSE LIST BUTTON
        document.getElementById("close-button").onmousedown = (event) => {
            this.model.unselectAll();
            this.model.unselectCurrentList();
            this.model.currentlyEditingsongs = false;
            this.model.loadList();
        }
    }

    /*
        initModalHandlers

        Specifies  event handlers for when confirm and cancel buttons
        are pressed in the three modals.
    */
    initModalHandlers() {
        // RESPOND TO THE USER CONFIRMING TO DELETE A PLAYLIST
        let deleteListConfirmButton = document.getElementById("delete-list-confirm-button");
        let editSongConfirmButton = document.getElementById("edit-song-confirm-button")
        let deleteSongConfirmButton = document.getElementById("delete-song-confirm-button");
        deleteListConfirmButton.onclick = (event) => {
            // NOTE THAT WE SET THE ID OF THE LIST TO REMOVE
            // IN THE MODEL OBJECT AT THE TIME THE ORIGINAL
            // BUTTON PRESS EVENT HAPPENED
            let deleteListId = this.model.getDeleteListId();

            // DELETE THE LIST, THIS IS NOT UNDOABLE
            this.model.deleteList(deleteListId);

            // ALLOW OTHER INTERACTIONS
            this.model.toggleConfirmDialogOpen();

            // CLOSE THE MODAL
            let deleteListModal = document.getElementById("delete-list-modal");
            deleteListModal.classList.remove("is-visible");
            //this.model.loadList();
            this.model.currentlyEditingsongs=false;
            this.model.loadList();
        }
        editSongConfirmButton.onclick = (event) =>{
            //console.log("Index of Card we are Editing" + this.songToEditIndex);
            let newTitle = document.getElementById('song-title-text');
            let newArtist = document.getElementById('song-artist-text');
            let newyouTube = document.getElementById('song-youtubeId-text');
            this.newSongEdit = new Song();
            this.newSongEdit.title = newTitle.value;
            this.newSongEdit.artist = newArtist.value;
            this.newSongEdit.youTubeId = newyouTube.value;
            if((this.newSongEdit.title!=this.songBeingEdited.title) || (this.newSongEdit.artist!=this.songBeingEdited.artist) || (this.newSongEdit.youTubeId!=this.songBeingEdited.youTubeId)){
                this.model.addEditSong_Transaction(this.songToEditIndex,this.songBeingEdited,this.newSongEdit);
                //this.model.currentlyEditingsongs= true;
                //console.log("Went thru this branch");
            }
            // else{
            //     this.model.addEditSong_Transaction(this.songToEditIndex,this.songBeingEdited,this.newSongEdit);
            // }
            //this.model.addEditSong_Transaction(this.songToEditIndex,this.songBeingEdited,this.newSongEdit);
            // (this.model.getSong(this.songToEditIndex)).title= newTitle.value;
            // (this.model.getSong(this.songToEditIndex)).artist = newArtist.value;
            // (this.model.getSong(this.songToEditIndex)).youTubeId = newyouTube.value;
            //this.model.loadList();
            this.model.saveLists();
            //this.model.editRefresh();
            //this.model.view.refreshLists(this) we might need to turn this into a function
            this.model.toggleConfirmDialogOpen();
            let editSongModal = document.getElementById("edit-song-modal");
            // newTitle.innerHTML="";
            // newArtist.innerHTML="";
            // newyouTube.innerHTML="";
            editSongModal.classList.remove("is-visible");
            
            //this.model.enableToolBar();
        }
        deleteSongConfirmButton.onclick = (event) =>{
            //plan of action
            //we somehow need to splice the song array and create
            //a new array with the set amount of songs
            //this.model.loadList;
            this.model.addDeleteSongTransaction(this.songToDeleteIndex);
            //this.model.deleteSong(this.songToDeleteIndex);
            this.model.toggleConfirmDialogOpen();
            let deleteSongModal= document.getElementById("delete-song-modal");
            deleteSongModal.classList.remove("is-visible");
            
            

        }

        // RESPOND TO THE USER CLOSING THE DELETE PLAYLIST MODAL
        let deleteListCancelButton = document.getElementById("delete-list-cancel-button");
        let editSongCancelButton = document.getElementById("edit-song-cancel-button");
        let deleteSongCancelButton = document.getElementById("delete-song-cancel-button");
        deleteListCancelButton.onclick = (event) => {
            // ALLOW OTHER INTERACTIONS
            this.model.toggleConfirmDialogOpen();
            // CLOSE THE MODAL
            let deleteListModal = document.getElementById("delete-list-modal");
            deleteListModal.classList.remove("is-visible");
        }
        editSongCancelButton.onclick = (event) => {
            this.model.toggleConfirmDialogOpen();
            let editSongModal = document.getElementById("edit-song-modal");
            editSongModal.classList.remove("is-visible");

        }
        deleteSongCancelButton.onclick = (event) =>{
            this.model.toggleConfirmDialogOpen();
            let deleteSongModal= document.getElementById("delete-song-modal");
            deleteSongModal.classList.remove("is-visible");
        }        
    }

    /*
        registerListSelectHandlers

        This function specifies event handling for interactions with a
        list selection controls in the left toolbar. Note that we say these
        are for dynamic controls because the items in the playlists list is
        not known, it can be any number of items. It's as many items as there
        are playlists, and users can add new playlists and delete playlists.
        Note that the id provided must be the id of the playlist for which
        to register event handling.
    */
    registerListSelectHandlers(id) {
        // HANDLES SELECTING A PLAYLIST
        document.getElementById("playlist-" + id).onmousedown = (event) => {
            // MAKE SURE NOTHING OLD IS SELECTED
            this.model.unselectAll();

            this.model.currentlyEditingsongs=true;

            // GET THE SELECTED LIST
            this.model.loadList(id);
            
        }
        // HANDLES DELETING A PLAYLIST
        document.getElementById("delete-list-" + id).onmousedown = (event) => {
            // DON'T PROPOGATE THIS INTERACTION TO LOWER-LEVEL CONTROLS
            this.ignoreParentClick(event);

            // RECORD THE ID OF THE LIST THE USER WISHES TO DELETE
            // SO THAT THE MODAL KNOWS WHICH ONE IT IS
            this.model.setDeleteListId(id);

            // VERIFY THAT THE USER REALLY WANTS TO DELETE THE PLAYLIST
            // THE CODE BELOW OPENS UP THE LIST DELETE VERIFICATION DIALOG
            this.listToDeleteIndex = this.model.getListIndex(id);
            let listName = this.model.getList(this.listToDeleteIndex).getName();
            let deleteSpan = document.getElementById("delete-list-span");
            deleteSpan.innerHTML = "";
            deleteSpan.appendChild(document.createTextNode(listName));
            let deleteListModal = document.getElementById("delete-list-modal");

            // OPEN UP THE DIALOG
            deleteListModal.classList.add("is-visible");
            this.model.toggleConfirmDialogOpen();
        }
        // FOR RENAMING THE LIST NAME
        document.getElementById("list-card-text-" + id).ondblclick = (event) => {
            let text = document.getElementById("list-card-text-" + id)
            // CLEAR THE TEXT
            text.innerHTML = "";

            // ADD A TEXT FIELD
            let textInput = document.createElement("input");
            textInput.setAttribute("type", "text");
            textInput.setAttribute("id", "list-card-text-input-" + id);
            textInput.setAttribute("value", this.model.currentList.getName());
            textInput.style.width = "100%"

            // CHANGE THE CONTROL TO AN EDITABLE TEXT FIELD
            text.appendChild(textInput);
            this.model.refreshToolbar();

            // SPECIFY HANDLERS FOR THE TEXT FIELD
            textInput.ondblclick = (event) => {
                this.ignoreParentClick(event);
            }
            textInput.onkeydown = (event) => {
                if (event.key === 'Enter') {
                    this.model.renameCurrentList(event.target.value, id);
                    this.model.refreshToolbar();
                }
            }
            textInput.onblur = (event) => {
                this.model.renameCurrentList(event.target.value, id);
                this.model.refreshToolbar();
            }
            textInput.focus();
            let temp = textInput.value;
            textInput.value = "";
            textInput.value = temp;
        }
    }

    /*
        registerItemHandlers

        This function specifies event handling for interactions with the
        playlist song items, i.e. cards. Note that we say these
        are for dynamic controls because the cards in the playlist are
        not known, it can be any number of songs. It's as many cards as there
        are songs in the playlist, and users can add and remove songs.
    */
    registerItemHandlers() {
        // SETUP THE HANDLERS FOR ALL SONG CARDS, WHICH ALL GET DONE
        // AT ONCE EVERY TIME DATA CHANGES, SINCE IT GETS REBUILT EACH TIME
        for (let i = 0; i < this.model.getPlaylistSize(); i++) {
            // GET THE CARD
            let card = document.getElementById("playlist-card-" + (i + 1));
            document.getElementById("delete-song-"+(i+1)).onmousedown = (event) =>{
                this.ignoreParentClick(event);
                this.songToDeleteIndex = i;
                //console.log("Button we are pressing: "+ this.songToDeleteIndex);
                //we want to bring up the modal lets copy it from the edit song
                let deleteSongModal = document.getElementById("delete-song-modal");
                let deleteSongSpan = document.getElementById("delete-song-span");
                deleteSongSpan.innerHTML="";
                let deleteText = this.model.getSong(i).title + " by "+ this.model.getSong(i).artist;
                deleteSongSpan.appendChild(document.createTextNode(deleteText));
                deleteSongModal.classList.add("is-visible");

                this.model.toggleConfirmDialogOpen();
            }
            // NOW SETUP ALL CARD DRAGGING HANDLERS AS THE USER MAY WISH TO CHANGE
            // THE ORDER OF SONGS IN THE PLAYLIST

            // MAKE EACH CARD DRAGGABLE
            card.setAttribute('draggable', 'true')
            //make the deleteButton CLickable
            //card.onclick

            // WHEN DRAGGING STARTS RECORD THE INDEX
            card.ondragstart = (event) => {
                card.classList.add("is-dragging");
                event.dataTransfer.setData("from-id", i);
            }

            // WE ONLY WANT OUR CODE, NO DEFAULT BEHAVIOR FOR DRAGGING
            card.ondragover = (event) => {
                event.preventDefault();
            }

            // STOP THE DRAGGING LOOK WHEN IT'S NOT DRAGGING
            card.ondragend = (event) => {
                card.classList.remove("is-dragging");
            }

            // WHEN AN ITEM IS RELEASED WE NEED TO MOVE THE CARD
            card.ondrop = (event) => {
                event.preventDefault();
                // GET THE INDICES OF WHERE THE CARD IS BRING DRAGGED FROM AND TO
                let fromIndex = Number.parseInt(event.dataTransfer.getData("from-id"));
                let toIndex = Number.parseInt(event.target.id.split("-")[2]) - 1;

                // ONLY ADD A TRANSACTION IF THEY ARE NOT THE SAME
                // AND BOTH INDICES ARE VALID
                if ((fromIndex !== toIndex)
                    && !isNaN(fromIndex) 
                    && !isNaN(toIndex)) {
                    this.model.addMoveSongTransaction(fromIndex, toIndex);
                }
            }
            card.ondblclick = (event) =>{
                //this should react to when a song card is being double clicked
                this.ignoreParentClick(event);
                //let text = card;
                //here we need some modal handling so...
                this.songToEditIndex = i;
                //console.log("This is the index when dblclick "+this.songToEditIndex);
                let editSongModal = document.getElementById("edit-song-modal");
                editSongModal.classList.add("is-visible");
                this.model.toggleConfirmDialogOpen();
                let titleBox =document.getElementById('song-title-text');
                let artistBox =document.getElementById('song-artist-text');
                let youtubeBox =document.getElementById('song-youtubeId-text');
                titleBox.value= this.model.getSong(i).title;
                artistBox.value= this.model.getSong(i).artist;
                youtubeBox.value = this.model.getSong(i).youTubeId;
                this.songBeingEdited = this.model.getSong(i);
                // titleBox.setAttribute("value",);
                // artistBox.setAttribute("value",this.model.getSong(i).artist);
                // youtubeBox.setAttribute("value",this.model.getSong(i).youtubeId) 
            }
        }
    }

    /*
        ignoreParentClick

        This function makes sure the event doesn't get propogated
        to other controls.
    */
    ignoreParentClick(event) {
        event.cancelBubble = true;
        if (event.stopPropagation) event.stopPropagation();
    }
}