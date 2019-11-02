// Vendor
import Service, {inject as service} from '@ember/service';

// Types
import LocalStorage from 'better-trading/services/local-storage';
import {
  FavoritesFolder,
  FavoritesItem,
  FavoritesTrade,
  RawFavoritesFolder,
  RawFavoritesItem,
  RawFavoritesTrade
} from 'better-trading/types/favorites';
import IntlService from 'ember-intl/services/intl';

export default class Favorites extends Service {
  @service('intl')
  intl: IntlService;

  @service('local-storage')
  localStorage: LocalStorage;

  fetch(): FavoritesItem[] {
    const rawFavorites = this.localStorage.getValue('favorites');
    if (!rawFavorites) return [];

    return JSON.parse(rawFavorites).map(
      (rawItem: RawFavoritesItem) => this._parseItem(rawItem)
    );
  }

  persist(items: FavoritesItem[]): void {
    this.localStorage.setValue('favorites', JSON.stringify(items));
  }

  forEachItem(
    items: FavoritesItem[],
    callback: (item: FavoritesItem) => void
  ): void {
    items.forEach(item => {
      callback(item);

      const potentialFolder = item as FavoritesFolder;
      if (!potentialFolder.items) return;
      this.forEachItem(potentialFolder.items, callback);
    });
  }

  forEachFolder(
    items: FavoritesItem[],
    callback: (folder: FavoritesFolder) => void
  ): void {
    this.forEachItem(items, (item: FavoritesItem) => {
      const potentialFolder = item as FavoritesFolder;
      if (!potentialFolder.items) return;

      callback(potentialFolder);
    });
  }

  createTrade(slug: string, title: string): FavoritesItem {
    return {slug, title};
  }

  createEmptyFolder(title?: string): FavoritesFolder {
    return {
      isExpanded: true,
      items: [],
      title: title || ''
    };
  }

  _parseItem(rawItem: RawFavoritesItem): FavoritesItem {
    if ((rawItem as RawFavoritesTrade).slug) return rawItem as FavoritesTrade;

    return {
      isExpanded: (rawItem as RawFavoritesFolder).isExpanded,
      items: (rawItem as RawFavoritesFolder).items.map(
        (subRawItem: RawFavoritesItem) => this._parseItem(subRawItem)
      ),
      title: rawItem.title
    };
  }
}

declare module '@ember/service' {
  interface Registry {
    favorites: Favorites;
  }
}
