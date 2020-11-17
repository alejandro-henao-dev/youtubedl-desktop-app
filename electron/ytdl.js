const fs = require('fs');
const ytdl = require('ytdl-core');//https://www.npmjs.com/package/ytdl-core
const path = require('path');

class Ytdl{
    constructor(url,out){
        this.url=url
        this.output=out
        this.metadata={
            title:"",
            description:"",
            formats:[]
        }
        this.opts={
            quality:"lowest",
            filter: format => format.container === 'mp4',
        }
        this.downloader
        this.defaultVideoName="video"
        this.chunkExtension=".ratdlpart"
        this.finalExtension=".mp4"
        this.currentExtension=this.chunkExtension
        this.fullFilePath=this.setFullPath(this.defaultVideoName)

        this.fileWriter;
    }
    destroy(){
        this.downloader.destroy()
        this.fileWriter.close()
        this.currentExtension=this.chunkExtension
        try{
        fs.unlink(this.getFullPath(),(err)=>{
         
        })
        }catch(e){
          
        }
    }
    download(){
        this.downloader=ytdl(this.url)
        this.fileWriter=fs.createWriteStream(this.fullFilePath)
        this.downloader.pipe( this.fileWriter );
        this.downloader.on('end',()=>{
            this.currentExtension=this.finalExtension
            fs.rename(this.fullFilePath,this.getFullPath(),(err)=>{
            })
        })
       return this.downloader
    }
    setFullPath(name){
        this.fullFilePath=path.resolve(this.output,this.cleanName(name)+this.currentExtension)
    }
    getFullPath(name){
        if(name){
            return path.resolve(this.output,this.cleanName(name)+this.currentExtension)
        }else{
            return path.resolve(this.output,(this.cleanName(this.metadata.title) || this.defaultVideoName) +this.currentExtension)
        }
    }

    valid(){
        return ytdl.validateURL(this.url);
    }
    async getData(){
        try {

            var data=await ytdl.getInfo(this.url,this.opts)
            var {title,description} = data.videoDetails;
            this.metadata.title=this.cleanName(title)
            this.metadata.description=description.simpleText
            
            var formats=data.formats.filter(i=>i.hasVideo && i.hasAudio)
            .map(i=>{
                var x={}
                x.quality=i.quality
                x.itag=i.itag
                x.size=(i.contentLength/1024444).toFixed(2)
                    .toString()
                    .replace(/(\d+\.\d{2}).*/,'$1')
                x.contentLength=i.contentLength
                return x
            });

            this.metadata.formats=formats
            this.currentExtension=this.chunkExtension
            this.setFullPath(title)
            return this
            
        } catch (error) {
            console.log(error);
        }
      
    }

    cleanName(str){
        var otherValids=[193,201,205,211,218,225,233,237,243,250]
        str=str.split().map(char=>{
            return char.charCodeAt(0)  <= 127  || otherValids.indexOf(char.charCodeAt(0)) ? char : ""
        }).join().replace(/[~"#%&\*:<>¿?\/\\{|}.,+*!^@\[\]'¡=¬\(\)]/g,"-");
        return str
    }

    async exists(){
        this.currentExtension=this.finalExtension
        return await fs.promises.access(this.getFullPath(), fs.constants.F_OK)
        .then((e) => {
            return true
        })
        .catch((e) => {
            return false
        })
    }
}
module.exports=Ytdl