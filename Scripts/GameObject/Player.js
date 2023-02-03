const PLAYER_IMAGE_SCALE = 1;
const PLAYER_IMAGE_WIDTH = 400 * PLAYER_IMAGE_SCALE;
const PLAYER_IMAGE_HEIGHT = 400 * PLAYER_IMAGE_SCALE;
const PLAYER_RADIUS = (Math.min(PLAYER_IMAGE_WIDTH, PLAYER_IMAGE_HEIGHT) / 2);
const PLAYER_IMAGE_ROTATION_OFFSET = -1.6

const PLAYER_WALKING_SPEED = 400;
const PLAYER_RUNNING_SPEED = 700;
// const PLAYER_ACCEL = 10000;
// const PLAYER_FRICTION = 5000;
const PLAYER_STAMINA_MAX = 150;
const PLAYER_STAMINA_RESTED_THRES = 100;
const PLAYER_STAMINA_USAGE_PER_SEC = 25;
const PLAYER_STAMINA_HEAL_PER_SEC = 30;

const PLAYER_BB_DIMENSION = 100;
const PLAYER_BC_RADIUS = 75;
const PLAYER_VULNERABLE_RADIUS_SCALE = 1.5;

const PLAYER_HP_MAX = 100;
const PLAYER_HEAL_POINTS = 100;
const PLAYER_HEAL_COOLDOWN = 5;

const PLAYER_KNIFE_COOLDOWN = 0.9;
const PLAYER_KNIFE_DISTANCE = 125;
const PLAYER_KNIFE_RADIUS = 75;
const PLAYER_KNIFE_DMG = 150;

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

        //TODO adding animation list

        //Guns
        this.gunInventory = [new Gun_M1911(), new Gun_M16(), new Gun_RayGun(), new Gun_L96A1(), new Gun_Olympia()]; //Logic //TODO create a map {Key: GUN_ENUM, Value: Object}
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
        this.points = 500
        //Knife
        this.knifeCooldownUntilAttack = 0
        this.isKnifing = false

        this.left_clickCooldown = 0
        this.reloadAnimationCooldownITR = 0

        this.player_Collision_World_BB = new BoundingBox(
            posX,
            posY,
            PLAYER_BB_DIMENSION * PLAYER_IMAGE_SCALE,
            PLAYER_BB_DIMENSION * PLAYER_IMAGE_SCALE)
        this.playerCollision_Vulnerable_C = new BoundingCircle(posX, posY, PLAYER_BC_RADIUS * PLAYER_IMAGE_SCALE * PLAYER_VULNERABLE_RADIUS_SCALE)
        this.playerCollision_Zombies_C = new BoundingCircle(posX, posY, PLAYER_BC_RADIUS * PLAYER_IMAGE_SCALE)
    };

    update() {
        // console.log(this.hp)
        //Mouse
        this.angle = this.mouseRotationHandler() ;

        //this.currentGun.shoot(GAME_ENGINE.camera.player.posX,GAME_ENGINE.camera.player.posY, this.angle)
        // console.log(this.sprintStamina + "\n" + this.sprintRest)

        //Sprint
        if (GAME_ENGINE.key_run && this.sprintStamina > 0 && !this.sprintRest && this.state !== ANIMATION_Reloading) {
            this.speed = PLAYER_RUNNING_SPEED;

            this.sprintStamina -= PLAYER_STAMINA_USAGE_PER_SEC * GAME_ENGINE.clockTick;
            this.sprintRest = (this.sprintStamina <= 0);
        } else {
            this.speed = PLAYER_WALKING_SPEED;

            if (this.sprintStamina < PLAYER_STAMINA_MAX)
                this.sprintStamina += PLAYER_STAMINA_HEAL_PER_SEC * GAME_ENGINE.clockTick;
            this.sprintRest = (this.sprintStamina < PLAYER_STAMINA_RESTED_THRES);
        }

        //TODO Velocity based movement

        //WASD Move
        if(GAME_ENGINE.key_up || GAME_ENGINE.key_down || GAME_ENGINE.key_left || GAME_ENGINE.key_right) {
            if (this.state !== ANIMATION_Reloading && this.state !== ANIMATION_Shooting && this.state !== ANIMATION_Melee) { //not while reloading or shooting
                this.changeAnimation(ANIMATION_Walking)
            }
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

        if(GAME_ENGINE.left_click) {
            if (this.gunInventory[this.currentGunIndex].shoot(this.posX, this.posY, this.angle)) {
                this.changeAnimation(ANIMATION_Shooting, this.gunInventory[this.currentGunIndex].maxFireCooldown)
            }
        }
        if (GAME_ENGINE.key_reload) {
            if (this.gunInventory[this.currentGunIndex].reload()) {
                this.changeAnimation(ANIMATION_Reloading, this.gunInventory[this.currentGunIndex].reloadTime)
            }
        }
        if (GAME_ENGINE.right_click) {
            if (this.state !== ANIMATION_Melee) {
                this.knifeCooldownUntilAttack = PLAYER_KNIFE_COOLDOWN - 0.45
                this.changeAnimation(ANIMATION_Melee, PLAYER_KNIFE_COOLDOWN)
                this.isKnifing = true
            }
        }
        //Knifing
        if (this.isKnifing && this.knifeCooldownUntilAttack <= 0) {
            this.knife()
            this.isKnifing = false
        } else if (this.knifeCooldownUntilAttack > 0) {
            this.knifeCooldownUntilAttack -= GAME_ENGINE.clockTick
        }
        //key_use is embedded in places that needs it to avoid always checking on update
        //Grenades
        if (GAME_ENGINE.key_grenade) { //TODO check nade count, cooldown via animations
            GAME_ENGINE.addEntity(new Grenade(this.posX, this.posY, this.angle))
        }
        //Grenades
        if (GAME_ENGINE.key_switchGuns) { //TODO check nade count, cooldown via animations
            if (this.gunInventory[this.currentGunIndex + 1] !== 0 && !this.isSwitching) {
                this.currentGunIndex++
                if (this.currentGunIndex === this.gunInventory.length) //loop back to start
                    this.currentGunIndex = 0
                this.isSwitching = true
                this.animator.finishedAnimation = true
                //TODO call gun on equip
                this.gunInventory[this.currentGunIndex].equip()
            }
        } else {
            this.isSwitching = false
        }



        //Gun
        this.gunInventory[this.currentGunIndex].update()

        if(this.animator.isDone()){
            this.state = ANIMATION_Idle
            this.changeAnimation(ANIMATION_Idle)
        }

        this.animationRuntime -= GAME_ENGINE.clockTick

        //Heal
        this.healHandler()
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
        this.player_Collision_World_BB.updateSides();

        //MapObjects
        GAME_ENGINE.ent_MapObjects.forEach((entity) => {
            if (entity instanceof MapBB) { //World collision
                // this.playerCollion_World_R.updateSides()
                // entity.bb.updateSides();
                this.checkBBandPushOut(this.player_Collision_World_BB, this.last_collision_World_R, entity.bb)
            } else
            if (entity instanceof Barrier) { //Barrier
                //movement
                this.checkBBandPushOut(this.player_Collision_World_BB, this.last_collision_World_R, entity.bb)
                //interact
                if (GAME_ENGINE.key_use && this.player_Collision_World_BB.collide(entity.bb_interact)) {
                    entity.use()
                }
            } else if (entity instanceof Door) { //Door
                //movement
                if (entity.isLocked == true) {
                    this.checkBBandPushOut(this.player_Collision_World_BB, this.last_collision_World_R, entity.bb)
                }
                //interact
                if (GAME_ENGINE.key_use && this.player_Collision_World_BB.collide(entity.bb_interact)) {
                    entity.use()
                }
            }
        })
    }

    takeDamage(damage) {
        //dmg
        this.hp -= damage
        //death?
        if (this.hp <= 0) {
            this.alive = false
            this.removeFromWorld = true
        }

        //screenshake
        GAME_ENGINE.camera.startShake(0.5, 15)
        //reset heal cooldown
        this.heal_currentCooldown = PLAYER_HEAL_COOLDOWN;
    }

    healHandler() {
        if (this.heal_currentCooldown <= 0) { //can heal
            if (this.hp < PLAYER_HP_MAX) //less than max hp
                this.hp += PLAYER_HEAL_POINTS * GAME_ENGINE.clockTick; //heal
            this.hp = PLAYER_HP_MAX
        } else { //heal on cooldown
            this.heal_currentCooldown -= GAME_ENGINE.clockTick;
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
                if (knifeBC.collide(entity.bc_Movement) < 0) {
                    entity.takeDamage(PLAYER_KNIFE_DMG, ZOMBIE_DMG_KNIFE)
                    hasKnifed = true
                    GAME_ENGINE.camera.startShake(0.1, 7)
                }
            }
        })
    }

    earnPoints(points) {
        this.points += points
        console.log("+" + points, this.points)
        //TODO 2x Points
        //TODO points number hud
    }

    losePoints(points) {
        this.points -= points
        console.log("-" + points, this.points)
        //TODO points number hud
    }
}

