const DEFAULT_GENRES = ['hiphop', 'country', 'rock', 'edm', 'pop', 'rnb', 'latin', 'podcast'];
const DEFAULT_GENRE_SCORE = 100 / DEFAULT_GENRES.length;

class CompassUtil {
  constructor() {
    //
  }
    
  static default() {
    return DEFAULT_GENRES.reduce((obj, genre) => ({...obj, [genre]: DEFAULT_GENRE_SCORE}), {});
  }

  static generate(intrests) {
    let likes = this._emptyLikes();
    intrests.forEach(function(intrest) {
      if(intrest.liked) {
        likes[intrest.genre].likes++;
      } else {
        likes[intrest.genre].dislikes++;
      }
    });
  }

  static _emptyLikes() {
    return DEFAULT_GENRES.reduce((obj, genre) => ({...obj, [genre]: {like:0, dislike:0}}), {});
  }

  static _likesToCompass(likes) {
    let compass = this.default();
    let numberLiked = 0;
    let numberDisliked = 0;
    let totalPoints = 0;

    DEFAULT_GENRES.forEach(function(genre) {
      numberLiked += genre.likes;
      numberDisliked += genre.dislikes;
    });

    // Score all genres
    DEFAULT_GENRES.forEach(function(genre) {
      likes[genre].score = numberDisliked; // Default score to seed on
      likes[genre].score += likes[genre].likes;
      likes[genre].score -= likes[genre].dislikes;
      totalPoints += likes[genre].score;
    });

    // Normalize
    DEFAULT_GENRES.forEach(function(genre) {
      compass[genre] = likes[genre].score / totalPoints * 100;
    });

    return compass;
  }
  
}

module.exports = { CompassUtil };