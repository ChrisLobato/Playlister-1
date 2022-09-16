import jsTPS_Transaction from "../../common/jsTPS.js";
/*
Add Song Transaction
This class represents a transaction that works with removing a Song
It will be managed by the transaction stack
*/

export default class AddSong_Transaction extends jsTPS_Transaction {
    constructor(initModel,initIndex){
        super();
        this.model=initModel;
        this.addindex = initIndex;
    }
    doTransaction(){
        this.model.addNewSong("Untitled","Unknown","dQw4w9WgXcQ");
    }
    undoTransaction(){
        this.model.deleteSong(this.addindex);
    }




}