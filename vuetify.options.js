import colors from "vuetify/es5/util/colors";

export default {
	theme: {
        light: false,
		dark: true,
		themes: {
			dark: {
				primary: colors.cyan.darken2,
                success: colors.green.darken1
			},
			light: {
				primary: colors.cyan.darken2,
				accent: colors.cyan.base
			}
		}
	}
};
