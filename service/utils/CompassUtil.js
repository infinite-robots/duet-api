const DEFAULT_GENRES = ['hiphop', 'country', 'rock', 'edm', 'pop', 'rnb', 'latin', 'podcast'];
const DEFAULT_GENRE_SCORE = 100/DEFAULT_GENRES.length;

class CompassUtil {
  constructor() {
    //
  }
    
  static getDefaultCompass() {
    return DEFAULT_GENRES.reduce((obj, track) => ({...obj, [track]: DEFAULT_GENRE_SCORE}), {});
  }
}

module.exports = { CompassUtil };