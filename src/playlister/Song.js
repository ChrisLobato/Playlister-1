export default class Song{
    constructor(initId){
        this.id = initId;
    }

    getSongTitle(){
        return this.title;
    }
    getSongArtist(){
        return this.artist;
    }
    getSongYoutubeId(){
        return this.youTubeId;
    }
    setSongTitle(initTitle){
        this.title = initTitle;
    }
    setSongArtist(artist){
        this.artist = artist;
    }
    setSongYoutubeId(youtubeId){
        this.youTubeId = youtubeId;
    }

    

}