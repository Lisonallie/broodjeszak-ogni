#!/usr/bin/env node
"use strict";

import fs from "fs";
import sandwichData from "../../common/fetch-sandwich-data.js";
import {fetchSpreadsFromList} from "../spread/spread.js";
import {fetchBreadsFromList} from "../bread/bread.js";
import {fetchSaucesFromList} from "../sauce/sauce.js";

const createdOrders = [];

export function calculateOrder(orderObj) {
	const breadPrice = fetchBreadsFromList().find((entry) => entry.item === orderObj.bread)?.prijs || 0;
	const spreadPrice = fetchSpreadsFromList().find((entry) => entry.item === orderObj.spread)?.prijs || 0;
	const saucePrice = fetchSaucesFromList().find((entry) => entry.item === orderObj.sauce)?.prijs || 0;
	const smos = orderObj.smos ? sandwichData.find((entry) => entry.item === "smos").prijs : 0;
	return breadPrice + spreadPrice + saucePrice + smos;
}

export function createOrder(orderObj) {
	createdOrders.push({orderNumber: Math.round(Math.random() * 100) , order: orderObj, date: new Date(), status: "todo"});
}

export function completeOrder(orderNumber) {
	let order = createdOrders.find((order) => order.orderNumber === orderNumber);
	order.status = "finished";
	const orderContent = `
	Rekening broodjeszak
	====================
	${order.date}
	Bestelling:    ${order.orderNumber}
	
	${order.order.bread}
	${order.order.spread}
	${order.order.sauce}
	${order.order.smos ? "Smos" : ""}
	
	Totale prijs:  ${order.order.price}
	`
	fs.writeFile('../../assets/statement.txt', orderContent, err => {
		if (err) {
			console.error(err);
		} else {
			console.log("File created");
		}
	});
	return order;
}

export function cancelOrder(orderNumber) {
	let order = createdOrders.find((order) => order.orderNumber === orderNumber && order.order.status !== "cancelled");
	order.status = "cancelled";
	return order;
}

const first = "default";
export default first;
