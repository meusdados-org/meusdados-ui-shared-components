<template>
  <div class="password-validator">
    <div class="senha">
      <p>Senha de Acesso</p>
    </div>

    <ul class="rules">
      <li :class="{ valid: rules.length }">
        <Icon class="rule-icon" size="1.25rem" :type="rules.length ? 'check-circle' : 'x-circle'" />
        Pelo menos 8 caracteres;
      </li>
      <li :class="{ valid: rules.upper }">
        <Icon class="rule-icon" size="1.25rem" :type="rules.upper ? 'check-circle' : 'x-circle'" />
        1 Letra Maiúscula;
      </li>
      <li :class="{ valid: rules.lower }">
        <Icon class="rule-icon" size="1.25rem" :type="rules.lower ? 'check-circle' : 'x-circle'" />
        1 Letra Minúscula;
      </li>
      <li :class="{ valid: rules.number }">
        <Icon class="rule-icon" size="1.25rem" :type="rules.number ? 'check-circle' : 'x-circle'" />
        1 Número;
      </li>
      <li :class="{ valid: rules.special }">
        <Icon class="rule-icon" size="1.25rem" :type="rules.special ? 'check-circle' : 'x-circle'" />
        1 caractere especial (ex: !, @, #, $, %);
      </li>
      <li :class="{ valid: rules.match }">
        <Icon class="rule-icon" size="1.25rem" :type="rules.match ? 'check-circle' : 'x-circle'" />
        As senhas coincidem;
      </li>
    </ul>
  </div>
</template>

<script>
import Icon from "@/components/shared/Icon/Icon.vue"

export default {
  name: 'PasswordValidator',
  components: {
    Icon, 
  },
  props: {
    password: {
      type: String,
      default: ''
    },
    confirmPassword: {
      type: String,
      default: ''
    }
  },
  computed: {
    rules() {
      const pwd = this.password || '';
      const confirm = this.confirmPassword || '';
      return {
        length: pwd.length >= 8,
        upper: /[A-Z]/.test(pwd),
        lower: /[a-z]/.test(pwd),
        number: /[0-9]/.test(pwd),
        special: /[!@#$%^&*(),.?":{}|<>]/.test(pwd),
        match: pwd === confirm && pwd.length > 0
      }
    }
  }
}
</script>

<style scoped>
.password-validator {
  width: 100%;
  font-family: 'Montserrat', sans-serif;
  text-align: left;
}

.senha {
  margin: 0;
  color: var(--blue-1);
  background-color: white;
  font-size: large;
  font-weight: 800;
  margin-top: 1%;
  margin-bottom: 2%;
}

.rules {
  list-style: none;
  padding-left: 0;
}

.rules li {
  color: var(--red-1); 
  font-size: 14px; 
  margin-bottom: 4px;
  display: flex; 
  align-items: center; 
  gap: 8px; 
}

.rules li.valid {
  color: var(--green-1);
}

.rules li .rule-icon {
  color: var(--red-1); 
}

.rules li.valid .rule-icon {
  color: var(--green-1); 
}

@media (max-width: 768px) {
  .senha p {
    font-size: 1rem; 
  }

  .rules li {
    font-size: 0.85rem; 
    margin-bottom: 3px; 
    gap: 6px; 
  }

 
  .rule-icon {
    font-size: 1rem !important; 
  }
}

@media (max-width: 480px) {
  .senha p {
    font-size: 0.9rem; 
  }

  .rules li {
    font-size: 0.8rem; 
    gap: 4px; 
  }

  .rule-icon {
    font-size: 0.9rem !important; 
  }
}
</style>