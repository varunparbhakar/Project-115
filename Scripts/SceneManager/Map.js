class WorldMap {
    /**
     *
     * @param posX from top left
     * @param posY from top left
     */
    constructor(posX, posY, level=null) {
        Object.assign(this, {posX, posY,})
        if (level != null) {
            this.loadLevel(level)
        }
    }

    loadLevel(level) {
        switch (level) {
            case "level1" :
                this.level1()
                break;
            case "level2" :
                this.level2()
                break;
        }
    }

    level1() {
        this.scale = 3.75
        this.playerSpawnX = 500 * this.scale
        this.playerSpawnY = 600 * this.scale
        //MapLayers
        let imagePath_back = "Assets/Images/Map/Levels/Map1.png"
        let asset_back = ASSET_MANAGER.getAsset(imagePath_back)
        GAME_ENGINE.addEntity(new MapLayer_Background(new Animator(asset_back, 0, 0, asset_back.width, asset_back.height, 1, 1, this.scale)))
        let imagePath_shadow = "Assets/Images/Map/Levels/Map1_shadow.png"
        let asset_shadow = ASSET_MANAGER.getAsset(imagePath_shadow)
        GAME_ENGINE.addEntity(new MapLayer_Foreground(new Animator(asset_shadow, 0, 0, asset_shadow.width, asset_shadow.height, 1, 1, this.scale)))
        let imagePath_roof = "Assets/Images/Map/Levels/Map1_roof.png"
        let asset_roof = ASSET_MANAGER.getAsset(imagePath_roof)
        GAME_ENGINE.addEntity(new MapLayer_Foreground(new Animator(asset_roof, 0, 0, asset_roof.width, asset_roof.height, 1, 1, this.scale)))
        ////////////SPAWN ROOM////////////
        //MapBB Walls
        GAME_ENGINE.addEntity(new MapBB(394, 459, 202, 13, this))
        GAME_ENGINE.addEntity(new MapBB(652, 459, 202, 13, this))
        GAME_ENGINE.addEntity(new MapBB(394, 468, 11, 162, this))
        GAME_ENGINE.addEntity(new MapBB(395, 684, 11, 203, this))
        GAME_ENGINE.addEntity(new MapBB(404, 716, 33, 11, this))
        GAME_ENGINE.addEntity(new MapBB(404, 876, 193, 10, this))
        GAME_ENGINE.addEntity(new MapBB(523, 715, 41, 11, this))
        GAME_ENGINE.addEntity(new MapBB(555, 725, 11, 34, this))
        GAME_ENGINE.addEntity(new MapBB(555, 843, 10, 33, this))
        GAME_ENGINE.addEntity(new MapBB(651, 876, 202, 10, this))
        GAME_ENGINE.addEntity(new MapBB(842, 684, 11, 192, this))
        GAME_ENGINE.addEntity(new MapBB(843, 468, 10, 162, this))
        //for objects
        GAME_ENGINE.addEntity(new MapBB(607, 598, 63, 63, this, true)) //table
        GAME_ENGINE.addEntity(new MapBB(405, 468, 63, 54, this)) //bed
        //slanted bench
        GAME_ENGINE.addEntity(new MapBB(461, 776, 18, 18, this))
        GAME_ENGINE.addEntity(new MapBB(471, 788, 18, 18, this))
        GAME_ENGINE.addEntity(new MapBB(483, 801, 18, 18, this))
        //Barriers
        let barrier1N = new Barrier(594, 461, "S", this)
        GAME_ENGINE.addEntity(barrier1N)
        let barrier1W = new Barrier(394, 627, "E", this)
        GAME_ENGINE.addEntity(barrier1W)
        let barrier1S = new Barrier(594, 875, "N", this)
        GAME_ENGINE.addEntity(barrier1S)
        //Spawners
        let spawner1N = new SpawnerBarrier(626, 239, barrier1N, true, this)
        let spawner1W = new SpawnerBarrier(219, 603, barrier1W, true, this)
        let spawner1S = new SpawnerBarrier(602, 1154, barrier1S, true, this)
        let room1Spawners = [spawner1N, spawner1W, spawner1S]
        //WallBuys
        let wb_M14 = new WallBuyTrigger(490, 471, 50, 21, "M14", 500, this)
        let wb_M14T = new WallBuyImage(490, 468, "S", "M14", 4, this)
        GAME_ENGINE.addEntity(wb_M14)
        GAME_ENGINE.addEntity(wb_M14T)
        let wb_Olympia = new WallBuyTrigger(725, 852, 59, 23, "Olympia", 500, this)
        let wb_OlympiaT = new WallBuyImage(725, 870, "S", "Olympia", 4, this)
        GAME_ENGINE.addEntity(wb_Olympia)
        GAME_ENGINE.addEntity(wb_OlympiaT)

        ////////////OUTSIDE////////////
        //MapBB Outer Fences
        GAME_ENGINE.addEntity(new MapBB(854, 459, 156, 11, this, true))
        GAME_ENGINE.addEntity(new MapBB(1071, 458, 132, 12, this, true))
        GAME_ENGINE.addEntity(new MapBB(1194, 470, 12, 184, this, true))
        GAME_ENGINE.addEntity(new MapBB(1196, 718, 11, 160, this, true))
        GAME_ENGINE.addEntity(new MapBB(1073, 875, 130, 10, this, true))
        GAME_ENGINE.addEntity(new MapBB(853, 876, 157, 11, this, true))
        //MapBB Inside "C" structure
        GAME_ENGINE.addEntity(new MapBB(957, 577, 34, 120, this, true))
        GAME_ENGINE.addEntity(new MapBB(950, 698, 40, 73, this))
        GAME_ENGINE.addEntity(new MapBB(996, 580, 88, 27, this, true))
        GAME_ENGINE.addEntity(new MapBB(988, 731, 72, 38, this, true))
        //Barrier
        let barrier2N = new Barrier(1008, 457, "S", this)
        GAME_ENGINE.addEntity(barrier2N)
        let barrier2E = new Barrier(1195, 653, "W", this)
        GAME_ENGINE.addEntity(barrier2E)
        let barrier2S = new Barrier(1008, 872, "N", this)
        GAME_ENGINE.addEntity(barrier2S)
        //Spawners
        let spawner2N = new SpawnerBarrier(1029, 216, barrier2N, false, this)
        let spawner2E = new SpawnerBarrier(1367, 679, barrier2E, false, this)
        let spawner2S = new SpawnerBarrier(1036, 1169, barrier2S, false, this)
        let room2Spawners = [spawner2N, spawner2E, spawner2S]
        //Connecting Door
        let door2W = new Door(843, 626, 10, 60, 1500, room2Spawners, this)
        GAME_ENGINE.addEntity(door2W)

        ////////////Mystery Box////////////
        let mysterybox = new MysteryBox([[700, 472],[998, 608]], 1, this)
        GAME_ENGINE.addEntity(mysterybox)
        ////////////PaP////////////
        let pap = new PackAPunch(857, 468, this)
        GAME_ENGINE.addEntity(pap)

        ////////////Power////////////
        this.powerSwitch = new PowerSwitch(824, 715, "W", this) //20 by 25 px
        GAME_ENGINE.addEntity(this.powerSwitch)
        ////////////Perks////////////
        let perkJug = new PerkMachine(852, 838, 47, 39, "Juggernog", this)
        GAME_ENGINE.addEntity(perkJug)
        let perkSpeed = new PerkMachine(988, 702, 35, 31, "Speed Cola", this)
        GAME_ENGINE.addEntity(perkSpeed)
        let perkStam = new PerkMachine(526, 846, 31, 30, "Stamin-Up", this)
        GAME_ENGINE.addEntity(perkStam)
        let perk2x = new PerkMachine(435, 490, 32, 32, "Double Tap", this)
        GAME_ENGINE.addEntity(perk2x)
        let perkQuick = new PerkMachine(607, 614, 37, 38, "Quick Revive", this)
        GAME_ENGINE.addEntity(perkQuick)

        ////////////Player///////////
        this.player = new Player(this.playerSpawnX,this.playerSpawnY);
        GAME_ENGINE.addEntity(this.player)

        ////////////HUD///////////
        this.hud = new HUD();
        GAME_ENGINE.addEntity(this.hud)

        ////////////ROUND MANAGER////////////
        this.roundManager = new RoundManager(room1Spawners)
        GAME_ENGINE.addEntity(this.roundManager)
        this.roundManager.start()
    }

    level2() {
        this.scale = 4.25
        this.playerSpawnX = 1175 * this.scale
        this.playerSpawnY = 1244 * this.scale
        //MapLayers
        let imagePath_back = "Assets/Images/Map/Levels/DLC1.png"
        let asset_back = ASSET_MANAGER.getAsset(imagePath_back)
        GAME_ENGINE.addEntity(new MapLayer_Background(new Animator(asset_back, 0, 0, asset_back.width, asset_back.height, 1, 1, this.scale)))
        ////////////Top Left Near Double Tap/////////
        GAME_ENGINE.addEntity(new MapBBPlayerOnly(683, 491, 136, 262, this)) //A1 //TODO Player only
        GAME_ENGINE.addEntity(new MapBB(682, 492, 439, 8, this, true)) //Top Fence
        GAME_ENGINE.addEntity(new MapBB(1196, 492, 102, 9, this)) //Top Fence Right
        GAME_ENGINE.addEntity(new MapBB(1212, 492, 54, 199, this)) //Top Fence Right Big
        GAME_ENGINE.addEntity(new MapBB(686,493,10,258, this)) //Top Fence left big fence
        GAME_ENGINE.addEntity(new MapBB(801,685,34,7, this, true)) //Small fence knob

        GAME_ENGINE.addEntity(new MapBB(552, 756, 142, 57, this)) //Double Tap Bottom
        GAME_ENGINE.addEntity(new MapBBPlayerOnly(567, 812, 50, 171, this)) //Double Tap Bottom Car Trees
        GAME_ENGINE.addEntity(new MapBB(609, 862, 34, 48, this)) //Double Tap Bottom Car
        GAME_ENGINE.addEntity(new MapBB(614,913, 29,146, this)) //Double Tap Bottom Tree from bottom of red car
        GAME_ENGINE.addEntity(new MapBBPlayerOnly(641,952,75,85, this)) //Double Tap Bottom, from car to the right, tree
        GAME_ENGINE.addEntity(new MapBB(640, 919,42,39, this)) //Double Tap Bottom
        GAME_ENGINE.addEntity(new MapBBPlayerOnly(713,981,29,51, this)) //Double Tap Bottom
        GAME_ENGINE.addEntity(new MapBB(683,747,138,10, this)) //Double Tap bottom left


        GAME_ENGINE.addEntity(new MapBBPlayerOnly(828, 1018, 137,70, this)) //Middle Map
        GAME_ENGINE.addEntity(new MapBB(913,971,48,160, this)) //Middle Map Boxes and Tree
        GAME_ENGINE.addEntity(new MapBBPlayerOnly(812,970,103,47, this)) //Middle Map, Tree
        GAME_ENGINE.addEntity(new MapBB(965,1061, 24, 123, this)) //Middle Map, Boxes near PaP
        GAME_ENGINE.addEntity(new MapBB(848,1084, 86,54, this)) //Middle Map, Bottom Middle Tree
        GAME_ENGINE.addEntity(new MapBB(1004, 1100, 9,90, this)) //Middle Map, Fencer near the pap
        GAME_ENGINE.addEntity(new MapBB(1004, 1100, 56,8, this)) //Middle Map, Fencer Top near PAp
        GAME_ENGINE.addEntity(new MapBB(587,1018,11,255, this)) //Middle Map, Left Map Boundry
        GAME_ENGINE.addEntity(new MapBB(587,1033, 56,25, this)) //Middle Map, Left Boundry Coverage Tree
        GAME_ENGINE.addEntity(new MapBB(1083, 1133, 41,6, this)) //Middle Map, Fence Above Pap


        GAME_ENGINE.addEntity(new MapBB(1193,692,38,43, this)) //Car
        GAME_ENGINE.addEntity(new MapBB(1169,708,25,28, this)) //Car
        GAME_ENGINE.addEntity(new MapBB(1145,719,24,26, this)) //Car
        GAME_ENGINE.addEntity(new MapBB(1125,726,20,25, this)) //Car
        GAME_ENGINE.addEntity(new MapBB(1113,734,12,61, this)) //Car
        GAME_ENGINE.addEntity(new MapBB(1047,783,78,45, this)) //Rock
        GAME_ENGINE.addEntity(new MapBB(1038,808,10,48, this)) //Rock
        GAME_ENGINE.addEntity(new MapBB(1027,845,11,42, this)) //Rock

        GAME_ENGINE.addEntity(new MapBB(1017,868,11,34, this)) //Rock
        GAME_ENGINE.addEntity(new MapBB(1025,902,45,20, this)) //Rock
        // GAME_ENGINE.addEntity(new MapBB(1013,922,33,104, this)) //Rock
        GAME_ENGINE.addEntity(new MapBB(1060,936,112,22, this)) //Rock
        GAME_ENGINE.addEntity(new MapBB(1077,959,68,13, this)) //Rock
        GAME_ENGINE.addEntity(new MapBB(1090,972,34,9, this)) //Rock
        GAME_ENGINE.addEntity(new MapBB(1188,966,23,24, this)) //Boxes Bottom Right of Rock
        GAME_ENGINE.addEntity(new MapBB(1171,918,88,48, this)) //Boxes Bottom Right of Rock

        GAME_ENGINE.addEntity(new MapBB(939,540,10,281, this, true)) //Fence between Double Tap and the rock
        GAME_ENGINE.addEntity(new MapBB(876,748,72,9, this)) //Fence between Double Tap and the rock

        GAME_ENGINE.addEntity(new MapBB(1260,817,8,325, this)) //Juggernaut Room Boundry
        GAME_ENGINE.addEntity(new MapBB(1259,817,201,10, this)) //Juggernaut Room Boundry
        GAME_ENGINE.addEntity(new MapBB(1515,811,74,11, this)) //Jugg Wall Between 2 barriers
        GAME_ENGINE.addEntity(new MapBB(1644,812,41,8, this)) //Juggernaut Room Boundry
        GAME_ENGINE.addEntity(new MapBB(1676,817,8,324, this)) //Juggernaut Room Boundry
        GAME_ENGINE.addEntity(new MapBB(1611,974,10,167, this)) //Juggernaut Room Boundry
        GAME_ENGINE.addEntity(new MapBB(1611,876,66,10, this)) //Juggernaut Room Boundry
        GAME_ENGINE.addEntity(new MapBB(1388,875,169,11, this)) //Juggernaut Room Boundry
        GAME_ENGINE.addEntity(new MapBB(1420,973,200,40, this)) //Juggernaut Room Boundry, Top of the barrier
        GAME_ENGINE.addEntity(new MapBB(1420,1070,50,40, this)) //Juggernaut Room Boundry, Bottom of the barrier
        GAME_ENGINE.addEntity(new MapBB(1391,964,25,59, this, true)) //Juggernaut Room weird table near barrier

        GAME_ENGINE.addEntity(new MapBB(1357,1100,150,11, this)) //Juggernaut Room Boundry
        GAME_ENGINE.addEntity(new MapBB(1564,1100,51,9, this)) //Juggernaut Room Boundry
        // GAME_ENGINE.addEntity(new MapBB(1261,1057,9,84, this)) //Juggernaut Room Boundry
        GAME_ENGINE.addEntity(new MapBB(1357,1100,9,40, this)) //Juggernaut Room Boundry
        GAME_ENGINE.addEntity(new MapBB(1324,1134,41,9, this)) //Juggernaut Room Boundry

        GAME_ENGINE.addEntity(new MapBB(1676,1131,76,11, this)) //Right Side of Jugg near the lava
        GAME_ENGINE.addEntity(new MapBB(1741,1131,7,90, this)) //Right side of jugg up to the barrier

        GAME_ENGINE.addEntity(new MapBB(864,1208,16,11, this)) //taxi
        GAME_ENGINE.addEntity(new MapBB(845,1200,20,17, this)) //taxi
        GAME_ENGINE.addEntity(new MapBB(820,1188,25,30, this)) //taxi
        GAME_ENGINE.addEntity(new MapBB(824,1216,63,43, this)) //taxi
        GAME_ENGINE.addEntity(new MapBB(785,1172,35,10, this)) //taxi
        GAME_ENGINE.addEntity(new MapBB(748,1182,79,75, this)) //fence and taxi
        GAME_ENGINE.addEntity(new MapBB(604,1578,51,93, this)) //pool table
        GAME_ENGINE.addEntity(new MapBB(843,1483,31,10, this)) //right wall of bar
        GAME_ENGINE.addEntity(new MapBB(874,1444,11,232, this)) //right wall of bar
        GAME_ENGINE.addEntity(new MapBB(850,1602,21,27, this, true)) //right bottom box of bar
        GAME_ENGINE.addEntity(new MapBB(875,1270,10,102, this)) //top right wall of bar
        GAME_ENGINE.addEntity(new MapBB(650,1313,169,11, this, true)) //top table of bar top chairs
        GAME_ENGINE.addEntity(new MapBB(650,1356,170,12, this, true)) //top table of bar bottom chairs
        GAME_ENGINE.addEntity(new MapBBPlayerOnly(641,1324,188,31, this, true)) //top table of bar
        // GAME_ENGINE.addEntity(new MapBB(703,1271,67,42, this, true)) //top bench of bar
        GAME_ENGINE.addEntity(new MapBB(675,1259,209,11, this)) //top wall of bar
        GAME_ENGINE.addEntity(new MapBB(556,1260,80,11, this)) //top left wall of bar
        GAME_ENGINE.addEntity(new MapBB(586,1260,11,89, this)) //top left wall of bar
        GAME_ENGINE.addEntity(new MapBB(596,1484,32,10, this)) //left wall of bar protrude
        GAME_ENGINE.addEntity(new MapBB(587,1404,10,121, this)) //left wall of bar
        GAME_ENGINE.addEntity(new MapBB(587,1580,10,95, this)) //Wall left of pool
        GAME_ENGINE.addEntity(new MapBB(588,1675,160,10, this)) //Wall behind Stam
        GAME_ENGINE.addEntity(new MapBB(747,1676,10,168, this)) //Block behind Quick
        GAME_ENGINE.addEntity(new MapBB(587,1836,106,80, this)) //Bushes behind Quick window
        GAME_ENGINE.addEntity(new MapBB(812,1675,72,169, this)) //Block behind Quick

        GAME_ENGINE.addEntity(new MapBB(1739,1275,10,112, this)) //middle right fences
        GAME_ENGINE.addEntity(new MapBB(1649,1387,98,10, this)) //middle right fences
        GAME_ENGINE.addEntity(new MapBB(1570,1312,61,10, this)) //museum Top white truck
        GAME_ENGINE.addEntity(new MapBB(1523,1321,110,18, this)) //museum Top white truck
        GAME_ENGINE.addEntity(new MapBB(1450,1334,185,18, this)) //museum Top white truck
        GAME_ENGINE.addEntity(new MapBB(1430,1342,210,48, this)) //museum Top white truck
        GAME_ENGINE.addEntity(new MapBB(1427,1387,225,42, this)) //museum Top white truck
        GAME_ENGINE.addEntity(new MapBB(1204,1497,49,51, this)) //museum black car
        GAME_ENGINE.addEntity(new MapBB(1142,1490,63,50, this)) //museum black car
        GAME_ENGINE.addEntity(new MapBB(1118,1675,84,51, this)) //museum white truck
        GAME_ENGINE.addEntity(new MapBB(1091,1666,27,25, this)) //museum white truck
        GAME_ENGINE.addEntity(new MapBB(1067,1652,24,22, this)) //museum white truck
        GAME_ENGINE.addEntity(new MapBB(1046,1637,25,19, this)) //museum white truck
        GAME_ENGINE.addEntity(new MapBB(1081,1726,119,24, this)) //museum white truck
        GAME_ENGINE.addEntity(new MapBB(1060,1705,36,21, this)) //museum white truck
        GAME_ENGINE.addEntity(new MapBB(1043,1700,26,17, this)) //museum white truck
        GAME_ENGINE.addEntity(new MapBB(1023,1690,27,19, this)) //museum white truck
        GAME_ENGINE.addEntity(new MapBB(1006,1673,35,24, this)) //museum white truck
        GAME_ENGINE.addEntity(new MapBB(1018,1651,23,22, this)) //museum white truck
        GAME_ENGINE.addEntity(new MapBB(1028,1631,20,20, this)) //museum white truck
        GAME_ENGINE.addEntity(new MapBB(1209,1432,22,27, this)) //museum top left box wall
        GAME_ENGINE.addEntity(new MapBB(1205,1420,95,9, this)) //museum TOP left wall
        GAME_ENGINE.addEntity(new MapBB(1195,1420,10,72, this)) //museum top LEFT wall
        GAME_ENGINE.addEntity(new MapBB(1355,1418,169,11, this)) //museum top RIGHT wall
        GAME_ENGINE.addEntity(new MapBB(1195,1548,10,129, this)) //Wall Speed
        GAME_ENGINE.addEntity(new MapBB(1084,1750,116,53, this)) //White Truck in Bushes
        GAME_ENGINE.addEntity(new MapBB(1200,1676,90,127, this)) //White Truck in Bushes
        GAME_ENGINE.addEntity(new MapBB(1291,1740,10,63, this)) //White Truck in Bush Wall
        GAME_ENGINE.addEntity(new MapBB(1050,1803,250,10, this)) //White Truck in Bush Fence
        GAME_ENGINE.addEntity(new MapBB(1451,1506,64,93, this)) //Green Acid Statue
        GAME_ENGINE.addEntity(new MapBB(1429,1598,86,16, this)) //Green Acid Statue Arm
        GAME_ENGINE.addEntity(new MapBB(1457,1431,58,30, this)) //Green Acid Boxes
        GAME_ENGINE.addEntity(new MapBB(1515,1420,10,232, this)) //Green Acid Wall
        GAME_ENGINE.addEntity(new MapBB(1515,1739,128,10, this)) //Leaking Pipe Wall
        GAME_ENGINE.addEntity(new MapBB(1643,1739,10,42, this)) //Leaking Pipe Wall
        GAME_ENGINE.addEntity(new MapBB(1643,1868,9,160, this)) //Bushes Wall
        GAME_ENGINE.addEntity(new MapBB(1252,1934,50,108, this)) //Bushes Wall
        GAME_ENGINE.addEntity(new MapBB(1301,2027,351,10, this)) //Bushes Wall
        // GAME_ENGINE.addEntity(new MapBBPlayerOnly(1564,1748,79,132, this)) //Cracked pipes
        GAME_ENGINE.addEntity(new MapBBPlayerOnly(1300,1887,169,140, this)) //Bushes
        GAME_ENGINE.addEntity(new MapBBPlayerOnly(1469,1879,176,149, this)) //Bushes
        GAME_ENGINE.addEntity(new MapBB(1291,1867,10,52, this)) //White Truck museum wall
        GAME_ENGINE.addEntity(new MapBB(1249,1919,51,16, this)) //White Truck museum
        GAME_ENGINE.addEntity(new MapBB(1232,1935,60,19, this)) //White Truck museum

        GAME_ENGINE.addEntity(new MapBB(1059,1974,54,14, this)) //Rock
        GAME_ENGINE.addEntity(new MapBB(1112,1962,19,26, this)) //Rock
        GAME_ENGINE.addEntity(new MapBB(1130,1954,126,35, this)) //Rock
        GAME_ENGINE.addEntity(new MapBB(979,2017,41,19, this)) //Rock
        GAME_ENGINE.addEntity(new MapBB(1020,1997,11,39, this)) //Rock
        GAME_ENGINE.addEntity(new MapBB(1031,1988,224,48, this)) //Rock
        GAME_ENGINE.addEntity(new MapBB(960,2036,346,112, this)) //Rock
        GAME_ENGINE.addEntity(new MapBB(873,1975,52,9, this)) //Blue Truck
        GAME_ENGINE.addEntity(new MapBB(787,1961,58,10, this)) //Blue Truck
        GAME_ENGINE.addEntity(new MapBB(783,1970,90,14, this)) //Blue Truck
        GAME_ENGINE.addEntity(new MapBB(782,1981,182,84, this)) //Blue Truck
        GAME_ENGINE.addEntity(new MapBB(724,1986,57,61, this)) //Orange Car
        GAME_ENGINE.addEntity(new MapBB(671,1977,53,53, this)) //Orange Car
        GAME_ENGINE.addEntity(new MapBB(595,1956,75,63, this)) //Orange Car
        GAME_ENGINE.addEntity(new MapBB(586,1840,10,162, this)) //Fence left bottom most


        ////////////Room: Bottom Left////////////
        //Barriers
        let barrier_BLBar = new Barrier(691, 1833, "S", this)
        GAME_ENGINE.addEntity(barrier_BLBar)
        //Spawners
        let spawner_BLBar = new SpawnerBarrier(570, 1706, barrier_BLBar, false, this, 620)
        let spawner_BLOrange1 = new SpawnerDest(419, 2211, 623, 1932, false, this, 630)
        let spawner_BLOrange2 = new SpawnerDest(528, 2335, 623, 1932, false, this, 630)
        let spawner_BLBlue1 = new SpawnerDest(703, 2302, 775, 1943, false, this, 600)
        let spawner_BLBlue2 = new SpawnerDest(875, 2297, 993, 1980, false, this, 600)
        let spawner_BLWhite1 = new SpawnerDest(1346, 2230, 16, 10, false, this, 520)
        let spawners_BL = [spawner_BLBar, spawner_BLOrange1, spawner_BLOrange2, spawner_BLBlue1, spawner_BLBlue2, spawner_BLWhite1]

        ////////////Room: Museum////////////
        //Barriers
        let barrier_MusLeakPipe = new Barrier(1645, 1780, "W", this)
        let barrier_Statue = new Barrier(1516, 1651, "W", this)
        GAME_ENGINE.addEntity(barrier_MusLeakPipe)
        GAME_ENGINE.addEntity(barrier_Statue)
        //Spawners
        let spawner_MusBush1 = new SpawnerDest(1400, 1965, 1401, 1877, false, this, 550)
        let spawner_MusBush2 = new SpawnerDest(1561, 1949, 1547, 1869, false, this, 550)
        let spawner_MusLeakPipe1 = new SpawnerBarrier(1867, 1807, barrier_MusLeakPipe, false, this, 800)
        let spawner_MusLeakPipe2 = new SpawnerBarrier(1853, 1907, barrier_MusLeakPipe, false, this, 800)
        let spawner_MusStatue1 = new SpawnerBarrier(1833, 1584, barrier_Statue, false, this, 800)
        let spawner_MusStatue2 = new SpawnerBarrier(1850, 1668, barrier_Statue, false, this, 800)
        let spawner_MusStatueG = new SpawnerGroundDig(1436, 1473, false, this, 550)
        let spawners_Mus = [spawner_MusBush1, spawner_MusBush2, spawner_MusLeakPipe1, spawner_MusLeakPipe2, spawner_MusStatue1, spawner_MusStatue2, spawner_MusStatueG]

        ////////////Room: Bar////////////
        //Barriers
        let barrier_BarTop = new Barrier(588, 1348, "E", this)
        let barrier_BarBottom = new Barrier(588, 1524, "E", this)
        GAME_ENGINE.addEntity(barrier_BarTop)
        GAME_ENGINE.addEntity(barrier_BarBottom)
        //Spawners
        let spawner_BarW1 = new SpawnerBarrier(249, 1260, barrier_BarTop, false, this, 700)
        let spawner_BarW2 = new SpawnerBarrier(213, 1357, barrier_BarTop, false, this, 700)
        let spawner_BarW3 = new SpawnerBarrier(211, 1467, barrier_BarBottom, false, this, 700)
        let spawner_BarW4 = new SpawnerBarrier(211, 1627, barrier_BarBottom, false, this, 700)
        let spawners_Bar = [spawner_BarW1, spawner_BarW2, spawner_BarW3, spawner_BarW4]

        ////////////Room: Spawn Area PaP////////////
        //Barriers
        let barrier_SpawnE = new Barrier(1741, 1221, "W", this)
        let barrier_SpawnJug = new Barrier(1508, 1101, "S", this)
        GAME_ENGINE.addEntity(barrier_SpawnE)
        GAME_ENGINE.addEntity(barrier_SpawnJug)
        //Spawners
        let spawner_SpawnE1 = new SpawnerBarrier(1945, 1073, barrier_SpawnE, true, this, 800)
        let spawner_SpawnE2 = new SpawnerBarrier(1965, 1200, barrier_SpawnE, true, this, 800)
        let spawner_SpawnE3 = new SpawnerBarrier(1976, 1334, barrier_SpawnE, true, this, 800)
        let spawner_SpawnGWhite = new SpawnerGroundDig(1154, 1637, true, this, 600)
        let spawner_SpawnGLamp = new SpawnerGroundDig(916, 1557, true, this, 600)
        let spawner_SpawnGRockBox = new SpawnerGroundDig(1233, 977, true, this, 600)
        let spawner_SpawnJug = new SpawnerBarrier(1584, 1027, barrier_SpawnJug, true, this, 600)
        let spawners_Spawn = [spawner_SpawnE1, spawner_SpawnE2, spawner_SpawnE3, spawner_SpawnGWhite, spawner_SpawnGLamp, spawner_SpawnGRockBox, spawner_SpawnJug]

        ////////////Room: Jug Room////////////
        //Barriers
        let barrier_JugBottom = new Barrier(1420, 1012, "W", this)
        let barrier_JugTopLeft = new Barrier(1460, 812, "S", this)
        let barrier_JugTopRight = new Barrier(1588, 812, "S", this)
        GAME_ENGINE.addEntity(barrier_JugBottom)
        GAME_ENGINE.addEntity(barrier_JugTopLeft)
        GAME_ENGINE.addEntity(barrier_JugTopRight)
        //Spawners
        let spawner_JugBottom = new SpawnerBarrier(1513, 1020, barrier_JugBottom, false, this, 380)
        let spawner_JugTop1 = new SpawnerBarrier(1347, 656, barrier_JugTopLeft, false, this, 400)
        let spawner_JugTop2 = new SpawnerBarrier(1512, 697, barrier_JugTopLeft, false, this, 440)
        let spawner_JugTop3 = new SpawnerBarrier(1588, 718, barrier_JugTopRight, false, this, 440)
        let spawner_JugTop4 = new SpawnerBarrier(1713, 666, barrier_JugTopRight, false, this, 700)
        let spawners_Jug = [spawner_JugBottom, spawner_JugTop1, spawner_JugTop2, spawner_JugTop3, spawner_JugTop4]

        ////////////Room: Double Tap Room (Park)////////////
        //Spawners
        let spawner_DoubleTrees1 = new SpawnerDest(753, 534, 845, 563, false, this)
        let spawner_DoubleTrees2 = new SpawnerDest(745, 648, 830, 653, false, this)
        let spawners_DoubleTap = [spawner_DoubleTrees1, spawner_DoubleTrees2]

        ////////////Room: Swamp////////////
        //Barriers
        let barrier_SwampTopLeft = new Barrier(963, 494, "S", this)
        let barrier_SwampTopRight = new Barrier(1123, 493, "S", this)
        GAME_ENGINE.addEntity(barrier_SwampTopLeft)
        GAME_ENGINE.addEntity(barrier_SwampTopRight)
        //Spawners
        let spawner_SwampTopLeft1 = new SpawnerBarrier(864, 218, barrier_SwampTopLeft, false, this, 850)
        let spawner_SwampTopLeft2 = new SpawnerBarrier(1046, 208, barrier_SwampTopLeft, false, this, 850)
        let spawner_SwampTopRight1 = new SpawnerBarrier(1198, 222, barrier_SwampTopRight, false, this, 850)
        let spawner_SwampTopRight2 = new SpawnerBarrier(1334, 280, barrier_SwampTopRight, false, this, 850)
        let spawner_SwampLeft1 = new SpawnerDest(336, 822, 641, 857, false, this, 600)
        let spawner_SwampLeft2 = new SpawnerDest(417, 651, 638, 855, false, this, 600)
        let spawner_SwampTreesLeft = new SpawnerGroundDig(653, 979, false, this, 300)
        let spawner_SwampTreesRight = new SpawnerGroundDig(899, 1050, false, this, 300)
        let spawner_SwampBottomLeft = new SpawnerGroundDig(586, 1212, false, this, 500)
        let spawners_Swamp = [spawner_SwampTopLeft1, spawner_SwampTopLeft2, spawner_SwampTopRight1, spawner_SwampTopRight2, spawner_SwampLeft1, spawner_SwampLeft2, spawner_SwampTreesLeft, spawner_SwampTreesRight, spawner_SwampBottomLeft]

        ////////////Doors////////////
        let door_Jug1 = new Door(1268, 1132, 56, 8, 1250, spawners_Jug, this)
        GAME_ENGINE.addEntity(door_Jug1)
        let door_Jug2 = new Door(1621, 1128, 54, 11, 1250, spawners_Jug, this)
        GAME_ENGINE.addEntity(door_Jug2)

        let door_Mus1 = new Door(1299, 1420, 56, 10, 1250, spawners_Mus, this)
        GAME_ENGINE.addEntity(door_Mus1)
        let door_Mus2 = new Door(1291, 1812, 10, 56, 1250, [spawners_Mus, spawners_BL], this)
        GAME_ENGINE.addEntity(door_Mus2)

        let door_BL1 = new Door(884, 1631, 147, 56, 1250, spawners_BL, this)
        GAME_ENGINE.addEntity(door_BL1)

        let door_Bar1 = new Door(756, 1676, 57, 15, 1000, [spawners_Swamp, spawners_Bar], this)
        GAME_ENGINE.addEntity(door_Bar1)
        let door_Bar2 = new Door(874, 1371, 11, 73, 2500, spawners_Bar, this)
        GAME_ENGINE.addEntity(door_Bar2)
        let door_Bar3 = new Door(756, 1676, 57, 15, 1000, [spawners_BL, spawners_Bar], this)
        GAME_ENGINE.addEntity(door_Bar3)

        let door_Swamp1 = new Door(964, 938, 115, 61, 1250, spawners_Swamp, this)
        GAME_ENGINE.addEntity(door_Swamp1)
        let door_Swamp2 = new Door(859, 1122, 32, 91, 1250, spawners_Swamp, this)
        GAME_ENGINE.addEntity(door_Swamp2)

        let door_Double1 = new Door(941, 499, 6, 42, 2000, [spawners_Swamp, spawners_DoubleTap], this)
        GAME_ENGINE.addEntity(door_Double1)
        let door_Double2 = new Door(820, 748, 56, 9, 2000, [spawners_Swamp, spawners_DoubleTap], this)
        GAME_ENGINE.addEntity(door_Double2)

        ////////////Power////////////
        this.powerSwitch = new PowerSwitch(595, 1430, "E", this)
        GAME_ENGINE.addEntity(this.powerSwitch)
        ////////////Perk Machines///////////
        GAME_ENGINE.addEntity(new PerkMachine(888, 1805, 38, 40, "Quick Revive", this))
        GAME_ENGINE.addEntity(new PerkMachine(671, 1646, 47, 25, "Stamin-Up", this))
        GAME_ENGINE.addEntity(new PerkMachine(1206, 1618, 32, 50, "Speed Cola", this))
        GAME_ENGINE.addEntity(new PerkMachine(1275, 822, 44, 46, "Juggernog", this))
        GAME_ENGINE.addEntity(new PerkMachine(909, 674, 32, 47, "Double Tap", this))

        ////////////MysteryBox///////////
        GAME_ENGINE.addEntity(new MysteryBox([[797, 1270], [861, 498], [1431, 881], [1226, 1428]], 3, this))

        ///////////PaP///////////
        GAME_ENGINE.addEntity(new PackAPunch(1073, 1142, this))

        ////////////Player///////////
        this.player = new Player(this.playerSpawnX,this.playerSpawnY);
        GAME_ENGINE.addEntity(this.player)

        ////////////HUD///////////
        this.hud = new HUD();
        GAME_ENGINE.addEntity(this.hud)

        ////////////ROUND MANAGER////////////
        this.roundManager = new RoundManager(spawners_Spawn)
        GAME_ENGINE.addEntity(this.roundManager)
        this.roundManager.start()
    }
}

