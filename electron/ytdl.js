const fs = require('fs');
const ytdl = require('ytdl-core');//https://www.npmjs.com/package/ytdl-core


class Ytdl{
    constructor(url,out){
        this.url=url
        this.metadata={
            title:"",
            description:"",
            formats:[]
        }
        this.opts={
            quality:"lowest",
            filter: format => format.container === 'mp4',

        }
    }
    download(){
        ytdl(this.url)
            .pipe(fs.createWriteStream('./video.mp4'));
    }
    validate(){
        console.log(ytdl.validateURL(this.url));
    }
    async getData(){
        try {

            var data=await ytdl.getInfo(this.url,this.opts)
            var {title,description} = data.videoDetails;
            this.metadata.title=title
            this.metadata.description=description.simpleText
            
            var formats=data.formats.filter(i=>i.hasVideo && i.hasAudio)
            .map(i=>{
                var x={}
                x.quality=i.quality
                x.itag=i.itag
                x.size=(i.contentLength/8388608)
                    .toString()
                    .replace(/(\d+\.\d{2}).*/,'$1')
                x.contentLength=i.contentLength
                return x
            });

            this.formats=formats
            
        } catch (error) {
            console.log(error);
        }
      
        return this.url
    }
}

new Ytdl("https://www.youtube.com/watch?v=r_s-7_JnMQg").download()
exports.module=Ytdl