const s_re_sub = /\{\{%\s*(\S+)\s+(\S+)\s*\}\}/g;
const s_re_js = /\{\{\+([\s\S]+?)\}\}/g;
const s_re_int = /\{\{\s*(\S+)\s*\}\}/g;
const s_templates: { [name: string]: (x: any) => '' } = {};

export const xcite_get = (name: string) => s_templates[name];
export const xcite_run = (name: string, x?: any) => xcite_get(name)(x);

export function xcite_template(template: string, name?: string) {
	const t = template
		.trim()
		.replace(/[\s\r\n]+/g, ' ')
		.replace(s_re_sub, (...params) => `'; o+=run('${params[1]}', ${params[2]}); o+='`)
		.replace(s_re_js, (...params) => `'; ${params[1]}; o+='`)
		.replace(s_re_int, (...params) => `'; o+=${params[1]}; o+='`);

	const fs = `let o=''; o+= '${t}'; return o;`;
	const f0 = new Function('x, run', fs);
	const f = (x?: any) => f0(x, xcite_run);

	if (name) {
		s_templates[name] = f;
	}

	return f;
}