class MapLayer {
    constructor(animator) {
        this.animator = animator
    }

    update() {

    }

    draw() {
        this.animator.drawFrame(0,0)
    }
}

class MapLayer_Background extends MapLayer {
    constructor(animator) { super(animator)}
}

class MapLayer_Foreground extends MapLayer {
    constructor(animator) { super(animator) }
}

class MapBB {
    constructor(posX, posY, width, height, map, projectilePasses = false) {
        this.bb = new BoundingBox(
            (map.posX + posX) * map.scale,
            (map.posY + posY) * map.scale,
            width * map.scale,
            height * map.scale
        )
        this.projectilePasses = projectilePasses
        this.bb.updateSides()
    }

    update() {
        //NOTHING
    }

    draw() {
        //TODO debug only
        this.bb.drawBoundingBox()
    }
}

class MapBBPlayerOnly {
    constructor(posX, posY, width, height, map, projectilePasses = true) {
        this.bb = new BoundingBox(
            (map.posX + posX) * map.scale,
            (map.posY + posY) * map.scale,
            width * map.scale,
            height * map.scale
        )
        this.projectilePasses = projectilePasses
        this.bb.updateSides()
    }

    update() {
        //NOTHING
    }

    draw() {
        //TODO debug only
        this.bb.drawBoundingBox("blue")
    }
}

