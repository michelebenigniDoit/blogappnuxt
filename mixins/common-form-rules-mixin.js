import $get from 'lodash/get';

export default{
	methods:{
		formRuleRequired(){
			return value => !!value || 'validation required';
		},
		formRuleEmail(){
			return value => {
				const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
				return pattern.test(value) || this.$t('validation.email');
			};
		},
		formRuleMinLength(min){
			return value => (value && value.length >= min) || (this.$t('validation.min')+min+this.$t('validation.characters'));
		},
		formRuleEqualsTo(field, label){
			return value => $get(this, field) == value || (this.$t('validation.equal') + label);
		}
	}
}
