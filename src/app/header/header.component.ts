import { Component, OnDestroy, OnInit } from '@angular/core';
import { SpotifyService } from '../spotify.service';
import { TraktTVService } from '../trakttv.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  public song: any = null;
  public trakt: any = null;
  public artistsString: any = null;
  public ticker: any = null;
  public messages: string[] = ['Hey,', 'Hello,', 'Hi,', "What's up,"];

  constructor(
    private spotifyService: SpotifyService,
    private traktTVService: TraktTVService
  ) {}

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

    const t = await this.traktTVService.getNowPlaying();
    this.trakt = t;

    this.ticker = setInterval(async () => {
      const s = await this.spotifyService.getNowPlaying();
      if (s.tracks[0].nowplaying) {
        this.song = s.tracks[0];
      } else {
        this.song = null;
      }

      const t = await this.traktTVService.getNowPlaying();
      this.trakt = t;
    }, 30000);
  }
}
