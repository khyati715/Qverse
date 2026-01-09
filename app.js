let selectedQueue = null;

function goTo(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(screenId).classList.add('active');

  if (screenId === 'queues') renderQueues();
}

function renderQueues() {
  const list = document.getElementById('queueList');
  list.innerHTML = '';

  queues.forEach(q => {
    const div = document.createElement('div');
    div.className = 'queue-card';
    div.innerHTML = `
      <h3>${q.name}</h3>
      <p>${q.count} people ahead</p>
      <p>Estimated wait: ${q.wait} min</p>
      <button class="primary-btn" onclick="openInsight('${q.name}')">
        Get AI Insight
      </button>
    `;
    list.appendChild(div);
  });
}

async function openInsight(name) {
  selectedQueue = queues.find(q => q.name === name);

  const insightBox = document.getElementById('insightText');
  insightBox.innerText = "Thinking… 🌌";

  goTo('insight');

  const insight = await generateInsight(selectedQueue);
  insightBox.innerText = insight;
}


async function refreshInsight() {
  const insightBox = document.getElementById('insightText');
  insightBox.innerText = "Refreshing… 🌠";

  const insight = await generateInsight(selectedQueue);
  insightBox.innerText = insight;
}

