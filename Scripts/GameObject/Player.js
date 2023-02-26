const PLAYER_IMAGE_SCALE = 1;
const PLAYER_IMAGE_WIDTH = 400 * PLAYER_IMAGE_SCALE;
const PLAYER_IMAGE_HEIGHT = 400 * PLAYER_IMAGE_SCALE;
const PLAYER_RADIUS = (Math.min(PLAYER_IMAGE_WIDTH, PLAYER_IMAGE_HEIGHT) / 2);
const PLAYER_IMAGE_ROTATION_OFFSET = -1.6

// const PLAYER_ACCEL = 10000;
// const PLAYER_FRICTION = 5000;
const PLAYER_WALKING_SPEED = 400;
const PLAYER_RUNNING_SPEED = 700;
const PLAYER_STAMINA_MAX = 50;
const PLAYER_STAMINA_RESTED_THRES = 30;
const PLAYER_STAMINA_USAGE_PER_SEC = 25;
const PLAYER_STAMINA_HEAL_PER_SEC = 30;
//Stamina Up Stats
const PLAYER_STAMINA_UP_STAMINA_MAX = 100;

//Bounding Entities
const PLAYER_BB_DIMENSION = 100;
const PLAYER_BC_RADIUS = 75;
const PLAYER_VULNERABLE_RADIUS_SCALE = 1.5;

const PLAYER_HP_MAX = 100;
const PLAYER_HEAL_POINTS = 100; //will heal this amount in 1 sec
const PLAYER_HEAL_COOLDOWN = 5;

const PLAYER_HP_JUGG_MAX = 250

//Knife
const PLAYER_KNIFE_COOLDOWN = 0.9;
const PLAYER_KNIFE_DISTANCE = 125;
const PLAYER_KNIFE_RADIUS = 75;
const PLAYER_KNIFE_DMG = 150;

const PLAYER_FOOTSTEP_WALK = 0.45
const PLAYER_FOOTSTEP_RUN = 0.26

class Player extends GameObject {
    constructor(posX, posY) {
        super(posX, posY,
            "Assets/Images/Characters/Heroes/Animations/Idle/Pistol/idle.png",
            // "Assets/Images/Characters/Heroes/Animations/moving/pistol/pistolSpriteSheet.png",
            0, 0,
            PLAYER_IMAGE_WIDTH, PLAYER_IMAGE_HEIGHT,
            1, 1,
            PLAYER_IMAGE_SCALE);
        //Animations
        //setupAnimation
        var ld = new LoadAnimations();
        this.animationMatrix = ld.getAnimations()
        console.log(this.animationMatrix.length)
        this.state = 0

        this.animator = new AnimatorRotate(ASSET_MANAGER.getAsset("Assets/Images/Characters/Heroes/Animations/Idle/Pistol/idle.png"),
            0,0,PLAYER_IMAGE_WIDTH,PLAYER_IMAGE_HEIGHT,20,0.04,PLAYER_IMAGE_SCALE)

        this.angle = 0;

        //Guns
        let startM1911 = new Gun_M1911()
        startM1911.currentTotalAmmo = 32
        this.gunInventory = [startM1911, new Gun_Empty()]; //[startM1911, new Gun_Empty()]
        this.currentGunIndex = 0;

        //HP
        this.alive = true
        this.hp = PLAYER_HP_MAX
        this.heal_currentCooldown = 0;
        //Speed, Sprint, Stamina
        this.speed = PLAYER_WALKING_SPEED;
        this.sprintStamina = PLAYER_STAMINA_MAX;
        this.sprintRest = false;
        //Points
        this.points = 500 //500
        //Knife
        this.knifeCooldownUntilAttack = 0
        this.isKnifing = false
        //Grenade
        this.grenades = 2
        //Footstep snd
        this.footStepTimer = PLAYER_FOOTSTEP_WALK

        //Perks
        this.perk_hasJug = false
        this.perk_hasSpeedCola = false
        this.perk_hasDoubleTap = false
        this.perk_hasQuickRev = false
        this.perk_hasStaminUp = false

        //Powerup
        this.powerup_hasInstaKillTimer = 0
        this.powerup_hasDoublePointsTimer = 0
        //TODO Fire Sale (Hard, must tell Mystery Box to duplicate to all locations)

        // this.left_clickCooldown = 0
        // this.reloadAnimationCooldownITR = 0

        this.player_Collision_World_BB = new BoundingBox(
            posX,
            posY,
            PLAYER_BB_DIMENSION * PLAYER_IMAGE_SCALE,
            PLAYER_BB_DIMENSION * PLAYER_IMAGE_SCALE
        )
        this.playerCollision_Vulnerable_C = new BoundingCircle(posX, posY, PLAYER_BC_RADIUS * PLAYER_IMAGE_SCALE * PLAYER_VULNERABLE_RADIUS_SCALE)
        this.playerCollision_Zombies_C = new BoundingCircle(posX, posY, PLAYER_BC_RADIUS * PLAYER_IMAGE_SCALE)
    };

