import { FaFileAlt, FaHome } from 'react-icons/fa';
import { FaFileCircleQuestion } from 'react-icons/fa6';

export const SIDEBAR_ITEMS_BODY = [
    {
        link: '/',
        icon: FaHome,
        name: 'Home',
    },
    {
        link: '/gerar-resumo',
        icon: FaFileAlt,
        name: 'Gerar resumo',
    },
    {
        link: '/gerar-quiz',
        icon: FaFileCircleQuestion,
        name: 'Gerar questões',
    },
];
