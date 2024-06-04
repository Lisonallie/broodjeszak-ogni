import { csv } from 'd3-request';
import url from '';

const data = await csv(url);
console.log(data);
