import jsTPS_Transaction from "../../common/jsTPS.js";
/**
 * Edit Song Transaction  
 * This class represents a transaction that works with editing a song
 * It will be managed by the transaction stack.
 * @author Christopher Lobato
*/

export default class EditSong_Transaction extends jsTPS_Transaction {
    constructor(initModel,initIndex,OldSong,NewSong){
        super();
        this.model = initModel;
        this.theIndex = initIndex;
        this.oldSong_ = OldSong;
        this.newSong_ = NewSong;

    }
    doTransaction(){
        this.model.deleteSong(this.theIndex);
        this.model.addNewSongAt(this.newSong_.title,this.newSong_.artist,this.newSong_.youTubeId,this.theIndex);
    }
    undoTransaction(){
        this.model.deleteSong(this.theIndex);
        this.model.addNewSongAt(this.oldSong_.title,this.oldSong_.artist,this.oldSong_.youTubeId,this.theIndex);
    }



}

