import { Component } from '@angular/core';

import { WpxService } from '@weplanx/ng';

@Component({
  selector: 'app-resources-media-videos',
  templateUrl: './videos.component.html'
})
export class VideosComponent {
  constructor(public wpx: WpxService) {}
}
