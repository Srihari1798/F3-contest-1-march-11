
function OpeningCeremony(callback) {
    console.log("Let the games begin!");
    const score = { red: 0, yellow: 0, blue: 0, green: 0 };
    setTimeout(() => {
      Race100M(score, callback);
    }, 1000);
  }

  function Race100M(score, callback) {
    console.log("Race100M has begin!");
    setTimeout(() => {
      const times = {};
      for (let color of Object.keys(score)) {
        times[color] = Math.floor(Math.random() * 6) + 10;
      }
      const sortedColors = Object.keys(times).sort((a, b) => times[a] - times[b]);
      score[sortedColors[0]] += 50;
      score[sortedColors[1]] += 25;
      console.log(`Race100M results: ${JSON.stringify(score)}`);
      callback(score, LongJump);
    }, 3000);
  }
  
  function LongJump(score, callback) {
    console.log("LongJump has begin!");
    const winner = Object.keys(score)[Math.floor(Math.random() * 4)];
    score[winner] += 150;
    console.log(`LongJump winner: ${winner}`);
    console.log(`LongJump results: ${JSON.stringify(score)}`);
    setTimeout(() => {
      callback(score, HighJump);
    }, 2000);
  }
  
  function HighJump(score) {
    console.log("HighJump has begin!");
    const color = prompt("What color secured the highest score in HighJump?");
    if (color && score[color]) {
      score[color] += 100;
      console.log(`HighJump results: ${JSON.stringify(score)}`);
    } else {
      console.log("Event was cancelled.");
    }
    AwardCeremony(score);
  }
  
  function AwardCeremony(score) {
    console.log(`AwardCeremony results: ${JSON.stringify(score)}`);
    const sortedScores = Object.entries(score).sort((a, b) => b[1] - a[1]);
    console.log(`1st place: ${sortedScores[0][0]} with ${sortedScores[0][1]} points`);
    console.log(`2nd place: ${sortedScores[1][0]} with ${sortedScores[1][1]} points`);
    console.log(`3rd place: ${sortedScores[2][0]} with ${sortedScores[2][1]} points`);
  }
  
  OpeningCeremony((score, nextEvent) => {
    nextEvent(score, (score, nextEvent) => {
      nextEvent(score, (score) => {
        HighJump(score);
      });
    });
  });
  