/**
 * One way-able MapBB
 */
// class MapBBSided extends MapBB {
//     constructor(posX, posY, width, height, map, sides=["N","E","S","W"]) {
//         super(posX, posY, width, height, map)
//         this.sides = sides
//         this.isCurrentlyIn = false
//         this.bb.updateSides()
//     }
//
//     update() {
//
//     }
//
//     draw() {
//         this.bb.drawBoundingBox()
//     }
// }

const BARRIER_LONG = 60
const BARRIER_SHORT = 10
const BARRIER_IMAGE_DIMENSIONS = 260
const BARRIER_IMAGE_FRAMES = 6
const BARRIER_ADDITIONAL_INTERACT_SHORT = 14
BARRIER_ADDITIONAL_INTERACT_LONG = 10
const BARRIER_ARRIVAL_OFFSET = 40
const BARRIER_MAX_HP = 5 //in secs
class Barrier {
    /**
     * facing means this is facing the player, the zombies come from behind ("N","E","S","W")
     * has bb for collision, and bb_interact for hurt/use
     *
     * zombie arrival point [x,y] world coords for spawning
     */
    constructor(posX, posY, facing, map) {
        //define bbs
        switch (facing) {
            case "N":
            case "S":
                this.bb = new BoundingBox(
                    (map.posX + posX) * map.scale,
                    (map.posY + posY) * map.scale,
                    BARRIER_LONG * map.scale,
                    BARRIER_SHORT * map.scale
                )
                this.bb_interact = new BoundingBox(
                    (map.posX - (BARRIER_ADDITIONAL_INTERACT_LONG/2) + posX) * map.scale,
                    (map.posY - (BARRIER_ADDITIONAL_INTERACT_SHORT/2) + posY) * map.scale,
                    (BARRIER_LONG + BARRIER_ADDITIONAL_INTERACT_LONG) * map.scale,
                    (BARRIER_SHORT + BARRIER_ADDITIONAL_INTERACT_SHORT) * map.scale
                )
                break;
            case "E":
            case "W":
                this.bb = new BoundingBox(
                    (map.posX + posX) * map.scale,
                    (map.posY + posY) * map.scale,
                    BARRIER_SHORT * map.scale,
                    BARRIER_LONG * map.scale
                )
                this.bb_interact = new BoundingBox(
                    (map.posX - (BARRIER_ADDITIONAL_INTERACT_SHORT/2) + posX) * map.scale,
                    (map.posY - (BARRIER_ADDITIONAL_INTERACT_LONG/2) + posY) * map.scale,
                    (BARRIER_SHORT + BARRIER_ADDITIONAL_INTERACT_SHORT) * map.scale,
                    (BARRIER_LONG + BARRIER_ADDITIONAL_INTERACT_LONG) * map.scale
                )
                break;
        }
        this.bb.updateSides()
        this.bb_interact.updateSides()

        //zombie arrival point [x,y] world coords
        // this.zombieArrivalPoint = this.bb.getCenteredPos()
        let tempCenter = this.bb.getCenteredPos()
        let tempOffset = (BARRIER_ARRIVAL_OFFSET * map.scale)
        switch (facing) {
            case "N":
                this.zombieArrivalPoint = [tempCenter[0], tempCenter[1] - tempOffset]
                break
            case "S":
                this.zombieArrivalPoint = [tempCenter[0], tempCenter[1] + tempOffset]
                break
            case "E":
                this.zombieArrivalPoint = [tempCenter[0] + tempOffset, tempCenter[1]]
                break
            case "W":
                this.zombieArrivalPoint = [tempCenter[0] - tempOffset, tempCenter[1]]
                break
        }

        //Animator
        this.asset = ASSET_MANAGER.getAsset("Assets/Images/Map/Barrier_Spritesheet.png")
        this.scale = map.scale
        switch (facing) { //TODO debug this, untested
            case "N":
                this.angle = getDegreesToRadians(90)
                break
            case "S":
                this.angle = getDegreesToRadians(270)
                break
            case "E":
                this.angle = getDegreesToRadians(180)
                break
            case "W":
                this.angle = 0
                break
        }


        //Stats
        this.hp = BARRIER_MAX_HP


        // this.animator = new AnimatorRotateOnce(this.asset, 0,0, BARRIER_IMAGE_DIMENSIONS, BARRIER_IMAGE_DIMENSIONS, this.angle, 6, this.scale)

        this.animator = new AnimatorRotate(this.asset, 0, 0, BARRIER_IMAGE_DIMENSIONS, BARRIER_IMAGE_DIMENSIONS, 6, 1, 1, 1) //TODO this is hard coded scale based on img size of 260
    }

