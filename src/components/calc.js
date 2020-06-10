import {rimsCenter} from "../resource";

export const getCoordinates = (positions, rimImage, glassesNumbers) => {
    let leftPoint = positions[36];
    let rightPoint = positions[45];

    const wGlassesImg = rimImage.width
    const hGlassesImg = rimImage.height
    let wGlasses = positions[16]._x - positions[0]._x
    let hGlasses = hGlassesImg * wGlasses / wGlassesImg

    const x = ((leftPoint._x + rightPoint._x) / 2 - wGlasses / 2)
    const imgCenter = rimsCenter[glassesNumbers];
    const y = ((leftPoint._y + rightPoint._y) / 2 - hGlasses * imgCenter)
    const angle = Math.atan((rightPoint._y - leftPoint._y) / (rightPoint._x - leftPoint._x))
    return {
        h: hGlasses,
        w: wGlasses,
        x: x,
        y: y,
        angle: angle*(180/Math.PI)
    }
}


// export default {getCoordinates, getRatio}
