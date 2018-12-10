'use strict'

const fs = require('fs')

const IN = {
    CAM1: 1,
    CAM2: 2,
    CAM3: 3,
    CAM4: 4,
    CAM5: 5,
    CAM6: 6,
    CAM7: 7,
}

const OUT = {
    PGM: 1,
    AUX1: 2,
    AUX2: 3,
}

const scenes = {
    '5.2': {
        name: 'Indie club',
        mapping: {
            [OUT.AUX1]: IN.CAM1
        }
    },
    '7.1': {
        name: 'Christmas is around the corner',
        mapping: {
            [OUT.AUX1]: IN.CAM1
        }
    },
}

function saveTo (savePath) {
    fs.writeFileSync(savePath, JSON.stringify({ IN, OUT, scenes }, null, 2))
}

module.exports = { IN, OUT, scenes, saveTo }
