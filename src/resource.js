import Face1 from './images/faces/face1.jpg'
import Face2 from './images/faces/face2.jpg'
import Face3 from './images/faces/face3.jpg'
import Face4 from './images/faces/face4.jpg'
//import Face9 from './images/faces/face9.jpg'

import Glasses1 from './images/glasses/1_3.png'
import Glasses2 from './images/glasses/2_3.png'
import Glasses3 from './images/glasses/3_3.png'
import Glasses4 from './images/glasses/4_3.jpg'
import Glasses5 from './images/glasses/gl5.png'


import rim1 from './images/glasses/1_1.png'
import lins1 from './images/glasses/1_2.png'
import rim2 from './images/glasses/2_1.png'
import lins2 from './images/glasses/2_2.png'
import rim3 from './images/glasses/3_1.png'
import lins3 from './images/glasses/3_2.png'
import rim4 from './images/glasses/4_1.png'
import lins4 from './images/glasses/4_2.png'
import rim5 from './images/glasses/rim5.png'
import lins5 from './images/glasses/lins5.png'



export const faces = [Face1, Face2, Face3, Face4]
export const glasses = [Glasses1, Glasses2, Glasses3, Glasses4, Glasses5]
export const hGlassesOffset = [0.15, 0, 0, 0, 0]
export const rimsCenter = [0.4, 0.6, 0.6, 0.6, 0.4]
export const rims = [rim1, rim2, rim3, rim4, rim5]
export const lins = [lins1, lins2, lins3, lins4, lins5]

export const strings = {
    'RU' : {
        
        'APPName' : 'Виртуальные очки',
        'alpha' : 'прозрачность линз',
        'faceNotDetectedError': 'Не удалось распознать лицо. Возможно вы перепутали картинку или загрузили слишком сложную для распознования',
        'ohSnap': 'О черт! Ошибка!',
        'Detecting': 'Распознование...',
        'chooseFile': 'Выберете файл',
    },
    'EN' : {
        'APPName' : 'Virtual glasses',
        'alpha' : 'lins\'s alpha',
        'faceNotDetectedError': 'Face doesn\'t detected. May be you confuse an image or put hard-detected face',
        'ohSnap': 'Oh snap! You got an error!',
        'Detecting': 'Detecting...',
        'chooseFile': 'Choose file',
    }
}