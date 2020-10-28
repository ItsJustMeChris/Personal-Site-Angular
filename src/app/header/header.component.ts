import { Component, OnDestroy, OnInit } from '@angular/core';
import { SpotifyService } from '../spotify.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public song: any = null;
  public artistsString: any = null;
  public ticker: any = null;

  constructor(private spotifyService: SpotifyService) { }

  ngOnDestroy() {
    if (this.ticker) {
      clearInterval(this.ticker);
    }
  }

  async fetchSong() {
    const data = await this.spotifyService.getNowPlaying();
    if (!data?.is_playing) {
      this.song = null;
      this.artistsString = null;
      return false;
    }
    this.song = data?.item;
    this.artistsString = this.song.artists.map((artist) => artist.name).join(', ');
  }

  async ngOnInit() {
    this.fetchSong();
    setInterval(() => {
      this.fetchSong();
    }, 60000);
  }

}
