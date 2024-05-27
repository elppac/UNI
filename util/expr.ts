import { Parser } from "expr-eval";

const parser = new Parser();
parser.functions.CONCAT = function (...args : any) {
	return String.prototype.concat(...args);
};

export const expression = (str : string, evaluateData: any) => {
	let expr = str.trim();
	if (/^`.*?\${(.*?).*?`$/.test(expr)) {
		const vars = expr.match(/\$\{(.*?)\}/g);
		let exprStr = expr.substring(1, expr.length - 1);
		const exprKeys : string[] = [];
		(vars ?? []).forEach((i : string, idx) => {
			const [left, ...right] = exprStr.split(i);
			if (left) {
				exprKeys.push(`'${left}'`);
			}
			const m = (i as string).match(/\$\{(.*?)\}/);
			if (m) {
				exprKeys.push(m && m[1]);
				exprStr = right.join(i);
				if (idx === (vars as string[]).length - 1) {
					exprKeys.push(`'${right[0]}'`);
				}
			}
		});
		expr = `CONCAT(${exprKeys.join(',')})`;
	}
	let result = undefined;
	try{
		result = parser.parse(expr).evaluate(evaluateData);
	}catch(e){
	}
	return result;
};