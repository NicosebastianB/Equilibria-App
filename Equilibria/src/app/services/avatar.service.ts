import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AvatarService {
  private readonly BASE_PATH = 'assets/avatars/';
  // list of available avatar filenames (adjust names/extensions to your assets)
  private readonly avatars = [
    'avatar1.png',
    'avatar2.png',
    'avatar3.png',
    'avatar4.png',
    'avatar5.png',
    'avatar6.png',
    'avatar7.png',
    'avatar8.png',
  ];

  constructor() {}

  getDefaultAvatars(): string[] {
    // return a copy
    return [...this.avatars];
  }

  getAvatarUrl(filename?: string): string {
    const name = filename && filename.length ? filename : this.getDefaultAvatar();
    return `${this.BASE_PATH}${name}`;
  }

  getDefaultAvatar(): string {
    return this.avatars.length > 0 ? this.avatars[0] : 'default.png';
  }

  exists(filename: string): boolean {
    return this.avatars.indexOf(filename) !== -1;
  }

  // convenience: return objects with filename and url for UI iteration
  getAvatarObjects(): { filename: string; url: string }[] {
    return this.avatars.map(f => ({ filename: f, url: this.getAvatarUrl(f) }));
  }
}