    update() {

    }

    draw() {
        // this.animator.changeRotationAndDraw(this.angle, Math.ceil(5 - this.hp), this.bb.x, this.bb.y)


        // GAME_ENGINE.ctx.save();
        // GAME_ENGINE.ctx.drawImage(
        //     this.asset,
        //     Math.ceil(5 - this.hp) * BARRIER_IMAGE_DIMENSIONS, 0,
        //     BARRIER_IMAGE_DIMENSIONS, BARRIER_IMAGE_DIMENSIONS,
        //     this.bb.x - GAME_ENGINE.camera.posX,
        //     this.bb.y - GAME_ENGINE.camera.posY,
        //     this.scale * BARRIER_IMAGE_DIMENSIONS, this.scale * BARRIER_IMAGE_DIMENSIONS
        // )
        // GAME_ENGINE.ctx.restore();

        let temp = this.bb.getCenteredPos()
        this.animator.drawFrame(temp[0], temp[1], this.angle)
        this.animator.elaspedTime = Math.ceil(BARRIER_MAX_HP - this.hp)

        this.bb.drawBoundingBox("red")
        this.bb_interact.drawBoundingBox("green")
    }

    /**
     * Call each frame in hurtbox to start damaging
     */
    takeDamage() {
        this.hp -= GAME_ENGINE.clockTick
        if (this.hp < 0) { //clamp
            this.hp = 0
        }
        // console.log(this.hp)
    }