    update() {
        if (!this.alive) {return} //dead, dont update

        //Mouse
        this.angle = this.mouseRotationHandler() ;

        //this.currentGun.shoot(GAME_ENGINE.camera.player.posXOriginal,GAME_ENGINE.camera.player.posYOriginal, this.angle)
        // console.log(this.sprintStamina + "\n" + this.sprintRest)

        //Sprint
        if ((GAME_ENGINE.key_up || GAME_ENGINE.key_down || GAME_ENGINE.key_left || GAME_ENGINE.key_right) &&
            GAME_ENGINE.key_run && this.sprintStamina > 0 && !this.sprintRest) {
            this.speed = (this.perk_hasStaminUp ? PLAYER_RUNNING_SPEED : (PLAYER_RUNNING_SPEED * this.gunInventory[this.currentGunIndex].movementPenalty)) //speed
            //stamina usage
            this.sprintStamina -= PLAYER_STAMINA_USAGE_PER_SEC * GAME_ENGINE.clockTick;
            this.sprintRest = (this.sprintStamina <= 0);
        } else {
            this.speed = PLAYER_WALKING_SPEED //speed
            //stamina heal
            if (this.sprintStamina < (this.perk_hasStaminUp ? PLAYER_STAMINA_UP_STAMINA_MAX: PLAYER_STAMINA_MAX)) {
                this.sprintStamina += PLAYER_STAMINA_HEAL_PER_SEC * GAME_ENGINE.clockTick;
            } else {
                this.sprintStamina = (this.perk_hasStaminUp ? PLAYER_STAMINA_UP_STAMINA_MAX: PLAYER_STAMINA_MAX)
            }
            if (this.sprintStamina > PLAYER_STAMINA_RESTED_THRES) this.sprintRest = false //stop resting
        }

        //TODO Velocity based movement

        //WASD Move
        if(GAME_ENGINE.key_up || GAME_ENGINE.key_down || GAME_ENGINE.key_left || GAME_ENGINE.key_right) {
            if (this.state !== ANIMATION_Reloading && this.state !== ANIMATION_Shooting && this.state !== ANIMATION_Melee && this.state !== ANIMATION_Grenade) { //not while reloading or shooting
                this.changeAnimation(ANIMATION_Walking)
            }
            //footstep sound
            this.footstepHandler()
        }
        //TODO fix diagonal being faster
        let movementVector = [0,0]
        if (GAME_ENGINE.key_up) {
            movementVector[1]--
        }
        if (GAME_ENGINE.key_down) {
            movementVector[1]++
        }
        if (GAME_ENGINE.key_left) {
            movementVector[0]--
        }
        if (GAME_ENGINE.key_right) {
            movementVector[0]++
        }
        // getUnitVector(0,0, movementVector[0], movementVector[1])
        this.posX += movementVector[0] * this.speed * GAME_ENGINE.clockTick;
        this.posY += movementVector[1] * this.speed * GAME_ENGINE.clockTick;

        //Shoot
        if (GAME_ENGINE.left_click && this.state !== ANIMATION_Grenade && this.state != ANIMATION_Melee) {
            if (this.gunInventory[this.currentGunIndex].shoot(this.posX, this.posY, this.angle)) {
                this.changeAnimation(ANIMATION_Shooting, this.gunInventory[this.currentGunIndex].maxFireCooldown)
            }
        }
        //Reload
        if (GAME_ENGINE.key_reload && this.state !== ANIMATION_Grenade && this.state != ANIMATION_Melee) {
            if (this.gunInventory[this.currentGunIndex].reload()) {
                this.changeAnimation(ANIMATION_Reloading, this.gunInventory[this.currentGunIndex].getReloadCooldown())
            }
        }
        //Knifing
        if (GAME_ENGINE.right_click && this.state !== ANIMATION_Reloading && this.state != ANIMATION_Melee && this.state != ANIMATION_Shooting && this.state != ANIMATION_Grenade) {
            if (this.state !== ANIMATION_Melee) {
                this.knifeCooldownUntilAttack = PLAYER_KNIFE_COOLDOWN - 0.45
                this.changeAnimation(ANIMATION_Melee, PLAYER_KNIFE_COOLDOWN)
                this.isKnifing = true
                GAME_ENGINE.addEntity(new Sound("Assets/Audio/SFX/Knife/knife.mp3", 0.4))
            }
        }
        if (this.isKnifing && this.knifeCooldownUntilAttack <= 0) {
            this.knife()
            this.isKnifing = false
        } else if (this.knifeCooldownUntilAttack > 0) {
            this.knifeCooldownUntilAttack -= GAME_ENGINE.clockTick
        }
        //key_use is embedded in places that needs it to avoid always checking on update
        //Grenades
        if (GAME_ENGINE.key_grenade && this.grenades > 0 && (this.state === ANIMATION_Walking || this.state === ANIMATION_Idle)) { //TODO cooldown via GRENADE animations
            this.changeAnimation(ANIMATION_Grenade)
            GAME_ENGINE.addEntity(new Sound("Assets/Audio/SFX/Explode/pin.mp3", 0.2))
            this.grenades--
            GAME_ENGINE.addEntity(new Grenade(this.posX, this.posY, this.angle))
        }
        //Switching Guns
        if (GAME_ENGINE.key_switchGuns) { //TODO check nade count, cooldown via animations
            this.switchGuns()
        } else {
            this.isSwitching = false
        }

        //Gun
        try {
            this.gunInventory[this.currentGunIndex].update()
        } catch (Error) {
            this.gunInventory[this.currentGunIndex] = new Gun_Empty()
        }


        if(this.animator.isDone()){
            this.state = ANIMATION_Idle
            this.changeAnimation(ANIMATION_Idle)
        }

        this.animationRuntime -= GAME_ENGINE.clockTick

        //Heal Cooldown Timer
        this.healHandler()
        //Power Ups Timers
        this.powerUpHandler()

        //BB
        this.saveLastBB()
        this.updateCollision()
        this.checkCollisions()

    }


