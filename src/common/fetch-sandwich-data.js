#!/usr/bin/env node
"use strict";

import { csv } from 'd3-fetch';
import csvFile from '../assets/Broodjesprijzen.csv';

const sandwichData = await csv(csvFile);
console.log(sandwichData);

if (require.main === module) {
	module.exports = sandwichData;
}