    /**
     * Call each frame in hurtbox to start repairing
     */
    use() {
        this.oldBarrierHP = Math.floor(this.hp)
        this.hp += GAME_ENGINE.clockTick
        if (this.hp > BARRIER_MAX_HP) { //clamp
            this.hp = BARRIER_MAX_HP
        }
        if(Math.floor(this.oldBarrierHP) != Math.floor(this.hp)) {
            GAME_ENGINE.camera.startShake(0.1, 5)
            GAME_ENGINE.ent_Player.earnPoints(10) //TODO round cap
            //TODO audio trigger
        }
    }

    hudText() {
        if (this.hp < BARRIER_MAX_HP) {
            GAME_ENGINE.camera.map.hud.bottomMiddleInteract.displayText("Hold F to repair")
        }
    }
}

/**
 * For organizing Collisions
 */
class MapInteract {
    constructor() {
        //NOTHING
    }
}

class Door extends MapInteract {
    /**
     * Door
     * @param posX
     * @param posY
     * @param facing
     * @param cost
     * @param wideness
     * @param listOfSpawners
     * @param imagePath
     * @param map
     */
    constructor(posX, posY, width, height, cost, listOfSpawners, map) {
        super()
        //define bbs
        this.bb = new BoundingBox(
            (map.posX + posX) * map.scale,
            (map.posY + posY) * map.scale,
            width * map.scale,
            height * map.scale
        )
        this.bb_interact = new BoundingBox(
            (map.posX - (BARRIER_ADDITIONAL_INTERACT_LONG/2) + posX) * map.scale,
            (map.posY - (BARRIER_ADDITIONAL_INTERACT_SHORT/2) + posY) * map.scale,
            (width + BARRIER_ADDITIONAL_INTERACT_LONG) * map.scale,
            (height + BARRIER_ADDITIONAL_INTERACT_SHORT) * map.scale
        )
        this.bb.updateSides()
        this.bb_interact.updateSides()

        //Stats
        this.cost = cost
        this.listOfSpawners = listOfSpawners
        this.isLocked = true //TODO remove if not needed

        //TODO make paired renderer
    }

    update() {

    }

    draw() {
        if (this.isLocked) {
            this.bb.drawBoundingBox("red")
            this.bb_interact.drawBoundingBox("orange")
        }
    }

    //TODO How to tell pathfinding that door is locked vs open?
    /**
     * Player calls this and buys the door
     */
    use() {
        //check player's money
        if (GAME_ENGINE.ent_Player.points >= this.cost) {
            GAME_ENGINE.ent_Player.losePoints(this.cost)
            if (Array.isArray(this.listOfSpawners[0])) {
                this.listOfSpawners.forEach((listOfSpawners) => {
                    GAME_ENGINE.camera.map.roundManager.addActiveSpawners(listOfSpawners)
                })
            } else {
                GAME_ENGINE.camera.map.roundManager.addActiveSpawners(this.listOfSpawners)
            }
            this.isLocked = false //TODO remove if not needed
            this.removeFromWorld = true
        }
    }

    hudText() {
        GAME_ENGINE.camera.map.hud.bottomMiddleInteract.displayText("F to unlock for " + this.cost)
    }
}

/**
 * Spawner that routes Zombie to Barrier
 */
class SpawnerBarrier { //make super
    constructor(posX, posY, pairedBarrier, isActive, map, radius=3000) {
        Object.assign(this, {pairedBarrier, isActive})
        this.posX = posX * map.scale
        this.posY = posY * map.scale
        this.bc = new BoundingCircle(this.posX, this.posY, radius * map.scale)
    }

    spawnZombie(speed = 0, hp, force=false) {
        if (force || this.bc.collide(GAME_ENGINE.ent_Player.playerCollision_Vulnerable_C) < 0) {
            GAME_ENGINE.addEntity(new Zombie(this.posX, this.posY, speed, hp, this.pairedBarrier))
            return 0
        } else {
            return -1
        }
    }
}

class SpawnerDest { //make super
    constructor(posX, posY, destPosX, destPosY, isActive, map, radius=3000) {
        Object.assign(this, {isActive})
        this.posX = posX * map.scale
        this.posY = posY * map.scale
        this.bc = new BoundingCircle(this.posX, this.posY, radius * map.scale)
        this.pairedBarrier = new PairedBarrierDummy(destPosX * map.scale, destPosY * map.scale)
    }

    spawnZombie(speed = 0, hp, force=false) { //TODO if spawns too fast, Zombies push each other out of the way. Needs a queue or something to not exceed spawning
        if (force || this.bc.collide(GAME_ENGINE.ent_Player.playerCollision_Vulnerable_C) < 0) {
            GAME_ENGINE.addEntity(new Zombie(this.posX, this.posY, speed, hp, this.pairedBarrier))
            return 0
        } else {
            return -1
        }
    }
}

class SpawnerGroundDig { //make super
    constructor(posX, posY, isActive, map, radius=3000) {
        Object.assign(this, {isActive})
        this.posX = posX * map.scale
        this.posY = posY * map.scale
        this.bc = new BoundingCircle(this.posX, this.posY, radius * map.scale)
    }

    spawnZombie(speed = 0, hp, force=false) { //TODO if spawns too fast, Zombies push each other out of the way. Needs a queue or something to not exceed spawning
        if (force || this.bc.collide(GAME_ENGINE.ent_Player.playerCollision_Vulnerable_C) < 0) {
            GAME_ENGINE.addEntity(new SpawnerGroundDigParticle(this.posX,this.posY, new Zombie(this.posX, this.posY, speed, hp)))
            return 0
        } else {
            return -1
        }
    }
}

const SPAWNERGROUNDDIG_DELAY = 3
class SpawnerGroundDigParticle {
    constructor(posX, posY, zombie) {
        Object.assign(this, {posX, posY, zombie})
        this.scale = 0.4
        this.delayTimer = 5
        this.animator = new Animator(ASSET_MANAGER.getAsset("Assets/Images/Map/Zombie Dirt Spawning SpriteSheet.png"), 0,0,600,600, 7,1,this.scale) //TODO
    }

    update() {
        if (this.delayTimer > 0) {
            this.delayTimer -= GAME_ENGINE.clockTick
        } else {
            GAME_ENGINE.addEntity(this.zombie)
            this.removeFromWorld = true
        }
    }

    draw() {
        this.animator.drawFrame(this.posX - (this.animator.width * this.scale / 2), this.posY - (this.animator.height * this.scale / 2))
    }
}

class PairedBarrierDummy {
    constructor(destPosX, destPosY) {
        this.zombieArrivalPoint = [destPosX, destPosY]
    }
}

class WallBuyTrigger {
    constructor(posX, posY,  width, height, gunName, cost, map) {
        Object.assign(this, {gunName, cost})
        this.bb_interact = new BoundingBox(
            (map.posX + posX) * map.scale,
            (map.posY + posY) * map.scale,
            width * map.scale,
            height * map.scale
        )
        this.bb_interact.updateSides()
        this.hasIntractedCooldown = 0 //prevent spam

        this.gunNamePap = CREATE_GUN_FROM_NAME(this.gunName, 1).name //TODO Use to check PAP
    }

    update() {
        if (this.hasIntractedCooldown > 0) {
            this.hasIntractedCooldown -= GAME_ENGINE.clockTick
        }
    }

    draw() {
        this.bb_interact.drawBoundingBox("green")
    }

    use() {
        //TODO Check PAP
        if (GAME_ENGINE.ent_Player.points >= this.cost && this.hasIntractedCooldown <= 0) { //has money & check spam
            let acceptResponse = GAME_ENGINE.ent_Player.acceptNewGun(CREATE_GUN_FROM_NAME(this.gunName, false))
            if (acceptResponse === 0) { //bought gun
                GAME_ENGINE.ent_Player.losePoints(this.cost)
            } else if (acceptResponse === 1) { //bought ammo
                GAME_ENGINE.ent_Player.losePoints(this.cost/2)
            }
            this.hasIntractedCooldown = 3
        }
    }

    hudText() {
        let text = "F to Purchase " + this.gunName + " for " + this.cost
        //check if already in inventory
        for (let i = 0; i < GAME_ENGINE.ent_Player.gunInventory.length; i++) {
            if (GAME_ENGINE.ent_Player.gunInventory[i].name === this.gunName) {
                text = "F to purchase ammo for " + this.cost/2
            }
            //TODO else if Check PAP
        }
        GAME_ENGINE.camera.map.hud.bottomMiddleInteract.displayText(text)
    }
}

const WALLBUY_ASSET = "Assets/Images/Items/guns_wall.png"
const WALLBUY_ASSETR = "Assets/Images/Items/guns_wallr.png"
class WallBuyImage {
    constructor(posX, posY, facing, gunName, scale=4, map) {
        let gunPNGCoords = GUN_TEXTURE_MAP.map.get(gunName)
        switch (facing) {
            case "N":
                this.animator = new Animator(ASSET_MANAGER.getAsset(WALLBUY_ASSET), gunPNGCoords[0], gunPNGCoords[1], gunPNGCoords[2], gunPNGCoords[3], 1, 1, scale, false, true)
                break
            case "S":
                this.animator = new Animator(ASSET_MANAGER.getAsset(WALLBUY_ASSET), gunPNGCoords[0], gunPNGCoords[1], gunPNGCoords[2], gunPNGCoords[3], 1, 1, scale, false, false)
                break
            case "E":
                let asset = ASSET_MANAGER.getAsset(WALLBUY_ASSETR)
                this.animator = new Animator(asset, asset.width - (gunPNGCoords[1] + gunPNGCoords[3]), gunPNGCoords[0], gunPNGCoords[3], gunPNGCoords[2], 1, 1, scale, true, false) //TODO
                break
            case "W":
                let asset1 = ASSET_MANAGER.getAsset(WALLBUY_ASSETR)
                this.animator = new Animator(asset1, asset1.width - (gunPNGCoords[1] + gunPNGCoords[3]), gunPNGCoords[0], gunPNGCoords[3], gunPNGCoords[2], 1, 1, scale, false, false) //TODO
                break
        }
        this.posX = posX * map.scale
        this.posY = posY * map.scale
    }

