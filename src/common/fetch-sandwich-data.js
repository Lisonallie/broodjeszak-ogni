#!/usr/bin/env node
"use strict";

import { csv } from 'd3-fetch';
import csvFile from '../assets/Broodjesprijzen.csv';

const data = await csv(csvFile);
console.log(data);
