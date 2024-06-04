"use strict";

import sandwichData from "../../common/fetch-sandwich-data.js";

/**
 * Fetch all sandwich data and find the 'spread' entries
 * @param list - a collection of entries from a csv file containing sandwich data
 */
function fetchSpreadsFromList(list) {
	let spreads = [];
	for (const entry of list) {
		if (entry.prijs < 100 && entry.prijs > 30 && entry.item !== "smos") {
			spreads.push(entry.item);
		}
	}
	return spreads;
}

/**
 * Find a spread's data by name
 * @param name {string} - the name of a spread
 */
function fetchSpreadByType(name) {
	const spreads = fetchSpreadsFromList(sandwichData);
	if (spreads.includes(name)) {
		const sandwichWithPrice = sandwichData.find((entry) => entry.item === name);
		return {spread: sandwichWithPrice.item, price: sandwichWithPrice.prijs};
	}
	throw Object.assign(new Error("U moet een beleg kiezen"),
		{statusCode: 412, code: "spreadRequired"}
	);
}
