import {rimsCenter} from '../resource';

export const getCoordinates = (positions, {height, width}, glassesNumbers) => {
    let leftPoint = positions[36];
    let rightPoint = positions[45];
    let center = positions[27];
    let rel = Math.abs(positions[15].x - positions[35].x) / Math.abs(positions[1].x - positions[35].x);
    const imgCenter = rimsCenter[glassesNumbers];

    const angle = Math.atan((rightPoint._y - leftPoint._y) / (rightPoint._x - leftPoint._x));

    let wGlasses = (() => {
        if (rel <= 0.6) {
            return Math.sqrt(
                (positions[27]._x - positions[0]._x) * (positions[27]._x - positions[0]._x)
                + (positions[27]._y - positions[0]._y) * (positions[27]._y - positions[0]._y)) * 1.3;
        } else if (rel >= 1.6666) {
            return Math.sqrt(
                (positions[16]._x - positions[27]._x) * (positions[16]._x - positions[27]._x)
                + (positions[16]._y - positions[27]._y) * (positions[16]._y - positions[27]._y)) * 1.3;
        } else {
            return Math.sqrt(
                (positions[16]._x - positions[0]._x) * (positions[16]._x - positions[0]._x)
                + (positions[16]._y - positions[0]._y) * (positions[16]._y - positions[0]._y));
        }

    })();
    let hGlasses = height * wGlasses / width;

    const getY = () => {
        let wc = 0;
        let hc = 0;
        switch (glassesNumbers) {
            case 0:
                if (rel > 0.6 && rel < 1.666){
                    wc = 0.35;
                    hc = 1;
                } else if (rel <= 0.6) {
                    wc = 0.5;
                    hc = 0.9;
                } else if (rel >= 1.6666) {
                    wc = 0.5;
                    hc = 0.9;
                }
                return center._y
                    - hGlasses * imgCenter * Math.cos(angle) * hc
                    - wGlasses * Math.sin(angle) * wc;
            case 1:
                if (rel > 0.6 && rel < 1.666){
                    wc = 0.35;
                    hc = 1;
                } else if (rel <= 0.6) {
                    wc = 0.5;
                    hc = 0.9;
                } else if (rel >= 1.6666) {
                    wc = 0.5;
                    hc = 0.9;
                }
                return center._y
                    - hGlasses * imgCenter * Math.cos(angle) * hc
                    - wGlasses * Math.sin(angle) * wc;
            case 2:
                if (rel > 0.6 && rel < 1.666) {
                    wc = 0.35;
                    hc = 1;
                } else if (rel <= 0.6) {
                    wc = 0.5;
                    hc = 0.9;
                } else if (rel >= 1.66666) {
                    wc = 0.5;
                    hc = 0.9;
                }
                return center._y
                    - hGlasses * imgCenter * Math.cos(angle) * hc
                    - wGlasses * Math.sin(angle) * wc;
            case 3:
                if (rel > 0.6 && rel < 1.666) {
                    wc = 0.35;
                    hc = 0.9;
                } else if (rel <= 0.6) {
                    wc = 0.5;
                    hc = 0.9;
                } else if (rel >= 1.6666) {
                    wc = 0.5;
                    hc = 0.9;
                }
                return center._y
                    - hGlasses * imgCenter * Math.cos(angle) * hc
                    - wGlasses * Math.sin(angle) * wc;
            case 4:
                if (rel > 0.6 && rel < 1.666) {
                    wc = 0.35;
                    hc = 1;
                } else if (rel <= 0.6) {
                    wc = 0.5;
                    hc = 0.9;
                } else if (rel >= 1.6666) {
                    wc = 0.5;
                    hc = 0.9;
                }
                return center._y
                    - hGlasses * imgCenter * Math.cos(angle) * hc
                    - wGlasses * Math.sin(angle) * wc;
            default:
        }
    };

    const getx = () => {
        let wc = 0;
        let hc = 0.5;
        switch (glassesNumbers) {
            case 0:
                if (rel > 0.6 && rel < 1.666){
                    wc = 0.5;
                    hc = 0.5;
                } else if (rel <= 0.6) {
                    wc = 0.5;
                    hc = 0.2;
                } else if (rel >= 1.6666) {
                    wc = 0.45;
                    hc = 0.2;
                }
                return center._x
                    - wGlasses * Math.cos(angle) * wc
                    + hGlasses * Math.sin(angle) * hc;
            case 1:
                if (rel > 0.6 && rel < 1.666) {
                    wc = 0.5;
                    hc = 0.5;
                } else if (rel <= 0.6) {
                    wc = 0.5;
                    hc = 0.5;
                } else if (rel >= 1.6666) {
                    wc = 0.45;
                    hc = 0.3;
                }
                return center._x
                    - wGlasses * Math.cos(angle) * wc
                    + hGlasses * Math.sin(angle) * hc;
            case 2:
                if (rel > 0.6 && rel < 1.666) {
                    wc = 0.5;
                    hc = 0.5;
                } else if (rel <= 0.6) {
                    wc = 0.5;
                    hc = 0.2;
                } else if (rel >= 1.6666) {
                    wc = 0.45;
                    hc = 0.3;
                }
                return center._x
                    - wGlasses * Math.cos(angle) * wc
                    + hGlasses * Math.sin(angle) * hc;
            case 3:
                if (rel > 0.6 && rel < 1.666) {
                    wc = 0.5;
                    hc = 0.5;
                } else if (rel <= 0.6) {
                    wc = 0.5;
                    hc = 0.2;
                } else if (rel >= 1.6666) {
                    wc = 0.45;
                    hc = 0.2;
                }
                return center._x
                    - wGlasses * Math.cos(angle) * wc
                    + hGlasses * Math.sin(angle) * hc;
            case 4:
                if (rel > 0.5 && rel < 2) {
                    wc = 0.5;
                    hc = 0.5;
                } else if (rel <= 0.6) {
                    wc = 0.5;
                    hc = 0.2;
                } else if (rel >= 1.6666) {
                    wc = 0.45;
                    hc = 0.2;
                }
                return center._x
                    - wGlasses * Math.cos(angle) * wc
                    + hGlasses * Math.sin(angle) * hc;
            default:
        }
    };
    return {
        h: hGlasses,
        w: wGlasses,
        x: getx(),
        y: getY(),
        angle: angle * (180 / Math.PI)
    };
};
