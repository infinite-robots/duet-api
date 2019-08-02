const DEFAULT_GENRES = ['hip-hop', 'country', 'rock', 'edm', 'pop', 'latin', 'podcast'];
const DEFAULT_GENRE_SCORE = 50;

class CompassUtil {
  constructor() {
    //
  }
    
  static default(isNpc) {
    let compass = DEFAULT_GENRES.reduce((obj, genre) => ({...obj, [genre]: isNpc ? DEFAULT_GENRE_SCORE : Math.sqrt(Math.random() * 95 + 5) * 10 }), {});
    return compass;
  }

  static generate(interests, isNpc) {
    let likes = this._emptyLikes();
    interests.forEach((interest) => {
      if(interest.liked) {
        likes[interest.genre].likes++;
      } else {
        likes[interest.genre].dislikes++;
      }
    });
    return this._likesToCompass(likes, isNpc);
  }

  static _emptyLikes() {
    return DEFAULT_GENRES.reduce((obj, genre) => ({...obj, [genre]: {likes:0, dislikes:0}}), {});
  }

  static _likesToCompass(likes, isNpc) {
    let compass = this.default(isNpc);
    let numberLiked = 0;
    let numberDisliked = 0;
    let totalPoints = 0;
    let totalContrastPoints = 0;

    DEFAULT_GENRES.forEach(function(genre) {
      numberLiked += likes[genre].likes ? likes[genre].likes : 0;
      numberDisliked += likes[genre].dislikes ? likes[genre].dislikes : 0;
    });

    let magnitude = 5;
    magnitude = 10 - (((numberLiked + numberDisliked)/5) * 5);
    if(magnitude > 10) {
      magnitude = 10;
    }
    if(magnitude < 5) {
      magnitude = 5;
    }

    if(0 == (numberLiked + numberDisliked)) {
      return this.default();
    }

    // Score all genres
    DEFAULT_GENRES.forEach(function(genre) {
      // likes[genre].score = numberDisliked + numberLiked; // Default score to seed on
      likes[genre].score = 50;
      likes[genre].score += likes[genre].likes * magnitude;
      likes[genre].score -= likes[genre].dislikes * magnitude;
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