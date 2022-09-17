Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      winner: null,
      logs: [],
    };
  },
  methods: {
    attackMonster() {
      const damage = Math.floor(Math.random() * (12 - 5)) + 5;
      this.monsterHealth -= damage;
      this.attackPlayer();
      this.currentRound++;
      this.logs.unshift('Player attacked monster for ' + damage);
    },
    attackPlayer() {
      const damage = Math.floor(Math.random() * (15 - 8)) + 8;
      this.playerHealth -= damage;
      this.logs.unshift('Monster attacked player for ' + damage);
    },
    specialAttack() {
      const damage = Math.floor(Math.random() * (25 - 10)) + 10;
      this.monsterHealth -= damage;
      this.attackPlayer();
      this.currentRound++;
      this.logs.unshift(
        'Player used a special attack on monster for  ' + damage
      );
    },
    heal() {
      const healValue = Math.floor(Math.random() * (20 - 5)) + 5;
      if (this.playerHealth + healValue > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healValue;
      }
      this.attackPlayer();
      this.currentRound++;
      this.logs.unshift('Player healed ' + healValue);
    },
    surrender() {
      this.playerHealth = 0;
      this.logs.unshift('Player surrendered ');
    },
    restart() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.currentRound = 0;
      this.winner = null;
      this.logs = [];
      this.logs.unshift('New day - New Life  ');
    },
  },
  computed: {
    monsterBarStyles() {
      if (this.monsterHealth < 0) {
        return { width: '0%' };
      }
      return { width: this.monsterHealth + '%' };
    },
    playerBarStyles() {
      if (this.playerHealth < 0) {
        return { width: '0%' };
      }
      return { width: this.playerHealth + '%' };
    },
    useSpecialAttack() {
      return this.currentRound % 3 !== 0;
    },
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        this.winner = 'draw';
      } else if (value <= 0) {
        this.winner = 'monster';
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        this.winner = 'draw';
      } else if (value <= 0) {
        this.winner = 'player';
      }
    },
  },
}).mount('#game');
