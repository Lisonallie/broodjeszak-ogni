"use strict";

import sandwichData from "../../common/fetch-sandwich-data.js";

/**
 * Fetch all sandwich data and find the 'bread' entries
 * @param list - a collection of entries from a csv file containing sandwich data
 */
function fetchBreadsFromList(list) {
	let breads = [];
	for (const entry of list) {
		if (entry.prijs >= 200) {
			breads.push(entry.item);
		}
	}
	return breads;
}

/**
 * Find a bread's data by name
 * @param name {string} - the name of a bread
 */
function fetchBreadByType(name = "geen") {
	const breads = fetchBreadsFromList(sandwichData);
	if (breads.includes(name)) {
		const sandwichWithPrice = sandwichData.find((entry) => entry.item === name);
		return {bread: sandwichWithPrice.item, price: sandwichWithPrice.prijs};
	}
	return {bread: "geen", price: 0};
}

