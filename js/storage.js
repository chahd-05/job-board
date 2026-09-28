const followedOffersKey = "job-board-offres-suivies";

function readFollowedOffers() {
	try {
		const offers = JSON.parse(localStorage.getItem(followedOffersKey) || "[]");
		return Array.isArray(offers) ? offers : [];
	} catch (error) {
		return [];
	}
}

function saveFollowedOffers(offers) {
	localStorage.setItem(followedOffersKey, JSON.stringify(offers));
}

function renderFollowedOffers(container, offers) {
	const emptyMessage = document.querySelector("[data-followed-empty]");
	container.replaceChildren();

	if (emptyMessage) {
		emptyMessage.hidden = offers.length > 0;
	}

	offers.forEach((offer) => {
		const article = document.createElement("article");
		const header = document.createElement("div");
		const offerInfo = document.createElement("div");
		const title = document.createElement("h3");
		const details = document.createElement("p");
		const contract = document.createElement("span");
		const footer = document.createElement("div");
		const link = document.createElement("a");
		const button = document.createElement("button");

		article.className = "job-card";
		header.className = "job-header";
		contract.className = "job-type";
		footer.className = "job-footer";
		link.className = "details-button";
		button.className = "follow-button";

		title.textContent = offer.title;
		details.textContent = `${offer.company} - ${offer.city} - ${offer.contract}`;
		contract.textContent = offer.contract;
		link.href = `/offres/${encodeURIComponent(offer.id)}`;
		link.textContent = "Voir l'offre";
		button.type = "button";
		button.textContent = "Retirer";
		button.dataset.removeOffer = offer.id;

		offerInfo.append(title, details);
		header.append(offerInfo, contract);
		footer.append(link, button);
		article.append(header, footer);
		container.append(article);
	});
}

document.querySelectorAll("[data-follow-offer]").forEach((button) => {
	const article = button.closest("[data-offer-id]");
	const offerId = article.dataset.offerId;

	function updateButton() {
		const followedOffers = readFollowedOffers();
		const isFollowed = followedOffers.some((offer) => offer.id === offerId);
		button.textContent = isFollowed ? "Retirer" : "Suivre";
		button.dataset.followed = String(isFollowed);
	}

	updateButton();

	button.addEventListener("click", () => {
		const followedOffers = readFollowedOffers();
		const existingOffer = followedOffers.some((offer) => offer.id === offerId);

		if (existingOffer) {
			saveFollowedOffers(followedOffers.filter((offer) => offer.id !== offerId));
		} else {
			followedOffers.push({
				id: offerId,
				title: article.dataset.offerTitle,
				company: article.dataset.offerCompany,
				city: article.dataset.offerCity,
				contract: article.dataset.offerContract
			});
			saveFollowedOffers(followedOffers);
		}

		updateButton();
	});
});

const followedList = document.querySelector("[data-followed-list]");

if (followedList) {
	let followedOffers = readFollowedOffers();
	renderFollowedOffers(followedList, followedOffers);

	followedList.addEventListener("click", (event) => {
		const button = event.target.closest("[data-remove-offer]");

		if (!button) {
			return;
		}

		followedOffers = followedOffers.filter((offer) => offer.id !== button.dataset.removeOffer);
		saveFollowedOffers(followedOffers);
		renderFollowedOffers(followedList, followedOffers);
	});
}
