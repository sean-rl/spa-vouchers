import { NgModule } from '@angular/core';
import { ContainsPipe } from './contains.pipe';
import { SplitPipe } from './split.pipe';
import { StripePipe } from './stripe.pipe';
import {
  NewsImagePipe,
  VImgIdPipe,
  VImgMdPipe,
  VImgsMdPipe
  } from './v_img.pipe';

@NgModule({
   declarations: [
      VImgIdPipe,
      VImgMdPipe,
      VImgsMdPipe,
      NewsImagePipe,
      ContainsPipe,
      SplitPipe,
      StripePipe
   ],
   exports: [
      VImgIdPipe,
      VImgMdPipe,
      VImgsMdPipe,
      NewsImagePipe,
      ContainsPipe,
      SplitPipe,
      StripePipe
   ]
})
export class PipesModule {}
