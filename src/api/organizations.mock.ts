import {Organization} from "../types/organization.type";
// @ts-ignore
import Place1Img from "../static/full-place.jpg";
// @ts-ignore
import Place2Img from "../static/place2.png";

export const organizations: Organization[] = [
    {
        id: "562894124CA2D1G3414",
        title: "КрабыКутабы",
        icon: Place2Img,
        description: "КрабыКутабы на Лесной улице — современный авторский ресторан, в меню которого объединили моду на крабов и переосмысление панкавказской кухни, а в большом баре предложили несколько десятков фирменных наименований для любого повода.",
        address: "Москва, ул. Лесная, 20 стр. 4",
        category: "Рестораны",
        latitude: 55.779474,
        longitude: 37.591899
    },
    {
        id: "562894124CA2D1G3413",
        title: "NOVIKOV",
        icon: Place1Img,
        description: "Совершенно несуеверный ресторан №13, расположенный на улице Малая Бронная, специализируется на авторских интерпретациях привычной и любимой всем европейской кухни, представляя знакомые блюда в новом свете.",
        address: "Москва, ул. Малая Бронная, д. 13",
        category: "Рестораны",
        latitude: 55.759856,
        longitude: 37.596112
    },
]