class RaycastExplodePlayer extends RaycastZombies {
    constructor(pairedZombie, damage, type) {
        super(pairedZombie)
        this.destPos = destPos
        this.type = type
        this.damage = damage
        //get rotation
        let dx = destPos[0] - this.posX
        let dy = destPos[1] - this.posY
        this.angle = Math.atan2(dy, dx)
    }

    update() {
        //move (dont deltatime)
        var unitx = Math.cos(this.angle);
        var unity = Math.sin(this.angle);
        this.posX += unitx * this.size * 2
        this.posY += unity * this.size * 2

        //update collision
        this.bb.x = this.posX - (this.size/2)
        this.bb.y = this.posY - (this.size/2)
        this.bb.updateSides()

        //check collide
        GAME_ENGINE.ent_MapObjects.forEach((entity) => {
            if (entity instanceof MapBB) {
                if (this.bb.collide(entity.bb) && !entity.projectilePasses) {
                    this.removeFromWorld = true
                }
            }
        })

        //check if at destination
        if (Math.abs(this.posX - this.destPos[0]) < this.size * 2 && Math.abs(this.posY - this.destPos[1]) < this.size * 2) {
            this.pairedZombie.takeDamage(this.damage, this.type)
            this.removeFromWorld = true
        }
    }

    draw() {
        //NOTHING
        //TODO remove debug
        this.bb.drawBoundingBox("orange")
    }
}
