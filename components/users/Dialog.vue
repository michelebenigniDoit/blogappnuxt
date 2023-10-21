<template lang="pug">
v-dialog(v-model="open" max-width="500" )
    v-card(v-if="open")
        v-card-title
            span User data
        v-card-text 
            v-form(
                :readonly="typeDialog=='view'" 
                ref="form"
                )
                v-container 
                    v-row 
                        v-col(cols="12" md="6")
                            v-text-field(label="Name" v-model="user.name" required :rules="requiredRules")
                            v-text-field(label="Surname" v-model="user.surname" required :rules="requiredRules")
                            v-text-field(label="Description" v-model="user.description")
                            v-text-field(label="Hobby" v-model="user.hobby")
                    div(v-if="typeDialog!='view'")
                        v-btn(@click="validate") {{ message }}
                    v-btn(color="secondary" @click="resetValidation") Close 
</template>

<script>
import commonFormRulesMixin from '@/mixins/common-form-rules-mixin';
export default {
    mixins: [commonFormRulesMixin],
    props: {
        userSelect: Object,
        isEditable: Boolean,
        typeDialog: String,
        message: String
    },
    data () {
        return {
            //valid: true,
            open: false,
            user: {},
            requiredRules: [this.formRuleRequired()]
        }
    },
    watch: {
        userSelect: {
            handler(newVal) {
                this.user = Object.assign({}, newVal);
            }
        }
    },
    methods: {
        validate() {
            if (!this.$refs.form.validate()) return
            this.confirm()            
            this.resetValidation()
        },
        confirm(){
            this.$emit('confirm', this.user)
        },
        resetValidation(){
            this.user={}
            this.$refs.form.resetValidation()
            this.toggle()
        },
        toggle(){
            console.log("togglato!")
            this.open= !this.open
        },
        fuori(){
            console.log("fuori click!")
        }
    }
}
</script>