const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 20;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;

const MODE_ATTACK = "ATTACK"; //MODE_ATTACK = 0
const MODE_STRONG_ATTACK = "STRONG_ATTACK"; //MODE_STRONG_ATTACK = 1
const LOG_EVENT_PLAYER_ATTACK = "PLAYER_ATTACK"
const LOG_EVENT_PLAYER_STRONG_ATTACK = "PLAYER_STRONG_ATTACK"
const LOG_EVENT_PLAYER_HEAL = "PLAYER_HEAL"
const LOG_EVENT_MONSTER_ATTACK = "MONSTER_ATTACK"
const LOG_EVENT_GAME_OVER = "GAME_OVER"
const enteredValue = prompt("Maximum life for you and the monster.")

let chosenMaxLife = parseInt(enteredValue);

if (isNaN(chosenMaxLife) || chosenMaxLife <= 0){
    chosenMaxLife = 100;
}

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;
let battleLog = [];


adjustHealthBars(chosenMaxLife);

function writeToLog(event, value, monsterHealth, playerHealth){
    let logEntry;
    if(event = LOG_EVENT_PLAYER_ATTACK){
        logEntry = {
            event: event,
            value: value,
            target: "MONSTER",
            finalMonsterHealth: monsterHealth,
            finalPlayerHealth: playerHealth

        };
        

    } else if (event === LOG_EVENT_PLAYER_STRONG_ATTACK){
        logEntry = {
            event: event,
            value: value,
            target: "MONSTER",
            finalMonsterHealth: monsterHealth,
            finalPlayerHealth: playerHealth

        };
        
    } else if(event === LOG_EVENT_MONSTER_ATTACK){
        logEntry = {
            event: event,
            value: value,
            target: "PLAYER",
            finalMonsterHealth: monsterHealth,
            finalPlayerHealth: playerHealth

        };
        
    } else if(event === LOG_EVENT_PLAYER_HEAL){
        logEntry = {
            event: event,
            value: value,
            target: "PLAYER",
            finalMonsterHealth: monsterHealth,
            finalPlayerHealth: playerHealth

        };
        battleLog.push(logEntry);
    } else if(event === LOG_EVENT_GAME_OVER){
        logEntry = {
            event: event,
            value: value,
            finalMonsterHealth: monsterHealth,
            finalPlayerHealth: playerHealth

        };
        
    }
    battleLog.push(logEntry);
}

function reset(){
    currentMonsterHealth = chosenMaxLife;
    currentPlayerHealth = chosenMaxLife;
    resetGame(chosenMaxLife);
    
}





function endRound(){
    const initialPlayerHealth = currentPlayerHealth;
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= playerDamage;
    writeToLog(
            LOG_EVENT_MONSTER_ATTACK,
            playerDamage, 
            currentMonsterHealth, 
            currentPlayerHealth);
    if(currentPlayerHealth <= 0 && hasBonusLife){
        hasBonusLife = false;
        removeBonusLife();
        currentPlayerHealth = initialPlayerHealth;
        setPlayerHealth(initialPlayerHealth);
        alert("You would be dead, but you use a bonus life instead! You have 0 remaining bonus Lives.")
    }

    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0){
        alert("You Won!")
        writeToLog(
            LOG_EVENT_GAME_OVER,
            "PLAYER_WON", 
            currentMonsterHealth, 
            currentPlayerHealth);
        reset();
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0){
        alert("You lost!")
        writeToLog(
            LOG_EVENT_GAME_OVER,
            "PLAYER_LOST", 
            currentMonsterHealth, 
            currentPlayerHealth);
        reset();
    }else if(currentPlayerHealth <= 0 && currentMonsterHealth <=0){
        alert("You have a DRAW!")
        writeToLog(
            LOG_EVENT_GAME_OVER,
            "DRAW", 
            currentMonsterHealth, 
            currentPlayerHealth);
        reset();
    }     
   
}       
     
    



function attackMonster(mode){
    let maxDamage;
    let logEvent;
    if (mode === MODE_ATTACK){
        maxDamage = ATTACK_VALUE;
        logEvent = LOG_EVENT_PLAYER_ATTACK
    } else {
        maxDamage = MODE_STRONG_ATTACK;
        logEvent = LOG_EVENT_PLAYER_STRONG_ATTACK
    }
    const damage = dealMonsterDamage(ATTACK_VALUE)
    currentMonsterHealth -= damage;
    writeToLog(
        logEvent,
        damage, 
        currentMonsterHealth, 
        currentPlayerHealth);
   endRound();
}

function normalAttack(){
    attackMonster(MODE_ATTACK);
}
function strongAttack(){
    attackMonster(MODE_STRONG_ATTACK)
}

function healPlayer(){
    let healValue;
    if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE){
        alert("You can't heal to more than your max health!")
        healValue = chosenMaxLife - currentPlayerHealth
    } else{
        healValue = HEAL_VALUE
    }
    increasePlayerHealth(healValue)
    currentPlayerHealth += healValue;
    writeToLog(
        LOG_EVENT_PLAYER_HEAL,
        healValue, 
        currentMonsterHealth, 
        currentPlayerHealth);
    endRound();
    
}

function printLogHandler(){
    console.log(battleLog)
}


attackBtn.addEventListener("click", attackMonster)
strongAttackBtn.addEventListener("click",strongAttack)
healBtn.addEventListener("click",healPlayer)
logBtn.addEventListener("click",printLogHandler)