    changeAnimation(state, totalTime=null) {
        switch (state) {
            case (ANIMATION_Idle) :
                this.state = ANIMATION_Idle
                this.animator = this.animationMatrix[this.gunInventory[this.currentGunIndex].animationType][ANIMATION_Idle]
                // this.animator = this.animationMatrix[this.gunInventory[this.currentGunIndex]][ANIMATION_Idle]
                break;
            case(ANIMATION_Walking):
                this.state = ANIMATION_Walking
                // this.animator = this.animationMatrix[this.gunInventory[this.currentGunIndex]][ANIMATION_Walking]
                this.animator = this.animationMatrix[this.gunInventory[this.currentGunIndex].animationType][ANIMATION_Walking]
                this.animator.finishedAnimation = false
                break;
            case(ANIMATION_Shooting):
                this.state = ANIMATION_Shooting
                // this.animator = this.animationMatrix[this.gunInventory[this.currentGunIndex]][ANIMATION_Shooting]
                this.animator = this.animationMatrix[this.gunInventory[this.currentGunIndex].animationType][ANIMATION_Shooting]
                this.animator.finishedAnimation = false
                break;
            case(ANIMATION_Reloading):
                this.state = ANIMATION_Reloading
                // this.animator = this.animationMatrix[this.gunInventory[this.currentGunIndex]][ANIMATION_Reloading]
                this.animator = this.animationMatrix[this.gunInventory[this.currentGunIndex].animationType][ANIMATION_Reloading]
                this.animator.finishedAnimation = false
                break;
            case(ANIMATION_Melee) : //melee
                this.state = ANIMATION_Melee
                // this.animator = this.animationMatrix[this.gunInventory[this.currentGunIndex]][ANIMATION_Melee]
                this.animator = this.animationMatrix[this.gunInventory[this.currentGunIndex].animationType][ANIMATION_Melee]
                this.animator.finishedAnimation = false
                break
            case(ANIMATION_Grenade) :
                this.state = ANIMATION_Grenade
                // this.animator = this.animationMatrix[this.gunInventory[this.currentGunIndex]][ANIMATION_Melee]
                this.animator = this.animationMatrix[this.gunInventory[this.currentGunIndex].animationType][ANIMATION_Grenade]
                this.animator.finishedAnimation = false
                break
        }
        if (totalTime != null) {
            this.animator.changeAnimationSpeed(totalTime)
        }
    }