    update() {

    }

    draw() {
        this.animator.drawFrame(this.posX, this.posY)
    }
}

MYSTERYBOX_SPINS_UNTIL_TEDDY = 15 //15
MYSTERYBOX_BB_WIDTH = 85
MYSTERYBOX_BB_HEIGHT = 30
MYSTERYBOX_ROLL_TIME = 5
MYSTERYBOX_OFFER_TIME = 10
MYSTERYBOX_SPAM_PREVENT_TIME = 2
MYSTERYBOX_COST = 950 //950
MYSTERYBOX_IMG_PATH = "Assets/Images/Map/MysteryBox_Sprite.png"
MYSTERYBOX_LOOT_TABLE = ["M1911","Olympia","M16","L96A1","Ray Gun","SPAS-12","CZ75","Python","AUG","Commando","Famas","FN FAL","G11","Galil","M14","Gewehr 43","M1 Carbine","STG-44","AK-74u","MP5K","MP40","MPL","PM63","Spectre","Thompson","Type 100","HK21","RPK","FG42","Dragunov","Kar98k","HS-10","Stakeout","Double-Barrel","M1897 Trench Gun","China Lake","M72 LAW"] //"Ballistic Knife","Crossbow","Wunderwaffe DG-2","AK-47","PPSH", "Python TRASH"
class MysteryBox extends MapInteract {
    constructor(locationsPos=[], startingPosIndex=0, map) {
        super()
        /**
         * 0 = closed
         * 1 = spinning
         * 2 = offering
         * 3 = cooldown to prevent spam
         * 4 = teddy
         * @type {number}
         */
        this.state = 0
        this.scale = map.scale
        this.stateCooldownTimer = 0
        this.spinCooldownTimer = 0
        this.locationsPos = locationsPos
        this.curr_Pos = locationsPos[startingPosIndex]
        this.cuur_PosIndex = startingPosIndex
        this.changeLocation()
        this.setSpinsUntilTeddy()

        this.animatorBase = new Animator(ASSET_MANAGER.getAsset(MYSTERYBOX_IMG_PATH), 0,0, 256, 120, 1, 1, 3.75/3)
        this.curr_GunTexture = new Gun_M1911() //to avoid null pointer
        this.animatorGun = new Animator(ASSET_MANAGER.getAsset(ANIMATORGUN_IMG_PATH), 0,0,0,0,1,1,3.75,false, false)
    }

    setSpinsUntilTeddy() {
        this.curr_spinsUntilTeddy = MYSTERYBOX_SPINS_UNTIL_TEDDY - randomInt(6)
    }

    changeLocation() {
        this.bb = new BoundingBox(this.curr_Pos[0] * this.scale , this.curr_Pos[1] * this.scale , MYSTERYBOX_BB_WIDTH * 3.75 , MYSTERYBOX_BB_HEIGHT * 3.75)
        this.bb_interact = new BoundingBox((this.curr_Pos[0] - 3)  * this.scale, (this.curr_Pos[1] - 3) * this.scale , (MYSTERYBOX_BB_WIDTH + 6) * 3.75 , (MYSTERYBOX_BB_HEIGHT + 6) * 3.75)
        this.bb.updateSides()
        this.bb_interact.updateSides()
    }

    update() {
        if (this.stateCooldownTimer > 0) {
            this.stateCooldownTimer -= GAME_ENGINE.clockTick
        }
        switch (this.state) {
            case 1: //spinning
                //Spin
                if (this.spinCooldownTimer > 0) {
                    this.spinCooldownTimer -= GAME_ENGINE.clockTick
                } else {
                    this.spinCooldownTimer = 0.1
                    this.curr_GunTexture = GUN_TEXTURE_MAP.map.get((MYSTERYBOX_LOOT_TABLE[randomInt(MYSTERYBOX_LOOT_TABLE.length)]))
                }

                //Done Spinning
                if(this.stateCooldownTimer <= 0) {
                    this.stateCooldownTimer = MYSTERYBOX_OFFER_TIME
                    //If Teddy
                    if (this.curr_spinsUntilTeddy > 0) {
                        this.state = 2
                        this.endCounter = 0
                        if (GAME_ENGINE.ent_Player !== null) { //null pointer
                            let nameOfGunsInInventory = GAME_ENGINE.ent_Player.gunInventory.map(x => x.name);
                            do {
                                let finalGun = MYSTERYBOX_LOOT_TABLE[randomInt(MYSTERYBOX_LOOT_TABLE.length)]
                                this.curr_GunTexture = GUN_TEXTURE_MAP.map.get(finalGun)
                                this.curr_GunOffer = CREATE_GUN_FROM_NAME(finalGun, false)
                            } while ((nameOfGunsInInventory.includes(this.curr_GunOffer.name) ))
                        }
                    } else {
                        this.state = 4
                        this.curr_GunTexture = [0,0,100,100] //TODO teddy image
                        this.curr_GunOffer = null
                    }
                }
                break
            case 2: //offering
                if (this.stateCooldownTimer <= 0) {
                    this.state = 3
                    this.stateCooldownTimer = MYSTERYBOX_SPAM_PREVENT_TIME
                }
                break
            case 3: //prevent spam
                if (this.stateCooldownTimer <= 0) {
                    this.state = 0
                }
                break
            case 4:
                if (this.stateCooldownTimer <= 0) {
                    this.curr_Pos = this.locationsPos[this.cuur_PosIndex + ((randomInt(this.locationsPos.length - 1) + 1) % this.locationsPos.length)]
                    this.setSpinsUntilTeddy()
                    this.changeLocation()
                    this.state = 0
                }
                break
        }
    }

    draw() {
        let centerPos = this.bb.getCenteredPos()
        //base
        this.animatorBase.xStart = this.state === 0 ? 0 : this.animatorBase.width
        this.animatorBase.drawFrame(this.bb.x, this.bb.y - 10)
        //guns
        switch (this.state) {
            case 1:
            case 2:
            case 4:
                this.animatorGun.xStart = this.curr_GunTexture[0]
                this.animatorGun.yStart = this.curr_GunTexture[1]
                this.animatorGun.width = this.curr_GunTexture[2]
                this.animatorGun.height = this.curr_GunTexture[3]
                this.animatorGun.drawFrame(centerPos[0] - (this.curr_GunTexture[2]/2 * this.animatorGun.scale), centerPos[1] - (this.curr_GunTexture[3]/2 * this.animatorGun.scale))
                break
        }
       this.bb.drawBoundingBox("red")
       this.bb_interact.drawBoundingBox("green")
    }

    use() {
        switch (this.state) {
            case 0: //buy
                if (GAME_ENGINE.ent_Player.points < MYSTERYBOX_COST) {
                    return
                }
                GAME_ENGINE.ent_Player.losePoints(MYSTERYBOX_COST)
                this.spinCooldownTimer = 0
                this.state = 1
                this.stateCooldownTimer = MYSTERYBOX_ROLL_TIME
                this.curr_spinsUntilTeddy--
                console.log(this.curr_spinsUntilTeddy)
                break
            case 2: //offer pickup
                this.state = 3
                this.stateCooldownTimer = MYSTERYBOX_SPAM_PREVENT_TIME
                GAME_ENGINE.ent_Player.acceptNewGun(this.curr_GunOffer)
                break
        }
    }

    hudText() {
        switch (this.state) {
            case 0:
                GAME_ENGINE.camera.map.hud.bottomMiddleInteract.displayText("F to use the Mystery Box for " + MYSTERYBOX_COST)
                break
            case 2:
                GAME_ENGINE.camera.map.hud.bottomMiddleInteract.displayText("F to use pick up " + this.curr_GunOffer.name)
                break
        }
    }
}

POWERSWITCH_INTERACT_SIZE = 4
POWERSWITCH_IMG_PATH = "Assets/Images/Map/PowerSwitch_Sprite.png"
POWERSWITCH_IMG_WIDTH = 178
POWERSWITCH_IMG_HEIGHT = 149
class PowerSwitch extends MapInteract {
    constructor(posX, posY, facing="E", map) {
        super()
        let width = 20
        let height = 25
        this.bb = new BoundingBox(
            (map.posX + posX) * map.scale,
            (map.posY + posY) * map.scale,
            width * map.scale,
            height * map.scale
        )
        this.bb_interact = new BoundingBox(
            (map.posX + posX - POWERSWITCH_INTERACT_SIZE) * map.scale,
            (map.posY + posY - POWERSWITCH_INTERACT_SIZE) * map.scale,
            (width + POWERSWITCH_INTERACT_SIZE*2) * map.scale,
            (height + POWERSWITCH_INTERACT_SIZE*2) * map.scale
        )
        this.bb.updateSides()
        this.bb_interact.updateSides()

        this.animator = new Animator(ASSET_MANAGER.getAsset(POWERSWITCH_IMG_PATH), 0,0, POWERSWITCH_IMG_WIDTH,POWERSWITCH_IMG_HEIGHT, 1, 1, map.scale/5)
        if (facing === "W") {
            this.animator.flippedX = true
            this.renderX = this.bb.x - this.bb.width + 10 //TODO ugly + 10
            this.renderY = this.bb.y
        } else {
            this.renderX = this.bb.x
            this.renderY = this.bb.y
        }

        this.power = false
    }

    use() {
        if (!this.power) {
            console.log("power turned on")
            this.power = true
            this.animator.xStart = this.animator.width
            //TODO trigger audio and other effects
        }
    }

    update() {

    }

    draw() {
        this.animator.drawFrame(this.renderX, this.renderY)

        this.bb.drawBoundingBox()
        this.bb_interact.drawBoundingBox("green")
    }

    hudText() {
        if (!this.power) {
            GAME_ENGINE.camera.map.hud.bottomMiddleInteract.displayText("F to turn on power")
        }
    }
}

