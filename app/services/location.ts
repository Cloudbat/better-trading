// Vendor
import Service from '@ember/service';
import window from 'ember-window-mock';

// Types
import {BookmarksTradeLocation} from "better-trading/types/bookmarks";

// Constants
const BASE_URL = 'https://www.pathofexile.com/trade';

interface ParsedPath {
  type: string;
  league: string;
  slug?: string;
}

export default class Location extends Service {
  get type(): string {
    const {type} = this.parseCurrentPath();

    return type;
  }

  get league(): string {
    const {league} = this.parseCurrentPath();

    return league;
  }

  get slug(): string | null {
    const {slug} = this.parseCurrentPath();

    return slug || null;
  }

  navigateToTradeLocation(tradeLocation: BookmarksTradeLocation) {
    const {league} = this.parseCurrentPath();
    const newUrl = [BASE_URL, tradeLocation.type, league, tradeLocation.slug].join('/');

    window.location.replace(newUrl);
  }

  private parseCurrentPath(): ParsedPath {
    const [type, league, slug] = window.location.pathname
      .replace('/trade/', '')
      .split('/');

    return {type, league, slug};
  }
}

declare module '@ember/service' {
  interface Registry {
    'location': Location;
  }
}