    printCoordinates() {
        console.log("Player Position: x = " + this.posX + " y =" + this.posY)
    }
    printMouseCoordinates() {
        console.log("Mouse Position: x = " + GAME_ENGINE.getMouseWorldPosX() + " y =" + GAME_ENGINE.getMouseWorldPosY())
    }

    mouseRotationHandler() {
        if (GAME_ENGINE.mouse == null) return(0); //Catches exception start of Engine
        var dx = (GAME_ENGINE.getMouseWorldPosX()) - (this.posX); //282/2 Accounting for difference in center of thing.
        var dy = (GAME_ENGINE.getMouseWorldPosY()) - (this.posY);
        //this.printMouseCoordinates()

        return (Math.atan2(dy, dx));
    }

    draw() {
        if (!this.alive) {return} //dead, dont draw
        this.animator.drawFrame(this.posX, this.posY, this.angle + PLAYER_IMAGE_ROTATION_OFFSET)

        //TODO remove debug
        this.player_Collision_World_BB.drawBoundingBox()
        this.playerCollision_Zombies_C.drawBoundingCircle("Red")
        this.playerCollision_Vulnerable_C.drawBoundingCircle("Green")
    }

    saveLastBB() {
        this.last_collision_World_R = this.player_Collision_World_BB
        this.player_Collision_World_BB = new BoundingBox(
            this.posX - (this.player_Collision_World_BB.width/ 2),
            this.posY - (this.player_Collision_World_BB.height/ 2),
            PLAYER_BB_DIMENSION,
            PLAYER_BB_DIMENSION)
    }

    updateCollision() {
        this.player_Collision_World_BB.x = this.posX - (this.player_Collision_World_BB.width/ 2)
        this.player_Collision_World_BB.y = this.posY - (this.player_Collision_World_BB.width/ 2)
        this.player_Collision_World_BB.updateSides()

        this.playerCollision_Vulnerable_C.x = this.posX
        this.playerCollision_Vulnerable_C.y = this.posY

        this.playerCollision_Zombies_C.x = this.posX
        this.playerCollision_Zombies_C.y = this.posY
    }

    checkCollisions() {
        //if noclip mode
        if (GAME_ENGINE.options.noclip) {return}

        this.player_Collision_World_BB.updateSides();
        //MapObjects
        GAME_ENGINE.ent_MapObjects.forEach((entity) => {
            if (entity instanceof MapBB || entity instanceof MapBBPlayerOnly) { //World collision
                // this.playerCollion_World_R.updateSides()
                // entity.bb.updateSides();
                this.checkBBandPushOut(this.player_Collision_World_BB, this.last_collision_World_R, entity.bb)
            } else
            if (entity instanceof Barrier) { //Barrier
                //movement
                this.checkBBandPushOut(this.player_Collision_World_BB, this.last_collision_World_R, entity.bb)
                //interact
                if (this.player_Collision_World_BB.collide(entity.bb_interact)) {
                    entity.hudText()
                    if (GAME_ENGINE.key_use) {
                        entity.use()
                    }
                }
            } else if (entity instanceof WallBuyTrigger) { //TODO merge similar
                if (this.player_Collision_World_BB.collide(entity.bb_interact)) {
                    entity.hudText()
                    if (GAME_ENGINE.key_use) {
                        entity.use()
                    }
                }
            } else if (entity instanceof MapInteract) {
                this.checkBBandPushOut(this.player_Collision_World_BB, this.last_collision_World_R, entity.bb)
                if (this.player_Collision_World_BB.collide(entity.bb_interact)) {
                    entity.hudText()
                    if (GAME_ENGINE.key_use) {
                        entity.use()
                    }
                }
            } else if (entity instanceof LavaBB) {
                if (this.player_Collision_World_BB.collide(entity.bb)) {
                    //touching lava resets healing cooldown
                    this.takeLavaDamage()
                }
            }
        })
    }

