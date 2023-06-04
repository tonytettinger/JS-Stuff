const mazeRows = `#######################################################################
#S#                 #       # #   #     #         #     #   #         #
# ##### ######### # ### ### # # # # ### # # ##### # ### # # ##### # ###
# #   #     #     #     #   # # #   # #   # #       # # # #     # #   #
# # # ##### # ########### ### # ##### ##### ######### # # ##### ### # #
#   #     # # #     #   #   #   #         #       #   #   #   #   # # #
######### # # # ##### # ### # ########### ####### # # ##### ##### ### #
#       # # # #     # #     # #   #   #   #     # # #   #         #   #
# # ##### # # ### # # ####### # # # # # # # ##### ### ### ######### # #
# # #   # # #   # # #     #     #   #   #   #   #   #     #         # #
### # # # # ### # # ##### ####### ########### # ### # ##### ##### ### #
#   # #   # #   # #     #   #     #       #   #     # #     #     #   #
# ### ####### ##### ### ### ####### ##### # ######### ### ### ##### ###
#   #         #     #     #       #   # #   # #     #   # #   # #   # #
### ########### # ####### ####### ### # ##### # # ##### # # ### # ### #
#   #   #       # #     #   #   #     #       # # #     # # #   # #   #
# ### # # ####### # ### ##### # ####### ### ### # # ####### # # # ### #
#     #         #     #       #           #     #           # #      E#
#######################################################################`.split('\n')

const mazeRowsByElements = mazeRows.map(row => row.split(""))

const START = 'S'
const EXIT = 'E'
const EMPTY = " "
const PATH = '.'

//ColumnIndex = Y , RowIndex = X

const findStart = (maze) => {
    let start = undefined
    mazeRowsByElements.forEach((row, columnIndex) => {
        row.forEach((element, rowIndex)=>{
            if(element === START) start = [rowIndex,columnIndex]
        })
    });
    return start
}

const printMaze = (mazeRowsByElements) => {
    const rows = mazeRowsByElements.map(row => {
        return <><div>
                {row.map(element => element === EMPTY ? '\u00A0' : element)}
        </div></>
    })
    return rows
}

const findExit = (maze, x = undefined , y = undefined, path = []) => {
    if(x === undefined || y === undefined) {
        [y,x] = findStart(maze)
        maze[y][x] = EMPTY
    }

    if(maze[y][x] === EXIT) {
        return path
    }
    
    maze[y][x] = PATH

    path.push(String(x) + '-' + String(y))
    const northStep = y+1
    const eastStep = x+1
    const southStep = y-1
    const westStep = x-1

    if((maze[northStep][x] === EMPTY || maze[northStep][x] === EXIT)) {
        if(findExit(maze, x, northStep, path)) {
            return path
        } else {
            path.pop()
        }
    }
    if((maze[y][eastStep] === EMPTY || maze[y][eastStep] === EXIT)) {
        if(findExit(maze, eastStep, y, path)) {
            return path
        } else {
            path.pop()
        }
    }
    if((maze[southStep][x] === EMPTY || maze[southStep][x] === EXIT)) {
        if(findExit(maze, x, southStep, path)) {
            return path
        } else {
            path.pop()
        }
    }
     if((maze[y][westStep] === EMPTY || maze[y][westStep] === EXIT)) {
        if(findExit(maze, westStep, y, path)) {
            return true
        } else {
            path.pop()
        }
    }

    return false

}

const exitPath = findExit(mazeRowsByElements)
export const Maze = () => <div className="maze">
   {printMaze(mazeRowsByElements)}
   {exitPath && (
      <div>
        Exit path: {exitPath.map(([x,,y]) => `(${x},${y})`).join("->")}
      </div>
    )}
</div>