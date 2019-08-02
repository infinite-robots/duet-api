const DEFAULT_GENRES = ['hip-hop', 'country', 'rock', 'edm', 'pop', 'latin', 'podcast'];
const DEFAULT_GENRE_SCORE = Math.sqrt(100 / DEFAULT_GENRES.length) * 10;

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
    console.log('##### Likes' + JSON.stringify(likes));
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
    let totalContrastPoints = 0;

    DEFAULT_GENRES.forEach(function(genre) {
      numberLiked += likes[genre].likes ? likes[genre].likes : 0;
      numberDisliked += likes[genre].dislikes ? likes[genre].dislikes : 0;
    });

    if(0 == (numberLiked + numberDisliked)) {
      return this.default();
    }

    // Score all genres
    DEFAULT_GENRES.forEach(function(genre) {
      // likes[genre].score = numberDisliked + numberLiked; // Default score to seed on
      likes[genre].score = 50;
      likes[genre].score += likes[genre].likes * 5;
      likes[genre].score -= likes[genre].dislikes * 5;
      // likes[genre].contrastScore = likes[genre].score - numberLiked;
      // totalPoints += likes[genre].score;
      // totalContrastPoints += likes[genre].contrastScore;

    });

    // Normalize
    DEFAULT_GENRES.forEach(function(genre) {
      // compass[genre] = ((Math.sqrt(likes[genre].score / totalPoints * 100) * 10)
      // + (((likes[genre].contrastScore / totalContrastPoints))*100) * 3) / 4 ;
      compass[genre] = likes[genre].score;
      if(compass[genre] > 100) {
        compass[genre] = 100;
      }
      if(compass[genre] < 0) {
        compass[genre] = 0;
      }
    });

    return compass;
  }
  
}

module.exports = { CompassUtil };