const tiers = [
  {
    id: "basic",
    title: "Basic",
    description: "For personal projects and simple sites.",
    price: 9.99,
    period: "month",
    features: ["1 GB Storage", "Basic Support", "All Core Features"],
    cta: { label: "Start Trial", onClickMessage: "Starting Basic trial..." },
  },
  {
    id: "pro",
    title: "Pro",
    description: "For growing teams who need more power.",
    price: 19.99,
    period: "month",
    features: ["10 GB Storage", "Priority Support", "Team Collaboration"],
    featured: true,
    badge: "Most popular",
    cta: { label: "Go Pro", onClickMessage: "Upgrading to Pro..." },
  },
  {
    id: "premium",
    title: "Premium",
    description: "For orgs that need scale and controls.",
    price: 49.99,
    period: "month",
    features: ["Unlimited Storage", "24/7 Support", "Advanced Security"],
    cta: { label: "Contact Sales", onClickMessage: "Opening sales contact..." },
  },
];

function formatMoney(value) {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function createPricingCard(tier) {
  const article = document.createElement("article");
  article.className = `pricing-card${tier.featured ? " pricing-card--featured" : ""}`;
  article.setAttribute("aria-label", `${tier.title} plan`);

  if (tier.badge) {
    const badge = document.createElement("div");
    badge.className = "pricing-card__badge";
    badge.textContent = tier.badge;
    article.appendChild(badge);
  }

  const h2 = document.createElement("h2");
  h2.className = "pricing-card__title";
  h2.textContent = `${tier.title} Plan`;
  article.appendChild(h2);

  const desc = document.createElement("p");
  desc.className = "pricing-card__desc";
  desc.textContent = tier.description ?? "";
  article.appendChild(desc);

  const price = document.createElement("p");
  price.className = "pricing-card__price";

  const amount = document.createElement("span");
  amount.className = "pricing-card__amount";
  amount.textContent = formatMoney(tier.price);

  const period = document.createElement("span");
  period.className = "pricing-card__period";
  period.textContent = `/ ${tier.period}`;

  price.append(amount, period);
  article.appendChild(price);

  const ul = document.createElement("ul");
  ul.className = "pricing-card__features";

  for (const feature of tier.features ?? []) {
    const li = document.createElement("li");
    li.textContent = feature;
    ul.appendChild(li);
  }
  article.appendChild(ul);

  const btn = document.createElement("button");
  btn.className = "pricing-card__cta";
  btn.type = "button";
  btn.textContent = tier.cta?.label ?? "Select plan";
  btn.addEventListener("click", () => {
    // Replace with real navigation/checkout integration.
    console.log(tier.cta?.onClickMessage ?? `Selected ${tier.id}`);
  });

  article.appendChild(btn);
  return article;
}

function renderPricingCards(mountEl, data) {
  mountEl.replaceChildren(...data.map(createPricingCard));
}

document.addEventListener("DOMContentLoaded", () => {
  const mount = document.getElementById("pricing");
  if (!mount) return;
  renderPricingCards(mount, tiers);
});
