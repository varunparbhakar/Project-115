// https://medium.com/@nicholas.w.swift/easy-a-star-pathfinding-7e6689c7f7b2
/**
 * distance between points. Prime numbers best? (possible floating point underflow, avoid decimals)
 * @type {number}
 */
ASTAR_GRID_SIZE = [75, 50, 50]
/**
 * A BB with dimensions of ASTAR_GRID_SIZE-ASTAR_BB_SIZE is used to check if path is possible
 * @type {number}
 */
ASTAR_BB_SIZE = [50, 50, 50]
/**
 * Amount of iterations before giving up
 * @type {number}
 */
ASTAR_ITERATIONS = [1000, 0, 0]
// ASTAR_ITERATION_OFFSET = [[0,0], [50,0], [-50, 25]]
class AStar {
    constructor() {
        /**
         * List of points to path to to get to destination. It is reversed for .pop()
         * @type {*[]}
         */
        this.pathList = []
    }

    createPathList(thisPosX, thisPosY, destPosX, destPosY) {
        for (let i = 0; i < ASTAR_GRID_SIZE.length; i++) {
            //setup
            let grid_size = ASTAR_GRID_SIZE[i]
            let bb_size = ASTAR_BB_SIZE[i]
            let iterations = ASTAR_ITERATIONS[i]
            // let pos_offset = ASTAR_ITERATION_OFFSET[i]
            //Start Node
            let start_node = new ASNode(null, [thisPosX - grid_size/2, thisPosY - grid_size/2])
            start_node.g = 0
            start_node.h = 0
            start_node.f = 0

            //End Node
            let end_node = new ASNode(null, ([destPosX, destPosY]))
            end_node.g = 0
            end_node.h = 0
            end_node.f = 0

            //Open and Closed List
            let open_list = []
            open_list.push(start_node) //add start
            let closed_list = []

            //while still open paths
            while (open_list.length > 0 && iterations !== 0) {
                iterations--
                //Get current node
                let current_node = open_list[0]
                let current_index  = 0
                for (let i = 0; i < open_list.length; i++) {
                    let item = open_list[i]
                    if (item.f < current_node.f) {
                        current_node = item
                        current_index = i
                    }
                }

                //Pop current off open list, add to closed list
                open_list.splice(current_index, 1)
                closed_list.push(current_node)

                //Base: Goal Found, backtrack and ez
                if (current_node.equals(end_node, grid_size)) {
                    let resultingPath = []
                    let curr = current_node
                    while (curr != null) {
                        resultingPath.push([curr.position[0] + grid_size/2, curr.position[1] + grid_size/2])
                        curr = curr.parent
                    }
                    console.log(this.pathList)
                    this.pathList = resultingPath //.reverse()
                    return
                }

                //Otherwise, create childrens for each 8 adjacent
                let children = []
                let eight_dirs = [[-grid_size, 0], [grid_size, 0], [0, -grid_size], [0, grid_size], [-grid_size, -grid_size], [-grid_size, grid_size], [grid_size, -grid_size], [grid_size, grid_size]]
                for (let i = 0; i < eight_dirs.length; i++) {
                    let new_position = eight_dirs[i]

                    //Get node position
                    let node_position = [current_node.position[0] + new_position[0], current_node.position[1] + new_position[1]] //TODO test

                    // TODO remove, max iterations replaces, or build a box around ur map!
                    //In bounds check
                    // let tempBounds = this.quantizeToGrid([ASTAR_GRID_OFFSET[0] + (ASTAR_GRID_SIZE * ASTAR_GRID_DIMENSION), ASTAR_GRID_OFFSET[1] + (ASTAR_GRID_SIZE * ASTAR_GRID_DIMENSION)])
                    // let tempBounds1 = this.quantizeToGrid([ASTAR_GRID_OFFSET[0], ASTAR_GRID_OFFSET[1]])
                    // if (node_position[0] > tempBounds[0] || //E
                    //     node_position[0] < tempBounds1[0] || //W
                    //     node_position[1] >  tempBounds[1] || //S
                    //     node_position[1] < tempBounds1[1]) { //N
                    //     continue
                    // }

                    //Check if walkable
                    let tempDim = bb_size
                    let bb = new BoundingBox(node_position[0], node_position[1], tempDim, tempDim)
                    //Edge: end_node is inaccessible
                    if (Math.abs(bb.posX - end_node.position[0]) < grid_size && Math.abs(bb.posY - end_node.position[1]) < grid_size) {
                        return;
                    }
                    if (GAME_ENGINE.options.debugging) bb.drawBoundingBox()
                    let isWalkable = true
                    for (let j = 0; j < GAME_ENGINE.ent_MapObjects.length; j++) {
                        let entity = GAME_ENGINE.ent_MapObjects[j]
                        if (entity instanceof MapBB || entity instanceof Barrier || entity instanceof Door) { //OTHER OBSTACLES GO HERE
                            if (bb.collide(entity.bb)) {
                                isWalkable = false
                                break
                            }
                        }
                    }
                    if (!isWalkable) continue

                    //Wow, walkable, so make node and append
                    let new_node = new ASNode(current_node, node_position)
                    children.push(new_node)
                }

                //for each children
                for (let i = 0; i < children.length; i++) {
                    let child = children[i]
                    //check if in closed list
                    let tempBool = false
                    for (let j = 0; j < closed_list.length; j++) {
                        let closed_child = closed_list[j]
                        if (!tempBool && child.equals(closed_child, grid_size)) {
                            tempBool = true
                            break
                        }
                    }
                    if (tempBool == true) continue

                    //otherwise, create child
                    child.g = current_node.g + 1
                    child.h = ((child.position[0] - end_node.position[0]) * (child.position[0] - end_node.position[0])) + ((child.position[1] - end_node.position[1]) * (child.position[1] - end_node.position[1]))
                    child.f = child.g + child.h

                    // check if Child is already in the open list
                    tempBool = false
                    for (let j = 0; j < open_list.length; j++) {
                        let open_node = open_list[j]
                        if (!tempBool && child.equals(open_node, grid_size) && child.g > open_node.g) {
                            tempBool = true
                            break
                        }
                    }
                    if (tempBool == true) continue

                    //finally, add child possible next path
                    open_list.push(child)
                }
            }
            console.log("No Path")
        }
    }
}

class ASNode {
    constructor(parent, position) {
        this.parent = parent
        this.position = position

        this.g = 0
        this.h = 0
        this.f = 0
    }

    draw() {

    }

    equals(other, grid_size) {
        return Math.abs(this.position[0] - other.position[0]) < grid_size && Math.abs(this.position[1] - other.position[1]) < grid_size
    }
}