import { IconType } from 'react-icons';

export interface IconCircleProps{
    type: 'summary' | 'quiz'
}

export interface IconConfig {
    icon: IconType;
    bg: string;
    iconColor: string;
};