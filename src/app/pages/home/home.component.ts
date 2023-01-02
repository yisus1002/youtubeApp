import { YoutubeService } from './../../services/youtube.service';
import { Component, OnInit } from '@angular/core';
import { Snippet } from 'src/app/models/playlist-response';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public videos:Snippet[]=[]

  constructor(
    private _sYou: YoutubeService

  ) { }

  ngOnInit(): void {
this.getPlaylist()
  }

  getPlaylist(){
    this._sYou.getPlaylist().subscribe(
      (data)=>{
        console.log(data);
        this.videos.push(...data)   
      }
    )
  }

  verVideo( video: Snippet){
    console.log(video);
    
    Swal.fire({
      title: `${video.title}`,
      html:
      `
      
      <iframe width="100%" height="315" 
              src="https://www.youtube.com/embed/${video.resourceId.videoId}" 
              title="YouTube video player" frameborder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen></iframe>      
      `,
    })
  }


}
