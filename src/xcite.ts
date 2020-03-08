const s_re_sub = /\{\{%\s*(\S+)\s+(\S+)\s*\}\}/g;
const s_re_js = /\{\{\+([\s\S]+?)\}\}/g;
const s_re_int = /\{\{\s*(\S+)\s*\}\}/g;
const s_templates: { [name: string]: (p_data: any) => '' } = {};

export const sablono_get = (p_name: string) => s_templates[p_name];
export const sablono_run = (p_name: string, p_data?: any) => sablono_get(p_name)(p_data);

export function sablono_template(p_template: string, p_name?: string) {
	const v_t = p_template
		.trim()
		.replace(/[\s\r\n]+/g, ' ')
		.replace(s_re_sub, (...p_params) => `'; o+=p_run('${p_params[1]}', ${p_params[2]}); o+='`)
		.replace(s_re_js, (...p_params) => `'; ${p_params[1]}; o+='`)
		.replace(s_re_int, (...p_params) => `'; o+=${p_params[1]}; o+='`);

	const v_fs = `let o=''; o+= '${v_t}'; return o;`;
	const v_f0 = new Function('s, p_run', v_fs);
	const v_f = (p_data?: any) => v_f0(p_data, sablono_run);

	if (p_name) {
		s_templates[p_name] = v_f;
	}

	return v_f;
}
