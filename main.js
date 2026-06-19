const engineTemplate = document.querySelector("#decision-engine-template");
const engineHosts = [...document.querySelectorAll("[data-engine-host]")];

function setEngineStep(host, step) {
  const normalizedStep = Math.max(1, Math.min(6, Number(step) || 1));
  host.dataset.step = String(normalizedStep);

  host.querySelectorAll("[data-layer]").forEach((layer) => {
    const layerStep = Number(layer.dataset.layer);
    layer.classList.toggle("is-visible", layerStep <= normalizedStep);
    layer.classList.toggle("is-current", layerStep === normalizedStep);
  });
}

engineHosts.forEach((host) => {
  host.append(engineTemplate.content.cloneNode(true));
  setEngineStep(host, host.dataset.step);
});

const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");

function updateHeader() {
  header?.classList.toggle("is-scrolled", window.scrollY > 24);
}

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

menuToggle?.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  siteNav?.classList.toggle("is-open", !isOpen);
});

siteNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle?.setAttribute("aria-expanded", "false");
    siteNav.classList.remove("is-open");
  });
});

const forceStories = [...document.querySelectorAll("[data-force-step]")];
const assemblyEngine = document.querySelector(".engine--assembly");
const stageIndex = document.querySelector("[data-stage-index]");
const stageName = document.querySelector("[data-stage-name]");
const stageStatus = document.querySelector("[data-stage-status]");
const readout = document.querySelector(".readout-line i");

const stageData = {
  1: ["Perception", "Signals entering the model"],
  2: ["Context", "Situation and alternatives mapped"],
  3: ["Memory", "History and expectations connected"],
  4: ["Bias", "Behavioral forces weighted"],
  5: ["Motivation", "Needs and goals resolved"],
  6: ["Choice", "Explainable action produced"],
};

function activateForce(step) {
  const normalizedStep = Math.max(1, Math.min(6, Number(step) || 1));
  forceStories.forEach((story) => {
    story.classList.toggle("is-active", Number(story.dataset.forceStep) === normalizedStep);
  });

  if (assemblyEngine) setEngineStep(assemblyEngine, normalizedStep);
  if (stageIndex) stageIndex.textContent = `${String(normalizedStep).padStart(2, "0")} / 06`;
  if (stageName) stageName.textContent = stageData[normalizedStep][0];
  if (stageStatus) stageStatus.textContent = stageData[normalizedStep][1];
  if (readout) readout.style.width = `${normalizedStep * 16.6667}%`;
}

const forceObserver = new IntersectionObserver(
  (entries) => {
    const visibleEntries = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

    if (visibleEntries[0]) activateForce(visibleEntries[0].target.dataset.forceStep);
  },
  { rootMargin: "-35% 0px -35% 0px", threshold: [0, 0.25, 0.5, 0.75] },
);

forceStories.forEach((story) => forceObserver.observe(story));

const scenarioData = {
  pricing: {
    label: "Pricing simulation",
    title: "Find the point where value becomes resistance.",
    copy: "Simulate how 1,000+ buyers react to price, packaging, and offers, then see what drives willingness to pay.",
    list: ["Willingness-to-pay curves", "Anchoring and loss aversion", "Segment and individual reasoning"],
    link: "https://app.featurely.ai/instant-pricing",
    linkLabel: "Start pricing simulation",
    nodes: ["Value", "Anchor", "Risk", "Identity"],
  },
  conversion: {
    label: "Conversion simulation",
    title: "Find the friction before your users do.",
    copy: "Pressure-test flows, offers, and product moments to see where intent turns into hesitation, and why.",
    list: ["Decision-point diagnosis", "Counterfactual journey tests", "Behavioral friction mapping"],
    link: "https://app.featurely.ai/signup",
    linkLabel: "Start conversion simulation",
    nodes: ["Intent", "Friction", "Trust", "Effort"],
  },
  messaging: {
    label: "Messaging simulation",
    title: "Know which words change the decision.",
    copy: "Test positioning and creative across realistic people, then inspect the beliefs, identities, and frames each message activates.",
    list: ["Message-market fit", "Identity and belief response", "Audience-level explanation"],
    link: "https://app.featurely.ai/signup",
    linkLabel: "Start messaging simulation",
    nodes: ["Frame", "Belief", "Identity", "Trust"],
  },
  markets: {
    label: "Market simulation",
    title: "Model the reaction before the real event.",
    copy: "Simulate sentiment, public choice, and emerging market behavior with explicit assumptions and auditable drivers.",
    list: ["Synthetic population design", "Scenario and event response", "Published validation"],
    link: "https://calendar.app.google/EsgSBDF4r2YoqL9v9",
    linkLabel: "Commission a market study",
    nodes: ["Event", "History", "Group", "Choice"],
  },
};

const scenarioTabs = [...document.querySelectorAll("[data-scenario]")];
const scenarioLabel = document.querySelector("[data-scenario-label]");
const scenarioTitle = document.querySelector("[data-scenario-title]");
const scenarioCopy = document.querySelector("[data-scenario-copy]");
const scenarioList = document.querySelector("[data-scenario-list]");
const scenarioLink = document.querySelector("[data-scenario-link]");
const mapNodes = [
  document.querySelector("[data-map-node-a]"),
  document.querySelector("[data-map-node-b]"),
  document.querySelector("[data-map-node-c]"),
  document.querySelector("[data-map-node-d]"),
];

function activateScenario(id) {
  const scenario = scenarioData[id];
  if (!scenario) return;

  scenarioTabs.forEach((tab) => {
    tab.setAttribute("aria-selected", String(tab.dataset.scenario === id));
  });

  scenarioLabel.textContent = scenario.label;
  scenarioTitle.textContent = scenario.title;
  scenarioCopy.textContent = scenario.copy;
  scenarioList.replaceChildren(
    ...scenario.list.map((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      return li;
    }),
  );
  scenarioLink.href = scenario.link;
  scenarioLink.childNodes[0].textContent = `${scenario.linkLabel} `;
  mapNodes.forEach((node, index) => {
    if (node) node.textContent = scenario.nodes[index];
  });
}

scenarioTabs.forEach((tab) => {
  tab.addEventListener("click", () => activateScenario(tab.dataset.scenario));
});

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  },
  { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));
