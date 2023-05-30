import Vue from 'vue';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { required, email, min, length } from "vee-validate/dist/rules";

extend("required", {
  ...required,
  message: "Это обязательное поле"
});

extend("min", {
  ...min,
  message: "ФИО должно быть больше {length} символов"
});

extend("email", {
  ...email,
  message: "Пожалуйста, введите корректный адрес почты"
});

extend("length", {
  ...length,
  message: "Введите корректный номер телефона"
});

// Register it globally
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);