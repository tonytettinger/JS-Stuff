import { useEffect, useState } from "react"

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
const mazeOriginalCopy = structuredClone(mazeRowsByElements)

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

const findExit = (maze, x = undefined , y = undefined, path = []) => {
    if(x === undefined || y === undefined) {
        [y,x] = findStart(maze)
        maze[y][x] = EMPTY
    }

    if(maze[y][x] === EXIT) {
        return path
    }
    
    maze[y][x] = PATH

    path.push([x,y])
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

export const Maze = () => {
    const [dotWalkIndex, setDotWalkIndex] = useState(0)
    const [maze, setMaze] = useState(mazeOriginalCopy)

    const printMaze = (maze) => {
        const rows = maze.map((row, rowIndex) => {
            return <><div>
                    {row.map((element, colIndex) => {
                        if(element === EMPTY) return '\u00A0'
                        return element
                    })}
                    
            </div></>
        })
        return rows
    }

    useEffect(()=>{
        const intervalDelay = 25
        const walkInterval = setInterval(()=>{
            if(dotWalkIndex <= exitPath.length-2) {
                setDotWalkIndex((prev)=> prev+1)
                setMaze((prevMaze)=>prevMaze.map((row, rowIndex) => {
                    return row.map((element, colIndex) => {
                        if(colIndex === exitPath[dotWalkIndex][0] && rowIndex === exitPath[dotWalkIndex][1]){
                            return '.'
                        } else {
                            return element
                        }
                    })
                }))
            } 
            clearInterval(walkInterval)
        },intervalDelay)
        return () =>{
            clearInterval(walkInterval)
        }
    },[dotWalkIndex])

return (
<div className="maze">
    {printMaze(maze)}
    </div>
)
}