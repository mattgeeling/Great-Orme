const tabs = document.querySelectorAll('.screen-tab');
const screens = document.querySelectorAll('.screen');
const screenLinks = document.querySelectorAll('[data-target-screen]');
const mapPageImage = document.getElementById('mapPageImage');
const mapHotspots = document.querySelectorAll('.map-hotspot');
const answerOptions = document.querySelectorAll('.answer-option');

function activateScreen(targetId) {
  tabs.forEach((tab) => {
    tab.classList.toggle('is-active', tab.dataset.target === targetId);
  });

  screens.forEach((screen) => {
    screen.classList.toggle('is-visible', screen.id === targetId);
  });
}

tabs.forEach((tab) => {
  tab.addEventListener('click', () => activateScreen(tab.dataset.target));
});

screenLinks.forEach((link) => {
  link.addEventListener('click', () => activateScreen(link.dataset.targetScreen));
});

mapHotspots.forEach((hotspot) => {
  hotspot.addEventListener('click', () => {
    if (hotspot.dataset.targetScreen) {
      activateScreen(hotspot.dataset.targetScreen);
      return;
    }

    if (mapPageImage) {
      mapPageImage.src = hotspot.dataset.imageSrc;
    }
  });
});

answerOptions.forEach((option) => {
  option.addEventListener('click', () => {
    const group = option.closest('.answer-options');
    if (!group) {
      return;
    }

    const optionsInGroup = group.querySelectorAll('.answer-option');
    optionsInGroup.forEach((item) => {
      item.classList.remove('is-selected', 'is-correct', 'is-incorrect');
    });

    option.classList.add('is-selected');

    const isCorrect = option.dataset.correct === 'true';

    option.classList.add(isCorrect ? 'is-correct' : 'is-incorrect');

    let feedback = group.nextElementSibling;
    if (!feedback || !feedback.classList.contains('answer-feedback')) {
      feedback = document.createElement('p');
      feedback.className = 'answer-feedback';
      group.insertAdjacentElement('afterend', feedback);
    }

    feedback.classList.toggle('is-correct', isCorrect);
    feedback.classList.toggle('is-incorrect', !isCorrect);
    feedback.textContent = isCorrect
      ? 'Correct.'
      : `Incorrect. The correct answer is ${group.querySelector('[data-correct="true"] span')?.textContent ?? ''}.`;
  });
});
