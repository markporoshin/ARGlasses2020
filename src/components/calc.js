import {rimsCenter} from '../resource';

export const getCoordinates = (positions, glassesNumbers) => {
    let center = positions[27];
    let rel = Math.sqrt(
            (positions[15].x - positions[35].x) * (positions[15].x - positions[35].x) +
            (positions[15].y - positions[35].y) * (positions[15].y - positions[35].y)
        ) / Math.sqrt(
            (positions[1].x - positions[35].x) * (positions[1].x - positions[35].x) +
            (positions[1].y - positions[35].y) * (positions[1].y - positions[35].y)
    );
    const imgCenter = rimsCenter[glassesNumbers];

    let angle = Math.atan((positions[36].y - positions[47].y) / (positions[36].x - positions[47].x));

    let wGlasses = (() => {
        return Math.sqrt(
            (positions[16]._x - positions[0]._x) * (positions[16]._x - positions[0]._x)
            + (positions[16]._y - positions[0]._y) * (positions[16]._y - positions[0]._y));
    })();
    let hGlasses = (() => Math.sqrt(
            ((positions[21]._y + positions[23]._y)/2 - positions[32]._y) * ((positions[21]._y + positions[23]._y)/2 -  positions[32]._y) +
            ((positions[21]._x + positions[23]._x)/2 - positions[32]._x) * ((positions[21]._x + positions[23]._x)/2 -  positions[32]._x))
    )();

    let yGl = (() => {
        let wc = 0;
        let hc = 0;
        switch (glassesNumbers) {
            case 0:
                if (rel > 0.6 && rel < 1.666){
                    wc = 0.35;
                    hc = 1;
                } else if (rel <= 0.6 && rel > 0.2) {
                    wc = 0.5;
                    hc = 0.9;
                } else if (rel <= 0.2) {
                    wc = 0.5;
                    hc = 0.9;
                } else if (rel >= 1.6666 && rel <= 2.5) {
                    wc = 0.5;
                    hc = 0.9;
                } else if (rel > 2.5) {
                    wc = 0.5;
                    hc = 0.6;
                }
                return center._y
                    - hGlasses * imgCenter * Math.cos(angle) * hc
                    - wGlasses * Math.sin(angle) * wc;
            case 1:
                if (rel > 0.6 && rel < 1.666){
                    wc = 0.35;
                    hc = 1;
                } else if (rel <= 0.6 && rel > 0.2) {
                    wc = 0.5;
                    hc = 0.9;
                } else if (rel <= 0.2) {
                    wc = 0.5;
                    hc = 0.9;
                } else if (rel >= 1.6666 && rel <= 2.5) {
                    wc = 0.5;
                    hc = 0.9;
                } else if (rel > 2.5) {
                    wc = 0.5;
                    hc = 0.7;
                }
                return center._y
                    - hGlasses * imgCenter * Math.cos(angle) * hc
                    - wGlasses * Math.sin(angle) * wc;
            case 2:
                if (rel > 0.6 && rel < 1.666) {
                    wc = 0.35;
                    hc = 1;
                } else if (rel <= 0.6 && rel > 0.2) {
                    wc = 0.5;
                    hc = 0.9;
                } else if (rel <= 0.2) {
                    wc = 0.5;
                    hc = 0.9;
                } else if (rel >= 1.6666 && rel <= 2.5) {
                    wc = 0.5;
                    hc = 0.9;
                } else if (rel > 2.5) {
                    wc = 0.5;
                    hc = 0.9;
                }
                return center._y
                    - hGlasses * imgCenter * Math.cos(angle) * hc
                    - wGlasses * Math.sin(angle) * wc;
            case 3:
                if (rel > 0.6 && rel < 1.666) {
                    wc = 0.35;
                    hc = 1.3;
                } else if (rel <= 0.6 && rel > 0.2) {
                    wc = 0.5;
                    hc = 1.3;
                } else if (rel <= 0.2) {
                    wc = 0.5;
                    hc = 1.3;
                } else if (rel >= 1.6666 && rel <= 2.5) {
                    wc = 0.5;
                    hc = 1.3;
                } else if (rel > 2.5) {
                    wc = 0.5;
                    hc = 1;
                }
                return center._y
                    - hGlasses * imgCenter * Math.cos(angle) * hc
                    - wGlasses * Math.sin(angle) * wc;
            case 4:
                if (rel > 0.6 && rel < 1.666) {
                    wc = 0.35;
                    hc = 1.5;
                } else if (rel <= 0.6 && rel > 0.2) {
                    wc = 0.5;
                    hc = 1.6;
                } else if (rel <= 0.2) {
                    wc = 0.5;
                    hc = 1.5;
                } else if (rel >= 1.6666 && rel <= 3) {
                    wc = 0.5;
                    hc = 1.5;
                } else if (rel > 3) {
                    wc = 0.5;
                    hc = 1.3;
                }
                return center._y
                    - hGlasses * imgCenter * Math.cos(angle) * hc
                    - wGlasses * Math.sin(angle) * wc;
            default:
                break;
        }
    })();
    let xGl = (() => {
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
                break;
        }
    })();

    console.log('rel');
    console.log(rel);
    console.log('angle');
    console.log(angle);

    (() => {
        if (rel > 0.6 && rel < 1.666){
            switch (glassesNumbers){
                case 0:
                    if (Math.abs(angle) > 0.6) {
                        rel = 0.6;
                        wGlasses /= 1.1;
                        xGl += wGlasses * 0.1;
                        hGlasses /= 1.1;
                        yGl -= hGlasses * 0.1;
                    }
                    else if (Math.abs(angle) <= 0.6 && Math.abs(angle) > 0.4) {
                        rel = 0.6;
                        wGlasses /= 1.1;
                        xGl += angle > 0 ? wGlasses * 0.1 : -wGlasses * 0.1;
                        hGlasses /= 1.1;
                        yGl -= hGlasses * 0.05;
                    }
                    else if (Math.abs(angle) <= 0.4 && Math.abs(angle) > 0.2) {
                        rel = 0.6;
                        wGlasses /= 1.1;
                        xGl += wGlasses * 0.05;
                        hGlasses /= 1.1;
                        yGl += hGlasses * 0.05;
                    }
                    else if (Math.abs(angle) <= 0.2){
                        rel = 0.6;
                        angle = 0;
                    }
                    break;
                case 1:
                    if (Math.abs(angle) > 0.6) {
                        rel = 0.6;
                        wGlasses /= 1.1;
                        xGl += wGlasses * 0.1;
                        hGlasses /= 1.1;
                        yGl -= hGlasses * 0.1;
                    }
                    else if (Math.abs(angle) <= 0.6 && Math.abs(angle) > 0.4) {
                        rel = 0.6;
                        wGlasses /= 1.1;
                        xGl += angle > 0 ? wGlasses * 0.1 : -wGlasses * 0.1;
                        hGlasses /= 1.1;
                        yGl -= hGlasses * 0.05;
                    }
                    else if (Math.abs(angle) <= 0.4 && Math.abs(angle) > 0.2) {
                        rel = 0.6;
                        wGlasses /= 1.1;
                        xGl += wGlasses * 0.05;
                        hGlasses /= 1.1;
                        yGl += hGlasses * 0.05;
                    }
                    else if (Math.abs(angle) <= 0.2){
                        rel = 0.6;
                        angle = 0;
                    }
                    break;
                case 2:
                    if (Math.abs(angle) > 0.6) {
                        rel = 0.6;
                        wGlasses /= 1.1;
                        xGl += wGlasses * 0.1;
                        hGlasses /= 1.1;
                        yGl -= hGlasses * 0.1;
                    }
                    else if (Math.abs(angle) <= 0.6 && Math.abs(angle) > 0.4) {
                        rel = 0.6;
                        wGlasses /= 1.1;
                        xGl += angle > 0 ? wGlasses * 0.1 : -wGlasses * 0.1;
                        hGlasses /= 1.1;
                        yGl -= hGlasses * 0.05;
                    }
                    else if (Math.abs(angle) <= 0.4 && Math.abs(angle) > 0.2) {
                        rel = 0.6;
                        wGlasses /= 1.1;
                        xGl += wGlasses * 0.05;
                        hGlasses /= 1.1;
                        yGl += hGlasses * 0.05;
                    }
                    else if (Math.abs(angle) <= 0.2){
                        rel = 0.6;
                        angle = 0;
                    }
                    break;
                case 3:
                    if (Math.abs(angle) > 0.6) {
                        rel = 0.6;
                        wGlasses /= 1.1;
                        xGl += wGlasses * 0.1;
                        hGlasses /= 1.1;
                        yGl -= hGlasses * 0.1;
                    }
                    else if (Math.abs(angle) <= 0.6 && Math.abs(angle) > 0.4) {
                        rel = 0.6;
                        wGlasses /= 1.1;
                        xGl += angle > 0 ? wGlasses * 0.1 : -wGlasses * 0.1;
                        hGlasses /= 1.1;
                        yGl += hGlasses * 0.05;
                    }
                    else if (Math.abs(angle) <= 0.4 && Math.abs(angle) > 0.2) {
                        rel = 0.6;
                        wGlasses /= 1.1;
                        xGl += angle > 0 ? wGlasses * 0.1 : -wGlasses * 0.01;
                        hGlasses /= 1.1;
                        yGl -= hGlasses * 0.05;
                    }
                    else if (Math.abs(angle) <= 0.2){
                        rel = 0.6;
                        angle = 0;
                    }
                    break;
                case 4:
                    if (Math.abs(angle) > 0.6) {
                        rel = 0.6;
                        wGlasses /= 1.1;
                        xGl += wGlasses * 0.1;
                        hGlasses /= 1.1;
                        yGl -= hGlasses * 0.1;
                    }
                    else if (Math.abs(angle) <= 0.6 && Math.abs(angle) > 0.4) {
                        rel = 0.6;
                        wGlasses /= 1.1;
                        xGl += wGlasses * 0.05;
                        hGlasses /= 1.1;
                        yGl -= hGlasses * 0.05;
                    }
                    else if (Math.abs(angle) <= 0.4 && Math.abs(angle) > 0.2) {
                        rel = 0.6;
                        wGlasses /= 1.1;
                        xGl += wGlasses * 0.05;
                        hGlasses /= 1.1;
                        yGl += hGlasses * 0.05;
                    }
                    else if (Math.abs(angle) <= 0.2){
                        rel = 0.6;
                        angle = 0;
                    }
                    break;
                default:
                    break;
            }
        } else if (rel <= 0.6 && rel > 0.2) {
            switch (glassesNumbers){
                case 0:
                    if (Math.abs(angle) > 0.6) {
                        rel = 0.6;
                        wGlasses /= 1.1;
                        xGl += wGlasses * 0.2;
                        hGlasses /= 1.1;
                        yGl -= hGlasses * 0.1;
                    }
                    else if (Math.abs(angle) <= 0.6 && Math.abs(angle) > 0.4) {
                        rel = 0.6;
                        wGlasses /= 1.1;
                        xGl -= wGlasses * 0.1;
                        hGlasses /= 1.1;
                        yGl += hGlasses * 0.05;
                    }
                    else if (Math.abs(angle) <= 0.4 && Math.abs(angle) > 0.2) {
                        rel = 0.6;
                        wGlasses /= 1.1;
                        xGl += wGlasses * 0.1 * Math.sign(angle);
                        hGlasses /= 1.1;
                        yGl += hGlasses * 0.01;
                    }
                    else if (Math.abs(angle) <= 0.2){
                        rel = 0.6;
                        xGl += -wGlasses * 0.05 * Math.sign(angle);
                        angle = 0;
                    }
                    break;
                case 1:
                    if (Math.abs(angle) > 0.6) {
                        rel = 0.6;
                        wGlasses /= 1.1;
                        xGl += wGlasses * 0.2;
                        hGlasses /= 1.1;
                        yGl += hGlasses * 0.05;
                    }
                    else if (Math.abs(angle) <= 0.6 && Math.abs(angle) > 0.4) {
                        rel = 0.6;
                        wGlasses /= 1.1;
                        xGl += wGlasses * 0.2;
                        hGlasses /= 1.1;
                        yGl += hGlasses * 0.05;
                    }
                    else if (Math.abs(angle) <= 0.4 && Math.abs(angle) > 0.2) {
                        rel = 0.6;
                        wGlasses /= 1.1;
                        xGl += wGlasses * 0.05 * Math.sign(angle);
                        hGlasses /= 1.1;
                        yGl += hGlasses * 0.01;
                    }
                    else if (Math.abs(angle) <= 0.2){
                        xGl += -wGlasses * 0.05 * Math.sign(angle);
                        rel = 0.6;
                        angle = 0;
                    }
                    break;
                case 2:
                    if (Math.abs(angle) > 0.6) {
                        rel = 0.6;
                        wGlasses /= 1.1;
                        xGl += wGlasses * 0.2;
                        hGlasses /= 1.1;
                        yGl += hGlasses * 0.05;
                    }
                    else if (Math.abs(angle) <= 0.6 && Math.abs(angle) > 0.4) {
                        rel = 0.6;
                        wGlasses /= 1.1;
                        xGl += wGlasses * 0.2;
                        hGlasses /= 1.1;
                        yGl += hGlasses * 0.05;
                    }
                    else if (Math.abs(angle) <= 0.4 && Math.abs(angle) > 0.2) {
                        rel = 0.6;
                        wGlasses /= 1.1;
                        xGl += wGlasses * 0.1 * Math.sign(angle);
                        hGlasses /= 1.1;
                        yGl += hGlasses * 0.05;
                    }
                    else if (Math.abs(angle) <= 0.2) {
                        xGl += -wGlasses * 0.05 * Math.sign(angle);
                        rel = 0.6;
                        angle = 0;
                    }
                    break;
                case 3:
                    if (Math.abs(angle) > 0.6) {
                        rel = 0.6;
                        wGlasses /= 1.1;
                        xGl += wGlasses * 0.2 * Math.sign(angle);
                        hGlasses /= 1.1;
                        yGl += hGlasses * 0.05;
                    }
                    else if (Math.abs(angle) <= 0.6 && Math.abs(angle) > 0.4) {
                        rel = 0.6;
                        wGlasses /= 1.1;
                        xGl += wGlasses * 0.2 * Math.sign(angle);
                        hGlasses /= 1.1;
                        yGl += hGlasses * 0.05;
                    }
                    else if (Math.abs(angle) <= 0.4 && Math.abs(angle) > 0.2) {
                        rel = 0.6;
                        wGlasses /= 1.1;
                        xGl += wGlasses * 0.1 * Math.sign(angle);
                        hGlasses /= 1.1;
                        yGl += hGlasses * 0.05;
                    }
                    else if (Math.abs(angle) <= 0.2){
                        xGl += -wGlasses * 0.05 * Math.sign(angle);
                        rel = 0.6;
                        angle = 0;
                    }
                    break;
                case 4:
                    if (Math.abs(angle) > 0.3) {
                        rel = 0.6;
                        wGlasses /= 1.1;
                        xGl += wGlasses * 0.1 * Math.sign(angle);
                        hGlasses /= 1.1;
                        yGl += hGlasses * 0.05;
                    }
                    else if (Math.abs(angle) <= 0.3 && Math.abs(angle) > 0.2) {
                        rel = 0.6;
                        wGlasses /= 1.1;
                        xGl += wGlasses * 0.2;
                        hGlasses /= 1.1;
                        yGl += hGlasses * 0.05;
                    }
                    else if (Math.abs(angle) <= 0.2){
                        xGl += -wGlasses * 0.05 * Math.sign(angle);
                        rel = 0.6;
                        angle = 0;
                    }
                    break;
                default:
                    break;
            }
        } else if (rel <= 0.2) {
            if (Math.abs(angle) > 0.3){
                rel = 0.2;
                wGlasses /= 1.5;
                xGl += wGlasses / 3;
                hGlasses /= 3;
                yGl -= hGlasses / 3;
            }
            else if (Math.abs(angle) > 0.2 && Math.abs(angle) <= 0.3) {
                rel = 0.2;
                wGlasses /= 1.5;
                xGl += wGlasses / 3;
                hGlasses /= 3;
                yGl -= hGlasses / 3;
            }
            else if (Math.abs(angle) <= 0.2){
                rel = 2;
                wGlasses /= 1.2;
                xGl += wGlasses / 2;
                hGlasses /= 3;
                yGl += hGlasses /3;
            }
        } else if (rel >= 1.6666 && rel <= 2.5) {
            switch (glassesNumbers)  {
                case 0:
                    if (Math.abs(angle) > 0.6) {
                        wGlasses /= 1.2;
                        xGl += angle > 0 ? wGlasses * 0.08333333 * 2 : -wGlasses * 0.1;
                        hGlasses /= 1.2;
                        yGl += hGlasses * 0.01;
                    }
                    else if (Math.abs(angle) <= 0.6 && Math.abs(angle) > 0.4) {
                        wGlasses /= 1.2;
                        xGl += wGlasses * 0.08333333 *2;
                        hGlasses /= 1.2;
                        yGl += hGlasses * 0.08333333;
                    }
                    else if (Math.abs(angle) <= 0.4 && Math.abs(angle) > 0.2) {
                        wGlasses /= 1.2;
                        xGl += wGlasses * 0.08333333 *2;
                        hGlasses /= 1.2;
                        yGl += hGlasses * 0.08333333;
                    }
                    else if (Math.abs(angle) <= 0.2) {
                        wGlasses /= 1.2;
                        xGl += angle > 0 ? wGlasses * 0.01 : wGlasses * 0.01;
                        hGlasses /= 1.2;
                        yGl += hGlasses * 0.08333333;
                    }
                    break;
                case 1:
                    if (Math.abs(angle) > 0.6) {
                        wGlasses /= 1.2;
                        xGl += angle > 0 ? wGlasses * 0.08333333 * 2 : -wGlasses * 0.1;
                        hGlasses *= 1.2;
                        yGl -= hGlasses * 0.2;
                    }
                    else if (Math.abs(angle) <= 0.6 && Math.abs(angle) > 0.4) {
                        wGlasses /= 1.2;
                        xGl += wGlasses * 0.08333333 *2;
                        hGlasses /= 1.2;
                        yGl += hGlasses * 0.08333333;
                    }
                    else if (Math.abs(angle) <= 0.4 && Math.abs(angle) > 0.2) {
                        wGlasses /= 1.2;
                        xGl += angle > 0 ? wGlasses * 0.01 : -wGlasses * 0.01;
                        hGlasses /= 1.2;
                        yGl += hGlasses * 0.08333333;
                    }
                    else if (Math.abs(angle) <= 0.2){
                        wGlasses /= 1.2;
                        xGl += angle > 0 ? wGlasses * 0.01 : wGlasses * 0.01;
                        hGlasses /= 1.2;
                        yGl += hGlasses * 0.05;
                    }
                    break;
                case 2:
                    if (Math.abs(angle) > 0.6) {
                        wGlasses /= 1.2;
                        xGl += angle > 0 ? wGlasses * 0.08333333 * 2 : -wGlasses * 0.08333333;
                        hGlasses /= 1.2;
                        yGl -= hGlasses * 0.5;
                    }
                    else if (Math.abs(angle) <= 0.6 && Math.abs(angle) > 0.4) {
                        wGlasses /= 1.2;
                        xGl += wGlasses * 0.08333333 *2;
                        hGlasses /= 1.2;
                        yGl += hGlasses * 0.08333333;
                    }
                    else if (Math.abs(angle) <= 0.4 && Math.abs(angle) > 0.2) {
                        wGlasses /= 1.2;
                        xGl += wGlasses * 0.08333333 *2;
                        hGlasses /= 1.2;
                        yGl += hGlasses * 0.08333333;
                    }
                    else if (Math.abs(angle) <= 0.2){
                        wGlasses /= 1.2;
                        xGl += angle > 0 ? wGlasses * 0.01 : wGlasses * 0.01;
                        hGlasses /= 1.2;
                        yGl += hGlasses * 0.08333333;
                    }
                    break;
                case 3:
                    if (Math.abs(angle) > 0.6) {
                        wGlasses /= 1.2;
                        xGl += angle > 0 ? wGlasses * 0.08333333 * 2 : -wGlasses * 0.1;
                        hGlasses /= 1.2;
                        yGl += hGlasses * 0.01;
                    }
                    else if (Math.abs(angle) <= 0.6 && Math.abs(angle) > 0.4) {
                        wGlasses /= 1.2;
                        xGl += wGlasses * 0.08333333 *2;
                        hGlasses /= 1.2;
                        yGl += hGlasses * 0.08333333;
                    }
                    else if (Math.abs(angle) <= 0.4 && Math.abs(angle) > 0.2) {
                        wGlasses /= 1.2;
                        xGl += wGlasses * 0.08333333 *2;
                        hGlasses /= 1.2;
                        yGl += hGlasses * 0.08333333;
                    }
                    else if (Math.abs(angle) <= 0.2){
                        wGlasses /= 1.2;
                        xGl += angle > 0 ? wGlasses * 0.1 : wGlasses * 0.1;
                        hGlasses /= 1.2;
                        yGl += hGlasses * 0.08333333;
                    }
                    break;
                case 4:
                    if (Math.abs(angle) > 0.6) {
                        wGlasses /= 1.2;
                        xGl += angle > 0 ? wGlasses * 0.08333333 * 2 : 0;
                        hGlasses /= 1.2;
                        yGl += hGlasses * 0.01;
                    }
                    else if (Math.abs(angle) <= 0.6 && Math.abs(angle) > 0.4) {
                        wGlasses /= 1.2;
                        xGl += wGlasses * 0.08333333 *2;
                        hGlasses /= 1.2;
                        yGl += hGlasses * 0.08333333;
                    }
                    else if (Math.abs(angle) <= 0.4 && Math.abs(angle) > 0.2) {
                        wGlasses /= 1.2;
                        xGl += wGlasses * 0.08333333 *2;
                        hGlasses /= 1.2;
                        yGl += hGlasses * 0.08333333;
                    }
                    else if (Math.abs(angle) <= 0.2){
                        wGlasses /= 1.2;
                        xGl += angle > 0 ? wGlasses * 0.1 : wGlasses * 0.1;
                        hGlasses /= 1.2;
                        yGl += hGlasses * 0.08333333;
                    }
                    break;
                default:
                    break;
            }
        } else if (rel > 2.5) {
            switch (glassesNumbers)  {
                case 0:
                    if (Math.abs(angle) > 0.6) {
                        rel = 2.5;
                        wGlasses /= 1.5;
                        xGl += wGlasses / 6;
                        hGlasses /= 1.5;
                        yGl -= hGlasses /3;
                    }
                    else if (Math.abs(angle) <= 0.6 && Math.abs(angle) > 0.4) {
                        rel = 2.5;
                        wGlasses /= 1.5;
                        xGl += wGlasses / 6;
                        hGlasses /= 1.5;
                        yGl -= hGlasses /3;
                    }
                    else if (Math.abs(angle) <= 0.4 && Math.abs(angle) > 0.2) {
                        rel = 2.5;
                        wGlasses /= 1.5;
                        xGl += wGlasses / 6;
                        hGlasses /= 1.5;
                        yGl -= hGlasses /3;
                    }
                    else if (Math.abs(angle) <= 0.2){
                        rel = 2.5;
                        wGlasses /= 1.5;
                        xGl += wGlasses / 6;
                        hGlasses /= 1.5;
                        yGl -= hGlasses /6;
                    }
                    break;
                case 1:
                    if (Math.abs(angle) > 0.6) {
                        rel = 2.5;
                        wGlasses /= 1.5;
                        xGl += wGlasses / 6;
                        hGlasses /= 1.5;
                        yGl -= hGlasses /3;
                    }
                    else if (Math.abs(angle) <= 0.6 && Math.abs(angle) > 0.4) {
                        rel = 2.5;
                        wGlasses /= 1.5;
                        xGl += wGlasses / 6;
                        hGlasses /= 1.5;
                        yGl -= hGlasses /3;
                    }
                    else if (Math.abs(angle) <= 0.4 && Math.abs(angle) > 0.2) {
                        rel = 2.5;
                        wGlasses /= 1.5;
                        xGl += wGlasses / 6;
                        hGlasses /= 1.5;
                        yGl -= hGlasses /3;
                    }
                    else if (Math.abs(angle) <= 0.2){
                        rel = 2.5;
                        wGlasses /= 1.5;
                        xGl += wGlasses / 6;
                        hGlasses /= 1.5;
                        yGl -= hGlasses / 6;
                    }
                    break;
                case 2:
                    if (Math.abs(angle) > 0.6) {
                        rel = 2.5;
                        wGlasses /= 1.5;
                        xGl += wGlasses / 6;
                        hGlasses /= 1.5;
                        yGl -= hGlasses /3;
                    }
                    else if (Math.abs(angle) <= 0.6 && Math.abs(angle) > 0.4) {
                        rel = 2.5;
                        wGlasses /= 1.5;
                        xGl += wGlasses / 6;
                        hGlasses /= 1.5;
                        yGl -= hGlasses /3;
                    }
                    else if (Math.abs(angle) <= 0.4 && Math.abs(angle) > 0.2) {
                        rel = 2.5;
                        wGlasses /= 1.5;
                        xGl += wGlasses / 6;
                        hGlasses /= 1.5;
                        yGl -= hGlasses / 3;
                    }
                    else if (Math.abs(angle) <= 0.2){
                        rel = 2.5;
                        wGlasses /= 1.5;
                        xGl += wGlasses / 6;
                        hGlasses /= 1.5;
                        yGl -= hGlasses / 6;
                    }
                    break;
                case 3:
                    if (Math.abs(angle) > 0.6) {
                        rel = 2.5;
                        wGlasses /= 1.5;
                        xGl += wGlasses / 6;
                        hGlasses /= 1.5;
                        yGl -= hGlasses / 3;
                    }
                    else if (Math.abs(angle) <= 0.6 && Math.abs(angle) > 0.4) {
                        rel = 2.5;
                        wGlasses /= 1.5;
                        xGl += wGlasses / 6;
                        hGlasses /= 1.5;
                        yGl -= hGlasses / 3;
                    }
                    else if (Math.abs(angle) <= 0.4 && Math.abs(angle) > 0.2) {
                        rel = 2.5;
                        wGlasses /= 1.5;
                        xGl += wGlasses / 6;
                        hGlasses /= 1.5;
                        yGl -= hGlasses / 3;
                    }
                    else if (Math.abs(angle) <= 0.2){
                        rel = 2.5;
                        wGlasses /= 1.5;
                        xGl += wGlasses / 6;
                        hGlasses /= 1.5;
                        yGl -= hGlasses / 6;
                    }
                    break;
                case 4:
                    if (Math.abs(angle) > 0.6) {
                        rel = 2.5;
                        wGlasses /= 1.5;
                        xGl += wGlasses / 6;
                        hGlasses /= 1.5;
                        yGl -= hGlasses /3;
                    }
                    else if (Math.abs(angle) <= 0.6 && Math.abs(angle) > 0.4) {
                        rel = 2.5;
                        wGlasses /= 1.5;
                        xGl += wGlasses / 6;
                        hGlasses /= 1.5;
                        yGl -= hGlasses /3;
                    }
                    else if (Math.abs(angle) <= 0.4 && Math.abs(angle) > 0.2) {
                        rel = 2.5;
                        wGlasses /= 1.5;
                        xGl += wGlasses / 6;
                        hGlasses /= 1.5;
                        yGl -= hGlasses /3;
                    }
                    else if (Math.abs(angle) <= 0.2){
                        rel = 2.5;
                        wGlasses /= 1.5;
                        xGl += wGlasses / 6;
                        hGlasses /= 1.5;
                        yGl -= hGlasses / 6;
                    }
                    break;
                default:
                    break;
            }
        }
    })();
    return {
        h: hGlasses,
        w: wGlasses,
        x: xGl,
        y: yGl,
        angle: angle * (180 / Math.PI),
        trans: (rel-1)/4
    };
};
