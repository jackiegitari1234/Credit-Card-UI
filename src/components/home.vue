<script>
    document.getElementById('cardno').addEventListener('input', function (e) {
  e.target.value = e.target.value.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim();
});
</script>
<template>
  <div class="root ">
    <div class="card card1" v-if="!isHidden"
     :class="[ getuser1.charAt(0) == '4' ? 'firstcard'
     :getuser1.substring(0,2) == '51'? 'nextcard'
     :getuser1.substring(0,2) == '36'? 'thirdcard'
     :getuser1.substring(0,2) == '37'? 'fthcard'
     :'allcards']">

      <img src='../assets/images/download.svg' class="chip">
      <div  
      :class="[ getuser1.charAt(0) == '4' ? 'firstlogo'
     :getuser1.substring(0,2) == '51'? 'nextlogo'
     :getuser1.substring(0,2) == '36'? 'thirdlogo'
     :getuser1.substring(0,2) == '37'? 'fthlogo'
     :'allcards']"></div>
        
      <div class="dots">
      
        <label id="card" class="form-label" x-autocompletetype="ccnumber">
            {{btnText}}
        </label>
      </div>

      <div class="userName ">
        <label class="mytext1"  x-autocompletetype="ccnumber">
            {{usernamefield}}
        </label>
      </div>
      <div class="date" >
        <div class="validity">
          valid thru 
        </div>
       {{validityField}}
      </div>

    </div>
    <div class="card card2" v-if="isHidden" 
    :class="[ getuser1.charAt(0) == '4' ? 'firstcard'
     :getuser1.substring(0,2) == '51'? 'nextcard'
     :getuser1.substring(0,2) == '36'? 'thirdcard'
     :getuser1.substring(0,2) == '37'? 'fthcard'
     :'allcards']">
      <div class="stripe"></div>
      <div class="signature">
        <div class="cardno">{{cvcField}}</div>
      </div>
    </div>

    <form v-on:submit.prevent>
      <div class="form-group">
        <input type="text" class="form-control" placeholder="Card Number" v-model="fname"  :maxlength="19" id="cardno"
        v-on:keyup="changestate"
            onkeypress="return checkDigit(event)" required>
          <small>E.g.: 49..., 51..., 36..., 37...</small>
      </div>
      <div class="form-group">
        <input type="text" name="userName" class="form-control" placeholder="Name" v-model="userName" required>
        
      </div>
      <div class="row">
        <div class="col-6">
          <input type="tel" name="expiry" class="form-control" placeholder="Valid Thru"  v-model="expiry"   maxlength=5
           onkeypress="return (event.keyCode? (event.keyCode == 69 ? false : event.keyCode >= 48 && event.keyCode <= 57) : (event.charCode >= 48 && event.charCode <= 57))? true : event.preventDefault();"  
           onkeyup="this.value=this.value.replace(/^(\d\d)(\d)$/g,'$1/$2').replace(/^(\d\d\/\d\d)(\d+)$/g,'$1/$2').replace(/[^\d\/]/g,'')"
           required>
        </div>
        <div class="col-6" >
          <input type="tel" name="cvc" class="form-control" placeholder="CVC" 
          v-model="cvc" maxlength=4 @focus="isHidden = true" @blur="isHidden = false"
           onkeypress="return (event.keyCode? (event.keyCode == 69 ? false : event.keyCode >= 48 && event.keyCode <= 57) : (event.charCode >= 48 && event.charCode <= 57))? true : event.preventDefault();" 
           required>
        </div>
    </div>

    
     <div class="form-actions">
            <button v-on:click="changestate" @focus="notshown = true"  class="btn btn-primary btn-block">PAY</button> 
        
    </div>
    </form>
    <div class="userdata" v-if="notshown">
        <div class="row">
            <div class="col-md-5 mr-auto ml-auto">
                Card Number: {{getuser1}} 
            </div>
        </div>
        <div class="row">
            <div class="col-md-5 mr-auto ml-auto" >
                Name: {{getmember}} 
            </div>
        </div>
        <div class="row">
            <div class="col-md-5 mr-auto ml-auto">
                Expiry: {{getdate}} 
            </div>
        </div>
        <div class="row">
            <div class="col-md-5 mr-auto ml-auto">
                CVC: {{getCVC}} 
            </div>
        </div>
    </div>