PERKMACHINE_INTERACT_SIZE = 4
class PerkMachine extends MapInteract {
    constructor(posX, posY, width, height, perk="Juggernog", map) {
        super()
        Object.assign(this, {perk})
        this.bb = new BoundingBox(
            (map.posX + posX) * map.scale,
            (map.posY + posY) * map.scale,
            width * map.scale,
            height * map.scale
        )
        this.bb_interact = new BoundingBox(
            (map.posX + posX - PERKMACHINE_INTERACT_SIZE) * map.scale,
            (map.posY + posY - PERKMACHINE_INTERACT_SIZE) * map.scale,
            (width + PERKMACHINE_INTERACT_SIZE*2) * map.scale,
            (height + PERKMACHINE_INTERACT_SIZE*2) * map.scale
        )
        this.bb.updateSides()
        this.bb_interact.updateSides()
        this.perkSetup()
    }

    use() {
        if (!GAME_ENGINE.camera.map.powerSwitch.power) return //no power
        if (GAME_ENGINE.ent_Player.points >= this.cost) {
            if (this.givePerk()) {
                GAME_ENGINE.ent_Player.losePoints(this.cost)
            }
        }
    }

    update() {

    }

    draw() {
        this.bb.drawBoundingBox()
        this.bb_interact.drawBoundingBox("green")
    }

    hudText() {
        if (!GAME_ENGINE.camera.map.powerSwitch.power) { //no power
            GAME_ENGINE.camera.map.hud.bottomMiddleInteract.displayText("No power")
            return false
        }
        GAME_ENGINE.camera.map.hud.bottomMiddleInteract.displayText("F to purchase " + this.perk + " for " + this.cost)
        //already has the perk
        switch (this.perk) {
            case "Juggernog":
                if (GAME_ENGINE.ent_Player.perk_hasJug) return true
            case "Speed Cola":
                if (GAME_ENGINE.ent_Player.perk_hasSpeedCola) return true
            case "Double Tap":
                if (GAME_ENGINE.ent_Player.perk_hasDoubleTap) return true
            case "Quick Revive":
                if (GAME_ENGINE.ent_Player.perk_hasQuickRev) return true
            case "Stamin-Up":
                if (GAME_ENGINE.ent_Player.perk_hasStaminUp) return true
        }
    }

    givePerk() {
        //try to give the perk if not have
        switch (this.perk) {
            case "Juggernog":
                if (!GAME_ENGINE.ent_Player.perk_hasJug) {
                    GAME_ENGINE.ent_Player.perk_hasJug = true
                    return true
                }
                return false
            case "Speed Cola":
                if (!GAME_ENGINE.ent_Player.perk_hasSpeedCola) {
                    GAME_ENGINE.ent_Player.perk_hasSpeedCola = true
                    return true
                }
                return false
            case "Double Tap":
                if (!GAME_ENGINE.ent_Player.perk_hasDoubleTap) {
                    GAME_ENGINE.ent_Player.perk_hasDoubleTap = true
                    return true
                }
                return false
            case "Quick Revive":
                if (!GAME_ENGINE.ent_Player.perk_hasQuickRev) {
                    GAME_ENGINE.ent_Player.perk_hasQuickRev = true
                    return true
                }
                return false
            case "Stamin-Up":
                if (!GAME_ENGINE.ent_Player.perk_hasStaminUp) {
                    GAME_ENGINE.ent_Player.perk_hasStaminUp = true
                    return true
                }
                return false
            default:
                console.log(this.perk, "is an invalid perk!")
                return false
        }
    }

    perkSetup() {
        switch (this.perk) {
            case "Juggernog":
                //TODO red glow
                this.cost = 2500
                break
            case "Speed Cola":
                //TODO green glow
                this.cost = 2500
                break
            case "Double Tap":
                //TODO orange glow
                this.cost = 2000
                break
            case "Quick Revive":
                //TODO blue glow
                this.cost = 500
                break
            case "Stamin-Up":
                //TODO yellow glow
                this.cost = 2000
                break
            default:
                console.log(this.perk, "is an invalid perk!")
        }
    }
}


class PowerUp {
    constructor(posX, posY, xStart, yStart, width, height) {
        Object.assign(this, {posX, posY})
        // this.animatorGlow = new Animator(HUDPERKS_PATH, xStart, yStart, width, height, 1, 1, 1)
        this.animator = new Animator(ASSET_MANAGER.getAsset(ANIMATORGUN_IMG_PATH), xStart, yStart, width, height, 1, 1, 4)
        this.aliveTimer = 30
        this.bb_interact = new BoundingBox(posX - 25, posY - 25, 50, 50)
        this.bb_interact.updateSides()
    }

    update() {
        if (this.aliveTimer > 0) {
            this.aliveTimer -= GAME_ENGINE.clockTick
        } else {
            this.removeFromWorld = true
        }

        this.checkCollision()
    }

    draw() {
        let pos = this.bb_interact.getCenteredPos()
        //green glow
        //TODO
        //perk
        if (this.aliveTimer <= 5) {
            if (Math.ceil(this.aliveTimer * 8) % 2 !== 0) {
                this.animator.drawFrame( pos[0] - this.animator.width*this.animator.scale/2 , pos[1] - this.animator.height*this.animator.scale/2)
            }
        } else if (this.aliveTimer <= 10) {
            if (Math.ceil(this.aliveTimer * 2) % 2 !== 0) {
                this.animator.drawFrame( pos[0] - this.animator.width*this.animator.scale/2 , pos[1] - this.animator.height*this.animator.scale/2)
            }
        } else {
            this.animator.drawFrame( pos[0] - this.animator.width*this.animator.scale/2 , pos[1] - this.animator.height*this.animator.scale/2)
        }


        this.bb_interact.drawBoundingBox("green")
    }

    //just do check here because it's only interact
    checkCollision() {
        if (GAME_ENGINE.ent_Player === null) return
        if (this.bb_interact.collide(GAME_ENGINE.ent_Player.player_Collision_World_BB)) {
            this.givePowerUp()
            this.removeFromWorld = true
        }
    }

    givePowerUp() { //Abstract
        //GAME_ENGINE.ent_Player.powerup_hasInstaKill = 30
    }
}

class PowerUp_InstaKill extends PowerUp {
    constructor(posX, posY) {
        super(posX, posY, 0, 167, 18, 23)
    }

    givePowerUp() {
        GAME_ENGINE.ent_Player.powerup_hasInstaKillTimer = 30 //secs
    }
}

class PowerUp_DoublePoints extends PowerUp {
    constructor(posX, posY) {
        super(posX, posY, 71, 171, 20, 14)
    }

    givePowerUp() {
        GAME_ENGINE.ent_Player.powerup_hasDoublePointsTimer = 30 //secs
    }
}

class PowerUp_MaxAmmo extends PowerUp {
    constructor(posX, posY) {
        super(posX, posY, 17, 168, 25, 18)
    }

    givePowerUp() {
        GAME_ENGINE.ent_Player.gunInventory.forEach((gun) => {
            if (gun === 0) return
            gun.currentTotalAmmo = gun.totalAmmo
        })
        GAME_ENGINE.ent_Player.grenades = 4
    }
}

class PowerUp_Nuke extends PowerUp {
    constructor(posX, posY) {
        super(posX, posY, 42, 170, 28, 16)
    }

    givePowerUp() {
        GAME_ENGINE.ent_Zombies.forEach((zombie) => {
            zombie.takeDamage(zombie.hp, ZOMBIE_DMG_NOPOINTS)
        })
        GAME_ENGINE.ent_Player.earnPoints(400)
    }
}

class PowerUp_Carpenter extends PowerUp {
    constructor(posX, posY) {
        super(posX, posY, 91, 165, 23, 25)
    }

    givePowerUp() {
        GAME_ENGINE.ent_MapObjects.forEach((entity) => {
            if (entity instanceof Barrier) {
                entity.hp = BARRIER_MAX_HP
            }
        })
    }
}

//TODO Sprite Z cash
// class PowerUp_BonusPoints extends PowerUp {
//     constructor(posX, posY) {
//         super(posX, posY, 91, 165, 23, 25)
//     }
//
//     givePowerUp() {
//         GAME_ENGINE.ent_MapObjects.forEach((entity) => {
//             if (entity instanceof Barrier) {
//                 entity.hp = BARRIER_MAX_HP
//             }
//         })
//     }
// }

PAP_WIDTH = 80
PAP_HEIGHT = 35
PAP_COST = 5000
PAP_STATECD_1 = 2
PAP_STATECD_2 = 2
PAP_STATECD_3 = 2
PAP_STATECD_4 = 10
PAP_STATECD_5 = 2
PAP_OFFSETY = 75
PAP_IMG_PATH = "Assets/Images/Map/Pack_A_Punch.png"
PAPLIGHT_IMG_PATH = "Assets/Images/Map/Pack_A_Punch_Light.png"
class PackAPunch extends MapInteract {
    constructor(posX, posY, map) {
        super()
        this.bb = new BoundingBox(
            posX * map.scale, posY * map.scale,
            PAP_WIDTH * 3.75, PAP_HEIGHT * 3.75
        )
        this.bb_interact = new BoundingBox(
            posX * map.scale, posY * map.scale,
            PAP_WIDTH * 3.75, (PAP_HEIGHT + 15) * 3.75
        )
        this.bb.updateSides()
        this.bb_interact.updateSides()
        this.scale = map.scale
        this.elapseTime = 0

        /**
         * 0: waiting
         * 1: taking in gun
         * 2: gun disappears
         * 3: guns comes out
         * 4: offer gun
         * 5: prevent spam
         * 6: unbuilt
         * @type {number}
         */
        this.state = 0
        this.stateCooldown = 0

        this.animatorPaP = new Animator(ASSET_MANAGER.getAsset(PAP_IMG_PATH), 0,0, 221, 194, 1, 1, this.scale/3)
        this.animatorPaPLight = new Animator(ASSET_MANAGER.getAsset(PAPLIGHT_IMG_PATH), 0,0, 221, 194, 1, 1, this.scale/3)
        this.currGun = new Gun_M1911() //to avoid null pointer
        this.animatorGun = new Animator(ASSET_MANAGER.getAsset(ANIMATORGUN_IMG_PATH), 0,0,0,0,1,1,this.scale,false, false)
        this.animatorGunPaP = new Animator(ASSET_MANAGER.getAsset(ANIMATORGUNPAP_IMG_PATH), 0,0,0,0,1,1,this.scale,false, false)
    }

    update() {
        switch(this.state) {
            case 0: //waiting
                break
            case 1: //taking in gun
                if (this.stateCooldown <= 0) {
                    this.stateCooldown = PAP_STATECD_2
                    this.state++
                }
                break
            case 2: //gun disappears
                if (this.stateCooldown <= 0) {
                    this.currGun = CREATE_GUN_FROM_NAME(this.currGun.name, true)
                    this.stateCooldown = PAP_STATECD_3
                    this.state++
                }
                break
            case 3: //guns comes out
                if (this.stateCooldown <= 0) {
                    this.stateCooldown = PAP_STATECD_4
                    this.state++
                }
                break
            case 4: //offer gun
                if (this.stateCooldown <= 0) {
                    this.stateCooldown = PAP_STATECD_5
                    this.state++
                }
                break
            case 5: //prevent spam
                if (this.stateCooldown <= 0) {
                    this.state = 0
                }
                break
        }
    }

