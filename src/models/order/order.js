#!/usr/bin/env node
"use strict";

const fs = require('node:fs');
import breads from "../bread/bread.js";
import spreads from "../spread/spread.js";
import sauces from "../sauce/sauce.js";
import {sandwichData} from "../../common/fetch-sandwich-data.js";

const createdOrders = [];

function calculateOrder(orderObj) {
	const breadPrice = breads.find((entry) => entry.item === orderObj.bread)?.prijs || 0;
	const spreadPrice = spreads.find((entry) => entry.item === orderObj.spread)?.prijs || 0;
	const saucePrice = sauces.find((entry) => entry.item === orderObj.sauce)?.prijs || 0;
	const smos = orderObj.smos ? sandwichData.find((entry) => entry.item === "smos").prijs : 0;
	return breadPrice + spreadPrice + saucePrice + smos;
}

function createOrder(orderObj) {
	createdOrders.push({orderNumber: Math.round(Math.random() * 100) , order: orderObj, date: new Date(), status: "todo"});
}

function completeOrder(orderNumber) {
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

function cancelOrder(orderNumber) {
	let order = createdOrders.find((order) => order.orderNumber === orderNumber && order.order.status !== "cancelled");
	order.status = "cancelled";
	return order;
}

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.calculateOrder = calculateOrder;
exports.placeOrder = createOrder;
exports.cancelOrder = cancelOrder;