    takeDamage(damage) {
        //if god mode
        if (GAME_ENGINE.options.god) {return}
        //dmg
        this.hp -= damage
        GAME_ENGINE.camera.map.hud.fullscreenRedHurt.flash()
        //death?
        if (this.hp <= 0 && !this.perk_hasQuickRev) { //real death
            this.alive = false
            GAME_ENGINE.camera.map.roundManager.reportPlayerDeath()
        } else if (this.hp <= 0 && this.perk_hasQuickRev) { //Quick Revive, cause an explosion and get back
            //clear perks
            this.perk_hasQuickRev = false
            this.perk_hasJug = false
            this.perk_hasSpeedCola = false
            this.perk_hasStaminUp = false
            this.perk_hasDoubleTap = false
            //explode
            let explosive = new ExplosiveQuickRevive(this.posX, this.posY,this.angle, 10000000, 0, 5000)
            GAME_ENGINE.camera.map.hud.fullscreenFlash.flash(3, rgb(154, 248, 248))
            GAME_ENGINE.addEntity(explosive)
            explosive.explode()
            GAME_ENGINE.camera.startShake(5, 25)
            explosive.removeFromWorld = true
            //reset health
            this.heal_currentCooldown = 0
        }

        //screenshake
        GAME_ENGINE.camera.startShake(0.5, 15)
        //reset heal cooldown
        this.heal_currentCooldown = PLAYER_HEAL_COOLDOWN;
    }

    takeLavaDamage() {
        this.heal_currentCooldown = PLAYER_HEAL_COOLDOWN;
        if (this.hp >= 0) {
            this.hp -= GAME_ENGINE.clockTick * 0.25
        } else {
            this.takeDamage(1) //kill player
        }
        GAME_ENGINE.camera.map.hud.fullscreenLava.flash()
    }

    healHandler() {
        if (this.heal_currentCooldown > 0) { //cant heal, return
            this.heal_currentCooldown -= GAME_ENGINE.clockTick;
            return
        }
        if (this.hp < (this.perk_hasJug ? PLAYER_HP_JUGG_MAX : PLAYER_HP_MAX)) {//less than max hp
            this.hp += PLAYER_HEAL_POINTS * GAME_ENGINE.clockTick; //heal
        } else {
            this.hp = (this.perk_hasJug ? PLAYER_HP_JUGG_MAX : PLAYER_HP_MAX) //Clamping the Health to max
        }
    }

    powerUpHandler() {
        if (this.powerup_hasInstaKillTimer > 0) {
            this.powerup_hasInstaKillTimer -= GAME_ENGINE.clockTick
        }
        if (this.powerup_hasDoublePointsTimer > 0) {
            this.powerup_hasDoublePointsTimer -= GAME_ENGINE.clockTick
        }
    }

    checkBBandPushOut(thisBB, thisBBLast, othBB) {
        if(thisBB.collide(othBB)) {
            if (thisBBLast.bottom <= othBB.top) { //was above last
                this.posY -= thisBB.bottom - othBB.top
            } else if (thisBBLast.left >= othBB.right) { //from right
                this.posX += othBB.right - thisBB.left
            } else if (thisBBLast.right <= othBB.left) { //from left
                this.posX -= thisBB.right - othBB.left
            } else if (thisBBLast.top >= othBB.bottom) { //was below last
                this.posY += othBB.bottom - thisBB.top
            }
            this.updateCollision()
        }
    }

    knife() {
        let unitV = getUnitVector(this.posX, this.posY, GAME_ENGINE.getMouseWorldPosX(), GAME_ENGINE.getMouseWorldPosY())
        let pos = [this.posX + (unitV[0] * PLAYER_KNIFE_DISTANCE), this.posY + (unitV[1] * PLAYER_KNIFE_DISTANCE)]
        let knifeBC = new BoundingCircle(pos[0], pos[1], PLAYER_KNIFE_RADIUS)
        let hasKnifed = false
        GAME_ENGINE.ent_Zombies.forEach((entity) => {
            if (entity instanceof Zombie && !hasKnifed) {
                if (knifeBC.collide(entity.bc_Movement) < 0 && (entity.movementState === 0 || entity.movementState === 2)) {
                    GAME_ENGINE.addEntity(new Sound("Assets/Audio/SFX/Knife/knife_hit.mp3", 0.35))
                    entity.takeDamage(PLAYER_KNIFE_DMG, ZOMBIE_DMG_KNIFE)
                    hasKnifed = true
                    GAME_ENGINE.camera.startShake(0.1, 7)
                }
            }
        })
    }

