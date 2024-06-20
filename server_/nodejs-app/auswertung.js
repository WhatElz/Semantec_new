function processFormData(questions) {
  console.log('Aus Auswertung.js: Processing form data:', questions);


  let scoreGeneral = 0;
  let scoreSecurity = 0;
  let scoreKollaboration = 0;
  let scoreKommunikation = 0;

  questions.forEach(q => {
    if(!q) console.log('Error: Question is undefined');
    let score = 0;

    if (q && q.type === 'single-select') {
      score = q.options[q.answer] || 0;
    } else if (q && q.type === 'multi-select') {
      score = q.answer.reduce((sum, option) => sum + (q.options[option] || 0), 0);
    } else if (q.id === "grosse_it_abteilung") {
      score = Math.floor(q.answer / 100);
    } else if (q && q.type === "checkbox") {
      score = q.answer ? 5 : 0;
    }

    scoreBerechnen(score, q.weight, q.internalCategory);
  });

  function scoreBerechnen(score, weight, category) {
    const weightedScore = score * weight;
    switch (category) {
      case "Security":
        scoreSecurity += weightedScore;
        break;
      case "Kollaboration":
        scoreKollaboration += weightedScore;
        break;
      case "Kommunikation":
        scoreKommunikation += weightedScore;
        break;
    }
    scoreGeneral += weightedScore;  // Updated to add weightedScore instead of score
  }

  return {
    scoreGeneral,
    scoreSecurity,
    scoreKollaboration,
    scoreKommunikation
  };
}

module.exports = {
  processFormData,
};