</div>

</template>

<script>
    import Vue from 'vue'
    import Vuex from 'vuex'
    import {customState} from '../data/states.js'
    // import jquery from '../assets/js/jquery.min.js';
    Vue.use(Vuex)
    export default{
       data(){
            return{
                fname: '',
                userName:'',
                expiry:'',
                cvc:'',
                isHidden:'',
                ccnumber:'0000000000000000000000',
            }
        },
         store: new Vuex.Store({
             state:customState,
            getters:{
                data1: state => {
                return state.user1
                },
                data2: state => {
                return state.member
                },
                data3: state => {
                return state.exDate
                },
                data4: state => {
                return state.thisCVC
                },
            },
            mutations:{
                changeNameMutation:function(state, data){
                    state.user1 = data;
                },
                changeMemberMutation:function(state, data){
                    state.member = data;
                },
                changeDateMutation:function(state, data){
                    state.exDate = data;
                },
                changeCVCMutation:function(state, data){
                    state.thisCVC = data;
                },
            },
            actions:{
            changename({commit}, payload){
                commit('changeNameMutation', payload.name)
            },
            changemember({commit}, payload){
                commit('changeMemberMutation', payload.member)
            },
            changedate({commit}, payload){
                commit('changeDateMutation', payload.date)
            },
            changecvc({commit}, payload){
                commit('changeCVCMutation', payload.myCVC)
            },
        }
        }),
        computed:{
            getuser1(){
                return this.$store.getters.data1
            },
            getmember(){
                return this.$store.getters.data2
            },
            getdate(){
                return this.$store.getters.data3
            },
            getCVC(){
                return this.$store.getters.data4
            },
            btnText(){
                if (this.fname.charAt(0) == '') 
                    return('••••'+" "+'••••'+" "+'•'.repeat(4)+" "+'•'.repeat(4))
                else if (this.fname.substring(0,2) == '62')
                        return (this.fname.substring(0, 4)+ ' ' + this.fname.substring(4, 10) 
                        + ' ' + this.fname.substring(10, 15)
                        +('•'.repeat((16-this.fname.length)%4))+" "+(('•'.repeat(4)).repeat((16-this.fname.length)/4)))
                else if (this.fname.substring(0,2) == '36')
                        return (this.fname.substring(0, 4)+ ' ' + this.fname.substring(4, 10) 
                        + ' ' + this.fname.substring(10, 14)
                        +('•'.repeat((16-this.fname.length)%4))+" "+(('•'.repeat(4)).repeat((16-this.fname.length)/4)))
               
                else
                    return (this.fname.substring(0, 4) + ' ' + this.fname.substring(4, 8) 
                    + ' ' + this.fname.substring(8, 12) + ' ' + this.fname.substring(12, 19)+" "
                    +('•'.repeat((16-this.fname.length)%4))+" "+(('•'.repeat(4)).repeat((16-this.fname.length)/4)))
                    
                

            },
             usernamefield(){
                if (this.userName.charAt(0) == '') return('YOUR NAME HERE')
                else if (this.userName.length > '13')
                    return (this.userName.substring(0,13)+"...")
                else 
                    return (this.userName.toUpperCase());
            },
            validityField(){
                    return (this.expiry);
            },
            cvcField(){
                    return (this.cvc);
            }
        },
        methods:{
            changestate(){
                this.$store.dispatch('changename',{
                    name: this.fname
                }),
                this.$store.dispatch('changemember',{
                    member: this.userName
                }),
                this.$store.dispatch('changedate',{
                    date: this.expiry
                }),
                this.$store.dispatch('changecvc',{
                    myCVC: this.cvc
                })
                
            }
            
        }
    }
</script>
