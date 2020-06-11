import {rimsCenter} from "../resource";

export const getCoordinates = (positions, rimImage, glassesNumbers) => {
    let leftPoint = positions[36];
    let rightPoint = positions[45];
    let center = positions[27]
    let rel = Math.abs(positions[15].x - positions[35].x) / Math.abs(positions[1].x - positions[35].x)
    const imgCenter = rimsCenter[glassesNumbers];

    const angle = Math.atan((rightPoint._y - leftPoint._y) / (rightPoint._x - leftPoint._x))


    const getH = () => {
        const hGlassesImg = rimImage.height
        const wGlassesImg = rimImage.width
        return hGlassesImg * wGlasses / wGlassesImg
    }
    const getW = ()=>{
        return positions[16]._x - positions[0]._x
    }

    let wGlasses = getW()
    let hGlasses = getH()

    const getY = () => {
        let wc = 0
        let hc = 0
        if (rel > 0.5 && rel < 2){
            wc = 0.35
            hc = 1
            return center._y
                - hGlasses * imgCenter * Math.cos(angle) * hc
                - wGlasses * Math.sin(angle) * wc
        }
        // turned right
        else if (rel <= 0.5){
            wc = 1.5
            hc = 0.5
            return center._y
                - hGlasses * imgCenter * Math.cos(angle) * hc
                - wGlasses * Math.sin(angle) * wc
        }
        else if (rel >= 2){
            wc = 0.5
            hc = 0.7
            return center._y
                - hGlasses * imgCenter * Math.cos(angle) * hc
                - wGlasses * Math.sin(angle) * wc
        }
    }

    const getx = () =>{
        let wc = 0
        let hc = 0.5
        if (rel > 0.5 && rel < 2){
            wc = 0.5
            hc = 0.5
            return center._x
                - wGlasses  * Math.cos(angle) * wc
                + hGlasses * Math.sin(angle) * hc
        }
        // turned right
        else if (rel <= 0.5){
            wc = 0.5
            hc = 0.5
            return center._x
                - wGlasses * Math.cos(angle) * wc
                + hGlasses * Math.sin(angle) * hc
        }
        else if (rel >= 2) {
            wc = 0.4
            hc = 0.8
            return center._x
                - wGlasses * Math.cos(angle) * wc
                + hGlasses * Math.sin(angle) * hc
        }
    }
    return {
        h: hGlasses,
        w: wGlasses,
        x: getx(),
        y: getY(),
        angle: angle*(180/Math.PI)
    }
}


// export default {getCoordinates, getRatio}