    draw() {
        if (this.stateCooldown > 0) {
            this.stateCooldown -= GAME_ENGINE.clockTick
        }
        switch(this.state) {
            case 0: //waiting
                break
            case 1: //taking in gun
                this.drawGun((this.stateCooldown/PAP_STATECD_1) * PAP_OFFSETY + 20)
                this.drawPaPLight()
                break
            case 2: //gun disappears
                this.drawPaPLight()
                break
            case 3: //guns comes out
                this.drawGunPaP((1 - (this.stateCooldown/PAP_STATECD_3)) * PAP_OFFSETY + 20)
                this.drawPaPLight()
                break
            case 4: //offer gun
                this.drawGunPaP(PAP_OFFSETY + 20)
                this.drawPaPLight()
                break
            case 5: //prevent spam
                break
        }
        this.drawPaP()

        this.bb.drawBoundingBox()
        this.bb_interact.drawBoundingBox("green")
    }

    drawGun(offsetY) {
        let centerPos = this.bb.getCenteredPos()
        this.animatorGun.xStart = this.currGun.xStart
        this.animatorGun.yStart = this.currGun.yStart
        this.animatorGun.width = this.currGun.width
        this.animatorGun.height = this.currGun.height
        this.animatorGun.drawFrame(centerPos[0] - (this.animatorGun.width/2 * this.animatorGun.scale), centerPos[1] + offsetY - (this.animatorGun.height/2 * this.animatorGun.scale))
    }

    drawPaP() {
        this.animatorPaP.drawFrame(this.bb.x, this.bb.y)
    }

    drawPaPLight() {
        this.elapseTime =+ GAME_ENGINE.clockTick * 50
        this.animatorPaPLight.drawFrame(this.bb.x, this.bb.y + 125, Math.random()*0.25 + 0.6) //
    }

    drawGunPaP(offsetY) {
        let centerPos = this.bb.getCenteredPos()
        this.animatorGunPaP.xStart = this.currGun.xStart
        this.animatorGunPaP.yStart = this.currGun.yStart
        this.animatorGunPaP.width = this.currGun.width
        this.animatorGunPaP.height = this.currGun.height
        this.animatorGunPaP.drawFrame(centerPos[0] - (this.animatorGunPaP.width/2 * this.animatorGunPaP.scale), centerPos[1] + offsetY - (this.animatorGunPaP.height/2 * this.animatorGunPaP.scale))
    }

    hudText() {
        switch(this.state) {
            case 0: //waiting
                if (GAME_ENGINE.camera.map.powerSwitch.power) {//power
                    if (!GAME_ENGINE.ent_Player.gunInventory[GAME_ENGINE.ent_Player.currentGunIndex].isPaP) {//if no Pap yet
                        GAME_ENGINE.camera.map.hud.bottomMiddleInteract.displayText("F to upgrade current gun for " + PAP_COST)
                    }
                } else {
                    GAME_ENGINE.camera.map.hud.bottomMiddleInteract.displayText("No power")
                }
                break
            case 4: //offer gun
                GAME_ENGINE.camera.map.hud.bottomMiddleInteract.displayText("F to pick up " + this.currGun.name)
                break
        }
    }

    use() {
        if (!GAME_ENGINE.camera.map.powerSwitch.power) {return}
        switch(this.state) {
            case 0: //waiting
                if (GAME_ENGINE.ent_Player.gunInventory[GAME_ENGINE.ent_Player.currentGunIndex].isPaP || GAME_ENGINE.ent_Player.points < PAP_COST) {return}
                GAME_ENGINE.ent_Player.losePoints(PAP_COST)
                this.currGun = GAME_ENGINE.ent_Player.gunInventory[GAME_ENGINE.ent_Player.currentGunIndex]
                GAME_ENGINE.ent_Player.gunInventory[GAME_ENGINE.ent_Player.currentGunIndex] = new Gun_Empty()
                GAME_ENGINE.ent_Player.switchGuns()
                this.state++
                this.stateCooldown = PAP_STATECD_1
                break
            case 4: //offering
                GAME_ENGINE.ent_Player.acceptNewGun(this.currGun)
                this.stateCooldown = PAP_STATECD_5
                this.state++
        }
    }
}

//https://project-lazarus.fandom.com/wiki/Rounds they be using real formulas
const ROUND_COUNT = [6,8,13,18,24,27,28,28,29,33,34,36,39,41,44,47,50,53,56,60,63]
class RoundManager {
    constructor(listOfEnabledSpawns) {
        /**
         * List to choose where to spawn Zombie next. When new spawners ready, append to this list.
         */
        this.listOfEnabledSpawns = listOfEnabledSpawns
        this.max_Zombies = 24
        this.timedGameplay = false
        this.alwaysRun = false
        this.noRoundDelay = false
        /**
         * Secs to transition to next round, breather. Decreases next round
         * @type {number}
         */
        this.thisRound_betweenRoundDelay = 10 //10
        /**
         * Rate to spawn zombie this round (sec). Will decrease next round
         * @type {number}
         */
        this.thisRound_ZombiesSpawnDelay = 2 //2
        /**
         * The amount of zombies this round. Will increase in next round
         * @type {number}
         */
        this.curr_ZombiesLeft = ROUND_COUNT[0] //6
        this.inRound = false
        this.curr_ZombiesSpawned = 0
    }

    /**
     * Begin calculator
     */
    start() {
        this.curr_Round = 1

        // this.curr_ZombiesLeft = ROUND_COUNT[0]
        this.curr_ZombiesHealth = 50 + (100*this.curr_Round) //150

        // this.thisRound_ZombiesSpawnDelay = Math.max(2 * Math.pow(0.95, this.curr_Round-1), 0.1)
        this.curr_ZombiesSpawnDelay = this.thisRound_ZombiesSpawnDelay
        this.curr_betweenRoundDelay = this.thisRound_betweenRoundDelay

        this.curr_roundsUntilNextDog = randomInt(3) + 5

        this.inRound = true

        console.log("ROUND 1")
        console.log("Z count: " + this.curr_ZombiesLeft)
        console.log("Z hp: " + this.curr_ZombiesHealth)
    }

    /**
     * When all zombies die
     */
    roundEnd() {
        //TODO call HUD to do transition
        this.inRound = false
        this.curr_roundsUntilNextDog--
        console.log("ROUND ENDED")
    }

    nextRound() {
        this.curr_Round++

        //TODO accuracy
        this.curr_ZombiesLeft = this.curr_Round < 20 ?
            ROUND_COUNT[this.curr_Round - 1] :
            Math.ceil(Math.min([0.09 * (this.curr_Round * this.curr_Round) - 0.0029 * this.curr_Round + 23.958]))
        this.curr_ZombiesHealth = this.curr_Round < 10 ?
            50 + (100*this.curr_Round) :
            950 * Math.pow(1.1, this.curr_Round-9)

        this.thisRound_ZombiesSpawnDelay = Math.max(2 * Math.pow(0.95, this.curr_Round-1), 0.1)
        this.curr_ZombiesSpawnDelay = this.thisRound_ZombiesSpawnDelay
        this.thisRound_betweenRoundDelay = Math.max(this.thisRound_betweenRoundDelay * 0.9, 5)
        this.curr_betweenRoundDelay = this.thisRound_betweenRoundDelay

        this.curr_roundsUntilNextDog--

        GAME_ENGINE.ent_Player.addGrenades(2)

        this.inRound = true
        console.log("ROUND " + this.curr_Round)
        console.log("Z count: " + this.curr_ZombiesLeft)
        console.log("Z hp: " + this.curr_ZombiesHealth)
    }

    startDogRound() {
        this.curr_RoundsUntilNextDog = randomInt(3) + 4
    }

    /**
     * Zombie call on death. Will end round when no zombies left to spawn
     */
    reportKill() {
        this.curr_ZombiesSpawned--
        if (this.curr_ZombiesSpawned <= 0 && this.curr_ZombiesLeft <= 0) {
            this.roundEnd()
        }
    }

    /**
     * Pass in a list of active spawners
     * @param listOfNewActiveSpawners
     */
    addActiveSpawners(listOfNewActiveSpawners) {
        listOfNewActiveSpawners.forEach((spawner) => {
            if (!spawner.isActive) { //only adds not active
                spawner.isActive = true
                this.listOfEnabledSpawns.push(spawner)
            }
        })
    }

    update() {
        if (this.curr_Round === 0) return
        if (this.listOfEnabledSpawns.length === 0) return
        //Spawn Zombie
        if (this.inRound) { //If in round, decrease spawning cooldown
            this.curr_ZombiesSpawnDelay -= GAME_ENGINE.clockTick
            if (this.curr_ZombiesLeft > 0 && this.curr_ZombiesSpawnDelay <= 0 && this.curr_ZombiesSpawned <= this.max_Zombies) { //spawn if no more cooldown
                //Spawn
                this.spawn()
                //Reset timer
                this.curr_ZombiesSpawnDelay = this.thisRound_ZombiesSpawnDelay
                //round's zombie
                this.curr_ZombiesLeft--
                this.curr_ZombiesSpawned++

                //TODO decrease spawn delay
                //TODO Pick closest spawn to Player (randomize it a bit too)
            }
        } else {
            this.curr_betweenRoundDelay -= GAME_ENGINE.clockTick
            if (this.curr_betweenRoundDelay <= 0) {
                this.nextRound()
            }
        }
    }

    spawn() {
        let index = randomInt(this.listOfEnabledSpawns.length)
        let success = false
        for (let i = 0; i < this.listOfEnabledSpawns.length; i++) {
            let spawnResult = this.listOfEnabledSpawns[index].spawnZombie(1, this.curr_ZombiesHealth)
            if (spawnResult >= 0) {
                success = true
                break
            } else {
                index = ((index + 1) % this.listOfEnabledSpawns.length)
            }
        }
        if (!success) {
            console.log("Spawn was not proximity based!")
            this.listOfEnabledSpawns[randomInt(this.listOfEnabledSpawns.length)].spawnZombie(1, this.curr_ZombiesHealth, true)
        }
    }

    draw() {
        //debug
        if (GAME_ENGINE.options.drawSpawnProx) {
            this.listOfEnabledSpawns.forEach((spawner) => {
                spawner.bc.drawBoundingCircle("green", true)
            })
        }
    }
}