    footstepHandler() {
        if (this.footStepTimer > 0) {
            this.footStepTimer -= GAME_ENGINE.clockTick
        } else {
            GAME_ENGINE.addEntity(new Sound("Assets/Audio/SFX/Footstep/ladder" + randomInt(5) + ".ogg", MIXER_FOOTSTEP_VOL))
            if (GAME_ENGINE.key_run) {
                this.footStepTimer = PLAYER_FOOTSTEP_RUN
            } else {
                this.footStepTimer = PLAYER_FOOTSTEP_WALK
            }
            this.footStepTimer += (Math.random() - 0.5) * 0.05
        }
    }

    addGrenades(amount) {
        this.grenades = Math.min(this.grenades + 2, 4)
    }

    earnPoints(points) {
        this.points += (this.powerup_hasDoublePointsTimer > 0 ? points * 2 : points)
        GAME_ENGINE.camera.map.roundManager.reportPoints(points)
    }

    losePoints(points) {
        GAME_ENGINE.addEntity(new Sound("Assets/Audio/Interact/accept.mp3", MIXER_CASH_ACCEPT))
        this.points -= points
    }

    acceptNewGun(gun) {
        //check if space is available
        for (let i = 0; i < this.gunInventory.length; i++) {
            if (this.gunInventory[i].name === "Empty") {
                this.gunInventory[i] = gun
                this.currentGunIndex = i //switch to
                this.gunInventory[this.currentGunIndex].equip()
                this.animator.finishedAnimation = true
                return 0 //buy
            }
        }

        //purchase ammo
        for (let i = 0; i < this.gunInventory.length; i++) {
            if (this.gunInventory[i].name === gun.name) { //has same gun
                if (this.gunInventory[i].currentTotalAmmo === this.gunInventory[i].totalAmmo) return -1 //nvm, already full
                this.gunInventory[i].currentTotalAmmo = this.gunInventory[i].totalAmmo //refill
                return 1 //ammo
            }
        }

        //replace gun
        this.gunInventory[this.currentGunIndex] = gun
        this.gunInventory[this.currentGunIndex].equip()
        this.animator.finishedAnimation = true
        return 0

    }

    switchGuns() {
        if (this.gunInventory[(this.currentGunIndex + 1) % this.gunInventory.length].name !== "Empty" && !this.isSwitching) {
            this.currentGunIndex = (this.currentGunIndex + 1) % this.gunInventory.length
            this.isSwitching = true
            this.animator.finishedAnimation = true
            this.gunInventory[this.currentGunIndex].equip()
        }
    }
}

// class RaycastExplodePlayer extends RaycastZombies { //TODO get this working for player explosive dmg
//     constructor(pairedZombie, damage, type) {
//         super(pairedZombie)
//         this.destPos = destPos
//         this.type = type
//         this.damage = damage
//         //get rotation
//         let dx = destPos[0] - this.posXOriginal
//         let dy = destPos[1] - this.posYOriginal
//         this.angle = Math.atan2(dy, dx)
//     }
//
//     update() {
//         //move (dont deltatime)
//         var unitx = Math.cos(this.angle);
//         var unity = Math.sin(this.angle);
//         this.posXOriginal += unitx * this.size * 2
//         this.posYOriginal += unity * this.size * 2
//
//         //update collision
//         this.bb.x = this.posXOriginal - (this.size/2)
//         this.bb.y = this.posYOriginal - (this.size/2)
//         this.bb.updateSides()
//
//         //check collide
//         GAME_ENGINE.ent_MapObjects.forEach((entity) => {
//             if (entity instanceof MapBB) {
//                 if (this.bb.collide(entity.bb) && !entity.projectilePasses) {
//                     this.removeFromWorld = true
//                 }
//             }
//         })
//
//         //check if at destination
//         if (Math.abs(this.posXOriginal - this.destPos[0]) < this.size * 2 && Math.abs(this.posYOriginal - this.destPos[1]) < this.size * 2) {
//             this.pairedZombie.takeDamage(this.damage, this.type)
//             this.removeFromWorld = true
//         }
//     }
//
//     draw() {
//         //NOTHING
//         //TODO remove debug
//         this.bb.drawBoundingBox("orange")
//     }
// }
