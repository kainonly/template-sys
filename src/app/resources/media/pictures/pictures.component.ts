import { Component } from '@angular/core';

import { WpxService } from '@weplanx/ng';

@Component({
  selector: 'app-resources-media-pictures',
  templateUrl: './pictures.component.html'
})
export class PicturesComponent {
  constructor(public wpx: WpxService) {}
}
