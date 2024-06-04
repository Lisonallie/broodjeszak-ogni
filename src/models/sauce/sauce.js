"use strict";

import sandwichData from "../../common/fetch-sandwich-data.js";

/**
 * Fetch all sandwich data and find the 'sauce' entries
 * @param list - a collection of entries from a csv file containing sandwich data
 */
export function fetchSaucesFromList(list) {
	let sauces = [];
	for (const entry of list) {
		if (entry.prijs < 50) {
			sauces.push(entry.item);
		}
	}
	return sauces;
}

/**
 * Find a sauce's data by name
 * @param name {string} - the name of a sauce
 */
export function fetchSauceByName(name = "geen") {
	const sauces = fetchSaucesFromList(sandwichData);
	if (sauces.includes(name)) {
		const sandwichWithPrice = sandwichData.find((entry) => entry.item === name);
		return {sauce: sandwichWithPrice.item, price: sandwichWithPrice.prijs};
	}
	return {sauce: "geen", price: 0};
}

const first = "default";
export default first;
