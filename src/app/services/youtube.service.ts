import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { PlaylistResponse } from '../models/playlist-response';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  public nextPageToken:string='';

  public baseUrl:string = `https://www.googleapis.com/youtube/v3/`; 
  constructor(private http:HttpClient) { }

  get params(){
    return {
      key: 'AIzaSyB8wo9zlzzHkf3cfkmsdCIrvYh30IcrCH4',
      part: 'snippet',
      playlistId:'UUuaPTYj15JSkETGnEseaFFg',
      maxResults: 10,
      pageToken: this.nextPageToken,
    }
  }

  getPlaylist(){
    return this.http.get<PlaylistResponse>(`${this.baseUrl}playlistItems`, {params: this.params})
    .pipe(
      map( res=>{
        this.nextPageToken = res.nextPageToken;
        return res.items;
      }),
      map( item=> item.map( video => video.snippet))
    )
  }
}
