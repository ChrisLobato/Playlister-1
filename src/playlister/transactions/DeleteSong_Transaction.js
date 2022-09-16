import jsTPS_Transaction from "../../common/jsTPS.js"
/*
DeleteSong_Transaction
This class represents a transaction that works with removing a Song
It will be managed by the transaction stack
*/


export default class DeleteSong_Transaction extends jsTPS_Transaction {
    constructor(initModel,initOldIndex,initOldSong){
        super();
        this.model = initModel;
        this.oldIndex = initOldIndex;
        this.oldTitle = initOldSong.title;
        this.oldArtist = initOldSong.artist;
        this.oldyouTubeId = initOldSong.youTubeId
    }
    doTransaction(){
        this.model.deleteSong(this.oldIndex);
    }
    undoTransaction(){
        this.model.addNewSongAt(this.oldTitle,this.oldArtist,this.oldyouTubeId,this.oldIndex);
    }




}