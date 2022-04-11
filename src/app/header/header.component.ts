import { Component, OnDestroy, OnInit } from '@angular/core';
import { SpotifyService } from '../spotify.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  public song: any = null;
  public artistsString: any = null;
  public ticker: any = null;

  constructor(private spotifyService: SpotifyService) {}

  ngOnDestroy() {
    if (this.ticker) {
      clearInterval(this.ticker);
    }
  }

  async ngOnInit() {
    const s = await this.spotifyService.getNowPlaying();
    if (s.tracks[0].nowplaying) {
      this.song = s.tracks[0];
    }
    this.ticker = setInterval(async () => {
      const s = await this.spotifyService.getNowPlaying();
      if (s.tracks[0].nowplaying) {
        this.song = s.tracks[0];
      }
    }, 30000);
  }
}
