const DEFAULT_GENRES = ['hip-hop', 'country', 'rock', 'edm', 'pop', 'latin', 'podcast'];
const DEFAULT_GENRE_SCORE = 100 / DEFAULT_GENRES.length;

class CompassUtil {
  constructor() {
    //
  }
    
  static default() {
    return DEFAULT_GENRES.reduce((obj, genre) => ({...obj, [genre]: DEFAULT_GENRE_SCORE}), {});
  }

  static generate(interests) {
    let likes = this._emptyLikes();
    interests.forEach((interest) => {
      if(interest.liked) {
        likes[interest.genre].likes++;
      } else {
        likes[interest.genre].dislikes++;
      }
    });
    return this._likesToCompass(likes);
  }

  static _emptyLikes() {
    return DEFAULT_GENRES.reduce((obj, genre) => ({...obj, [genre]: {likes:0, dislikes:0}}), {});
  }

  static _likesToCompass(likes) {
    let compass = this.default();
    let numberLiked = 0;
    let numberDisliked = 0;
    let totalPoints = 0;

    DEFAULT_GENRES.forEach(function(genre) {
      numberLiked += likes[genre].likes ? likes[genre].likes : 0;
      numberDisliked += likes[genre].dislikes ? likes[genre].dislikes : 0;
    });

    if(0 == (numberLiked + numberDisliked)) {
      return this.default();
    }

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